<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import { useAuthStore } from '@/stores/authStore';

import FormItem from '@/components/FormItem.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { login, type LoginParams } from '@/apis';
import {
	showErrorMessageModal,
	showSuccessToast,
	validateRequired,
} from '@/utils';

const router = useRouter();

const { setNicknameAction } = useAuthStore();

const email = ref(null);
const password = ref(null);

const errorMessages = computed(() => {
	return {
		email: validateRequired(email.value),
		password: validateRequired(password.value),
	};
});

const handleSubmit = () => {
	if (errorMessages.value.email || errorMessages.value.password) {
		showErrorMessageModal({
			title: '登入失敗',
			text: '請檢查您的輸入',
		});

		return;
	}

	if (!email.value || !password.value) {
		showErrorMessageModal({
			title: '登入失敗',
			text: '欄位不可為空',
		});

		return;
	}

	const params = {
		email: email.value,
		password: password.value,
	};

	login(params)
		.then((response) => {
			const { data } = response;

			if (!data.status) {
				throw new Error('請與客服連繫');
			}

			localStorage.setItem('token', data.token);

			setNicknameAction(data.nickname);
			showSuccessToast('登入成功');

			router.push('/todos');
		})
		.catch((error) => {
			showErrorMessageModal({
				title: '登入失敗',
				text: error.response?.data?.message || error.message,
			});
		});
};
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<FormItem name="email" class="position">
			<template #label>Email</template>
			<template #input>
				<Input
					v-model="email"
					id="email"
					type="email"
					name="email"
					placeholder="請輸入Email"
					required
				/>
			</template>
			<template #message>{{ errorMessages.email }}</template>
		</FormItem>

		<FormItem name="password">
			<template #label>密碼</template>
			<template #input>
				<Input
					v-model="password"
					id="password"
					type="password"
					name="password"
					placeholder="請輸入密碼"
					required
				/>
			</template>
			<template #message>{{ errorMessages.password }}</template>
		</FormItem>

		<div class="grid justify-center pt-[11px] gap-6 text-center">
			<Button type="submit">登入</Button>
			<RouterLink class="font-bold leading-none" to="signup">註冊帳號</RouterLink>
		</div>
	</form>
</template>
