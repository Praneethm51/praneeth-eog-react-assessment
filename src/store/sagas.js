import { spawn } from 'redux-saga/effects';
import weatherSaga from '../Features/Weather/saga';
import mesurementsSaga from '../Features/Measurements/saga';
import metricsSaga from '../Features/Metrics/saga';

export default function* root() {
  yield spawn(weatherSaga);
  yield spawn(mesurementsSaga);
  yield spawn(metricsSaga);
}
