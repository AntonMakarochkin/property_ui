import { sample } from "effector";
import { changeOpenModalEv, changeResidenceFormEv, changeStepEv, toggleModalCategory } from "./events";
import { $modalCategory, $modalOpen, $residencesForm, $step } from "./state";

sample({
  clock: changeOpenModalEv,
  fn: (state) => state,
  target: $modalOpen,
})

sample({
  clock: toggleModalCategory,
  fn: (state) => state,
  target: $modalCategory,
})

sample({
  clock: changeResidenceFormEv,
  source: $residencesForm,
  fn: (state, { key, value }) => {
    return {
      ...state,
      [key]: value,
    };
  },
  target: $residencesForm,
})

sample({
  clock: changeStepEv,
  fn: (state) => state,
  target: $step,
})