export const convertToNumber = (
	value: unknown,
	defaultValue = -1,
): number => {
	if (typeof value === 'string') {
		const parsedValue = Number.parseInt(value);
		if (isNaN(parsedValue)) {
			return defaultValue;
		}
		return parsedValue;
	}
	if (typeof value === 'number') {
		return value;
	}
	return defaultValue;
};
