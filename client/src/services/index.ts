import axios from 'axios';

const axiosConfig = {
   baseURL: 'http://localhost:5000',
   headers: {
      'Cache-Control': 'no-cache',
   },
   timeout: 150000000,
};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;

export const setAuthToken = (token: string) => {
   if (token)
      axiosInstance.defaults.headers.common[
         'Authorization'
      ] = `Bearer ${token}`;
   else delete axiosInstance.defaults.headers.common['Authorization'];
};
