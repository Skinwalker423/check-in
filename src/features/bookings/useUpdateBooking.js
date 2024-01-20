import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isUpdating, mutate: updateBooking } =
    useMutation({
      mutationFn: ({
        bookingId,
        breakfastOptions = {},
      }) => {
        return updateBookingApi(bookingId, {
          ...breakfastOptions,
          isPaid: true,
          status: "checked-in",
        });
      },
      onSuccess: (data) => {
        toast.success(
          `successfully updated booking #${data?.id}`
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

  return { updateBooking, isUpdating };
};

export default useUpdateBooking;
