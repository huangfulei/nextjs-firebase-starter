import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Loading } from ".";

export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
