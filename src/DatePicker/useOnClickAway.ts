import { useState, useEffect } from "react";
//TODO make more specific
function useOnClickAway(containerRef: React.RefObject<HTMLDivElement>) {
  const [clickedAway, setIsClickedAway] = useState<boolean | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsClickedAway(true);
      } else {
        setIsClickedAway(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [containerRef]);

  return clickedAway;
}
export default useOnClickAway;
