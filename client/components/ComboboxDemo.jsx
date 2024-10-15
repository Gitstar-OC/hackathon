import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const metrics = [
  { value: "Emissions per kilogram", label: "Emissions per kilogram" },
  { value: "Emissions per 100 grams of protein", label: "Emissions per 100 grams of protein" },
  { value: "Emissions per 100 grams of fat", label: "Emissions per 100 grams of fat" },
];

export function ComboboxDemo({ selectedMetric, onMetricChange }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedMetric}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select metric..." />
          <CommandList>
            <CommandGroup>
              {metrics.map((metric) => (
                <CommandItem
                  key={metric.value}
                  onSelect={() => {
                    onMetricChange(metric.value);
                    setOpen(false);
                  }}
                >
                  {metric.label}
                  <CheckIcon className={`ml-auto h-4 w-4 ${selectedMetric === metric.value ? "opacity-100" : "opacity-0"}`} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
