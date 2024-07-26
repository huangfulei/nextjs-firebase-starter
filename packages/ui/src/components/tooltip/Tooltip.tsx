"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../index";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = ({ ...props }) => <TooltipPrimitive.Root {...props} />;

Tooltip.displayName = TooltipPrimitive.Tooltip.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "bg-base-300 text-base-content z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1",
      className,
    )}
    {...props}
  >
    {children}
    <TooltipArrow className="text-base-300 fill-current" />
  </TooltipPrimitive.Content>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
};
