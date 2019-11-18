import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as measurementsReducer } from '../Features/Measurements/reducer';
import { reducer as metricsReducer } from '../Features/Metrics/reducer';

export default {
  weather: weatherReducer,
  measurements: measurementsReducer,
  metrics: metricsReducer
};
