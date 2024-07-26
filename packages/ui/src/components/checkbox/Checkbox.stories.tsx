import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Checkbox } from ".";
import { HStack } from "../../layouts";
import { Label } from "../label";

export default {
  title: "Checkbox",
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <HStack className="mt-4 items-center space-x-2">
    <Checkbox
      id="register"
      checked={true}
      onCheckedChange={
        (checked: boolean) => {}
        // toggleAuthDialog(checked)
      }
    />
    <Label
      htmlFor="register"
      className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      {/*{checkoutT("register")}*/}
    </Label>
  </HStack>
);

export const Primary = Template.bind({});
Primary.args = {
  value: "checkbox",
};
