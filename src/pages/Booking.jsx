import { useParams } from "react-router-dom";

const Booking = () => {
  const { bookingId } = useParams();
  return <div>Booking test {bookingId} </div>;
};

export default Booking;
