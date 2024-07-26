import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Switch } from ".";

export default {
  title: "Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
