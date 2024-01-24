import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!user) {
    navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
