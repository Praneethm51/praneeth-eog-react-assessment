import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import MetricTypes from '../../components/MetricTypes';
import { Provider, createClient, Client, dedupExchange, fetchExchange, subscriptionExchange, useQuery, useSubscription } from 'urql'
import { SubscriptionClient } from 'subscriptions-transport-ws';
import SubscriptionsComponent from '../../components/SubscriptionsComponent';


const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
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

// const selectedMetrics = ["injValveOpen", "oilTemp"];

export default () => {
  return (
    <Provider value={client}>
      <Subscriptions />
    </Provider>
  );
};

const latestMeasurementValues: any = {};
const handleSubscription = (messages : any, response: any): any => {
  console.log(response, messages);
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
    return <p>No new messages</p>;
  }
  latestMeasurementValues[res.data[0].metric] = res.data[0].value;
  const latestData: any = [];
  Object.keys(latestMeasurementValues).filter((eachKey) => {
    if(selectedMetrics.includes(eachKey)) {
      latestData.push(<div>{eachKey} : {latestMeasurementValues[eachKey]}</div>);
    }
    return false;
  });
  return <SubscriptionsComponent latestSubscriptions={latestData}/>;
};
