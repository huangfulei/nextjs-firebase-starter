import * as React from "react";

import { cn } from "~/index";

interface IGridProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const Grid = React.forwardRef<HTMLDivElement, IGridProps>(
  ({ className, ...props }, ref) => {
    return <div className={cn("grid", className)} ref={ref} {...props} />;
  },
);
Grid.displayName = "Grid";

export { Grid };
