import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingApi } from "../../services/apiSettings";

const useEditSetting = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } =
    useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success("successfully updated setting");
        queryClient.invalidateQueries({
          queryKey: ["settings"],
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

  return { updateSetting, isUpdating };
};

export default useEditSetting;
