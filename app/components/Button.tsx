"use client";

import { IconType } from "react-icons";

interface ButtonPrrops {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonPrrops> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
             relative
             disabled:opacity-70
             disabled:cursor-not-allowed
             rounded-lg
             hover:opacity-80
             transition
             w-full
             border
             ${outline ? "bg-white" : "bg-red-500"}
             ${outline ? "border-black" : "border-rose-500"}
             ${outline ? "text-black" : "text-white"}
             ${small ? "py-1" : "py-3"}
             ${small ? "text-sm" : "text-md"}
          `}>
      {Icon && (
        <Icon
          size={24}
          className="
                  
                  absolute
                  left-4
                  top-3  "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
<div></div>;
