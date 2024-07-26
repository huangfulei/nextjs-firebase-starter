import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Input } from ".";

export default {
  title: "Input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
