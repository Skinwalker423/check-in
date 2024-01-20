import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare } from "react-icons/hi2";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const { booking, error, isLoading } = useBooking();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  const status = booking.status;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking {booking.id}</Heading>
          <Tag type={statusToTagName[status]}>
            {status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>
          &larr; Back
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
        <Button
          disabled={status !== "unconfirmed"}
          onClick={() => navigate(`/checkin/${booking.id}`)}
        >
          <HiArrowDownOnSquare /> Check in
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
