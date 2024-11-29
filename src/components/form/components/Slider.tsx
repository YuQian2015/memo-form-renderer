import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { Slider } from "../../ui/slider";

import { AimComponentStore, BaseComponentProps } from "../types";

// Set component props
export const properties: AimComponentStore["properties"] = [];

// Default props data of component instance
export const data: AimComponentStore["data"] = {};


export interface ButtonProps extends BaseComponentProps {
  value: number;
  max?: number;
  min?: number;
  step?: number;
}

export default function ({ className, value, max, min, step, label, updateProps }: ButtonProps) {
  const { t } = useTranslation();

  const handleChange = (v: number) => {
    updateProps && updateProps("value", v);
  };

  return <>
    {
      label && <div className="mb-2 mt-4 flex justify-between">{t(label)} <div className="w-10 text-center">{value}</div></div>
    }
    <div className={clsx([className, "flex items-center gap-2"])} >
      <Slider value={[value]} onValueChange={(v: number[]) => handleChange(v[0])} min={min || 0} max={max || 100} step={step || 1} />

    </div>
  </>;
}