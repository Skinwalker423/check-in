import styled from "styled-components";
import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../services/apiBookings";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active
      ? " var(--color-brand-600)"
      : "var(--color-grey-50)"};
  color: ${(props) =>
    props.active ? " var(--color-brand-50)" : "inherit"};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ count = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const page = parseInt(searchParams.get("page"));
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
          method: "eq",
        };
  const sortValue =
    searchParams.get("sortby") || "startDate-desc";
  const [field, direction] = sortValue.split("-");

  const sortBy = { field, direction };

  const currentPage = page ? page : 1;

  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

  const prefetchNext = () => {
    if (currentPage < pageCount && currentPage > 0) {
      queryClient.prefetchQuery({
        queryKey: [
          "bookings",
          filter,
          sortBy,
          currentPage + 1,
        ],
        queryFn: () =>
          getBookings({
            filter,
            sortBy,
            page: currentPage + 1,
          }),
        staleTime: 60000,
      });
    }
  };
  const prefetchPrevious = () => {
    if (currentPage <= pageCount && currentPage > 1) {
      queryClient.prefetchQuery({
        queryKey: [
          "bookings",
          filter,
          sortBy,
          currentPage - 1,
        ],
        queryFn: () =>
          getBookings({
            filter,
            sortBy,
            page: currentPage - 1,
          }),
        staleTime: 60000,
      });
    }
  };

  function handlePrevious() {
    if (currentPage - 1 < 1) return;
    searchParams.set("page", currentPage - 1);
    setSearchParams(searchParams);
  }
  function handleNext() {
    if (currentPage + 1 > pageCount) return;
    searchParams.set("page", currentPage + 1);
    setSearchParams(searchParams);
  }

  if (count < RESULTS_PER_PAGE) return null;

  return (
    <StyledPagination>
      <P>
        Showing{" "}
        <span>
          {currentPage * RESULTS_PER_PAGE +
            1 -
            RESULTS_PER_PAGE}
        </span>{" "}
        to <span>{RESULTS_PER_PAGE * currentPage}</span> of{" "}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton
          disabled={currentPage - 1 < 1}
          onClick={handlePrevious}
          onMouseEnter={prefetchPrevious}
          onFocus={prefetchPrevious}
        >
          <HiChevronLeft /> Prev
        </PaginationButton>
        <PaginationButton
          disabled={currentPage + 1 > pageCount}
          onClick={handleNext}
          onMouseEnter={prefetchNext}
          onFocus={prefetchNext}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
};

export default Pagination;
