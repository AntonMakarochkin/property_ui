/**
 * Возвращает указатель на стейт, если payload
 * идентичен state. В остальных случаях
 * возвращает указатель на payload.
 */
export default function getPayloadIfChanged<T>(state: T, payload: T): T {
	if (JSON.stringify(state) === JSON.stringify(payload)) return state;
	return payload;
}
