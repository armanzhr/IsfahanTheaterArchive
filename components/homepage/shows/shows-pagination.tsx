import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

const ShowsPaginations = ({
  totalPages,
  currentPage,
}: {
  totalPages: string;
  currentPage: string;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${
              Number(currentPage) > 1 ? Number(currentPage) - 1 : 1
            }`}
          />
        </PaginationItem>

        {/* ایجاد داینامیک PaginationItem */}
        {Array.from({ length: Number(totalPages) }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href={`?page=${index + 1}`}
              isActive={Number(currentPage) === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`?page=${
              currentPage < totalPages ? currentPage + 1 : totalPages
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ShowsPaginations;
