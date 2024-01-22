import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as updateBookingApi } from "../../services/apiBookings";

const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } =
    useMutation({
      mutationFn: (bookingId) => {
        return updateBookingApi(bookingId, {
          status: "checked-out",
        });
      },
      onSuccess: (data) => {
        toast.success(
          `successfully checked out booking #${data?.id}`
        );
        queryClient.invalidateQueries({
          active: true,
        });
      },
      onError: (err) => {
        toast.error(err.message, {
          duration: 7000,
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      },
    });

  return { checkout, isCheckingOut };
};

export default useCheckOut;
