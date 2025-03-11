export const validateUserData = (userData, showToast) => {
    if (!userData.username || userData.username.length < 3) {
        showToast(400, "Username must be at least 3 characters long! ❌");
        return false;
    }

    if (!userData.password || userData.password.length < 6) {
        showToast(400, "Password must be at least 6 characters long! ❌");
        return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailPattern.test(userData.email)) {
        showToast(400, "Please enter a valid email address! ❌");
        return false;
    }

    const phonePattern = /^0\d{9}$/; // Ensures the number starts with '0' and has 10 digits
    if (!userData.phone || !phonePattern.test(userData.phone)) {
        showToast(400, "Please enter a valid phone number (e.g., 0760368019)! ❌");
        return false;
    }


    if (!userData.role) {
        showToast(400, "Role is required! ❌");
        return false;
    }

    return true;
};
