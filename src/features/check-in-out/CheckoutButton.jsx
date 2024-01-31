import { HiArrowUpOnSquare } from "react-icons/hi2";
import Button from "../../ui/Button";
import useCheckOut from "../bookings/useCheckOut";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckOut();

  return (
    <Button
      variation='secondary'
      size='small'
      disabled={isCheckingOut}
      icon={<HiArrowUpOnSquare />}
      onClick={() => checkout(bookingId)}
    >
      Check Out
    </Button>
  );
}

export default CheckoutButton;
