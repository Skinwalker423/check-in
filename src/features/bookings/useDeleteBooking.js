import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } =
    useMutation({
      mutationFn: (id) => deleteBookingApi(id),
      onSuccess: (data) => {
        toast.success(
          `Successfully deleted booking #${data.id}`
        );
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
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

  return { isDeleting, deleteBooking };
};

export default useDeleteBooking;
