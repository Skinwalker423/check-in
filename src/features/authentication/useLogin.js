import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginApi({ email, password });
    },
    mutationKey: ["login"],
    onSuccess: (data) => {
      toast.success("successfully logged in");
      queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard", {
        replace: true,
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

  return { login, isLoading };
};

export default useLogin;
