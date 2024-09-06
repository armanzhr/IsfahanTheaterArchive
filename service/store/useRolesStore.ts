import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
interface RolesStateStore {
  roles: Roles[] | null;
  isGettingRoles: boolean;
  isLoadingRoles: boolean;
  getRoles: () => Promise<void>;
  createRole: (model: { name: string }) => Promise<void>;
  updateRole: (rolesID: number, model: { name: string }) => Promise<void>;
  deleteRole: (peopleID: number) => Promise<void>;
}

export const useRolesStore = create<RolesStateStore>((set) => ({
  roles: null,
  isGettingRoles: false,
  isLoadingRoles: false,
  getRoles: async () => {
    set({ isGettingRoles: true });
    try {
      const { data } = await axios.get(config.baseURL + "/Roles");
      set({ roles: data });
    } catch (error) {
      throw error;
    } finally {
      set({ isGettingRoles: false });
    }
  },
  createRole: async (model) => {
    set({ isLoadingRoles: true });
    try {
      const { data } = await axios.post(config.baseURL + "/Roles", model);
      await useRolesStore.getState().getRoles();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: false });
    }
  },
  updateRole: async (RolesID, model) => {
    set({ isLoadingRoles: true });
    try {
      const { data } = await axios.put(
        config.baseURL + "/Roles/" + RolesID,
        model
      );
      await useRolesStore.getState().getRoles();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: false });
    }
  },
  deleteRole: async (RolesID) => {
    set({ isLoadingRoles: true });
    try {
      const { data } = await axios.delete(config.baseURL + "/Roles/" + RolesID);
      await useRolesStore.getState().getRoles();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: false });
    }
  },
}));