import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Toggle } from ".";

export default {
  title: "Toggle",
  component: Toggle,
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = (args) => (
  <Toggle {...args}>Toggle</Toggle>
);

export const Primary = Template.bind({});
Primary.args = {};
