import React, { useState, ChangeEvent, FormEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordMessage } from './passwordValidation'; // Adjust the path as necessary

type ErrorMessages = string[];

const AuthForm: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorMessages>([]);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const isSubmitDisabled = errors.length > 0 || password === '' || confirmPassword === '';

    const validatePassword = (password: string, confirmPassword: string): ErrorMessages => {
        const newErrors: ErrorMessages = [];
        const specialChars = /[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/;

        if (password.length < 6) newErrors.push(PasswordMessage.LENGTH);
        if (!/[A-Z]/.test(password)) newErrors.push(PasswordMessage.UPPERCASE);
        if (!/[a-z]/.test(password)) newErrors.push(PasswordMessage.LOWERCASE);
        if (!/\d/.test(password)) newErrors.push(PasswordMessage.NUMBER);
        if (!specialChars.test(password)) newErrors.push(PasswordMessage.SPECIAL_CHAR);
        if (password !== confirmPassword) newErrors.push(PasswordMessage.MISMATCH);

        return newErrors;
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setErrors(validatePassword(e.target.value, confirmPassword));
    };
    
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setErrors(validatePassword(password, e.target.value));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (errors.length === 0) {
            toast.success(PasswordMessage.SUCCESS, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="password-form-container max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Password Validator</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-2 top-2 text-gray-600 focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                    </button>
                </div>

                <div className="input-group relative mb-4">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                        required
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                        className="absolute right-2 top-2 text-gray-600 focus:outline-none"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    >
                        {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                    </button>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitDisabled} 
                    className={`btn w-full p-2 text-white rounded ${isSubmitDisabled ? 'bg-gray-400' : 'bg-[#0c7ac0] hover:bg-[#085586]'}`}
                >
                    Submit
                </button>
            </form>

            <ToastContainer />
            
            {errors.length > 0 && (
                <ul className="error-list mt-4 text-red-500 list-disc pl-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AuthForm;
