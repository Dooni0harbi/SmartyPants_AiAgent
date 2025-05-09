

import { toast } from "react-toastify";

export const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastErrorNotify = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};

export const toastWarnNotify = (msg) => {
  toast.warn(msg, {
    position: "top-right",
    autoClose: 3000,
  });
};
