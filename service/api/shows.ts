import { ShowResponse } from "@/utils/types";
import axiosInstance from "../axiosInstance";

export const getShows: (
  pageNumber?: number,
  pageSize?: number,
  searchKey?: string | null
) => any = async (pageNumber, pageSize, searchKey) => {
  try {
    const { data } = await axiosInstance.get("/Shows", {
      params: { pageNumber, pageSize, searchKey },
    });
    return data;
  } catch (error) {
    return error;
  }
};
