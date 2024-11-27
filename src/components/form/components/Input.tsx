import { ChangeEventHandler } from "react";
import { useTranslation } from "react-i18next";
import { TbInfoCircle } from "react-icons/tb";

import { AimTooltip } from "@/components";
import { Input as UIInput } from "@/components/ui/input";

import { AimComponentStore, BaseComponentProps } from "../types";

export interface InputProps extends BaseComponentProps {
  value: string
  type?: "text" | "number"
}

// Set component props
export const properties: AimComponentStore["properties"] = [{
  key: "value",
  type: "string",
  label: "文本",
  setter: "InputSetter",
  props: {
    placeholder: "placeholder"
  }
}];


// Default props data of component instance
export const data: AimComponentStore["data"] = {};

export default function Input({ className, label, helpText, value, type = "text", placeholder, updateProps }: InputProps) {
  const { t } = useTranslation();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateProps && updateProps("value", e.target.value);
  };

  return <>
    {
      label && <div className="mb-2 mt-4 flex items-center gap-1">{t(label)}{helpText && <AimTooltip
        content={<div dangerouslySetInnerHTML={{ __html: t(helpText) || "" }}></div>}>
        <TbInfoCircle size={18} />
      </AimTooltip>}</div>
    }
    <UIInput
      className={className}
      placeholder={placeholder}
      value={value || ""}
      type={type}
      onChange={handleChange}
    />
  </>;
}
