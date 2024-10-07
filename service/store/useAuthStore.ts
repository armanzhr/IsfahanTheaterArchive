import { Media, MediaModel, SelectedFile, Users } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";

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
  isGettingUsers: Boolean;
  users: Users[] | null;
  getUsers: () => Promise<void>;
  createUser: (model: {
    username: string;
    password: string;
    roles: string[];
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  updateUser: (
    userID: number,
    model: {
      firstName: string;
      lastName: string;
      newPassword: string;
    }
  ) => void;
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
      const token = getCookie("auth_token");
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
  isGettingUsers: false,
  users: null,
  getUsers: async () => {
    set({ isGettingUsers: true });
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.get(config.baseURL + "/Auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ users: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingUsers: false });
    }
  },
  createUser: async (model) => {
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.post(
        config.baseURL + "/Auth/register",
        model,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userID, model) => {
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.put(
        config.baseURL + "/Auth/update/" + userID,
        model,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
}));
