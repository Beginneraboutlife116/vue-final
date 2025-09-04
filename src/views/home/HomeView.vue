<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
	<main>
		<div class="flex flex-col items-center px-8 py-12 mx-auto max-w-[796px] md:px-0 md:pt-[88px] md:flex-row md:justify-between md:items-stretch">
			<section class="max-w-[386px]">
				<img src="@/assets/images/logo.png" alt="online todo list" />
				<img src="@/assets/images/main.png" alt="" class="hidden mt-4 sm:block" />
			</section>

			<section class="min-w-[304px]">
				<h1 class="font-bold text-xl leading-none mt-4 mb-8 text-center sm:text-2xl">
					最實用的線上代辦事項服務
				</h1>

				<RouterView />
			</section>
		</div>
	</main>
</template>
