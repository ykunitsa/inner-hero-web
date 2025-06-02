import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExposureState {
  currentStepId: number | null;
  completedSteps: number[];
  timers: Record<number, number>;
}

const initialState: ExposureState = {
  currentStepId: null,
  completedSteps: [],
  timers: {},
};

const exposureSlice = createSlice({
  name: "exposure",
  initialState,
  reducers: {
    startStep(state, action: PayloadAction<number>) {
      state.currentStepId = action.payload;
      state.timers[action.payload] = state.timers[action.payload] || 0;
    },
    tickTimer(state, action: PayloadAction<number>) {
      const stepId = action.payload;
      if (state.timers[stepId] > 0) {
        state.timers[stepId] -= 1;
      }
    },
    finishStep(state, action: PayloadAction<number>) {
      const stepId = action.payload;
      state.completedSteps.push(stepId);
      state.currentStepId = null;
    },
  },
});

export const { startStep, tickTimer, finishStep } = exposureSlice.actions;
export const selectExposureState = (state: { exposure: ExposureState }) =>
  state.exposure;
export default exposureSlice.reducer;
