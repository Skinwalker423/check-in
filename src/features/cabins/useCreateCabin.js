import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createCabin as createCabinApi } from "../../services/apiCabins";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } =
    useMutation({
      mutationFn: createCabinApi,
      onSuccess: () => {
        toast.success("successfully created a cabin");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
        reset();
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

  return { createCabin, isCreating };
};

export default useCreateCabin;
