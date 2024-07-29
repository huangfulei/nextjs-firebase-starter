import * as React from "react";

import { cn } from "@pomotrack/ui/src";
import { Button } from "@pomotrack/ui/src/components/button";
import { Container } from "@pomotrack/ui/src/layouts";

import { DesktopNav } from "~/components/DesktopNav";

/**
 * NavMenuContainer component.
 * @returns Header with component name.
 */
export const NavMenuContainer = () => {
  return (
    <Container
      id={"navbar"}
      className={cn(
        // `${MenuBarHeightMobile} md:${MenuBarHeight}`,
        "z-40 flex items-center rounded-xl bg-base-100 bg-opacity-90 p-2",
      )}
    >
      <Button>test button</Button>
      <DesktopNav />
      {/*<MobileNav />*/}
      {/*<ShoppingCart />*/}
    </Container>
  );
};
