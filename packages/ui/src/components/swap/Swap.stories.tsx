import type { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Swap } from ".";

export default {
  title: "Swap",
  component: Swap,
} as ComponentMeta<typeof Swap>;

const Template: ComponentStory<typeof Swap> = (args) => <Swap {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  className: "swap-rotate",
  before: <Sun className={"swap-on"} />,
  after: <Moon className={"swap-off"} />,
};
