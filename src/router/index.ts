import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHashHistory } from 'vue-router';

import { checkout } from '@/apis';
import { showErrorToast } from '@/utils';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('@/views/home/HomeView.vue'),
			children: [
				{
					path: '',
					component: () => import('@/views/home/LoginView.vue'),
				},
				{
					path: '/signup',
					name: 'signup',
					component: () => import('@/views/home/SignupView.vue'),
				},
			],
		},
		{
			path: '/todos',
			name: 'todos',
			component: () => import('@/views/TodosView.vue'),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: () => import('@/views/NotFoundView.vue'),
		},
	],
});

router.beforeEach((to) => {
	const token = localStorage.getItem('token');

	if (token) {
		const authStore = useAuthStore();

		return checkout().then((response) => {
			const { nickname } = response.data;
			authStore.setNicknameAction(nickname);

			if (to.name !== 'todos') {
				return '/todos';
			}
		}).catch(() => {
			localStorage.removeItem('token');

			showErrorToast('請重新登入')

			return {
				path: '/',
				replace: true
			};
		});
	} else if (to.name === 'todos') {
		showErrorToast('請先登入')

		return {
			path: '/',
			replace: true
		};
	}
});

export default router;
