import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { error, isLoading, recentBookings, numNights } =
    useRecentBookings();

  const {
    confirmedStays,
    isLoadingRecentStays,
    recentStaysError,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } =
    useCabins();

  if (isLoading || isLoadingRecentStays || isLoadingCabins)
    return <Spinner />;
  if (error || recentStaysError)
    return (
      <ErrorFallback
        error={error.message || recentStaysError.message}
      />
    );

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={recentBookings}
        stays={confirmedStays}
        numNights={numNights}
        totalCabins={cabins.length}
      />
      <SalesChart />
      <div>Something</div>
      <div>Something else</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
