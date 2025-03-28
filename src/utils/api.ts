import axios from "axios";
import { store } from "@/redux/store";
import { setAccessToken, clearAccessToken } from "@/redux/authSlice";
import { refreshToken } from "@/utils/auth";

const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === "/users/refresh_token") {
        store.dispatch(clearAccessToken());
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        store.dispatch(setAccessToken(newAccessToken));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (tokenRefreshError) {
        console.error("Token refresh failed", tokenRefreshError);
        store.dispatch(clearAccessToken());
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
