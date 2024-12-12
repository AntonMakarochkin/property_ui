import { sample } from "effector";
import { changeApartmentsFormEv, changeOpenModalEv, resetFilterEv, toggleSearchingEv } from "./events";
import { $apartmentsForm, $filters, $modalOpen } from "./state";
import { getApartmentsFx, setFilterFx } from "./effects";
import { debounce } from "../../Shared/utils/debounce";
import { getActiveFilters } from "../../Shared/utils/getActiveFilters";

const getApartmentsFxDebounce = debounce((some) => {
  getApartmentsFx(some);
}, 2000)

sample({
  clock: [setFilterFx.doneData, resetFilterEv],
  source: $filters,
  fn: (state) => {
    const activeFilters = getActiveFilters(state);
    getApartmentsFxDebounce(activeFilters);
    return true
  },
  target: toggleSearchingEv,
})
sample({
  clock: changeOpenModalEv,
  fn: (state) => state,
  target: $modalOpen,
})

sample({
  clock: changeApartmentsFormEv,
  source: $apartmentsForm,
  fn: (state, { key, value }) => {
    return {
      ...state,
      [key]: value,
    };
  },
  target: $apartmentsForm,
})