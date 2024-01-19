import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import useUpdateBooking from "../bookings/useUpdateBooking";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, error, isLoading } = useBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking?.isPaid) {
      setConfirmPaid(true);
    }
  }, [booking]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  console.log(
    "checkin booking",
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    booking
  );

  function handleCheckin() {
    console.log("booking id", bookingId);
    const obj = { isPaid: true, status: "checked-in" };
    updateBooking({ id: bookingId, obj });
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>
          Check in booking #{bookingId}
        </Heading>
        <ButtonText onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((bool) => !bool)}
          disabled={booking?.isPaid}
        >
          I confirm that {guests?.fullName} has paid the
          full amount
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPaid || isUpdating}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
