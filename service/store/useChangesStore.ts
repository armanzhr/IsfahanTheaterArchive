import { Changes } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";
import axiosInstance from "../axiosInstance";

interface ChangesStore {
  preLoading: boolean;
  setPreLoading: (status: boolean) => void;
  isGettingChanges: Boolean;
  changesList: Changes[] | null;
  getChangesList: () => Promise<void>;
  showChanges: Changes | null;
  getShowChanges: (showID: number) => Promise<void>;
  approveChange: (reqID: number) => Promise<void>;
  declineChange: (reqID: number) => Promise<void>;
}
export const useChangesStore = create<ChangesStore>((set) => ({
  preLoading: true,
  setPreLoading: (status) => set({ preLoading: status }),

  isGettingChanges: false,
  changesList: null,
  getChangesList: async () => {
    set({ isGettingChanges: true });
    try {
      const { data } = await axiosInstance.get("/ChangeRequest");
      set({ changesList: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingChanges: false });
    }
  },
  showChanges: null,
  getShowChanges: async (showID) => {
    try {
      const { data } = await axiosInstance.get("/ChangeRequest" + showID);
      set({ changesList: data });
    } catch (error) {
      throw error;
    }
  },
  approveChange: async (reqID) => {
    try {
      const { data } = await axiosInstance.post(
        "/ChangeRequest/Approve/" + reqID,
        null
      );
      await useChangesStore.getState().getChangesList();
    } catch (error) {
      throw error;
    }
  },
  declineChange: async (reqID) => {
    try {
      const { data } = await axiosInstance.post(
        "/ChangeRequest/Decline/" + reqID,
        null
      );
      await useChangesStore.getState().getChangesList();
    } catch (error) {
      throw error;
    }
  },
}));
