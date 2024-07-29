import type { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from ".";
import { cn } from "../../index";
import { Button } from "../button";
import { Switch } from "../switch";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const Template: ComponentStory<typeof Card> = (args) => (
  <Card className={cn("w-[380px]")} {...args}>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="flex items-center space-x-4 rounded-md border p-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Push Notifications</p>
          <p className="text-muted-foreground text-sm">
            Send notifications to device.
          </p>
        </div>
        <Switch />
      </div>
      <div>
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {notification.title}
              </p>
              <p className="text-muted-foreground text-sm">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Mark all as read</Button>
    </CardFooter>
  </Card>
);
export const Primary = Template.bind({});
Primary.args = {};
