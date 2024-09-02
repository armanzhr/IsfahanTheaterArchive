import { People } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface StateStoreProps {
  people: People[] | null;
  isGettingPeople: boolean;
  getPeople: () => Promise<void>;
}

export const useStateStore = create<StateStoreProps>((set) => ({
  people: null,
  isGettingPeople: false,
  getPeople: async () => {
    set({ isGettingPeople: true });
    try {
      const { data } = await axios.get(config.baseURL + "/People");
      set({ people: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingPeople: true });
    }
  },
}));
