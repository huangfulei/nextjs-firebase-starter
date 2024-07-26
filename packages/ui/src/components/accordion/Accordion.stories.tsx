import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import { Accordion } from ".";
import { AccordionContent, AccordionItem, AccordionTrigger } from "./Accordion";

export default {
  title: "Accordion",
  component: Accordion,
} as ComponentMeta<typeof Accordion>;

const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Is it styled?</AccordionTrigger>
      <AccordionContent>
        Yes. It comes with default styles that matches the other components
        aesthetic.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Is it animated?</AccordionTrigger>
      <AccordionContent>
        Yes. Its animated by default, but you can disable it if you prefer.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

export const Primary = Template.bind({});
Primary.args = {};
