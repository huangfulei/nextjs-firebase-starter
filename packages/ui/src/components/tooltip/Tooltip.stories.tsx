import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Tooltip } from ".";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <TooltipProvider delayDuration={100}>
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
export const Primary = Template.bind({});
Primary.args = {};
