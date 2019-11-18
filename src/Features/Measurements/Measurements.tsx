import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../store';
import EOGCharts from '../../components/EOGCharts';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

const getMeasurements = (state: IState) => {
  return {
    measurementsData: state.measurements.data,
    selectedMetrics: state.metrics.selectedMetrics
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Measurements />
    </Provider>
  );
};

const get30MinsBackTime = () => {
  return (new Date().getTime() - (30*60*1000))
}

const Measurements = () => {
  const dispatch = useDispatch();
  const {measurementsData, selectedMetrics} = useSelector(getMeasurements);
  const [time, setTime] = useState(get30MinsBackTime());
  useEffect(() => {
    setTime(get30MinsBackTime());
  }, [selectedMetrics])

    const [result] = useQuery({
      query,
      variables: {
        input: selectedMetrics.map((val) => {
          return ({
            metricName: val, after: time
          })})
      }
    });
  
  const { fetching, data, error }: any = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data || fetching) return;
    const { getMultipleMeasurements } = data;
    if(!getMultipleMeasurements || getMultipleMeasurements.length === 0) return;

    dispatch(actions.measurementsDataRecevied(getMultipleMeasurements));
  }, [ dispatch, data, error, fetching]);

  if (fetching) return <LinearProgress />;
  
  return <EOGCharts multipleMeasurements={measurementsData}/>
};
