import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { AspectRatio } from ".";
import { Box } from "../../layouts";

export default {
  title: "AspectRatio",
  component: AspectRatio,
} as ComponentMeta<typeof AspectRatio>;

const Template: ComponentStory<typeof AspectRatio> = (args) => (
  <Box className="w-[450px]">
    <AspectRatio ratio={16 / 9} asChild={true}>
      <img
        src="https://images.unsplash.com/photo-1576075796033-848c2a5f3696?w=800&dpr=2&q=80"
        alt="Photo by Alvaro Pinot"
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  </Box>
);

export const Primary = Template.bind({});
Primary.args = {};
