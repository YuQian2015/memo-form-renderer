import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { ScrollArea } from "../../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

import { AimComponentStore, BaseComponentProps } from "../types";

export interface SelectProps extends BaseComponentProps {
  value: string
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

export default function ({ value, className, placeholder, updateProps, onOpenChange, options = [],
  filterKey = "", useFilterHide = false, filterOptions = {}, formData = {}, label }: SelectProps) {
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

  return hidden ? null : <>
    {
      label && <div className="mb-2 mt-4">{t(label)}</div>
    }
    <Select value={value} onOpenChange={onOpenChange} onValueChange={handleChange}>
      <SelectTrigger className={clsx([className])}>
        <SelectValue placeholder={t(placeholder || "Select")} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-56">
          {
            ops && ops.length > 0 && ops.map((option, index) => <SelectItem key={option.value + index} value={option.value}>{t(option.label)}</SelectItem>)
          }
        </ScrollArea>
      </SelectContent>
    </Select>
  </>;

}
