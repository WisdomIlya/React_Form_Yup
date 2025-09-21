import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./App.module.css";
import { validationSchema } from "./shemas";
import { PasswordStrengthIndicator } from "./components";
import { sendFormData } from "./api";

export const App = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		setFocus
	} = useForm ({
		resolver: yupResolver(validationSchema),
		mode: 'onChange'
	});

	const passwordValue = watch('password');
	const allFieldsFilled = watch(['email', 'password', 'repeatPassword']).every(Boolean);

	const onSubmit = (data) => {
		sendFormData(data);
	}

	useEffect(() => {
		if (isValid && allFieldsFilled) {
			const timer = setTimeout(() => {
				setFocus('submit-button');
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [isValid, allFieldsFilled, setFocus]);

	return (
		<div className={styles.formContainer}>
      		<form onSubmit={handleSubmit(onSubmit)} className={styles.formGroup}>

 			{errors.email && <div className={styles.formError}>{errors.email.message}</div>}
        	<input
          	  className={styles.formInput}
          	  type="email"
          	  placeholder="Введите почту"
          	  {...register('email')}
        	/>

			{errors.password && <div className={styles.formError}>{errors.password.message}</div>}
			<input
			  className={styles.formInput}
			  type="password"
			  placeholder="Введите пароль"
			  {...register('password')}
			/>

			{passwordValue && <PasswordStrengthIndicator password={passwordValue} />}

			{errors.repeatPassword && (
          	<div className={styles.formError}>{errors.repeatPassword.message}</div>
			)}
			<input
			  className={styles.formInput}
			  type="password"
			  placeholder="Подтвердите пароль"
			  {...register('repeatPassword')}
			/>

			<button
          	  className={styles.submitButton}
          	  type="submit"
          	  disabled={!isValid}
          	  {...register('submit-button')}
        	>
				Зарегистрироваться
			</button>
			</form>
		</div>
	)
}
