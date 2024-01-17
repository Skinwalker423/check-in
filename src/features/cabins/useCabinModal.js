import { useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../ui/Modal";

const useCabinModal = () => {
  const { openName, onClose } = useContext(ModalContext);
  const modalRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e?.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener(
        "click",
        handleClick,
        true
      );
    };
  }, []);

  return { onClose, modalRef, openName };
};

export default useCabinModal;
