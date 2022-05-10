import {
  REQUEST_USER_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  RECEIVE_ADMIN_DETAILS,
  REQUEST_RESET_PASSWORD,
} from "./type";

import history from "../../Utility/history";
import { adminRoute as admin, publicRoutes } from "../../Route/Route";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

import {
  loginIn,
  Logout,
  AdminProfile,
  PaswwordRestEmail,
  ResetCurrentpassword,
  refreshToken,
} from "../../Utility/Services/ServiceApi";

const cookies = new Cookies();

export const requestSignIn = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_USER_LOGIN, payload: true });
    const { data } = await loginIn(payload);
    if (data.success) {
      cookies.set("accessToken", data.token, { path: "/" });
      if (payload.status === true) {
        cookies.set("email", payload.email);
        cookies.set("pass", payload.password);
      }

      history.push(admin.DASHBOARD);

      dispatch({ type: REQUEST_LOGIN_SUCCESS, payload: data.token });
    } else if (data.statuscode === 202) {
      dispatch({ type: REQUEST_USER_LOGIN, payload: false });
      toast.error(data.message, {
        position: "top-left",
        toastId: "1",
        autoClose: 1500,
        theme: "colored",
      });
    }
  } catch ({
    response: {
      data: { message },
    },
  }) {
    toast.error("Something went wrong", {
      position: "top-left",
      toastId: "1",
      autoClose: 1500,
      theme: "colored",
    });

    dispatch({ type: REQUEST_USER_LOGIN, payload: false });
  }
};

export const requestLogout = () => async (dispatch) => {
  try {
    const token = cookies.get("accessToken");
    const { data } = await Logout();
    cookies.remove("accessToken", { path: "/" });
    history.push(publicRoutes.LANDING);
  } catch ({
    response: {
      data: { message },
    },
  }) {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      theme: "colored",
    });
  }
};

export const requestAdminProfile = () => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_USER_LOGIN, payload: true });

    const token = cookies.get("accessToken");
    const {
      data: { data },
    } = await AdminProfile();

    dispatch({ type: RECEIVE_ADMIN_DETAILS, payload: data });
  } catch (err) {
    if (err.response?.status === 401) {
      toast.error("Session expired", {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
      history.push(publicRoutes.LANDING);
      cookies.remove("accessToken", { path: "/" });
    } else if (err.response?.status === 500) {
      window.alert("Something went wrong.");
      window.location.reload();
    }

    dispatch({ type: RECEIVE_ADMIN_DETAILS, payload: false });
  }
};

export const requestPaswwordRestEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_RESET_PASSWORD, payload: true });
    const { data } = await PaswwordRestEmail(payload);

    if (data.status) {
      dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
      toast.success(data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
      history.push(publicRoutes.LANDING);
    } else {
      dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
      toast.error(data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    }
  } catch ({
    response: {
      data: { message },
    },
  }) {
    dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
    toast.error(message, {
      position: "top-left",
      autoClose: 2000,
      theme: "colored",
      toastId: "1",
    });
  }
};

export const requestResetCurrentpassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_RESET_PASSWORD, payload: true });
    const { data } = await ResetCurrentpassword(payload);

    if (data.status) {
      dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
      toast.success(data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
      history.push(publicRoutes.LANDING);
    } else {
      dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
      toast.error(data.message, {
        position: "top-left",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    }
  } catch ({
    response: {
      data: { message },
    },
  }) {
    dispatch({ type: REQUEST_RESET_PASSWORD, payload: false });
    toast.error(message, {
      position: "top-left",
      autoClose: 2000,
      theme: "colored",
      toastId: "1",
    });
  }
};
