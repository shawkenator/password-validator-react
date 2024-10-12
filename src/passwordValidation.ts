export enum PasswordMessage {
    LENGTH = 'Password must be at least 6 characters.',
    UPPERCASE = 'Password must contain at least one uppercase character.',
    LOWERCASE = 'Password must contain at least one lowercase character.',
    NUMBER = 'Password must contain at least one number.',
    SPECIAL_CHAR = 'Password must contain at least one special character.',
    MISMATCH = 'Passwords do not match.',
    SUCCESS = 'Password validated and form submitted successfully!',
    FAIL = 'Please ensure your password meets the criteria.'
}
