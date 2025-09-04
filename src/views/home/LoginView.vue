<script setup lang="ts">
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

import FormItem from '@/components/FormItem.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

import { validateRequired } from './utils';

const email = ref(null);
const password = ref(null);

const errorMessages = computed(() => {
	return {
		email: validateRequired(email.value),
		password: validateRequired(password.value),
	};
});

const handleSubmit = () => {
	console.log({ email: email.value, password: password.value });
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
