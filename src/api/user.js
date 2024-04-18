import axios from "axios";
import { API } from ".";

export const getUserDetails = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.userDetails, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.leads);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};


export const getsellerDetails = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.userDetails, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.users);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};


export const getConnectedUserDetails = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.connectedUserDetails, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.users);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};

export const updateStatus = (_id) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.userStatus}/`+_id, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.users);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};
