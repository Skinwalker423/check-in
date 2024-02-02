import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 15rem;
  width: auto;
  border-radius: 9999px;
`;

function Logo() {
  const { darkModeActive } = useDarkMode();

  return (
    <StyledLogo>
      <Img
        src={
          darkModeActive
            ? "/img/checkinLogo.png"
            : "/img/checkinLogo-black.png"
        }
        alt='Logo'
      />
    </StyledLogo>
  );
}

export default Logo;
