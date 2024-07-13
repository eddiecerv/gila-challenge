"use client";

import { signIn } from "@/server/auth.actions";
import { setCookie } from "@/server/services/cookies.service";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const SignInFormSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z
    .string({
      required_error: "Please add a valid password",
    })
    .min(3, "Your password should be more than 6 chars"),
});

type Inputs = z.infer<typeof SignInFormSchema>;

export default function SignInForm() {
  const toast = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
    resolver: zodResolver(SignInFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (payload) => {
    const validateSchema = SignInFormSchema.safeParse(payload);

    if (!validateSchema.success) {
      return;
    }

    setSubmitted(true);

    await signIn(payload)
      .then((resp) => {
        // Set Cookie
        setCookie("access_token", resp.access_token, 1);
        router.push("/home");
      })
      .catch(() => {
        toast({
          status: "error",
          title: "Error",
          description:
            "Account information is not valid, please provide a correct account",
        });
      });

    setSubmitted(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} mb={4}>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>Email*</FormLabel>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email?.message}>
          <FormLabel>Password*</FormLabel>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl>
          <Button
            width="100%"
            type="submit"
            colorScheme="blue"
            variant="outline"
            isDisabled={isSubmitted}
          >
            {isSubmitted ? "Signing in..." : "Sign In"}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
}
