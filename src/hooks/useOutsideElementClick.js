import { useEffect, useRef } from "react";

const useOutsideElementClick = ({
  onClose,
  onCapturePhase = true,
}) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e?.target)) {
        onClose();
      }
    };

    document.addEventListener(
      "click",
      handleClick,
      onCapturePhase
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClick,
        onCapturePhase
      );
    };
  }, []);

  return { ref };
};

export default useOutsideElementClick;
