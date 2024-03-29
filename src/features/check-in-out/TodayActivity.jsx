import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import useTodayActivity from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";
import { isSameDay } from "date-fns";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivity() {
  const { error, isLoading, todayActivity } =
    useTodayActivity();

  const filteredList = todayActivity?.filter(
    (booking) =>
      isSameDay(booking.startDate, new Date()) ||
      isSameDay(booking.endDate, new Date())
  );

  const data =
    filteredList?.length < 2 ? todayActivity : filteredList;

  const activity =
    data?.length > 0 ? (
      <TodayList>
        {data.map((booking) => {
          return (
            <TodayItem key={booking.id} booking={booking} />
          );
        })}
      </TodayList>
    ) : (
      <NoActivity>No activity today</NoActivity>
    );

  return (
    <StyledToday>
      <Row type='horizontal'>
        <Heading as='h2'>
          {error ? error.message : "TodayActivity"}
        </Heading>
      </Row>
      {isLoading ? <Spinner /> : activity}
    </StyledToday>
  );
}

export default TodayActivity;
