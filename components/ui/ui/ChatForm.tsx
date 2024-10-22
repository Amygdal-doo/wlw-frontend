"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/input";
import { ArrowUp } from "lucide-react";
import axios from "axios";

// Zod schema
const FormSchema = z.object({
  content: z.string().optional(),
});

// Infer the type from the schema
type FormSchemaType = z.infer<typeof FormSchema>;

export function ChatForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: FormSchemaType) {
    console.log("data", data);

    const chatId = "6717b055c6b9ab19b998a8d7"; // Replace this with the actual chat ID.
    const url = `https://wlw-backend-production.up.railway.app/api/chat/${chatId}`;

    try {
      const response = await axios.post(url, {
        messages: [],
        message: { role: "user", content: data.content || "" },
      });

      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex max-w-xl items-center justify-between space-x-5"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="type here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          size="lg"
          className="flex rounded-full justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
          type="submit"
        >
          <ArrowUp />
        </Button>
      </form>
    </Form>
  );
}
