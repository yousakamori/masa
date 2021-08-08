import clsx from "clsx";
import React from "react";

const mapColorClasses = {
  primary: "bg-teal-400 hover:bg-teal-500",
  secondary: "bg-blueGray-400 hover:bg-blueGray-500",
};

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { color?: keyof typeof mapColorClasses; children?: React.ReactNode };

export const Button: React.VFC<ButtonProps> = ({
  className = "",
  color = "primary",
  disabled = false,
  children,
  ...rest
}) => {
  const classes = clsx(
    "px-3",
    "py-2",
    "text-white",
    "font-semibold",
    "rounded-lg",
    "text-sm",
    "focus:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-blue-400",
    disabled && "pointer-events-none opacity-40",
    mapColorClasses[color],
    className
  );

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};
