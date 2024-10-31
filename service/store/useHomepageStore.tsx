import { Changes, Venues } from "@/utils/types";
import { AxiosResponse } from "axios";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import { getCookie } from "cookies-next";
import axiosInstance from "../axiosInstance";

interface HomepageStore {
  selectedVenue: number | null;
  setSelectedVenue: (venue: number | null) => void;
}
export const useHomepageStore = create<HomepageStore>((set) => ({
  selectedVenue: null,
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),
}));
