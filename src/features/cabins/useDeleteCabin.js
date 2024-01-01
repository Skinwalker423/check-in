import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

const useDeleteCabin = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: isDeleting } =
    useMutation({
      mutationFn: (id) => deleteCabinApi(id),
      mutationKey: ["delete cabin"],
      onSuccess: () => {
        toast.success("Successfully deleted cabin");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
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

  return { deleteCabin, isDeleting };
};

export default useDeleteCabin;
