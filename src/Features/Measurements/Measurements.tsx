import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, useQuery } from 'urql';
import { useGeolocation } from 'react-use';
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
    measurementsData: state.measurements.data
  };
};

export default () => {
  return (
    <Provider value={client}>
      <Measurements />
    </Provider>
  );
};

const Measurements = () => {
  const input = [{
    metricName: "injValveOpen", after: 1573931260710
  }]
  const dispatch = useDispatch();
  const {measurementsData} = useSelector(getMeasurements);

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.measurementsDataRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  
  return <EOGCharts multipleMeasurements={measurementsData}/>
};
