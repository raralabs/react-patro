import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPopper } from "@popperjs/core";

//TODO make more specific
function useVisible(initialIsVisible: boolean) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
}

function usePopper(initialIsVisible: boolean) {
  const {
    ref: popupRef,
    isVisible,
    setIsVisible,
  } = useVisible(initialIsVisible);

  const inputRef = useRef<HTMLInputElement>(null);

  //useEffect causes flickering of popper from bottom-start to bottom-end
  //TODO check if requires dependencies
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
  });
  return { popupRef, inputRef, isVisible, setIsVisible };
}

export { usePopper, useVisible };
