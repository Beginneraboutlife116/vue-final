import apiHelper from './utils';

interface SignupParams {
	email: string;
	nickname: string;
	password: string;
}

interface LoginParams {
	email: string;
	password: string;
}

const signup = (params: SignupParams) => apiHelper.post('/users/sign_up', params);

const login = (params: LoginParams) => apiHelper.post('/users/sign_in', params);

const logout = () => apiHelper.post('/users/sign_out');

const checkout = () => apiHelper.get('/users/checkout');

export { signup, login, logout, checkout, type SignupParams, type LoginParams };
