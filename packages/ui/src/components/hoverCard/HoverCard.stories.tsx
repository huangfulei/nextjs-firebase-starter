import * as React from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { HoverCard } from ".";
import { Button } from "../button";
import { HoverCardContent, HoverCardTrigger } from "./HoverCard";

export default {
  title: "HoverCard",
  component: HoverCard,
} as ComponentMeta<typeof HoverCard>;

const Template: ComponentStory<typeof HoverCard> = (args) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button>@nextjs</Button>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">@nextjs</h4>
          <p className="text-sm">
            The React Framework – created and maintained by @vercel.
          </p>
          <div className="flex items-center pt-2">
            <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export const Primary = Template.bind({});
Primary.args = {};
