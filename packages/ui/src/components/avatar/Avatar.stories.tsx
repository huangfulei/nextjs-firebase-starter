import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Avatar } from ".";
import { AvatarFallback, AvatarImage } from "./Avatar";

export default {
  title: "Avatar",
  component: Avatar,
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => (
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
);

export const Primary = Template.bind({});
Primary.args = {};
