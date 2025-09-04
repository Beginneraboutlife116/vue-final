import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/home/HomeView.vue'),
			children: [
				{
					path: '',
					component: () => import('../views/home/LoginView.vue'),
				},
				{
					path: '/signup',
					name: 'signup',
					component: () => import('../views/home/SignupView.vue'),
				},
			],
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('../views/NotFoundView.vue'),
		},
	],
});

export default router;
