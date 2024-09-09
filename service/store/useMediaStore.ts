import { Media, MediaModel } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";

interface MediaStore {
  selectedKey: any;
  setSelectedKey: (selectedKey: any) => void;
  selectedImage: string | null;
  setSelectedImage: (selectedImage: string | null) => void;
  isLoadingMedia: boolean;
  isGettingFile: boolean;
  listMedias: Media[];
  getMediasList: () => Promise<void>;
  updateMedia: (mediaID: number, model: MediaModel) => Promise<AxiosResponse>;
  createMedia: (model: FormData) => Promise<AxiosResponse>;
  deleteMedia: (mediaID: number) => Promise<AxiosResponse>;
}
export const useMediaStore = create<MediaStore>((set) => ({
  selectedKey: "images",
  setSelectedKey: (selectedKey) => {
    set({ selectedKey });
  },
  selectedImage: null,
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  isLoadingMedia: false,
  isGettingFile: false,
  listMedias: [],

  getMediasList: async () => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Images");
      set({ listMedias: data });

      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: false });
    }
  },
  updateMedia: async (mediaID, model) => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axios.put(
        config.baseURL + `/Images/${mediaID}`,
        model
      );
      await useMediaStore.getState().getMediasList();
      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: false });
    }
  },
  deleteMedia: async (mediaID) => {
    set({ isLoadingMedia: true });
    try {
      const data = await axios.delete(
        config.baseURL + `/Images/${mediaID}`,

        { data: { id: Number(mediaID) } }
      );
      await useMediaStore.getState().getMediasList();

      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: false });
    }
  },
  createMedia: async (model) => {
    set({ isLoadingMedia: true });
    try {
      const data = await axios.post(
        config.baseURL + `/Images`,

        model
      );
      await useMediaStore.getState().getMediasList();

      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: false });
    }
  },
}));
