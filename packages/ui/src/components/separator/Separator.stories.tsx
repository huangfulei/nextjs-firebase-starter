import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Separator } from ".";

export default {
  title: "Separator",
  component: Separator,
} as ComponentMeta<typeof Separator>;

const Template: ComponentStory<typeof Separator> = (args) => (
  <Separator {...args} />
);

export const Vertical = Template.bind({});
Vertical.args = {
  // className: 'divider-horizontal'
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  className: "divider-horizontal",
};
