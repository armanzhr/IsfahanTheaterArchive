import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface MediaStateStore {
  media: any | null;
  isGettingMedia: boolean;
  isLoadingMedia: boolean;
  getMedia: () => Promise<void>;
  createMedia: (model: { name: string }) => Promise<void>;
  updateMedia: (mediaID: number, model: { name: string }) => Promise<void>;
  deleteMedia: (peopleID: number) => Promise<void>;
}

export const useMediaStore = create<MediaStateStore>((set) => ({
  media: null,
  isGettingMedia: false,
  isLoadingMedia: false,
  getMedia: async () => {
    set({ isGettingMedia: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Media");
      set({ media: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingMedia: true });
    }
  },
  createMedia: async (model) => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Media", model);
      await useMediaStore.getState().getMedia();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: true });
    }
  },
  updateMedia: async (mediaID, model) => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/Media/" + mediaID,
        model
      );
      await useMediaStore.getState().getMedia();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: true });
    }
  },
  deleteMedia: async (mediaID) => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axios.delete(config.baseURL + "/Media/" + mediaID);
      await useMediaStore.getState().getMedia();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: true });
    }
  },
}));
