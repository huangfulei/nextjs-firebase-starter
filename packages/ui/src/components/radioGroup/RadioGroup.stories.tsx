import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { RadioGroup } from ".";
import { Label } from "../label";
import { RadioGroupItem } from "./RadioGroup";

export default {
  title: "RadioGroup",
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => (
  <RadioGroup defaultValue="option-one">
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-one" id="option-one" />
      <Label htmlFor="option-one">Option One</Label>
    </div>
    <div className="flex items-center space-x-2">
      <RadioGroupItem value="option-two" id="option-two" />
      <Label htmlFor="option-two">Option Two</Label>
    </div>
  </RadioGroup>
);
export const Primary = Template.bind({});
Primary.args = {};
