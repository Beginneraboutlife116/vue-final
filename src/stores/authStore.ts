import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
	const nickname = ref('');

	const setNicknameAction = (name: string) => {
		nickname.value = name;
	};

	return { nickname, setNicknameAction };
});
