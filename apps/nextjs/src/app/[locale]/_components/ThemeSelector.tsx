"use client";

import * as React from "react";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pomotrack/ui";

import { useThemeStore } from "~/context/useThemeStore";

interface IThemeSelectorProps {
  className?: string;
}

/**
 * ThemeSelector component.
 * @param props - ThemeSelector props.
 * @returns Header with component name.
 */
export const ThemeSelector = (props: IThemeSelectorProps) => {
  const { className } = props;
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    // get theme from local storage
    if (localStorage.getItem("theme")) {
      const currentTheme = localStorage.getItem("theme");
      if (currentTheme) {
        setTheme(currentTheme);
      }
      return;
    }

    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkThemeMq.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  return (
    <Select defaultValue={"dark"} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="cupcake">Cupcake</SelectItem>
        <SelectItem value="luxury">Luxury</SelectItem>
      </SelectContent>
    </Select>
    // <Swap
    //   className={cn("btn btn-ghost px-1 sm:px-2", className)}
    //   checked={theme === "dark"}
    //   onSwap={(value: boolean) => {
    //     setTheme(value ? "dark" : "light");
    //     // logEvent(analytics, CHANGE_THEME, { theme: value ? "dark" : "light" });
    //   }}
    //   before={
    //     <HStack className={"swap-off items-center"}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    //         />
    //       </svg>
    //     </HStack>
    //   }
    //   after={
    //     <HStack className={"swap-on items-center"}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         strokeWidth={1.5}
    //         stroke="currentColor"
    //         className="h-6 w-6"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    //         />
    //       </svg>
    //     </HStack>
    //   }
    // />
  );
};
