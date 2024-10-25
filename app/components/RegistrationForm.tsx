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
import { Input } from "./ui/input";
import { useAuth } from "providers/AuthProvider";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Zod schema
const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Infer the type from the schema
type FormSchemaType = z.infer<typeof FormSchema>;

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function onSubmit(data: FormSchemaType) {
    register(data.email, data.password, data.username);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Password</FormLabel>
              <FormControl className="relative">
                <div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    {...field}
                    className="pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-0 top-1/2 transform border-y border-r rounded-l-none -translate-y-1/2"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8">
          <Button
            size="lg"
            className="w-full flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
