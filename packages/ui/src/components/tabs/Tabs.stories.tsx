import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Tabs } from ".";
import { TabsContent, TabsList, TabsTrigger } from "./Tabs";

export default {
  title: "Tabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = () => (
  <Tabs defaultValue="account" className="w-[400px]">
    <TabsList>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Make changes to your account here. Click save when you&apos;re done.
      </p>
    </TabsContent>
    <TabsContent value="password">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Change your password here. After saving, you&apos;ll be logged out.
      </p>
    </TabsContent>
  </Tabs>
);
export const Primary = Template.bind({});
Primary.args = {};
