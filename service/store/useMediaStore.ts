import { Media, MediaModel, SelectedFile } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import axiosInstance from "../axiosInstance";

interface MediaStore {
  selectedKey: any;
  setSelectedKey: (selectedKey: any) => void;
  selectedImage: Media | null;
  setSelectedImage: (selectedImage: Media | null) => void;
  isLoadingMedia: boolean;
  isGettingFile: boolean;
  listMedias: Media[] | null;
  getMediasList: () => Promise<void>;
  media: Media[] | null;
  getMedia: (id: number) => Promise<void>;
  updateMedia: (mediaID: number, model: MediaModel) => Promise<AxiosResponse>;
  createMedia: (model: FormData) => Promise<AxiosResponse>;
  deleteMedia: (mediaID: number) => Promise<AxiosResponse>;
  selectedFiles: SelectedFile[] | null | undefined;
  setSelectedFiles: (selectedFiles: SelectedFile[] | null | undefined) => void;
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
  listMedias: null,
  getMediasList: async () => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axiosInstance.get("/Images");
      set({ listMedias: data });

      return data;
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingMedia: false });
    }
  },
  media: null,
  getMedia: async (imageID) => {
    set({ isLoadingMedia: true });
    try {
      const { data } = await axiosInstance.get(
        "/Images/" + IdleDeadline.toString()
      );
      set({ media: data });

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
      const { data } = await axiosInstance.put(`/Images/${mediaID}`, model);
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
      const data = await axiosInstance.delete(`/Images/${mediaID}`);
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
      const data = await axiosInstance.post(
        `/Images`,

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
  selectedFiles: null,
  setSelectedFiles: (selectedFile) => set({ selectedFiles: selectedFile }),
}));
