import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Select } from ".";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select";

export default {
  title: "Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => (
  <Select defaultValue={"dark"}>
    <SelectTrigger className="w-[180px]">
      <SelectValue placeholder="Theme" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectContent>
  </Select>
);
export const Primary = Template.bind({});
Primary.args = {};
