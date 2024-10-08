import config from "@/config";
import axios from "axios";
import { getCookie } from "cookies-next";

// ساخت یک نمونه از axios
const axiosInstance = axios.create({
  baseURL: config.baseURL, // آدرس پایه API
});

// اضافه کردن یک interceptor برای درخواست‌ها
axiosInstance.interceptors.request.use(
  (config) => {
    // خواندن توکن از کوکی
    const token = getCookie("auth_token"); // فرض کنیم که توکن با نام 'token' در کوکی ذخیره شده

    // اگر توکن وجود داشت، آن را به هدر Authorization اضافه کن
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // در صورت بروز خطا در interceptor
    return Promise.reject(error);
  }
);

export default axiosInstance;
