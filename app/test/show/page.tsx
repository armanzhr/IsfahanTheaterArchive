import ShowItem from "@/components/homepage/shows/show-item";
import ShowsHeader from "@/components/homepage/shows/shows-header";
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
      <ShowsMain />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default page;
