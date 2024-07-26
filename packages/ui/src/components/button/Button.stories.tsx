import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Button } from ".";

export default {
  title: "Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>Click Me</Button>
);

export const Primary = Template.bind({});
Primary.args = {};
