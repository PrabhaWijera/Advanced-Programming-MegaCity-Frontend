// validation.js

// Name validation (must be at least 3 characters)
export const validateName = (name) => {
    return name && name.length >= 3;
};

// Email validation (basic regex for email format)
export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

// Message validation (must be at least 10 characters)
export const validateMessage = (message) => {
    return message && message.length >= 10;
};
