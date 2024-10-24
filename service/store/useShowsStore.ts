import { Roles, Show, ShowInclusive, ShowResponse } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import axiosInstance from "../axiosInstance";
interface ShowsStateStore {
  showsList: ShowResponse | null;
  showInfo: Show | null;
  isGettingShows: boolean;
  isLoadingShows: boolean;
  resetShowInfo: () => void;
  getShowsList: (
    pageNumber?: number,
    pageSize?: number,
    searchKey?: string
  ) => Promise<ShowResponse>;
  getShowInfo: (showID: number) => Promise<void>;
  createShows: (model: Show) => Promise<Show>;
  updateShows: (showsID: number, model: Show) => Promise<void>;
  deleteShows: (peopleID: number) => Promise<void>;
  copyShow: (showID: number) => any;
}

export const useShowsStore = create<ShowsStateStore>((set) => ({
  showsList: null,
  showInfo: null,
  isGettingShows: false,
  isLoadingShows: false,
  resetShowInfo: () => set({ showInfo: null }),

  getShowsList: async (pageNumber, pageSize, searchKey) => {
    set({ isGettingShows: true });
    try {
      const { data } = await axiosInstance.get("/Shows", {
        params: { pageNumber, pageSize, searchKey },
      });
      set({ showsList: data });
      return data;
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
  copyShow: async (showID) => {
    try {
      const { data: showData } = await axiosInstance.get(
        "/Shows/ShowsForEdit/" + showID
      );
      const model: Show = {
        ...showData,
        title: `کپی ${showData.title}`,
        slug: `کپی-${showData.slug}`,
      };
      const res = await useShowsStore.getState().createShows(model);
      return res;
    } catch (error) {
      throw error;
    }
  },
}));
