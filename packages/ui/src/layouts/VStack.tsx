import * as React from "react";

import { cn } from "~/index";

interface IVStackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const VStack = React.forwardRef<HTMLDivElement, IVStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col", className)} ref={ref} {...props} />
    );
  },
);
VStack.displayName = "VStack";

export { VStack };
