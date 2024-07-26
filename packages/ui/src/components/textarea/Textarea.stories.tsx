import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Textarea } from ".";

export default {
  title: "Textarea",
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  placeholder: "Placeholder",
};
