import {
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../hooks/useDarkMode";

const DarkmodeToggle = () => {
  const { toggleDarkMode, darkModeActive } = useDarkMode();

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <ButtonIcon onClick={handleToggleDarkMode}>
      {darkModeActive ? (
        <HiOutlineSun style={{ color: "orange" }} />
      ) : (
        <HiOutlineMoon />
      )}
    </ButtonIcon>
  );
};

export default DarkmodeToggle;
