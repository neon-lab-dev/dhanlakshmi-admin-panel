import axios from "axios";
import { API } from ".";

export const getAllBlog = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.allBlogs, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data?.products || []);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};

export const createBlog = ({ data }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API.createBlog, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message || "Login failed, please try again"
        );
      });
  });
};

export const deleteBlog = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.Blog}/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Error deleting blog, please try again"
        );
      });
  });
};
export const updateBlog = ({ id, data }) => {
  console.log("data", id);
  return new Promise((resolve, reject) => {
    axios
      .put(`${API.Blog}/${id}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res.data.message || "Blog updated successfully");
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Error deleting blog, please try again"
        );
      });
  });
};
