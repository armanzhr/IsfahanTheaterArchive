import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface ShowsStateStore {
  shows: any | null;
  isGettingShows: boolean;
  isLoadingShows: boolean;
  getShows: () => Promise<void>;
  createShows: (model: { name: string }) => Promise<void>;
  updateShows: (showsID: number, model: { name: string }) => Promise<void>;
  deleteShows: (peopleID: number) => Promise<void>;
}

export const useShowsStore = create<ShowsStateStore>((set) => ({
  shows: null,
  isGettingShows: false,
  isLoadingShows: false,
  getShows: async () => {
    set({ isGettingShows: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Shows");
      set({ shows: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingShows: true });
    }
  },
  createShows: async (model) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Shows", model);
      await useShowsStore.getState().getShows();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: true });
    }
  },
  updateShows: async (showsID, model) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/Shows/" + showsID,
        model
      );
      await useShowsStore.getState().getShows();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: true });
    }
  },
  deleteShows: async (showsID) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axios.delete(config.baseURL + "/Shows/" + showsID);
      await useShowsStore.getState().getShows();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: true });
    }
  },
}));
