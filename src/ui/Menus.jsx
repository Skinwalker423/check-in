import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";
import useOutsideElementClick from "../hooks/useOutsideElementClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  z-index: 99;
`;

StyledList.defaultProps = {
  position: {
    x: 0,
    y: 40,
  },
};

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");

  const open = setOpenId;

  const close = () => setOpenId("");

  const values = {
    openId,
    open,
    close,
  };

  return (
    <MenusContext.Provider value={values}>
      {children}
    </MenusContext.Provider>
  );
};

function List({ children, id }) {
  const { openId, close } = useContext(MenusContext);
  const { ref } = useOutsideElementClick({
    onClose: close,
  });

  if (openId !== id) return null;
  return createPortal(
    <StyledList ref={ref}>{children}</StyledList>,
    document.getElementById(id)
  );
}
function Toggle({ id }) {
  const { open, close, openId } = useContext(MenusContext);

  function handleClick() {
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.Menu = Menu;

export default Menus;
