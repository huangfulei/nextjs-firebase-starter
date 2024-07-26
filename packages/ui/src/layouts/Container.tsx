import * as React from "react";

import { cn } from "../../index";

const styles = {
  xs: "mx-auto px-2 sm:px-6 md:max-w-2xl md:px-4 lg:px-2",
  sm: "mx-auto px-2 sm:px-6 md:max-w-3xl md:px-4 lg:max-w-4xl lg:px-12",
  md: "mx-auto px-2 sm:px-6 md:max-w-4xl md:px-4 lg:max-w-5xl lg:px-8",
  lg: "mx-auto px-2 sm:px-6 md:max-w-4xl md:px-4 lg:max-w-screen-2xl lg:px-8",
};

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, IContainerProps>(
  ({ size = "lg", className, ...props }, ref) => {
    return (
      <div
        className={cn(styles[size], "relative", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Container.displayName = "Container";

export { Container };
