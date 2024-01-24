import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { user, error, isLoading };
};

export default useUser;
