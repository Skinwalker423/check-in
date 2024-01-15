import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

const useBookings = () => {
  const [searchParams] = useSearchParams();

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

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
      }),
  });

  return { bookings, isLoading, error };
};

export default useBookings;
