import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/apiAuth";

const useUserSession = () => {
  const {
    data: user,

    isLoading,
  } = useQuery({
    queryFn: getSession,
    queryKey: ["user"],
  });

  const isAuthenticated = user?.role === "authenticated";

  return { user, isLoading, isAuthenticated };
};

export default useUserSession;
