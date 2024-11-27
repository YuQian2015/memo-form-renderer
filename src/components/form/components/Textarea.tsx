import clsx from "clsx";
import { ChangeEventHandler } from "react";
import { default as UITextarea } from "react-expanding-textarea";
import { useTranslation } from "react-i18next";
import { TbInfoCircle } from "react-icons/tb";

import { AimTooltip } from "@/components";

import { AimComponentStore, BaseComponentProps } from "../types";

export interface TextareaProps extends BaseComponentProps {
  value: string
}

// Set component props
export const properties: AimComponentStore["properties"] = [];

// Default props data of component instance
export const data: AimComponentStore["data"] = {};

export default function Textarea({ className, label, helpText, value, required, placeholder, updateProps }: TextareaProps) {
  const { t } = useTranslation();
  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    updateProps && updateProps("value", e.target.value);
  };

  return <>
    {
      label && <div className="mb-2 mt-4 flex items-center gap-1">{t(label)}{helpText && <AimTooltip
        content={<div dangerouslySetInnerHTML={{ __html: t(helpText) || "" }}></div>}>
        <TbInfoCircle size={18} />
      </AimTooltip>}{!required && t("common.optional")}</div>
    }
    <UITextarea
      className={clsx(["flex min-h-[60px] w-full rounded-md bg-background border border-input resize-none px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className])}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  </>;
}
