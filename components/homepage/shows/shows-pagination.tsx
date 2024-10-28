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
  totalPages: number;
  currentPage: number;
}) => {
  const renderPaginationItems = () => {
    const items = [];

    if (totalPages <= 7) {
      // اگر تعداد صفحات کمتر از 7 باشد، تمام صفحات را نمایش می‌دهیم
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} href={`?page=${i}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // اگر تعداد صفحات بیشتر از 7 باشد، از Ellipsis استفاده می‌کنیم
      items.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={currentPage === 1} href={`?page=${1}`}>
            {1}
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 4) {
        items.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      // نمایش صفحات اطراف صفحه جاری
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} href={`?page=${i}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            href={`?page=${totalPages}`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <Pagination className="my-5">
      <PaginationContent>
        {currentPage !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
            />
          </PaginationItem>
        )}

        {renderPaginationItems()}

        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationNext
              href={`?page=${
                currentPage < totalPages ? currentPage + 1 : totalPages
              }`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default ShowsPaginations;
