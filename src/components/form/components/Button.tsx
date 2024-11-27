import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import { AimComponentStore, BaseComponentProps } from "../types";

// Set component props
export const properties: AimComponentStore["properties"] = [];

// Default props data of component instance
export const data: AimComponentStore["data"] = {};


export interface ButtonProps extends BaseComponentProps {
  content?: string;
}

export default function ({ className, content }: ButtonProps) {
  const { t } = useTranslation();

  return <Button title={t(content || "Button")!} className={clsx([className])}>{t(content || "Button")}</Button>;
}