import * as React from "react";

import { cn } from "../../index";

interface IBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const Box = React.forwardRef<HTMLDivElement, IBoxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("block", className)} ref={ref} {...props}>
        {props.children}
      </div>
    );
  },
);
Box.displayName = "Box";

export { Box };
