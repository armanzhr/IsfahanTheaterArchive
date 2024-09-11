import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface ShowsStateStore {
  shows: any | null;
  isGettingShows: boolean;
  isLoadingShows: boolean;
  getShows: () => Promise<void>;
  createShows: (model: {
    posterImageId: number;
    title: string;
    slug: string;
    description: string;
    metaDescription: string;
    showTimes: [
      {
        venueId: number;
        showDate: string;
        showTimeStart: string;
      }
    ];
    showPeopleRoles: [
      {
        personId: number;
        roleId: number;
      }
    ];
    imageIds: [number];
  }) => Promise<void>;
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
      set({ isGettingShows: false });
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
