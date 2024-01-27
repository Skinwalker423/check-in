import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

const DarkmodeToggle = () => {
  const { toggleDarkMode } = useContext(DarkModeContext);

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
