import { ShowResponse } from "@/utils/types";
import axiosInstance from "../axiosInstance";

export const getShows: (
  pageNumber?: number,
  pageSize?: number,
  searchKey?: string | null,
  venueId?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  showTimeStart?: string | null
) => any = async (
  pageNumber,
  pageSize,
  searchKey,
  venueId,
  startDate,
  endDate,
  showTimeStart
) => {
  try {
    const { data } = await axiosInstance.get("/Shows", {
      params: {
        pageNumber,
        pageSize,
        searchKey,
        venueId,
        startDate,
        endDate,
        showTimeStart: { ticks: showTimeStart?.replace("-", ":") },
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};
