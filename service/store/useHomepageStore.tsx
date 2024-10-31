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
  startDate: Date | null;
  setStartDate: (venue: Date | null) => void;
  endDate: Date | null;
  setEndDate: (venue: Date | null) => void;
  showTime: string | null;
  setShowTime: (venue: string | null) => void;
}
export const useHomepageStore = create<HomepageStore>((set) => ({
  selectedVenue: null,
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),
  startDate: null,
  setStartDate: (date) => set({ startDate: date }),
  endDate: null,
  setEndDate: (date) => set({ endDate: date }),
  showTime: null,
  setShowTime: (time) => set({ showTime: time }),
}));
