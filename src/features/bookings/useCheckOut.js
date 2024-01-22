import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

const useCheckOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingOut, mutate: checkout } =
    useMutation({
      mutationFn: ({ bookingId, options = {} }) => {
        return updateBookingApi(bookingId, {
          ...options,
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

        navigate("/");
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