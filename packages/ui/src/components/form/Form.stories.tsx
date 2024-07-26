import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from ".";
import { Button } from "../button";
import { Input } from "../input";

export default {
  title: "Form",
  component: Form,
} as ComponentMeta<typeof Form>;

// define form schema
const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const Template: ComponentStory<typeof Form> = (args) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
