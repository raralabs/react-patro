import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPopper } from "@popperjs/core";

function usePopper() {
  const [isVisible, setIsVisible] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  //useEffect causes flickering of popper from bottom-start to bottom-end
  useLayoutEffect(() => {
    if (isVisible) {
      const input = inputRef.current;
      const tooltip = popupRef.current;
      if (input && tooltip)
        createPopper(input, tooltip, {
          placement: "bottom-end",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 8],
              },
            },
          ],
        });
    }
  }, [isVisible, popupRef]);

  return {
    popupRef,
    inputRef,
    isVisible,
    containerRef,
    setIsVisible,
  };
}

export { usePopper };
