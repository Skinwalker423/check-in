import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Successfully logged out");
      queryClient.removeQueries();
      navigate("/login", {
        replace: true,
      });
    },
    onError: (err) => {
      toast.error(err?.message, {
        duration: 7000,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    },
  });

  return { logout, isLoading };
};

export default useLogout;
