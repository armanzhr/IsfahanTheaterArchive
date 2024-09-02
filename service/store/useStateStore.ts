import { People, Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface StateStoreProps {
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

  //   ---------------
  roles: Roles[] | null;
  isGettingRoles: boolean;
  isLoadingRoles: boolean;
  getRoles: () => Promise<void>;
}

export const useStateStore = create<StateStoreProps>((set) => ({
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
      set({ isGettingPeople: true });
    }
  },
  createPeople: async (model) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.post(config.baseURL + "/People", model);
      await useStateStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: true });
    }
  },
  updatePeople: async (peopleID, model) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/People/" + peopleID,
        model
      );
      await useStateStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: true });
    }
  },
  deletePeople: async (peopleID) => {
    set({ isLoadingPeople: true });
    try {
      const { data } = await axios.delete(
        config.baseURL + "/People/" + peopleID
      );
      await useStateStore.getState().getPeople();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingPeople: true });
    }
  },
  //   -----------------------
  isGettingRoles: false,
  isLoadingRoles: false,
  roles: null,
  getRoles: async () => {
    set({ isGettingPeople: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Roles");
      set({ people: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingPeople: true });
    }
  },
  createRoles: async (model) => {
    set({ isLoadingRoles: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Roles", model);
      set({ people: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: true });
    }
  },
  updateRoles: async (roleID, model) => {
    set({ isLoadingRoles: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/Roles/" + roleID,
        model
      );
      set({ people: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: true });
    }
  },
}));
