"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FaChevronRight } from "react-icons/fa";

const formSchema = z.object({
  input: z.string().min(2, {
    message: "Input must be at least 2 characters.",
  }),
});

interface FormQuestionProps {
  title: string;
  placeholder: string;
  desc: string;
  onSuccessfulSubmit: () => void;
  valueOfUser: (userResponse: string) => Promise<void>;
}

export function FormQuestion({
  title,
  placeholder,
  desc,
  onSuccessfulSubmit,
  valueOfUser,
}: FormQuestionProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values);
    form.reset({ input: "" });
    onSuccessfulSubmit();
    valueOfUser(values.input);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{title}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormDescription>{desc}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="outline" size="icon">
          <FaChevronRight className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}
