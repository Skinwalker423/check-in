import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAccount";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ avatar, fullName, password }) => {
      return updateUserApi({
        avatar,
        fullName,
        password,
      });
    },
    onSuccess: ({ user }) => {
      toast.success("successfully updated profile");

      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 7000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });
  return { updateUser, isLoading };
};

export default useUpdateUser;
