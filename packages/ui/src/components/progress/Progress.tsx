"use client";

import * as React from "react";

import { cn } from "../../index";

export type IProgressProps = React.ProgressHTMLAttributes<HTMLProgressElement>;

const Progress = React.forwardRef<HTMLProgressElement, IProgressProps>(
  ({ className, value, max, ...props }, ref) => (
    <progress
      className={cn("progress", className)}
      value={value}
      max={max}
      ref={ref}
      {...props}
    ></progress>
  ),
);
Progress.displayName = "Progress";

export { Progress };
