import Swal from 'sweetalert2';
import { useAuthStore } from '@/stores/authStore';
import { createRouter, createWebHashHistory } from 'vue-router';

import { checkout } from '@/apis';

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

		checkout()
			.then((response) => {
				const { nickname } = response.data;
				authStore.setNicknameAction(nickname);

				if (to.name !== 'todos') {
					router.push('/todos');
				}
			})
			.catch(() => {
				Swal.fire({
					icon: 'error',
					title: '請重新登入',
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 1500,
					timerProgressBar: true,
				});

				router.replace('/');
			});
	} else if (to.name === 'todos') {
		Swal.fire({
			icon: 'error',
			title: '請先登入',
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 1500,
			timerProgressBar: true,
		});

		router.replace('/');
	}
});

export default router;
