import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import MetricTypes from '../../components/MetricTypes';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query {getMetrics}
`;

const getMetrics = (state: IState) => {
  return {metrics: [...state.metrics.metrics]};
};



export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
  const dispatch = useDispatch();
  const { metrics } = useSelector(getMetrics);

  const [result] = useQuery({
    query
  });

  const onMetricTypesChange = (event: object, selectedMetrics: Array<string>) => {
    console.log(event, "****", selectedMetrics);
    console.log("dispatch metrics types changed");
    dispatch(actions.metricsTypesChanged(selectedMetrics));
  }

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics} = data;
    dispatch(actions.metricsDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;

  return <MetricTypes metrics={metrics} onMetricTypesChange={onMetricTypesChange}/>;
};
