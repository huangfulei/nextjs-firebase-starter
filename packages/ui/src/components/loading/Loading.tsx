import * as React from "react";

import { type ILoadingProps } from ".";
import { cn } from "../../index";

/**
 * Loading component.
 * @param props - Loading props.
 * @returns Header with component name.
 */
export const Loading: React.FC<ILoadingProps> = (props) => {
  const { isLoading, height, weight, position = "absolute" } = props;
  return isLoading ? (
    <div
      className={cn(
        "inset-0 z-30 flex h-full w-full items-center justify-center bg-gray-100 bg-opacity-60",
        position,
        height,
        weight,
      )}
    >
      <div className="flex items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </div>
  ) : undefined;
};
