import { Roles } from "@/utils/types";
import { create } from "zustand";
import axios, { AxiosPromise } from "axios";
import config from "@/config";
import axiosInstance from "../axiosInstance";
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
      const { data } = await axiosInstance.get("/Roles");
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
      const { data } = await axiosInstance.post("/Roles", model);
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
      const { data } = await axiosInstance.put("/Roles/" + RolesID, model);
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
      const { data } = await axiosInstance.delete("/Roles/" + RolesID);
      await useRolesStore.getState().getRoles();
    } catch (error) {
      throw error;
    } finally {
      set({ isLoadingRoles: false });
    }
  },
}));
