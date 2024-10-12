import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the type for errors as an array of strings
type ErrorMessages = string[];

const AuthForm: React.FC = () => {
    // State hooks for password inputs
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorMessages>([]);

    // Determine if the submit button should be disabled
    const isSubmitDisabled = errors.length > 0 || password === '' || confirmPassword === '';

    // Validation logic 
    const validatePassword = (password: string, confirmPassword: string): ErrorMessages => {
        const newErrors: ErrorMessages = [];
        const specialChars = /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/;

        if (password.length < 6) newErrors.push('Password must be at least 6 characters.');
        if (!/[A-Z]/.test(password)) newErrors.push('Password must contain at least one uppercase character.');
        if (!/[a-z]/.test(password)) newErrors.push('Password must contain at least one lowercase character.');
        if (!/\d/.test(password)) newErrors.push('Password must contain at least one number.');
        if (!specialChars.test(password)) newErrors.push('Password must contain at least one special character.');
        if (password !== confirmPassword) newErrors.push('Passwords do not match.');

        return newErrors;
    };

    // Handle input changes and live validate
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrors(validatePassword(e.target.value, confirmPassword));
    };
    
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setErrors(validatePassword(password, e.target.value));
    };

    // Handle form submission
    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (errors.length > 0) {
            return; // Additional verification return if there are validation errors
        }
        console.log('Password validated and form submitted!');
    };

    return (
        <div className="password-form-container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                </div>
                <button type="submit" disabled={isSubmitDisabled}>Submit</button>
            </form>
            {errors.length > 0 && (
                <ul className="error-list">
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AuthForm;
