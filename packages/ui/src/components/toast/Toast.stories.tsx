import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Toast } from ".";
import { toast } from "../../hooks/useToast";
import { Button } from "../button";
import { ToastAction } from "./Toast";
import { Toaster } from "./Toaster";

export default {
  title: "Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => {
  return (
    <>
      <Toaster />
      <Button
        onClick={() => {
          toast({ ...args });
        }}
      >
        Show Toast
      </Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Scheduled: Catch up ",
  // @ts-ignore
  description: "Friday, February 10, 2023 at 5:57 PM",
  action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
  duration: 5000,
  className: "flex",
};
