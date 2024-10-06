import { Media, MediaModel, SelectedFile } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";

const token = getCookie("auth_token");

interface AuthStore {
  authLoading: boolean;
  preLoading: boolean;
  setPreLoading: (status: boolean) => void;
  loginUser: (user: { username: string; password: string }) => Promise<{
    access: string;
    isSucceed: boolean;
    message: string;
    roles: string[];
  }>;
  userInfo: {
    id: 0;
    userName: string;
    firstName: string;
    lastName: string;
    roles: string[];
  } | null;
  getUserInfo: () => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set) => ({
  authLoading: false,
  loginUser: async (user) => {
    set({ authLoading: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Auth/Login", user);
      set({ authLoading: false });

      return data;
    } catch (error) {
      set({ authLoading: false });
      throw error;
    }
  },
  preLoading: true,
  setPreLoading: (status) => set({ preLoading: status }),
  userInfo: null,
  getUserInfo: async () => {
    try {
      const { data } = await axios.get(config.baseURL + "/Auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ userInfo: data });
    } catch (error) {
      throw error;
    }
  },
}));
