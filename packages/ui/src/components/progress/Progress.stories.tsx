import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Progress } from ".";

export default {
  title: "Progress",
  component: Progress,
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress value={33} max={100} />
);
export const Primary = Template.bind({});
Primary.args = {};
