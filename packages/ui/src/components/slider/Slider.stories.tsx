import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Slider } from ".";

export default {
  title: "Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => (
  <Slider defaultValue={[33]} max={100} step={1} />
);

export const Primary = Template.bind({});
Primary.args = {};
