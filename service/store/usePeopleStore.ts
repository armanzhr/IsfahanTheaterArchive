import { People } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface PeopleStateProps {
  people: People[] | null;
  isGettingPeople: boolean;
  isLoadingPeople: boolean;
  getPeople: () => Promise<void>;
  createPeople: (model: {
    firstName: string;
    lastName: string;
    slug: string;
    biography?: string;
    avatarImageId?: number;
    imageIds?: number[];
  }) => Promise<void>;
  updatePeople: (
    peopleID: number,
    model: {
      firstName: string;
      lastName: string;
      slug: string;
      biography?: string;
      avatarImageId?: number;
      imageIds?: number[];
    }
  ) => Promise<void>;
  deletePeople: (peopleID: number) => Promise<void>;
}

export const usePeopleStore = create<PeopleStateProps>((set) => ({
  people: null,
  isGettingPeople: false,
  isLoadingPeople: false,
  getPeople: async () => {
    set({ isGettingPeople: true });
    try {
      const { data } = await axios.get(config.baseURL + "/People");
      set({ people: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingPeople: false });
    }
  },
  createPeople: async (model) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.post(config.baseURL + "/People", model);
      await usePeopleStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: false });
    }
  },
  updatePeople: async (peopleID, model) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/People/" + peopleID,
        model
      );
      await usePeopleStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: false });
    }
  },
  deletePeople: async (peopleID) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.delete(
        config.baseURL + "/People/" + peopleID
      );
      await usePeopleStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: false });
    }
  },
}));
