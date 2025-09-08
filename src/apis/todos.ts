import apiHelper from './utils';

const createTodo = (content: string) => apiHelper.post('/todos', { content });

const getTodos = () => apiHelper.get('/todos');

const updateTodo = (id: string, content: string) => apiHelper.put(`/todos/${id}`, { content });

const updateTodoStatus = (id: string) => apiHelper.patch(`/todos/${id}/toggle`);

const deleteTodo = (id: string) => apiHelper.delete(`/todos/${id}`);

export { getTodos, createTodo, updateTodo, updateTodoStatus, deleteTodo };
