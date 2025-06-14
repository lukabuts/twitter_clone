import { useMessageStore } from "@/stores";
import { XIcon } from "lucide-react";

const NotificationCard = () => {
  const { notifications, dismissMessage } = useMessageStore();

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed z-50 sm:top-16 max-sm:bottom-4 sm:max-w-sm w-full sm:right-8 space-y-3 overflow-hidden pb-3 px-1">
      {notifications
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((notification) => {
          const { id, success, message } = notification;
          return (
            <div
              className="w-full sm:animate-slideInFromRight animate-popUp transition-all shadow-2xs sm:-right-full -bottom-full"
              role="alert"
              key={id}
            >
              <div
                className={`${
                  success
                    ? "bg-teal-100 text-teal-900"
                    : "bg-red-100 text-red-900"
                } rounded px-4 py-3 relative shadow-md dark:shadow-gray-700 max-sm:shadow-none max-sm:w-11/12 max-sm:mx-auto overflow-hidden`}
              >
                {/* Timeout */}
                <div
                  className={`${
                    success ? "bg-teal-500" : "bg-red-500"
                  } absolute h-1 top-0 left-0 animate-widthnone`}
                ></div>
                {/* Delete Message */}
                <div className="absolute top-2 right-2">
                  <button onClick={() => dismissMessage(id)}>
                    <XIcon className="size-5" />
                  </button>
                </div>
                {/* Content */}
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className={`${
                        success ? "text-teal-500" : "text-red-500"
                      } fill-current h-6 w-6 mr-4`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold capitalize">
                      {success ? "Success" : "Error"}
                    </p>
                    <p className="text-sm">{message}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NotificationCard;
