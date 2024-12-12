export function convertFiltersToSQL(filters) {
	const sqlParams = [];
	Object.entries(filters).map(([key, value]) => {
		if (typeof value === 'string') {
			sqlParams.push(`${key} = '${value}'`);
		}
	}, '');
	return sqlParams;
}
