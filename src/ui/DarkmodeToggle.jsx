import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

const DarkmodeToggle = () => {
  const toggleDarkmode = () => {};

  return (
    <ButtonIcon onClick={toggleDarkmode}>
      <HiOutlineMoon />
    </ButtonIcon>
  );
};

export default DarkmodeToggle;
