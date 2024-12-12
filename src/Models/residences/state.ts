import { createStore } from "effector";

import { Residence } from "./types";
import { resetFormFieldsEv } from "./events";

export const $residences = createStore<Residence[]>([]);

export const $modalOpen = createStore<boolean>(true);

export const $residencesForm = createStore<{[key: string]: any }>({
	gallery: {},
  categories: [],
  name: '',
	description: '',
	priceFrom: '',
	area: '',
	remoteness: '',
	type: '',
}).reset(resetFormFieldsEv);

export const $modalCategory = createStore<boolean>(false);

export const $step = createStore<number>(0);

export const $residencesHandbook = createStore<string[]>([]);