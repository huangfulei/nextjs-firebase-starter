import * as React from "react";

import { cn } from "~/index";

export interface ISwapProps
  extends React.ParamHTMLAttributes<HTMLLabelElement> {
  before: React.ReactNode;
  after: React.ReactNode;
  checked?: boolean;
  onSwap?: (value: boolean) => void;
}

const Swap = React.forwardRef<HTMLLabelElement, ISwapProps>(
  ({ className, before, after, onSwap, checked = false, ...props }, ref) => {
    return (
      <label className={cn("swap", className)} ref={ref} {...props}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (onSwap) onSwap(event.target.checked);
          }}
        />
        {before}
        {after}
      </label>
    );
  },
);
Swap.displayName = "Swap";

export { Swap };
