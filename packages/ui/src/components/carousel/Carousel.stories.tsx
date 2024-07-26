import * as React from "react";
import { type ComponentMeta, type ComponentStory } from "@storybook/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from ".";
import { Container } from "../../layouts";
import { Card, CardContent } from "../card";

export default {
  title: "Carousel",
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => (
  <Container size={"sm"} className={"my-20"}>
    <Carousel
      // orientation={"vertical"}
      opts={{
        containScroll: "keepSnaps",
        dragFree: true,
        align: "end",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent className={"h-48"}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </Container>
);

export const Primary = Template.bind({});
Primary.args = {};
