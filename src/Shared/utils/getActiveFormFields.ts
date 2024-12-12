export function getActiveFormFields<T extends Record<string, unknown> >(fields: T) {
	const activeFields = Object.fromEntries(
		Object.entries(fields)
			.filter(([, value]) => value),
	);
	return activeFields;
}
