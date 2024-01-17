import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  const pageValue = parseInt(searchParams.get("page"));

  const page = pageValue ? pageValue : 1;

  const {
    data: { bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page,
      }),
  });

  queryClient.prefetchQuery({
    queryKey: ["bookings", filter, sortBy, page + 1],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page: page + 1,
      }),
  });

  return { bookings, isLoading, error, count };
};

export default useBookings;
