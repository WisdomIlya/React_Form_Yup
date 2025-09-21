import * as yup from 'yup';

export const validationSchema = yup.object ({
	email: yup
	.string()
	.email('Введите корректный email адрес')
	.max(20, 'Email слишком длинный')
	.required('Email обязателен для заполнения')
	.test('no=double-dots', 'Email содержит две точки подряд', (value) => {
		return value.indexOf('..') == -1;
	}),

	password: yup
	.string()
	.min(8, 'Пароль слишком короткий')
	.required('Пароль обязателен для заполнения'),

	repeatPassword: yup
	.string()
	.required('Подтверждение пароля обязательно')
	.oneOf([yup.ref('password')], 'Пароли не совпадают')
});
