import React, { useState, ChangeEvent, FormEvent } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordMessage } from './passwordValidation';

type ErrorMessages = string[];

const OnClickValidationForm: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<ErrorMessages>([]);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

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
    };
    
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const newErrors = validatePassword(password, confirmPassword);
        setErrors(newErrors);

        if (newErrors.length === 0) {
            toast.success(PasswordMessage.SUCCESS, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(PasswordMessage.FAIL, {
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
        <div className="flex justify-center h-screen">
            <div className="bg-white rounded-lg w-128 mt-[14%]"> 
                <div className="password-form-container max-w-md mx-auto rounded">
                    <h1>Password Validator</h1>
                    <h2 className="text-lg text-gray-600 mb-4">Please enter and confirm your password to continue </h2>
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
                                tabIndex={-1}
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
                                tabIndex={-1}
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
                            className={`btn w-full p-2 text-white rounded btnmod bg-[#0c7ac0] hover:bg-[#085586]}`}
                        >
                            Submit
                        </button>
                    </form>

                    <ToastContainer />
                    
                    {errors.length > 0 && (
                        <ul className="error-list mt-4 list-disc pl-5">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OnClickValidationForm;
