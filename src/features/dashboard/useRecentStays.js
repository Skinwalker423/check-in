import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";
import { getToday } from "../../utils/helpers";

const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : parseInt(searchParams.get("last"));

  const queryDate = subDays(
    getToday(),
    numDays
  ).toISOString();

  const {
    data: recentStays,
    isLoading: isLoadingRecentStays,
    error: recentStaysError,
  } = useQuery({
    queryFn: () => {
      return getStaysAfterDate(queryDate);
    },
    queryKey: ["recent-stays", numDays],
  });

  const confirmedStays = recentStays?.filter(
    ({ status }) => status !== "unconfirmed"
  );

  return {
    confirmedStays,
    isLoadingRecentStays,
    recentStaysError,
  };
};

export default useRecentStays;
