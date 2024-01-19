import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const { bookingId } = useParams();

  const { isLoading: isUpdating, mutate: updateBooking } =
    useMutation({
      mutationFn: updateBookingApi,
      onSuccess: () => {
        toast.success("successfully updated booking");
        queryClient.invalidateQueries({
          queryKey: ["booking", bookingId],
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

  return { updateBooking, isUpdating };
};

export default useUpdateBooking;
