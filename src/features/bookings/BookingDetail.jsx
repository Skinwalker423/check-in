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
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiMiniTrash,
} from "react-icons/hi2";
import useCheckOut from "./useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const { booking, error, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();
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
      <Modal>
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
          {status === "unconfirmed" && (
            <Button
              disabled={status !== "unconfirmed"}
              onClick={() =>
                navigate(`/checkin/${booking.id}`)
              }
            >
              <HiArrowDownOnSquare /> Check in
            </Button>
          )}
          {status === "checked-in" && (
            <Button
              disabled={
                isCheckingOut || status !== "checked-in"
              }
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(booking.id)}
            >
              Check Out
            </Button>
          )}
          <Modal.Open opens={"delete"}>
            <Button variation='danger'>
              <HiMiniTrash /> Delete
            </Button>
          </Modal.Open>
          <Modal.Content name={"delete"}>
            <ConfirmDelete
              onConfirm={() => {
                deleteBooking(booking.id, {
                  onSettled: navigate(-1),
                });
              }}
              resourceName={`Booking #${booking.id}`}
              disabled={isDeleting}
            />
          </Modal.Content>
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
