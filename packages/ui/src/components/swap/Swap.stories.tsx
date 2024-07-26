import * as React from "react";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Swap } from ".";

export default {
  title: "Swap",
  component: Swap,
} as ComponentMeta<typeof Swap>;

const Template: ComponentStory<typeof Swap> = (args) => <Swap {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: "swap-rotate",
  before: <SunIcon className={"swap-on"} />,
  after: <MoonIcon className={"swap-off"} />,
};
