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
import { ShowResponse } from "@/utils/types";
import { InfoIcon } from "lucide-react";
import React from "react";

const page = async () => {
  let data = await fetch(config.baseURL + "/Shows");
  let shows: ShowResponse = await data.json();
  return (
    <>
      <ShowsHeader />
      <ShowsMain shows={shows.data} />
      <ShowsPaginations />
    </>
  );
};

export default page;
