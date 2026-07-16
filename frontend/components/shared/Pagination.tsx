"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PaginationComp = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(page - 1)} />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={page === index + 1}
              onClick={() => setPage(index + 1)}
              className={`${index + 1 === page ? "border-primary/50" : ""}`}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComp;
