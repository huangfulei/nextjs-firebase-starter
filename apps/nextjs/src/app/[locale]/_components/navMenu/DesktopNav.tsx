"use client";

import * as React from "react";
import Link from "next/link";
import { logEvent } from "firebase/analytics";

import {
  cn,
  Grid,
  HStack,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  VStack,
} from "@pomotrack/ui";

import { MyAccount } from "~/app/[locale]/_components/MyAccount";
import { ThemeSelector } from "~/app/[locale]/_components/ThemeSelector";
import { navItems } from "~/constants/APP";
import { NAVIGATE_TO_PAGE } from "~/constants/TELEMETRY";
import { analytics } from "~/firebase/client";

/**
 * DesktopNav component.
 * @returns Header with component name.
 */
export const DesktopNav = () => {
  // const t = useTranslations("navigation");
  return (
    <VStack className={"hidden w-full sm:flex"}>
      <Grid className={"mt-1 grid-cols-3"}>
        <Link
          href={"/"}
          className={
            "w-fit place-content-start font-serif text-5xl font-extrabold opacity-80"
          }
          onClick={() => {
            logEvent(analytics, NAVIGATE_TO_PAGE, {
              path: "/",
            });
          }}
        >
          Pomotrack
        </Link>
        {/*<Box className={"place-content-center"}>*/}
        {/*  <SearchBar />*/}
        {/*</Box>Box*/}
        <HStack className={"place-content-end items-center"}>
          <MyAccount />
          {/*<ShoppingCart />*/}
          <ThemeSelector />
          {/*<LanguageSelector />*/}
        </HStack>
      </Grid>
      <HStack className={"mt-2 items-center justify-between"}>
        {/*this can be replaced with avatar*/}
        {/*<Logo title={'Tooling'} />*/}
        {/*<Link href={"/"}>*/}
        {/*  <Avatar className={"mx-2 h-14 w-14"}>*/}
        {/*    <Image src={avatarUrl} alt={avatarUrl} fill />*/}
        {/*    <AvatarFallback>T</AvatarFallback>*/}
        {/*  </Avatar>*/}
        {/*</Link>*/}
        {/*<HStack>*/}
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => {
              if (item.subItems) {
                return (
                  <NavigationMenu key={item.name} delayDuration={0}>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        {/*{t(item.name)}*/}
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {/*{item.subItems.map((subItem) => (*/}
                        {/*  // <Link*/}
                        {/*  //     href={subItem.href ?? "/"}*/}
                        {/*  //     legacyBehavior*/}
                        {/*  //     passHref*/}
                        {/*  //     key={subItem.name}*/}
                        {/*  // >*/}
                        {/*  <NavigationMenuLink*/}
                        {/*    onClick={() => {*/}
                        {/*      logEvent(analytics, NAVIGATE_TO_PAGE, {*/}
                        {/*        path: subItem.href,*/}
                        {/*      });*/}
                        {/*    }}*/}
                        {/*    className={cn(*/}
                        {/*      navigationMenuTriggerStyle(),*/}
                        {/*      "mr-8 w-full justify-start",*/}
                        {/*    )}*/}
                        {/*  >*/}
                        {/*    /!*{t(subItem.name)}*!/*/}
                        {/*    {subItem.name}*/}
                        {/*  </NavigationMenuLink>*/}
                        {/*  // </Link>*/}
                        {/*))}*/}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuIndicator />
                  </NavigationMenu>
                );
              } else {
                return (
                  <NavigationMenuItem key={item.name}>
                    {/*<Link href={item.href ?? "/"} legacyBehavior passHref>*/}
                    <NavigationMenuLink
                      onClick={() => {
                        logEvent(analytics, NAVIGATE_TO_PAGE, {
                          path: item.href,
                        });
                      }}
                      className={navigationMenuTriggerStyle()}
                    >
                      {/*{t(item.name)}*/}
                      {item.name}
                    </NavigationMenuLink>
                    {/*</Link>*/}
                  </NavigationMenuItem>
                );
              }
            })}
          </NavigationMenuList>
          <NavigationMenuIndicator />
        </NavigationMenu>
      </HStack>
    </VStack>
  );
};
