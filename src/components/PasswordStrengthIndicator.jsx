import styles from './passwordStrengthIndicator.module.css';

export const PasswordStrengthIndicator = ({ password }) => {
	const calculateStrength = (password) => {
		if (!password) return { width: 0, strength: '' }

		let strength = 0;

		if (password.length >= 8) strength += 2;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[^a-zA-Z\d]/.test(password)) strength += 2;

		if (strength <=2 ) return { width: 33, strength: 'weak'};
		else if (strength <=5 ) return { width: 66, strength: 'medium'};
		else return { width: 100, strength: 'strong'};
	}

	const strengthData = calculateStrength(password);

	if (!password) return null;

	return (
		<div className={styles.passwordStrength}>
			<div
				className={`${styles.strengthFill} ${styles[strengthData.strength]}`}
				style={{ width: `${strengthData.width}%` }}
			/>
		</div>
	);
};
