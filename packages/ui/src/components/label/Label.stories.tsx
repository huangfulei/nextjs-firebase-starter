import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Label } from ".";

export default {
  title: "Label",
  component: Label,
} as ComponentMeta<typeof Label>;

const Template: ComponentStory<typeof Label> = (args) => (
  <Label htmlFor="email">Your email address</Label>
);

export const Primary = Template.bind({});
Primary.args = {};
