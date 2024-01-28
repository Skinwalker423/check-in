import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({
  bookings,
  stays,
  numNights,
  totalCabins,
}) => {
  const numBookings = bookings.length;
  const numStays = stays.length;

  const bookingSales = bookings?.reduce(
    (acc, b) => acc + b.totalPrice,
    0
  );
  const formattedSales = formatCurrency(bookingSales);
  const occupancyNights = stays?.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const totalAvailableNights = numNights * totalCabins;

  const occupancyRate =
    parseFloat(
      occupancyNights / totalAvailableNights
    ).toFixed(3) * 100;

  return (
    <>
      <Stat
        title={"Bookings"}
        value={numBookings}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        title={"Sales"}
        value={formattedSales}
        color={"red"}
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        title={"Check-in's"}
        value={numStays}
        color={"green"}
        icon={<HiOutlineCalendarDays />}
      />
      <Stat
        title={"Occupancy Rate"}
        value={`${occupancyRate}%`}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
      />
    </>
  );
};

export default Stats;
