<script setup lang="ts">
import { computed } from 'vue';

import { twMerge } from 'tailwind-merge';

interface ButtonProps {
	class?: string;
}

const { class: className } = defineProps<ButtonProps>();

const buttonClasses = computed(() => {
	return twMerge(
		'py-3 px-12 bg-secondary text-white leading-none rounded-[10px] cursor-pointer',
		className,
	);
});
</script>

<template>
	<button :class="buttonClasses">
		<slot />
	</button>
</template>
