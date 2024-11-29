import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TbCheck } from "react-icons/tb";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "../../ui/command";
import { ScrollArea } from "../../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { cn } from "../../lib/utils";

import { AimComponentStore, BaseComponentProps } from "../types";

export interface CommandProps extends BaseComponentProps {
  value: string
  emptyPlaceholder?: string
  searchPlaceholder?: string
  options: Array<{
    value: string,
    label: string,
  }>
  filterOptions?: Record<string, Array<{
    value: string,
    label: string,
  }>>
  useFilterHide?: boolean
  filterKey?: string
  formData?: Record<string, any>
}

// Set component props
export const properties: AimComponentStore["properties"] = [];

// Default props data of component instance
export const data: AimComponentStore["data"] = {};

export default function ({ value, className, placeholder, emptyPlaceholder, searchPlaceholder, updateProps, onOpenChange, options = [],
  filterKey = "", useFilterHide = false, filterOptions = {}, formData = {}, label }: CommandProps) {
  const { t } = useTranslation();

  const handleChange = (v: string) => {
    updateProps && updateProps("value", v);
  };
  let ops = options;
  let hidden;
  if (filterKey) {
    ops = filterOptions[formData[filterKey]];
    if (useFilterHide && (!ops || ops.length === 0)) {
      hidden = true;
    }
  }

  const currentLanguage = ops.find((item) => item.value === value)?.label;

  return hidden ? null : <>
    {
      label && <div className="mb-2 mt-4">{t(label)}</div>
    }
    <Select onOpenChange={onOpenChange}>
      <SelectTrigger>
        <SelectValue className={clsx([className])} placeholder={currentLanguage ? t(currentLanguage) : t(placeholder || "Select")} />
      </SelectTrigger>
      <SelectContent>
        <Command>
          <CommandInput placeholder={t(searchPlaceholder || "tts.search content")!} className="h-9" />
          <CommandEmpty>{t(emptyPlaceholder || "tts.no content")}</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-72">
              {
                ops && ops.length > 0 && ops.map((option, index) => <CommandItem key={option.value + index} onSelect={() => { handleChange(option.value); }}
                >
                  {t(option.label)}
                  <TbCheck className={cn("ml-auto h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>)
              }
            </ScrollArea>
          </CommandGroup>
        </Command>
      </SelectContent>
    </Select>
  </>;

}
