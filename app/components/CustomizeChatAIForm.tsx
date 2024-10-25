"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { apiService } from "core/services/apiService";
import { useToast } from "hooks/use-toast";
import { useSettings } from "providers/SettingsProvider";
import { useEffect } from "react";

// Zod schema
const FormSchema = z.object({
  howToAnswer: z
    .string()
    .max(1000, { message: "Must be at most 1000 characters." })
    .optional(), // Optional allows it to be empty
  betterAnswers: z
    .string()
    .max(1000, { message: "Must be at most 1000 characters." })
    .optional(),
});

// Infer the type from the schema
type FormSchemaType = z.infer<typeof FormSchema>;

export function CustomizeChatAIForm() {
  const { toast } = useToast();
  const { instructions, fetchInstructions } = useSettings();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      howToAnswer: "",
      betterAnswers: "",
    },
  });

  // Reset form values when instructions data changes
  useEffect(() => {
    if (instructions) {
      form.reset({
        howToAnswer: instructions.howToAnswer || "",
        betterAnswers: instructions.betterAnswers || "",
      });
    }
  }, [instructions, form]);

  async function onSubmit(data: FormSchemaType) {
    try {
      apiService.patch("instructions", data);
      await fetchInstructions();

      toast({
        variant: "success",
        title: "Congratulations",
        description: "You have successfully save your settings!",
      });
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="howToAnswer"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>
                What would you like Chat AI to know about you to provide better
                responses?
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="betterAnswers"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>How would you like ChatGPT to respond?</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant="secondary">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
