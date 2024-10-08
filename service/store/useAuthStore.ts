import { Media, MediaModel, SelectedFile, Users } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";
import axiosInstance from "../axiosInstance";

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
  ) => Promise<void>;
  disableUser: (userID: number) => Promise<void>;
  activeUser: (userID: number) => Promise<void>;
}
export const useAuthStore = create<AuthStore>((set) => ({
  authLoading: false,
  loginUser: async (user) => {
    set({ authLoading: true });
    try {
      const { data } = await axiosInstance.post(
        config.baseURL + "/Auth/Login",
        user
      );
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
      const { data } = await axiosInstance.get(config.baseURL + "/Auth/me");
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
      const { data } = await axiosInstance.get(config.baseURL + "/Auth/users");
      set({ users: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingUsers: false });
    }
  },
  createUser: async (model) => {
    try {
      const { data } = await axiosInstance.post(
        config.baseURL + "/Auth/register",
        model
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
  updateUser: async (userID, model) => {
    try {
      const { data } = await axiosInstance.put(
        config.baseURL + "/Auth/update/" + userID,
        model
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
  disableUser: async (userID) => {
    try {
      const { data } = await axiosInstance.put(
        config.baseURL + "/Auth/disable/" + userID,
        null
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
  activeUser: async (userID) => {
    try {
      const { data } = await axiosInstance.put(
        config.baseURL + "/Auth/active/" + userID,
        null
      );
      await useAuthStore.getState().getUsers();
    } catch (error) {
      throw error;
    }
  },
}));
