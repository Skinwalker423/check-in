import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      signupApi({ email, password }),
    mutationKey: ["signup"],
    onSuccess: (data) => {
      toast.success("successfully created new user");
      console.log("data", data);
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

  return { signup, isLoading };
};

export default useSignup;
