<script setup lang="ts">
const model = defineModel();
</script>

<template>
	<input
		v-model="model"
		class="rounded-[10px] py-3 px-4 bg-white leading-none"
	/>
</template>
