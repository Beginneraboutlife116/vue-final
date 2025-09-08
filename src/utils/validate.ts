function validateRequired(value: string | null): string {
	if (value !== null) {
		if (value === '') {
			return '此欄位不可為空';
		}
	}

	return '';
}

export { validateRequired };
