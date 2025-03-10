import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Show toast notification based on response status
 * @param {number} status - HTTP status code
 * @param {string} message - Notification message
 */
export const showToast = (status, message) => {
    if (status >= 200 && status < 300) {
        toast.success(message, { theme: "colored" });
    } else if (status >= 400 && status < 500) {
        toast.warn(message, { theme: "colored" });
    } else {
        toast.error(message, { theme: "colored" });
    }
};

export default function ToastNotification() {
    return <ToastContainer position="top-right" autoClose={3000} />;
}
