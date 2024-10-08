import { Roles, Venues } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import axiosInstance from "../axiosInstance";
interface VenuesStateStore {
  venues: Venues[] | null;
  isGettingVenues: boolean;
  isLoadingVenues: boolean;
  getVenues: () => Promise<void>;
  createVenues: (model: { name: string; address: string }) => Promise<void>;
  updateVenues: (
    venuesID: number,
    model: { name: string; address: string }
  ) => Promise<void>;
  deleteVenues: (peopleID: number) => Promise<void>;
}

export const useVenuesStore = create<VenuesStateStore>((set) => ({
  venues: null,
  isGettingVenues: false,
  isLoadingVenues: false,
  getVenues: async () => {
    set({ isGettingVenues: true });
    try {
      const { data } = await axiosInstance.get("/Venues");
      set({ venues: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingVenues: false });
    }
  },
  createVenues: async (model) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axiosInstance.post("/Venues", model);
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: false });
    }
  },
  updateVenues: async (venuesID, model) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axiosInstance.put("/Venues/" + venuesID, model);
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: false });
    }
  },
  deleteVenues: async (venuesID) => {
    set({ isLoadingVenues: true });
    try {
      const { data } = await axiosInstance.delete("/Venues/" + venuesID);
      await useVenuesStore.getState().getVenues();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingVenues: false });
    }
  },
}));
