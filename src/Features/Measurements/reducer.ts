import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
}
export type MultipleMeasurements = {
  metric: string;
  measurements: Array<Measurement>;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  data: [] as Array<MultipleMeasurements>
};

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    measurementsDataRecevied: (state, action: PayloadAction<Array<MultipleMeasurements>>) => {
      state.data = action.payload;
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
