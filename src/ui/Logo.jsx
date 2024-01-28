import styled from "styled-components";
import { useDarkMode } from "../hooks/useDarkMode";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkModeActive } = useDarkMode();

  return (
    <StyledLogo>
      <Img
        src={`/img/logo-${
          darkModeActive ? "dark" : "light"
        }.png`}
        alt='Logo'
      />
    </StyledLogo>
  );
}

export default Logo;
