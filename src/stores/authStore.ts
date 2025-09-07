import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
	status: boolean;
	exp: number;
	token: string;
	nickname: string;
}

export const useAuthStore = defineStore('auth', () => {
	const user = ref<User | null>(null);

	const setUserAction = (userData: User) => {
		user.value = userData;
	}

	return { user, setUserAction };
});
