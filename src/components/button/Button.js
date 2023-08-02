import React from "react";
import { Navigate } from "react-router-dom";

const Button = ({
  onClick,
  className= '',
  type = "button",
  bgColor = "primary",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case 'primary':
      bgClassName = "bg-primary";
      break;
    case 'secondary':
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 rounded-lg capitalize w-full mt-auto  ${bgClassName} ${className}`} {...props}
    >
      {children}
    </button>
  );
};

export default Button;
