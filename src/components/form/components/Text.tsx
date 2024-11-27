import { ChangeEventHandler } from "react";

import { AimComponentStore, BaseComponentProps } from "../types";

export interface TextProps extends BaseComponentProps {
  value: string
  align: "left" | "right" | "center",
  fontSize: number
}

// Set component props
export const properties: AimComponentStore["properties"] = [{
  key: "value",
  type: "string",
  label: "文本框",
  setter: "TextareaSetter",
  props: {
    placeholder: "placeholder"
  },
  default: ""
}, {
  key: "align",
  type: "string",
  label: "对齐",
  setter: "AlignSetter",
  default: "left"
}, {
  key: "fontSize",
  type: "number",
  label: "文字大小",
  setter: "FontSizeSetter",
  props: {
    placeholder: "placeholder",
    min: 12,
    max: 64,
    stop: 2
  },
  default: 16
}];

// Default props data of component instance
export const data: AimComponentStore["data"] = {
  value: "",
  align: "left",
  fontSize: 16,
};

export default function Text(props: TextProps) {

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { updateProps } = props;
    updateProps && updateProps("value", e.target.value);
  };

  return <textarea
    style={{
      border: "none",
      width: "100%",
      height: "100%",
      padding: 8,
      resize: "none",
      textAlign: props.align,
      fontSize: props.fontSize + "px"
    }}
    value={props.value}
    onChange={handleChange}
    placeholder='输入文字'
  ></textarea>;
}