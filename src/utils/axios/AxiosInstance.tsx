import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8090'
      : 'https://test.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

AxiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response == null) {
      return;
    }
    const originalRequest = error.response?.config;
    if (error.response?.status == 777 && !originalRequest._retry) {
      originalRequest._retry = true; // 똑같은 api를 2번째 실행중인지 체크하는 용도로 사용
    } else if (error.response?.status == 888) {
   
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
