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
      mutationFn: (id) => {
        return deleteBookingApi(id);
      },
      onSuccess: () => {
        toast.success(`Successfully deleted booking`);
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
