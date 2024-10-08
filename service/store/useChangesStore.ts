import { Changes } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";

interface ChangesStore {
  preLoading: boolean;
  setPreLoading: (status: boolean) => void;
  isGettingChanges: Boolean;
  changesList: Changes[] | null;
  getChangesList: () => Promise<void>;
  showChanges: Changes | null;
  getShowChanges: (showID: number) => Promise<void>;
  approveChange: (showID: number) => Promise<void>;
  declineChange: (showID: number) => Promise<void>;
}
export const useChangesStore = create<ChangesStore>((set) => ({
  preLoading: true,
  setPreLoading: (status) => set({ preLoading: status }),

  isGettingChanges: false,
  changesList: null,
  getChangesList: async () => {
    set({ isGettingChanges: true });
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.get(config.baseURL + "/ChangeRequest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = getCookie("auth_token");
      const { data } = await axios.get(
        config.baseURL + "/ChangeRequest" + showID,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ changesList: data });
    } catch (error) {
      throw error;
    }
  },
  approveChange: async (showID) => {
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.post(
        config.baseURL + "/ChangeRequest/Approve/" + showID,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await useChangesStore.getState().getChangesList();
    } catch (error) {
      throw error;
    }
  },
  declineChange: async (showID) => {
    try {
      const token = getCookie("auth_token");
      const { data } = await axios.post(
        config.baseURL + "/ChangeRequest/Decline/" + showID,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await useChangesStore.getState().getChangesList();
    } catch (error) {
      throw error;
    }
  },
}));