import React, { useState, useEffect, useRef } from 'react';
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

const usePrevious = (value: any):any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const compareMetrics = (prev: any, current: any) => {
  if(prev === current) return true;
  if(prev && current && prev.input && current && prev.input.length === current.length) return true;
  return false;
}

const get30MinsBackTime = () => {
  return (new Date().getTime() - (30*60*1000))
}

const Measurements = () => {
  const dispatch = useDispatch();
  const {measurementsData, selectedMetrics} = useSelector(getMeasurements);
  // const selectedMetrics: Array<string> = ["injValveOpen"];
  // if(!selectedMetrics || selectedMetrics.length == 0) {
  //   return null;
  // } 
  // const [result, setResult] = useState({});
  // let selMetricsChanged: boolean = false;
  const [time, setTime] = useState(get30MinsBackTime());
  useEffect(() => {
    setTime(get30MinsBackTime());
  }, [selectedMetrics])

  // const fetchData = async () => {

    // let currentSelectedMetrics: any = {
    //   input: selectedMetrics.map((val) => {
    //     console.log("selected metrics input")
    //     return ({
    //       metricName: val, after: time
    //     })})
    // };
    // const prevSelectedMetrics: Array<string> = usePrevious(currentSelectedMetrics);
    // const queryInput = compareMetrics(prevSelectedMetrics, selectedMetrics) ? ( prevSelectedMetrics) :  currentSelectedMetrics;
    // console.log("query input",queryInput.input)
    const [result] = useQuery({
      query,
      variables: {
        input: selectedMetrics.map((val) => {
          return ({
            metricName: val, after: time
          })})
      }
    });
    // setResult(result);
// }

  // const [result] = useQuery({
  //   query,
  //   variables: {
  //     input: selectedMetrics.map((val) => {
  //       console.log("selected metrics input")
  //       return ({
  //       metricName: val, after: (new Date().getTime() - 1800000)
  //       })})
  //   },
  // });
  
  const { fetching, data, error }: any = result;
  useEffect(() => {
    if (error) {
      console.log("dispatch errors");
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data || fetching) return;
    const { getMultipleMeasurements } = data;
    if(!getMultipleMeasurements || getMultipleMeasurements.length === 0) return;

    console.log("dispatch measurements");
    dispatch(actions.measurementsDataRecevied(getMultipleMeasurements));
  }, [ dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  
  return <EOGCharts multipleMeasurements={measurementsData}/>
};

const RenderCharts = () => {

}
