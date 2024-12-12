export default function getUrlSearchParams(url: string, params?: string[][]) {
	const filterParametrs = params?.filter((element) => element[1]) || [];
	return `${url}?${new URLSearchParams(filterParametrs)}`;
}
