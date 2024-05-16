import axios from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/admin/get-me',
    login: '/admin/auth/login',
    logout: '/admin/auth/logout',
  },
  service: {
    list: '/admin/service/list',
    detail: '/admin/service/detail',
    new: '/admin/service/new',
    root: '/admin/service',
  },
  extraService: {
    list: '/admin/extra-service/list',
    detail: '/admin/extra-service/detail',
    new: '/admin/extra-service/new',
    root: '/admin/extra-service',
  },
  booking: {
    list: '/admin/booking/list',
    detail: '/admin/booking/detail',
    root: '/admin/booking',
  },
  package: {
    list: '/admin/package/list',
    detail: '/admin/package/detail',
    new: '/admin/package/new',
    root: '/admin/package',
  },
  houseWorker: {
    list: '/admin/house-worker/list',
    detail: '/admin/house-worker/detail',
    new: '/admin/house-worker/new',
    root: '/admin/house-worker',
  }
};
