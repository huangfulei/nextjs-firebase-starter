import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Badge } from ".";

export default {
  title: "Badge",
  component: Badge,
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => (
  <Badge {...args}>Badge</Badge>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "default",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
};
