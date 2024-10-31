import { ShowResponse } from "@/utils/types";
import axiosInstance from "../axiosInstance";

export const getShows: (
  pageNumber?: number,
  pageSize?: number,
  searchKey?: string | null,
  venueId?: string | null
) => any = async (pageNumber, pageSize, searchKey, venueId) => {
  try {
    const { data } = await axiosInstance.get("/Shows", {
      params: { pageNumber, pageSize, searchKey, venueId },
    });
    return data;
  } catch (error) {
    return error;
  }
};
