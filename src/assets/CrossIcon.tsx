import React from "react";

type CrossIconProps = {
  className?: string;
  onClick?: () => void;
  visible?: boolean;
};
function CrossIcon({
  className = "",
  onClick,
  visible = false,
}: CrossIconProps) {
  return visible ? (
    <div
      onClick={() => {
        typeof onClick === "function" && onClick();
      }}
      title="Clear"
      className={`cross-icon hand-cursor ${className}`}
    >
      &#x2715;
    </div>
  ) : null;
}
export default CrossIcon;
