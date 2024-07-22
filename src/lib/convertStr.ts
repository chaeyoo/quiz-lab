export function convertStr(inputString: string) {
	const encodedString = encodeURIComponent(inputString).replace(/%20/g, "+");

	return `${encodedString}`;
}
