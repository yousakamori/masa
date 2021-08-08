import clsx from "clsx";
import React, { HTMLAttributes } from "react";

export const Container: React.VFC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { children, className, ...rest } = props;

  const classes = clsx(
    "container",
    "mx-auto",
    "px-3",
    "sm:px-4",
    "md:px-10",
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
