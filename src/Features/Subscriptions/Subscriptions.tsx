import React from 'react';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { Provider, Client, dedupExchange, fetchExchange, subscriptionExchange, useSubscription } from 'urql'
import { SubscriptionClient } from 'subscriptions-transport-ws';
import SubscriptionsComponent from '../../components/SubscriptionsComponent';


const subscriptionClient = new SubscriptionClient("wss://react.eogresources.com/graphql",
  {
    reconnect: true
  }
);

const client = new Client({
  url: 'http://react.eogresources.com/graphql',
  exchanges: [
    dedupExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
})

const newMessages: any = `
subscription {
    newMeasurement {
      metric
      at
      value
      unit
    }
  }
`;

export default () => {
  return (
    <Provider value={client}>
      <Subscriptions />
    </Provider>
  );
};

const latestMeasurementValues: any = {};
const handleSubscription = (messages : any, response: any): any => {
  return [response.newMeasurement, messages];
};

const getMetrics = (state: IState) => {
  return {
    selectedMetrics: state.metrics.selectedMetrics
  };
};

const Subscriptions = () => {
  const {selectedMetrics} = useSelector(getMetrics);
  const [res] = useSubscription({query: newMessages}, handleSubscription);

  if (!res.data) {
    return null;
  }
  latestMeasurementValues[res.data[0].metric] = `${res.data[0].value} ${res.data[0].unit}` ;
  const latestData: any = [];
  Object.keys(latestMeasurementValues).filter((eachKey) => {
    if(selectedMetrics.includes(eachKey)) {
      latestData.push(<div key={eachKey}>{eachKey} : {latestMeasurementValues[eachKey]}</div>);
    }
    return false;
  });
  return <SubscriptionsComponent latestSubscriptions={latestData}/>;
};
