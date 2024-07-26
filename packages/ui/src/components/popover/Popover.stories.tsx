import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { Heart } from "lucide-react";

import { Popover } from ".";
import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { PopoverContent, PopoverTrigger } from "./Popover";

export default {
  title: "Popover",
  component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button className="w-12 rounded-full p-0">
        <Heart className="h-4 w-4" />
        <span className="sr-only">Open popover</span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-80">
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Set the dimensions for the layer.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input
              id="maxWidth"
              defaultValue="300px"
              className="col-span-2 h-8"
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input
              id="maxHeight"
              defaultValue="none"
              className="col-span-2 h-8"
            />
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export const Primary = Template.bind({});
Primary.args = {};
