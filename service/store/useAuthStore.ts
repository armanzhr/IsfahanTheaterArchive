import { Media, MediaModel, SelectedFile } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";

interface AuthStore {
  authLoading: boolean;
  loginUser: (user: { username: string; password: string }) => Promise<{
    access: string;
    isSucceed: boolean;
    message: string;
    roles: string[];
  }>;
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
}));
