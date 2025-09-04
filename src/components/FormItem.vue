<script setup lang="ts">
interface FormItemProps {
	name: string;
}

const { name = "" } = defineProps<FormItemProps>();
const errorMessageClasses = "text-thirdary text-sm leading-none mt-1";
</script>

<template>
	<div class="grid mb-4">
		<label
			class="text-sm leading-none font-bold mb-1"
			:for="name"
		>
			<slot name="label" />
		</label>
		<slot name="input" />
		<p :class="errorMessageClasses">
			<slot name="message" />
		</p>
	</div>
</template>
