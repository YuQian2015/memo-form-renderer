import React, { ComponentType, Suspense, useMemo } from "react";
import ReactDom from "react-dom";

import ErrorBoundary from "../../ErrorBoundary";
import { isWebURL } from "../../../utils";

import FetchRemoteComponent from "./FetchRemoteComponent";
import { AimNode } from "../types";

// 参考资料：https://juejin.cn/post/7040435885749305381

const fetchComponent = async (url: string, name?: string, onLoad?: (...args: any) => any): Promise<{ default: ComponentType<any> }> => {
  const text = isWebURL(url) ? await fetch(url).then((res) => {
    if (!res.ok) { throw new Error("Network response was not ok"); }

    return res.text();
  }) : (await window.AIM.file.readFile(url, "utf-8")).toString("utf8");

  const module = getParsedModule(text, name, onLoad);

  return { default: module.exports };
};
const packages = {
  react: React,
  "react-dom": ReactDom,
};

export type PKG = keyof typeof packages

const getParsedModule = (code: string, cn?: string, onLoad?: (...args: any) => any) => {
  const module: any = {
    exports: {},
  };
  const require = (name: keyof typeof packages) => {
    return packages[name];
  };
  Function("require, exports, module", code)(require, module.exports, module);
  if (cn) {
    onLoad && onLoad(module.exports[cn]);

    return { exports: module.exports[cn].default || module.exports[cn] };
  } else {
    onLoad && onLoad(module.default);

    return module.default || module;
  }
};

export interface DynamicComponentProps {
  __DCUrl: string
  __LID: string
  node: AimNode
  value?: any
  children?: React.ReactNode
  __DCName?: string
  label?: string
  __DCProps?: (...args: any) => any
  updateProps?: (...args: any) => any
  formData?: Record<string, any>
  onOpenChange?: (open: boolean) => void
}

const DynamicComponent = (props: DynamicComponentProps) => {
  const { __DCName, __DCUrl, __LID, __DCProps } = props;
  const handleLoaded = (data: any) => {
    __DCProps && __DCProps(__LID, data);
  };
  const Component = useMemo(() => {
    return React.lazy(async () => fetchComponent(props.__DCUrl, props.__DCName, handleLoaded));
  }, [__DCName, __DCUrl]);

  return (
    <ErrorBoundary fallback={<FetchRemoteComponent hasError />}>
      <Suspense fallback={<FetchRemoteComponent />}>
        <Component {...(props.node.data || {})} value={props.value} updateProps={props.updateProps} onOpenChange={props.onOpenChange} formData={props.formData} label={props.label} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default React.memo(DynamicComponent);