import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Sheet } from ".";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

export default {
  title: "Sheet",
  component: Sheet,
} as ComponentMeta<typeof Sheet>;

const Template: ComponentStory<typeof Sheet> = (args) => (
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you sure absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

export const Primary = Template.bind({});
Primary.args = {};
