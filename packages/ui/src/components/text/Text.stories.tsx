import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Text } from ".";

export default {
  title: "Text",
  component: Text,
} as ComponentMeta<typeof Text>;

const template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = template.bind({});
Primary.args = {
  children: "Text",
};
