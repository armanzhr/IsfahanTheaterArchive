import { People } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface PeopleStateProps {
  people: People[] | null;
  allPeople: People[] | null;
  setAllPeople: (people: People[]) => void;
  isGettingPeople: boolean;
  isLoadingPeople: boolean;
  getPeople: (
    page?: number,
    pageSize?: number,
    searchKey?: string
  ) => Promise<People[]>;
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
  allPeople: null,
  setAllPeople: (people) => set({ allPeople: people }),
  isGettingPeople: false,
  isLoadingPeople: false,
  getPeople: async (page = 1, pageSize = 40, searchKey) => {
    set({ isGettingPeople: true });
    try {
      const { data } = await axios.get(config.baseURL + `/People`, {
        params: { page, pageSize, searchKey },
      });
      set({ people: data });
      return data;
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
