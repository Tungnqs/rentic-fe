import { toast } from "react-toastify";
import { ENotificationType } from "../enum";

/**
 * Get the background color for notification (use in styled component)
 * @param {ENotificationType | undefined} type - Notification type
 * @returns {string}
 */
const getNotificationBg = (type: ENotificationType | undefined): string => {
  if (type === ENotificationType.Success) return "var(--green)";
  if (type === ENotificationType.Warning) return "var(--orange)";
  if (type === ENotificationType.Error) return "var(--red)";
  return "var(--gray)";
};

export { getNotificationBg };

export const checkErr = (err: any) => {
  if (err.response.data.message) {
    toast.error(`${err.response.data.message}`);
  } else if (err.response.data.error) {
    toast.error(`${err.response.data.error}`);
  } else {
    toast.error(`${err.response.data.errors[0].msg}`);
  }
};
