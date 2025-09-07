<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';

interface Todo {
	id: string;
	createTime: number;
	content: string;
	status: boolean;
	isEditing: boolean;
}

const ALL = 'all';
const INCOMPLETED = 'incompleted';
const COMPLETED = 'completed';

const filter = ref(ALL);
const todos = ref<Todo[]>([]);
const newTodoContent = ref('');

const filteredTodos = computed(() => {
	if (filter.value === INCOMPLETED) {
		return todos.value.filter((todo) => !todo.status);
	} else if (filter.value === COMPLETED) {
		return todos.value.filter((todo) => todo.status);
	}

	return todos.value;
});

const incompletedTodosCount = computed(() => {
	return todos.value.filter((todo) => !todo.status).length;
});

const onAddTodo = () => {
	if (!newTodoContent.value) {
		return;
	}

	const newTodo: Todo = {
		id: Date.now().toString(),
		createTime: Math.floor(Date.now() / 1000),
		content: newTodoContent.value,
		status: false,
		isEditing: false,
	};

	todos.value.push(newTodo);
	newTodoContent.value = '';
};

const onCheckTodo = (id: string) => {
	const todo = todos.value.find((todo) => todo.id === id);
	if (todo) {
		todo.status = !todo.status;
	}
};

const onEditTodo = (id: string) => {
	const todo = todos.value.find((todo) => todo.id === id);
	if (todo) {
		todo.isEditing = true;
	}
};

const onFinishEditTodo = (event: Event) => {
	const target = event.target;
	if (!(target instanceof HTMLInputElement)) {
		return;
	}
	const { name: id, value: content } = target;
	const todo = todos.value.find((todo) => todo.id === id);
	if (todo) {
		todo.content = content;
		todo.isEditing = false;
	}
};

const onDeleteTodo = (id: string) => {
	todos.value = todos.value.filter((todo) => todo.id !== id);
};

onMounted(() => {
	const fetchedTodos = [
		{
			id: '123456789',
			createTime: 1620281234,
			content: '買晚餐1',
			status: false,
		},
		{
			id: '12345679',
			createTime: 1620281234,
			content: '買晚餐2',
			status: false,
		},
		{
			id: '12345689',
			createTime: 1620281234,
			content: '買晚餐3',
			status: false,
		},
		{
			id: '12345789',
			createTime: 1620281234,
			content: '買晚餐4',
			status: true,
		},
	];

	todos.value = fetchedTodos.map((todo) => ({
		...todo,
		isEditing: false,
	}));
});
</script>

<template>
	<div class="bg-half min-h-dvh">
		<main class="max-w-[1028px] px-8 py-4 mx-auto">
			<header class="flex justify-between items-center mb-4 md:mb-10">
				<img src="@/assets/images/logo.png" alt="online todo list" class="max-w-60" />
				<div>
					<span class="hidden me-6 md:inline">使用者名稱</span>
					<button>登出</button>
				</div>
			</header>
			<section class="mx-auto max-w-[500px] max-h-dvh">
				<div class="flex mb-4 bg-white p-1 rounded-[10px] gap-1">
					<Input
						v-model.trim="newTodoContent"
						name="todo"
						class="flex-auto -my-1 -ms-1 outline-none"
						placeholder="新增待辦事項"
					/>
					<Button
						class="p-2.5"
						@click="onAddTodo"
					>
						<img src="@/assets/images/todo-plus.svg" alt="加入新的待辦事項" />
					</Button>
				</div>

				<div v-if="todos.length === 0" class="text-center mt-15">
					<span>目前尚無待辦事項</span>
					<img
						src="@/assets/images/empty.png"
						alt="目前尚無待辦事項"
						class="mt-4 mx-auto max-w-[240px]"
					/>
				</div>

				<div v-else class="bg-white rounded-[10px] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]">
					<div class="grid grid-cols-3 text-tertiary">
						<div>
							<label
								for="all"
								class="min-h-[51px] grid place-items-center border-b-2 cursor-pointer"
								:class="filter === ALL && 'border-b-secondary text-secondary'"
							>
								全部
							</label>
							<input
								v-model="filter"
								:id="ALL"
								type="radio"
								name="filter"
								:value="ALL"
								class="hidden"
							/>
						</div>

						<div>
							<label
								for="incompleted"
								class="min-h-[51px] grid place-items-center border-b-2 cursor-pointer"
								:class="filter === INCOMPLETED && 'border-b-secondary text-secondary'"
							>
								待完成
							</label>
							<input
								v-model="filter"
								:id="INCOMPLETED"
								type="radio"
								name="filter"
								:value="INCOMPLETED"
								class="hidden"
							/>
						</div>

						<div>
							<label
								for="completed"
								class="min-h-[51px] grid place-items-center border-b-2 cursor-pointer"
								:class="filter === COMPLETED && 'border-b-secondary text-secondary'"
							>
								已完成
							</label>
							<input
								v-model="filter"
								:id="COMPLETED"
								type="radio"
								name="filter"
								:value="COMPLETED"
								class="hidden"
							/>
						</div>
					</div>

					<ul class="p-[8px_16px_16px_24px]">
						<li v-for="todo in filteredTodos" :key="todo.id" class="flex items-center gap-4 border-b-1 border-b-tertiary md:border-none">
							<div class="flex flex-auto items-center gap-4 py-4 md:border-b-1 md:border-b-tertiary">
								<input
									v-show="!todo.status"
									type="checkbox"
									class="w-5 h-5 border-tertiary cursor-pointer"
									:name="todo.id"
									:checked="todo.status"
									@click="onCheckTodo(todo.id)"
								/>
								<img
									v-show="todo.status"
									class="cursor-pointer"
									src="@/assets/images/todo-checked.svg"
									alt="代辦事項已完成"
									@click="onCheckTodo(todo.id)"
								/>
								<div
									class="text-sm"
									:class="todo.status && 'text-tertiary line-through'"
									@dblclick="onEditTodo(todo.id)"
								>
									<span v-show="!todo.isEditing">{{ todo.content }}</span>
									<input
										v-show="todo.isEditing"
										:name="todo.id"
										:value="todo.content"
										@blur="onFinishEditTodo"
										@keyup.enter="onFinishEditTodo"
									/>
								</div>
							</div>
							<button @click="onDeleteTodo(todo.id)" class="cursor-pointer">
								<img src="@/assets/images/todo-delete.svg" alt="刪除這一個代辦事項" />
							</button>
						</li>
					</ul>

					<div class="p-[0px_48px_24px_24px]">
						<span>{{ incompletedTodosCount }} 個待完成項目</span>
					</div>
				</div>

			</section>
		</main>
	</div>
</template>
