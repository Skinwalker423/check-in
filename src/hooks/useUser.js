import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiAuth";

const useUser = () => {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { user, isError, isLoading };
};

export default useUser;
