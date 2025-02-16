export function convertFiltersToSQL(filters) {
	const sqlParams = [];
	Object.entries(filters).map(([key, value]) => {
		if (typeof value === 'string') {
			sqlParams.push(`${key} = '${value}'`);
		}
	}, '');
	return sqlParams;
}


export function updateTable(obj) {
  const tableName = obj.tableName;
  const id = obj.id;
  const columns = Object.keys(obj.data);
  const values = Object.values(obj.data);

  const sql = `UPDATE ${tableName} SET `;
  const columnUpdates = columns.map((column, index) => `${column} = '${values[index]}'`).join(', ');
  sql += columnUpdates;
  sql += ` WHERE id = ${id}`;

  return sql;
}