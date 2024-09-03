import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface VenuesStateStore {
  venues: any | null;
  isGettingVenues: boolean;
  isLoadingVenues: boolean;
  getVenues: () => Promise<void>;
  createVenues: (model: { name: string }) => Promise<void>;
  updateVenues: (venuesID: number, model: { name: string }) => Promise<void>;
  deleteVenues: (peopleID: number) => Promise<void>;
}

export const useVenuesStore = create<VenuesStateStore>((set) => ({
  venues: null,
  isGettingVenues: false,
  isLoadingVenues: false,
  getVenues: async () => {
    set({ isGettingVenues: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Venues");
      set({ venues: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingVenues: true });
    }
  },
  createVenues: async (model) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Venues", model);
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: true });
    }
  },
  updateVenues: async (venuesID, model) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/Venues/" + venuesID,
        model
      );
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: true });
    }
  },
  deleteVenues: async (venuesID) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axios.delete(
        config.baseURL + "/Venues/" + venuesID
      );
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: true });
    }
  },
}));
