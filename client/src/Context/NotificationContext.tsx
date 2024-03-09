import { createContext, useState } from "react";
const NotificationContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const NotificationState = (props: any) => {
  const [notifications, setNotifications] = useState([] as any);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const toastMessage = (message: string, type: string) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else if (type === "warning") toast.warning(message);
    else toast.info(message);
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${url}/api/schedule/getnotifications`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token") as string,
        },
      });
      const data = await res.json();
      if (data.success) {
        setNotifications(data.notifications);
      } else {
        toastMessage(data.message, "error");
      }
    } catch (err) {
      console.log(err);
      toastMessage("Server Error", "error");
    }
  };

  return (
    <NotificationContext.Provider
      value={{ toastMessage, fetchNotifications, notifications, screenStream, setScreenStream }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
export { NotificationState };
