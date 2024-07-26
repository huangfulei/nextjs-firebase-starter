import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { ScrollArea } from ".";
import { ScrollBar } from "./ScrollArea";

export default {
  title: "ScrollArea",
  component: ScrollArea,
} as ComponentMeta<typeof ScrollArea>;

const Template: ComponentStory<typeof ScrollArea> = (args) => (
  <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
    <div className="h-[500px] w-[500px] rounded-md bg-slate-300 dark:bg-slate-700">
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the kings pillow, in his soup,
      even in the royal toilet. The king was furious, but he couldnt seem to
      stop Jokester. And then, one day, the people of the kingdom discovered
      that the jokes left by Jokester were so funny that they couldnt help but
      laugh. And once they started laughing, they couldnt stop.
    </div>
    <ScrollBar orientation="horizontal" />
    <ScrollBar orientation="vertical" />
  </ScrollArea>
);
export const Primary = Template.bind({});
Primary.args = {};
