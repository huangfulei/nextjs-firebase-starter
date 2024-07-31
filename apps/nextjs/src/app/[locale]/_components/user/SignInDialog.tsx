"use client";

import type { Auth, AuthProvider, UserCredential } from "firebase/auth";
import { logEvent } from "firebase/analytics";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";

import {
  Button,
  Dialog,
  DialogContent,
  Separator,
  Tabs,
  ToastAction,
  VStack,
} from "@pomotrack/ui";
import {
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pomotrack/ui/src/components/tabs/Tabs";
import { toast } from "@pomotrack/ui/src/hooks/useToast";

import { SignInForm } from "~/app/[locale]/_components/user/SignInForm";
import { SignUpForm } from "~/app/[locale]/_components/user/SignUpForm";
import {
  SIGN_IN_WITH_FACEBOOK,
  SIGN_IN_WITH_FACEBOOK_FAILED,
  SIGN_IN_WITH_GOOGLE,
  SIGN_IN_WITH_GOOGLE_FAILED,
  SIGN_UP_WITH_FACEBOOK,
  SIGN_UP_WITH_GOOGLE,
} from "~/constants/TELEMETRY";
import { useAuthDialogStore } from "~/context/useAuthDialogStore";
import { analytics, db, getFirebaseAuth } from "~/firebase/client";

export const SignInDialog = () => {
  const toastT = useTranslations("toast");
  const generalT = useTranslations("general");
  const usersT = useTranslations("users");
  const locale = useLocale();
  const { isAuthDialogOpen, toggleAuthDialog } = useAuthDialogStore();

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await handleSignInWithPopup(getFirebaseAuth(), provider, "google");
  };

  const handleSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    await handleSignInWithPopup(getFirebaseAuth(), provider, "facebook");
  };

  const handleSignInWithPopup = async (
    auth: Auth,
    provider: AuthProvider,
    providerName: string,
  ) => {
    await signInWithPopup(auth, provider)
      .then(async (response: UserCredential) => {
        toggleAuthDialog(false);
        toast({
          title: toastT("success.title"),
          description: toastT("success.signed_in"),
          action: (
            <ToastAction altText={generalT("close")}>
              {generalT("close")}
            </ToastAction>
          ),
          duration: 5000,
          variant: "success",
        });

        const docSnap = await getDoc(doc(db, "users", response.user.uid));
        // if not exist create new user
        if (!docSnap.exists()) {
          switch (providerName) {
            case "google":
              logEvent(analytics, SIGN_UP_WITH_GOOGLE);
              break;
            case "facebook":
              logEvent(analytics, SIGN_UP_WITH_FACEBOOK);
              break;
          }
          // create customer doc in DB
          // await createUser(
          //   response.user.uid,
          //   response.user?.displayName ??
          //     response.user?.email?.split("@")[0] ??
          //     "Me",
          //   response.user.email ?? "Anonymous",
          //   locale,
          // );
        } else {
          switch (providerName) {
            case "google":
              logEvent(analytics, SIGN_IN_WITH_GOOGLE);
              break;
            case "facebook":
              logEvent(analytics, SIGN_IN_WITH_FACEBOOK);
              break;
          }
        }
      })
      .catch((error) => {
        switch (providerName) {
          case "google":
            logEvent(analytics, SIGN_IN_WITH_GOOGLE_FAILED);
            break;
          case "facebook":
            logEvent(analytics, SIGN_IN_WITH_FACEBOOK_FAILED);
            break;
        }
        toast({
          title: toastT("error.title"),
          description: error.code,
          action: (
            <ToastAction altText={generalT("close")}>
              {generalT("close")}
            </ToastAction>
          ),
          duration: 5000,
          variant: "error",
        });
      });
  };

  return (
    <Dialog
      open={isAuthDialogOpen}
      onOpenChange={() => toggleAuthDialog(false)}
    >
      <DialogContent className="px-6 sm:max-w-[425px] lg:px-8">
        <Tabs defaultValue="sign_up" className="">
          <TabsList className={"w-full"}>
            <TabsTrigger value="sign_up" className={"w-full"}>
              {usersT("sign_up")}
            </TabsTrigger>
            <TabsTrigger value="sign_in" className={"w-full"}>
              {usersT("sign_in")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sign_up">
            <SignUpForm toggle={toggleAuthDialog} />
          </TabsContent>
          <TabsContent value="sign_in">
            <SignInForm toggle={toggleAuthDialog} />
          </TabsContent>
        </Tabs>
        <Separator className={"my-6"}>
          {/*<Text className={"text-sm"}>{usersT("or_login")}</Text>*/}
        </Separator>

        <VStack className={"w-full space-y-2 pb-4"}>
          <Button variant={"outline"} onClick={handleSignInWithGoogle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="2.5em"
              height="2.5em"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            Google
          </Button>
          <Button variant={"outline"} onClick={handleSignInWithFacebook}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="2.5em"
              height="2.5em"
              viewBox="0 0 48 48"
            >
              <path
                fill="#039be5"
                d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
              ></path>
              <path
                fill="#fff"
                d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
              ></path>
            </svg>
            FaceBook
          </Button>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
