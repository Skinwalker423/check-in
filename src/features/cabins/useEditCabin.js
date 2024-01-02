import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCabin as updateCabinApi } from "../../services/apiCabins";

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: updateCabin } =
    useMutation({
      mutationFn: updateCabinApi,
      onSuccess: () => {
        toast.success("successfully updated cabin");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        reset();
        toggleShowForm();
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

  return { updateCabin, isEditing };
};

export default useEditCabin;
