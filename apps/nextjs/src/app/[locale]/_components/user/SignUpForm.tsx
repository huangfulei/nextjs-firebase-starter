"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { logEvent } from "firebase/analytics";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Eye } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
  SIGN_UP_WITH_EMAIL,
  SIGN_UP_WITH_EMAIL_FAILED,
} from "~/constants/TELEMETRY";
import { analytics, getFirebaseAuth } from "~/firebase/client";

// define form schema
export const formSchema = z
  .object({
    email: z.string().email().min(1).max(50),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword && password !== confirmPassword) {
      // https://stackoverflow.com/questions/76886215/how-use-react-password-checklist-with-zod
      ctx.addIssue({
        code: "custom",
        message: "not_match",
        path: ["confirmPassword"],
      });
    }
  });

interface SignUpFormProps {
  toggle: (isOpen: boolean) => void;
}

export const SignUpForm = (props: SignUpFormProps) => {
  const { toggle } = props;
  const toastT = useTranslations("toast");
  const generalT = useTranslations("general");
  const validationT = useTranslations("validation");
  const usersT = useTranslations("users");
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      logEvent(analytics, SIGN_UP_WITH_EMAIL);

      const credential = await createUserWithEmailAndPassword(
        getFirebaseAuth(),
        data.email,
        data.password,
      );

      // await createUser(response.user.uid, data.email, data.email, locale);
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      toast({
        title: toastT("success.title"),
        description: toastT("success.sign_up"),
        action: (
          <ToastAction altText={generalT("close")}>
            {generalT("close")}
          </ToastAction>
        ),
        duration: 5000,
        variant: "success",
      });
    } catch (error) {
      logEvent(analytics, SIGN_UP_WITH_EMAIL_FAILED, error.code);
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
    } finally {
      router.refresh();
      setIsLoading(false);
      toggle(false);
      reset();
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text className="pb-8 text-center text-3xl font-bold">
          {usersT("sign_up")}
        </Text>
        <VStack className="w-full space-y-2">
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
          <FormField
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <HStack className={"items-center justify-end"}>
                    <Input
                      placeholder={generalT("confirm_password")}
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
                  {errors.confirmPassword &&
                    validationT("required", { field: "confirmPassword" })}
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
            {usersT("sign_up")}
          </Button>
        </VStack>
      </form>
    </Form>
  );
};
