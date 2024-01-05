import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

import { HiOutlineX } from "react-icons/hi";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext({});

const Modal = ({ children }) => {
  const [openName, setOpenName] = useState("");

  const onOpen = setOpenName;

  const onClose = () => {
    setOpenName("");
  };

  const values = {
    openName,
    onOpen,
    onClose,
  };

  return (
    <ModalContext.Provider value={values}>
      {children}
    </ModalContext.Provider>
  );
};

function Content({ children, name }) {
  const { openName, onClose } = useContext(ModalContext);
  console.log("open name", openName, name);
  const portal = createPortal(
    <Overlay>
      <StyledModal>
        <div>{children}</div>
        <Button onClick={onClose}>
          <HiOutlineX />
        </Button>
      </StyledModal>
    </Overlay>,
    document.body
  );

  return <div>{openName && portal}</div>;
}

function Open({ children, opens }) {
  const { onOpen } = useContext(ModalContext);
  console.log("opens", opens);
  return <div onClick={onOpen}>{children}</div>;
}

Modal.Open = Open;
Modal.Content = Content;

export default Modal;
