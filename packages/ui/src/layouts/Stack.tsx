import * as React from "react";

import { cn } from "~/index";

interface IStackProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Stack = React.forwardRef<HTMLDivElement, IStackProps>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex", className)} ref={ref} {...props} />;
  },
);
Stack.displayName = "Stack";

export { Stack };
