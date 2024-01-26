import { useMutation } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAccount";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const {
    mutate: updateUser,
    error,
    isLoading,
  } = useMutation({
    mutationFn: ({
      avatar,
      fullName,
      password,
      currentAvatar,
    }) => {
      updateUserApi({
        avatar,
        fullName,
        password,
        currentAvatar,
      });
    },
    mutationKey: ["user"],
    onSuccess: (data) => {
      console.log("data", data);
      toast.success("successfully updated profile");
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
  return { updateUser, isLoading, error };
};

export default useUpdateUser;
