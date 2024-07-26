import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Calendar } from ".";

export default {
  title: "Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
