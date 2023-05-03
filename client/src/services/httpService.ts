import { notification } from "antd";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => {
    if (res.data.message){
    notification.success({
      message: res.data.message
    })}
    return res
  },
  (error) => {
    if (error.response.data.message){
    notification.error({
      message: error.response.data.message,
      placement: "topRight"
    })}
    return Promise.reject(error);
  }
);

const httpService = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete,
};

export default httpService;
