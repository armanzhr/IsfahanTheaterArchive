import { Roles, Show } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface ShowsStateStore {
  shows: Show[] | null;
  isGettingShows: boolean;
  isLoadingShows: boolean;
  getShows: () => Promise<void>;
  createShows: (model: Show) => Promise<Show>;
  updateShows: (showsID: number, model: Show) => Promise<void>;
  deleteShows: (peopleID: number) => Promise<void>;
}

export const useShowsStore = create<ShowsStateStore>((set) => ({
  shows: null,
  isGettingShows: false,
  isLoadingShows: false,
  getShows: async () => {
    set({ isGettingShows: true });
    try {
      const { data } = await axios.get(
        config.baseURL + "/Shows/GetShowsForEdit"
      );
      set({ shows: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingShows: false });
    }
  },
  createShows: async (model) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Shows", model);
      await useShowsStore.getState().getShows();
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: false });
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
      set({ isLoadingShows: false });
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
      set({ isLoadingShows: false });
    }
  },
}));
