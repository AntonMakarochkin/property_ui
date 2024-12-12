import { useUnit } from "effector-react";
import { $modalOpen, $residencesForm, $step } from "../Models/residences/state";
// import { getActiveFilters } from "../Shared/utils/getActiveFilters";
import { changeOpenModalEv, resetFormFieldsEv } from "../Models/residences/events";
import { addResidencesFx } from "../Models/residences/effects";



export function useResidencesForm() {
	const [fields, modalOpen, step] = useUnit([$residencesForm, $modalOpen, $step]);
	// const activeFilters = getActiveFilters(filters);
	function handlerSaveResidences() {
		changeOpenModalEv(false)
		addResidencesFx(fields)
		resetFormFieldsEv();
	}
	return { step, fields, handlerSaveResidences, open: modalOpen };
}
