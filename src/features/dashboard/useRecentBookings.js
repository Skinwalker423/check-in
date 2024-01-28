import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getToday } from "../../utils/helpers";

const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : parseInt(searchParams.get("last"));

  const queryDate = subDays(
    getToday(),
    numDays
  ).toISOString();

  const {
    data: recentBookings,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => {
      return getBookingsAfterDate(queryDate);
    },
    queryKey: ["recent-bookings", numDays],
  });

  return { recentBookings, isLoading, error };
};

export default useRecentBookings;
