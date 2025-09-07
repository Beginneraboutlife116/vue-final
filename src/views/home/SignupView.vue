<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import FormItem from '@/components/FormItem.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { signup, type SignupParams } from '@/apis';
import { validateRequired } from './utils';

const router = useRouter();

const email = ref(null);
const nickname = ref(null);
const password = ref(null);
const confirmPassword = ref(null);

const errorMessages = computed(() => {
	const confirmPasswordErrorMessage = (() => {
		if (confirmPassword.value !== null) {
			if (confirmPassword.value === '') {
				return '此欄位不可為空';
			}

			if (confirmPassword.value !== password.value) {
				return '密碼不一致';
			}
		}

		return '';
	})();

	return {
		email: validateRequired(email.value),
		nickname: validateRequired(nickname.value),
		password: validateRequired(password.value),
		confirmPassword: confirmPasswordErrorMessage,
	};
});

const handleSubmit = () => {
	if (errorMessages.value.email || errorMessages.value.nickname || errorMessages.value.password || errorMessages.value.confirmPassword) {
		return;
	}

	if (!email.value || !nickname.value || !password.value) {
		Swal.fire({
			icon: 'error',
			title: '註冊失敗',
			text: '欄位不可為空',
		});

		return;
	}

	const params = {
		email: email.value,
		nickname: nickname.value,
		password: password.value,
	}

	signup(params).then(() => {
		Swal.fire({
			icon: 'success',
			title: '註冊成功',
			showConfirmButton: false,
			timer: 1500,
			toast: true,
			position: 'top-end'
		})

		router.push('/');
	}).catch((error) => {
		const errorMessage = error?.response?.data?.message || '發生未知錯誤，請稍後再試';
		Swal.fire({
			icon: 'error',
			title: '註冊失敗',
			text: errorMessage,
		})
	});
};
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<FormItem name="email">
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

		<FormItem name="nickname">
			<template #label>您的暱稱</template>
			<template #input>
				<Input
					v-model.trim="nickname"
					id="nickname"
					name="nickname"
					placeholder="請輸入暱稱"
					required
				/>
			</template>
			<template #message>{{ errorMessages.nickname }}</template>
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

		<FormItem name="confirmPassword">
			<template #label>再次輸入密碼</template>
			<template #input>
				<Input
					v-model="confirmPassword"
					id="confirmPassword"
					type="password"
					name="confirmPassword"
					placeholder="請再次輸入密碼"
					required
				/>
			</template>
			<template #message>{{ errorMessages.confirmPassword }}</template>
		</FormItem>

		<div class="grid justify-center pt-[11px] gap-6 text-center">
			<Button type="submit">註冊帳號</Button>
			<RouterLink class="font-bold leading-none" to="/">登入</RouterLink>
		</div>
	</form>
</template>
