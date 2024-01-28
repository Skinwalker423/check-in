import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const {
    error,
    isLoading,
    recentBookings = {},
  } = useRecentBookings();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error.message} />;

  console.log("recent bookings", recentBookings);

  return (
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>Chart</div>
      <div>Something</div>
      <div>Something else</div>
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
