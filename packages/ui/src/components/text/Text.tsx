import * as React from "react";

import { cn } from "~/index";

export type ITextProps = React.ParamHTMLAttributes<HTMLParagraphElement>;

const Text = React.forwardRef<HTMLParagraphElement, ITextProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        className={cn("break-words text-base-content", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

export { Text };
