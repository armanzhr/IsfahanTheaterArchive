import ShowItem from "@/components/homepage/shows/show-item";
import ShowsHeader from "@/components/homepage/shows/shows-header";
import ShowsMain from "@/components/homepage/shows/shows-main";
import ShowsOptions from "@/components/homepage/shows/shows-options/shows-options";
import ShowsPaginations from "@/components/homepage/shows/shows-pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getShows } from "@/service/api/shows";
import { ShowResponse } from "@/utils/types";
import { DramaIcon, InfoIcon, SearchIcon } from "lucide-react";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pageNumber =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const pageSize =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 20;
  const searchKey =
    typeof searchParams.title === "string" ? searchParams.title : null;
  const venueId =
    typeof searchParams.venue === "string" ? searchParams.venue : null;
  const startDate =
    typeof searchParams.startdate === "string" ? searchParams.startdate : null;
  const endDate =
    typeof searchParams.enddate === "string" ? searchParams.enddate : null;
  const showTimeStart =
    typeof searchParams.time === "string" ? searchParams.time : null;
  const sortField =
    typeof searchParams.sortfield === "string" ? searchParams.sortfield : null;
  const sortDirection =
    typeof searchParams.dir === "string" ? searchParams.dir : null;

  let shows: ShowResponse = await getShows(
    pageNumber,
    pageSize,
    searchKey,
    venueId,
    startDate,
    endDate,
    showTimeStart,
    sortField,
    sortDirection
  );

  return (
    <>
      <ShowsOptions />
      <ShowsMain shows={shows.data} />
      <ShowsPaginations
        currentPage={shows.pageNumber}
        totalPages={shows.totalPages}
      />
    </>
  );
};

export default page;
