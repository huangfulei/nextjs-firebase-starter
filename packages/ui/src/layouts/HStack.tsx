import * as React from "react";

import { cn } from "~/index";

interface IHStackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const HStack = React.forwardRef<HTMLDivElement, IHStackProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-row", className)} ref={ref} {...props} />
    );
  },
);
HStack.displayName = "HStack";

export { HStack };
