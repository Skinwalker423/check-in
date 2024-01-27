import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

const DarkmodeToggle = () => {
  const { toggleDarkMode } = useDarkMode();

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <ButtonIcon onClick={handleToggleDarkMode}>
      <HiOutlineMoon />
    </ButtonIcon>
  );
};

export default DarkmodeToggle;
