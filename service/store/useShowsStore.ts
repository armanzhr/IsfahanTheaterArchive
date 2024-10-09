import { Roles, Show } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import axiosInstance from "../axiosInstance";
interface ShowsStateStore {
  showsList: Show[] | null;
  showInfo: Show | null;
  isGettingShows: boolean;
  isLoadingShows: boolean;
  resetShowInfo: () => void;
  getShowsList: () => Promise<void>;
  getShowInfo: (showID: number) => Promise<void>;
  createShows: (model: Show) => Promise<Show>;
  updateShows: (showsID: number, model: Show) => Promise<void>;
  deleteShows: (peopleID: number) => Promise<void>;
}

export const useShowsStore = create<ShowsStateStore>((set) => ({
  showsList: null,
  showInfo: null,
  isGettingShows: false,
  isLoadingShows: false,
  resetShowInfo: () => set({ showInfo: null }),
  getShowsList: async () => {
    set({ isGettingShows: true });
    try {
      const { data } = await axiosInstance.get("/Shows");
      set({ showsList: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingShows: false });
    }
  },
  getShowInfo: async (showID) => {
    try {
      const { data } = await axiosInstance.get("/Shows/ShowsForEdit/" + showID);
      set({ showInfo: data });
    } catch (error) {
      throw error;
    }
  },
  createShows: async (model) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axiosInstance.post("/Shows", model);
      await useShowsStore.getState().getShowsList();
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
      const { data } = await axiosInstance.put("/Shows/" + showsID, model);
      await useShowsStore.getState().getShowsList();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: false });
    }
  },
  deleteShows: async (showsID) => {
    set({ isLoadingShows: true });
    try {
      const { data } = await axiosInstance.delete("/Shows/" + showsID);
      await useShowsStore.getState().getShowsList();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingShows: false });
    }
  },
}));
