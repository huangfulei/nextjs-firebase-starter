import * as React from "react";

import { cn } from "~/index";

interface ISectionProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Section layout: add padding y-axis and scroll margin top.
 * @param props
 * @constructor
 */
const Section = React.forwardRef<HTMLDivElement, ISectionProps>(
  ({ id, className, ...props }, ref) => {
    return (
      <div
        id={id}
        aria-labelledby={id}
        title={id}
        className={cn("relative isolate w-full px-2 py-8", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Section.displayName = "Section";

export { Section };
