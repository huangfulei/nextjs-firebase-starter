"use client";

import * as React from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { MyAccount } from "@/components/MyAccount";
import { SearchBar } from "@/components/SearchBar";
import { ShoppingCartIcon } from "@/components/ShoppingCartIcon";
import { navItems } from "@/constants/constants";
import { NAVIGATE_TO_PAGE } from "@/constants/TELEMETRY";
import { analytics } from "@/firebase";
import { Link } from "@/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDisclosure } from "@packages/hooks";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  HStack,
  Text,
  VStack,
} from "@packages/ui";
import { logEvent } from "firebase/analytics";
import { useTranslations } from "next-intl";

/**
 * MobileNav component.
 * @returns Header with component name.
 */
export const MobileNav = () => {
  const { isOpen, toggle } = useDisclosure();
  const t = useTranslations("navigation");

  return (
    <VStack className={"w-full sm:hidden"}>
      <HStack className={"w-full items-center justify-between"}>
        {/*can be replaced with avatar*/}
        {/*<Link href='/'>*/}
        {/*  <Logo title={'Tooling'} />*/}
        {/*</Link>*/}
        <Link
          href={"/"}
          onClick={() => {
            logEvent(analytics, NAVIGATE_TO_PAGE, {
              path: "/",
            });
          }}
        >
          <Text
            className={"ml-2 font-serif text-2xl font-extrabold opacity-80"}
          >
            TUTULY
          </Text>
        </Link>
        <HStack className={"items-center"}>
          {/*<ThemeSelector />*/}
          <LanguageSelector />
          <ShoppingCartIcon />
          <MyAccount />
          <DropdownMenu
            open={isOpen}
            onOpenChange={(open: boolean) => toggle(open)}
          >
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className={"pl-1"}>
                {isOpen ? (
                  <XMarkIcon className={"h-8 w-8"} />
                ) : (
                  <Bars3Icon className={"h-8 w-8"} />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-50 w-40">
              <DropdownMenuGroup>
                {navItems.map((item) => {
                  if (item.subItems) {
                    return (
                      <DropdownMenuSub key={item.name}>
                        <DropdownMenuSubTrigger className={"w-full"}>
                          {t(item.name)}
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {item.subItems.map((subItem) => (
                              <Link
                                href={subItem.href ?? "/"}
                                key={subItem.name}
                                onClick={() => {
                                  logEvent(analytics, NAVIGATE_TO_PAGE, {
                                    path: subItem.href,
                                  });
                                }}
                              >
                                <DropdownMenuItem>
                                  {t(subItem.name)}
                                </DropdownMenuItem>
                              </Link>
                            ))}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    );
                  } else {
                    return (
                      <Link
                        href={item.href ?? "/"}
                        key={item.name}
                        onClick={() => {
                          logEvent(analytics, NAVIGATE_TO_PAGE, {
                            path: item.href,
                          });
                        }}
                      >
                        <DropdownMenuItem>{t(item.name)}</DropdownMenuItem>
                      </Link>
                    );
                  }
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </HStack>
      </HStack>
      <HStack className={"items-center justify-center"}>
        <SearchBar />
      </HStack>
    </VStack>
  );
};
