<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
	<h1>Vue Final</h1>
	<RouterLink to="login">Go to Test</RouterLink> |
	<RouterLink to="signup">Go to Test</RouterLink>

	<RouterView />
</template>
