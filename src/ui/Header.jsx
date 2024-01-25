import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1x solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h2>Header</h2>
      <Logout />
    </StyledHeader>
  );
};

export default Header;
