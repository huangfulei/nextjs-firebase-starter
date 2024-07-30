"use client";

import { useEffect } from "react";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { onAuthStateChanged } from "firebase/auth";
import { Heart, User } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  ToastAction,
} from "@pomotrack/ui";
import { toast } from "@pomotrack/ui/src/hooks/useToast";

import { SignInDialog } from "~/app/[locale]/_components/SignInDialog";
import { SIGN_OUT } from "~/constants/TELEMETRY";
import { useAuthStore } from "~/context/useAuthStore";
import { analytics, auth } from "~/firebase";

export const MyAccount = () => {
  const toastT = useTranslations("toast");
  const generalT = useTranslations("general");
  const usersT = useTranslations("users");
  const { user, setUser, toggleAuthDialog } = useAuthStore();

  useEffect(() => {
    void onAuthStateChanged(auth, (user) => {
      if (user) {
        // get user from db
        // const customer = await getUserById(user.uid);
        // if (customer.address?.country) {
        //   void setCountryCode(customer.address?.country);
        // }
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  const onSignOut = async () => {
    await auth.signOut();
    logEvent(analytics, SIGN_OUT);
    toast({
      title: toastT("success.title"),
      description: toastT("success.log_out"),
      action: (
        <ToastAction altText={generalT("close")}>
          {generalT("close")}
        </ToastAction>
      ),
      duration: 5000,
      variant: "success",
    });
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User className="mr-2 h-6 w-6 hover:cursor-pointer hover:opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 w-40">
            <Link href={"/user/profile"}>
              <DropdownMenuItem>{usersT("profile")}</DropdownMenuItem>
            </Link>
            <Link href={"/user/wishlist"}>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                {usersT("wishlist")}
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={onSignOut}>sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          variant={"ghost"}
          onClick={() => toggleAuthDialog(true)}
          className={"px-1 sm:px-2"}
        >
          sign in
        </Button>
      )}
      <SignInDialog />
    </>
  );
};
