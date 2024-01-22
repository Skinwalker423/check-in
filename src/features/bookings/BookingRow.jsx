import styled from "styled-components";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

import {
  HiArrowUpOnSquare,
  HiEye,
  HiMiniTrash,
} from "react-icons/hi2";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import useCheckOut from "./useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,

    startDate,
    endDate,
    numNights,

    totalPrice,
    status,
    guests,
    cabins,
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckOut();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabins?.name || "cabin name"}</Cabin>

      <Stacked>
        <span>{guests?.fullName || "anon"}</span>
        <span>{guests?.email || "email"}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")}{" "}
          &mdash; {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>
        {status.replace("-", " ")}
      </Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>
      <div id={bookingId}>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={bookingId} />
            <Menus.List id={bookingId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() =>
                  navigate(`/bookings/${bookingId}`)
                }
              >
                See details
              </Menus.Button>
              {status === "unconfirmed" && (
                <Menus.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={() =>
                    navigate(`/checkin/${bookingId}`)
                  }
                >
                  Check in
                </Menus.Button>
              )}
              {status === "checked-in" && (
                <Menus.Button
                  disabled={isCheckingOut}
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout(bookingId)}
                >
                  Check Out
                </Menus.Button>
              )}
              <Modal.Open opens={"delete"}>
                <Menus.Button icon={<HiMiniTrash />}>
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Content name={"delete"}>
              <ConfirmDelete
                onConfirm={() => {}}
                resourceName={name}
                disabled={false}
              />
            </Modal.Content>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default BookingRow;
