import ShowItem from "@/components/homepage/shows/show-item";
import ShowsHeader from "@/components/homepage/shows/shows-header";
import ShowsMain from "@/components/homepage/shows/shows-main";
import ShowsPaginations from "@/components/homepage/shows/shows-pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Ripple from "@/components/ui/ripple";
import config from "@/config";
import { getShows } from "@/service/api/shows";
import { ShowResponse } from "@/utils/types";
import { InfoIcon } from "lucide-react";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pageNumber =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const pageSize =
    typeof searchParams.limit === "string" ? Number(searchParams.limit) : 10;

  let shows: ShowResponse = await getShows(pageNumber, pageSize);
  return (
    <>
      <ShowsHeader />
      <ShowsMain shows={shows.data} />
      <ShowsPaginations />
    </>
  );
};

export default page;
