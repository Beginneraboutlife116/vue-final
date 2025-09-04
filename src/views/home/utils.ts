function validateRequired(
	value: string | null,
	customRuleFunction?: (value: string | null) => string,
): string {
	if (typeof customRuleFunction === 'function') {
		return customRuleFunction(value);
	}

	if (value !== null) {
		if (value === '') {
			return '此欄位不可為空';
		}
	}

	return '';
}

export { validateRequired };
