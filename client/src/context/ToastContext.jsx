import { createContext, useContext, useState } from "react";

import { MdDone } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import { BsInfoLg } from "react-icons/bs";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
const Toast = ({ message, type, onClose }) => {
  const textColor = {
    success: "text-green-500",
    error: "text-red-500",
    info: "text-blue-500",
  }[type];

  return (
    <div
      className={`${textColor} bg-white shadow-[4px_2px_2px_0]/30 px-4 py-2 rounded-md  flex flex-col `}
    >
      <div className="flex items-center justify-between w-full border-b-2   mb-2 min-w-[250px]">
        <h1 className="font-volgue font-[600] ">Raafest</h1>
        <button
          onClick={onClose}
          className="ml-4  text-2xl "
        >
          &times;
        </button>
      </div>
      <div>
        <div className="flex items-center justify-start">
          {type === "success" && (
            <MdDone className="text-4xl mr-2 p-2 bg-green-500/15 rounded-md box-border " />
          )}
          {type === "error" && (
            <MdErrorOutline className="text-4xl mr-2 p-2 bg-red-500/15 rounded-md box-border " />
          )}
          {type === "info" && (
            <BsInfoLg className="text-4xl mr-2 p-2 bg-blue-500/15 rounded-md box-border " />
          )}
          <span className="font-medium tracking-wide">{message}</span>
        </div>
      </div>
    </div>
  );
};
