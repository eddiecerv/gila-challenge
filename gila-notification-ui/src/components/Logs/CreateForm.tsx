"use client";

import { createNotification } from "@/server/notifications.actions";
import { Category } from "@/shared/types/category.type";
import { Log } from "@/shared/types/log.type";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const LogFormSchema = z.object({
  categoryId: z.string({
    required_error: "You need to choose a category",
  }),
  message: z.string({
    required_error: "Please add a message for this notification",
  }),
});

type Inputs = z.infer<typeof LogFormSchema>;

type Props = {
  categories: Category[];
  onCreate: (logs: Log[]) => void;
};

export default function CreateForm({ categories, onCreate }: Props) {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
    resolver: zodResolver(LogFormSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (payload) => {
    const validateSchema = LogFormSchema.safeParse(payload);

    if (!validateSchema.success) {
      return;
    }

    setSubmitted(true);

    await createNotification(payload)
      .then((res) => {
        formRef.current?.reset();
        onCreate(res);
        toast({
          status: "success",
          description: "Notification has been sent to all suscribers",
          title: "Success",
        });
      })
      .catch((e) => {
        toast({
          status: "error",
          description:
            "There was an error on sending notification. Please try again.",
          title: "Error",
        });
      });

    setSubmitted(false);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} mb={4}>
        <FormControl isInvalid={!!errors.categoryId?.message}>
          <FormLabel>Category*</FormLabel>
          <Select placeholder="Category" {...register("categoryId")}>
            {categories.map((c) => (
              <option key={c.tag} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
          {errors.categoryId && (
            <FormErrorMessage>{errors.categoryId.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.categoryId?.message}>
          <FormLabel>Message*</FormLabel>
          <Textarea
            rows={2}
            placeholder="Message to send"
            {...register("message")}
          />
          {errors.categoryId && (
            <FormErrorMessage>{errors.categoryId.message}</FormErrorMessage>
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
            Send
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
}
