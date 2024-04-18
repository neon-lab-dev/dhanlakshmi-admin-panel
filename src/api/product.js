import axios from "axios"
import { API } from "."

export const getAllDoctors = () => {
    return new Promise((resolve, reject) => {
        axios
      .get(API.getAllDoctors, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.products);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
}

export const createProduct = (doctorData) => {
    return new Promise((resolve, reject) => {
        axios.post(API.createDoctor, doctorData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}


export const deleteDoctor = (doctorId) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API.deleteDoctor}/${doctorId}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })

    })


}

export const getDoctorDetail = (doctorId) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API.getDoctorDetail}/${doctorId}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}

export const updateDoctorDetail = (doctorData) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API.updateDoctorDetail}/${doctorData.doctorId}`, doctorData.fd, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                console.log(err);
                reject(
                    err?.response?.data?.message ||
                    "Something went wrong, please try again"
                )
            })
    })
}
