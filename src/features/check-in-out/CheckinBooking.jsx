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
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, error, isLoading } = useBooking();
  const { isUpdating, updateBooking } = useUpdateBooking();
  const {
    settings,
    isLoading: isLoadingSettings,
    error: settingsError,
  } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking?.isPaid) {
      setConfirmPaid(true);
    }

    if (booking?.hasBreakfast) {
      setAddBreakfast(true);
    }
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (error || settingsError)
    return <ErrorFallback error={error} />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const totalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  const totalAdjustedPrice =
    addBreakfast && !booking.hasBreakfast
      ? totalPrice + totalBreakfastPrice
      : totalPrice;

  function handleCheckin() {
    if (!confirmPaid) return;

    const breakfastOptions =
      addBreakfast && !hasBreakfast
        ? {
            totalPrice: totalAdjustedPrice,
            hasBreakfast: true,
            extraPrice: booking?.extraPrice
              ? booking.extraPrice + totalBreakfastPrice
              : totalBreakfastPrice,
          }
        : {};

    updateBooking({ bookingId, breakfastOptions });
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
          id={"breakfast"}
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((bool) => !bool);
            setConfirmPaid(false);
          }}
          disabled={booking?.hasBreakfast}
        >
          Want to add breakfast for{" "}
          {formatCurrency(totalBreakfastPrice)}?{" "}
          {`(
          ${formatCurrency(settings?.breakfastPrice)} per
          person/per day)`}
        </Checkbox>
      </Box>
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((bool) => !bool)}
          disabled={confirmPaid}
        >
          I confirm that {guests?.fullName} has paid the
          full amount of{" "}
          {formatCurrency(totalAdjustedPrice)}
          {addBreakfast &&
            !hasBreakfast &&
            `(${formatCurrency(
              totalPrice
            )} + ${formatCurrency(totalBreakfastPrice)})`}
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
