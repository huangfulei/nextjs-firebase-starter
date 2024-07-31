"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logEvent } from "firebase/analytics";
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
import { useAuth } from "~/context/AuthContext";
import { useAuthDialogStore } from "~/context/useAuthDialogStore";
import { analytics, getFirebaseAuth } from "~/firebase/client";

export const MyAccount = () => {
  const toastT = useTranslations("toast");
  const generalT = useTranslations("general");
  const usersT = useTranslations("users");
  const { toggleAuthDialog } = useAuthDialogStore();
  const { user } = useAuth();
  const router = useRouter();

  const onSignOut = async () => {
    await getFirebaseAuth().signOut();
    const headers: Record<string, string> = {};

    await fetch("/api/logout", {
      method: "GET",
      headers,
    });
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
    router.refresh();
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
