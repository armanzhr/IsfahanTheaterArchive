import ShowItem from "@/components/homepage/shows/show-item";
import ShowsHeader from "@/components/homepage/shows/shows-header";
import ShowsMain from "@/components/homepage/shows/shows-main";
import ShowsOptions from "@/components/homepage/shows/shows-options/shows-options";
import ShowsPaginations from "@/components/homepage/shows/shows-pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  let shows: ShowResponse = await getShows(pageNumber, pageSize, searchKey);
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
