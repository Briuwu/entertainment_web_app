"use client";
import Image from "next/image";
import { Button } from "./ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  search: z
    .string({
      message: "Please enter a valid search term",
    })
    .min(2, {
      message: "Search term must be at least 2 characters",
    })
    .max(50),
});

export const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex items-center"
        >
          <Button
            variant={"ghost"}
            type="submit"
            className="p-0 hover:scale-105 hover:bg-transparent"
          >
            <Image
              src="/assets/icon-search.svg"
              alt=""
              width={32}
              height={32}
            />
          </Button>
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for movies or TV series"
                    {...field}
                    className="border-0 bg-transparent text-white"
                  />
                </FormControl>
                <FormMessage className="absolute text-xs" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
