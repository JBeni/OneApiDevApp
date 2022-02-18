import { toast } from "react-hot-toast";

export const notifyToastError = (message) => {
    toast.error(message, {
        position: 'bottom-center',
        duration: 5000,
    });
}
