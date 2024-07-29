"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { logEvent } from "firebase/analytics";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Box,
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  HStack,
  Input,
  Text,
  ToastAction,
  VStack,
} from "@pomotrack/ui";
import { toast } from "@pomotrack/ui/src/hooks/useToast";

import {
  RESET_PASSWORD,
  SIGN_IN_WITH_EMAIL,
  SIGN_IN_WITH_EMAIL_FAILED,
} from "~/constants/TELEMETRY";
import { analytics, auth } from "~/firebase";

// define form schema
export const formSchema = z.object({
  email: z.string().email().min(1).max(50),
  password: z.string().min(1),
});

interface SignInFormProps {
  toggle: (isOpen: boolean) => void;
}

export const SignInForm = (props: SignInFormProps) => {
  const { toggle } = props;
  const toastT = useTranslations("toast");
  const generalT = useTranslations("general");
  const validationT = useTranslations("validation");
  const usersT = useTranslations("users");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = form;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        logEvent(analytics, SIGN_IN_WITH_EMAIL);
        toggle(false);
        reset();
        // Signed in
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
      })
      .catch((error) => {
        logEvent(analytics, SIGN_IN_WITH_EMAIL_FAILED, error.code);
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const resetPassword = async (email: string) => {
    logEvent(analytics, RESET_PASSWORD);
    if (email) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          toast({
            title: toastT("success.title"),
            description: toastT("success.reset_pass_message", { email }),
            action: (
              <ToastAction altText={generalT("close")}>
                {generalT("close")}
              </ToastAction>
            ),
            duration: 5000,
            variant: "success",
          });
        })
        .catch((error) => {
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
    } else {
      //ask the user to enter email first
      toast({
        title: toastT("info.title"),
        description: toastT("info.email_required"),
        action: (
          <ToastAction altText={generalT("close")}>
            {generalT("close")}
          </ToastAction>
        ),
        duration: 5000,
        variant: "info",
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text className="pb-8 text-center text-3xl font-bold">
          {usersT("sign_in")}
        </Text>
        <VStack className="w-full items-center space-y-2">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={generalT("email")} {...field} />
                </FormControl>
                <FormMessage>
                  {errors.email && validationT("required", { field: "email" })}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <HStack className={"items-center justify-end"}>
                    <Input
                      placeholder={generalT("password")}
                      {...field}
                      type={showPassword ? "text" : "password"}
                    />
                    <Box
                      onClick={handleTogglePassword}
                      className={"absolute mr-2 cursor-pointer"}
                    >
                      {showPassword ? (
                        <Eye className={"h-5 w-5"} />
                      ) : (
                        <Eye className={"h-5 w-5"} />
                      )}
                    </Box>
                  </HStack>
                </FormControl>
                <FormMessage>
                  {errors.password &&
                    validationT("required", { field: "password" })}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={"primary"}
            disabled={isLoading || !form.formState.isValid}
            className={"w-full"}
          >
            <span
              className={cn(isLoading ? "loading loading-spinner" : "hidden")}
            ></span>
            {usersT("sign_in")}
          </Button>
          <Text
            className={"link w-fit"}
            onClick={() => resetPassword(getValues("email"))}
          >
            {usersT("forgot_pass")}
          </Text>
        </VStack>
      </form>
    </Form>
  );
};
