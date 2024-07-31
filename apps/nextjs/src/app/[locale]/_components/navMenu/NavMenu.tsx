import * as React from "react";

import { cn } from "@pomotrack/ui/src";
import { Container } from "@pomotrack/ui/src/layouts";

import { DesktopNav } from "~/app/[locale]/_components/navMenu/DesktopNav";

/**
 * NavMenuContainer component.
 * @returns Header with component name.
 */
export const NavMenu = () => {
  return (
    <Container
      id={"navbar"}
      className={cn(
        // `${MenuBarHeightMobile} md:${MenuBarHeight}`,
        "z-40 flex items-center rounded-xl bg-base-100 bg-opacity-90 p-2",
      )}
    >
      <DesktopNav />
      {/*<MobileNav />*/}
      {/*<ShoppingCart />*/}
    </Container>
  );
};
