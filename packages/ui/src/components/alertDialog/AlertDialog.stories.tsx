import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { AlertDialog } from ".";
import { Button } from "../button";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./AlertDialog";

export default {
  title: "AlertDialog",
  component: AlertDialog,
} as ComponentMeta<typeof AlertDialog>;

const Template: ComponentStory<typeof AlertDialog> = (args) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Alert</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export const Primary = Template.bind({});
Primary.args = {};
