import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from './authform';
import { ToastContainer } from 'react-toastify';

jest.mock('react-toastify', () => ({
    ToastContainer: () => <div data-testid="toast-container" />,
    toast: {
        success: jest.fn(),
    },
}));

describe('AuthForm', () => {
    beforeEach(() => {
        render(<AuthForm />);
    });

    it('renders the form with password fields', () => {
        expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('updates password input value', () => {
        const passwordInput = screen.getByPlaceholderText('Enter password') as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        expect(passwordInput.value).toBe('Password123!');
    });

    it('updates confirm password input value', () => {
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement; 
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
        expect(confirmPasswordInput.value).toBe('Password123!');
    });

    it('displays validation messages for short password', () => {
        const passwordInput = screen.getByPlaceholderText('Enter password') as HTMLInputElement; 
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement;

        fireEvent.change(passwordInput, { target: { value: 'short' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    });

    it('displays validation messages for mismatched passwords', () => {
        const passwordInput = screen.getByPlaceholderText('Enter password') as HTMLInputElement; 
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement; 

        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Different123!' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });

    it('displays success toast on successful submission', () => {
        const passwordInput = screen.getByPlaceholderText('Enter password') as HTMLInputElement; 
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm password') as HTMLInputElement; 

        fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password123!' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(screen.queryByText(/passwords do not match/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
        expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    });

    it('disables submit button when inputs are invalid', () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });
        expect(submitButton).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'Pass' } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'Pass' } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'Password123!' } });
        expect(submitButton).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'DifferentPassword!' } });
        expect(submitButton).toBeDisabled();
    });

    it('enables submit button when inputs are valid', () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(screen.getByPlaceholderText('Enter password'), { target: { value: 'Password123!' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'Password123!' } });

        expect(submitButton).toBeEnabled();
    });
});
