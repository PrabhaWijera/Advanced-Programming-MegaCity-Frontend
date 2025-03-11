export const validateCarData = (data, showToast) => {
    if (!data.name || data.name.length < 2) {
        showToast(400, "Car name must be at least 2 characters long! ❌");
        return false;
    }

    if (!data.model || data.model.length < 2) {
        showToast(400, "Car model must be at least 2 characters long! ❌");
        return false;
    }

    const platePattern = /^[A-Z0-9-]+$/i; // Allows letters, numbers, and dashes
    if (!data.plateNumber || !platePattern.test(data.plateNumber)) {
        showToast(400, "Please enter a valid plate number! ❌");
        return false;
    }

    const currentYear = new Date().getFullYear();
    if (!data.year || isNaN(data.year) || data.year < 1900 || data.year > currentYear) {
        showToast(400, `Year must be between 1900 and ${currentYear}! ❌`);
        return false;
    }

    if (!data.status) {
        showToast(400, "Car status is required! ❌");
        return false;
    }

    return true;
};
