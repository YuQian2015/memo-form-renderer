
import { cloneDeep } from "lodash-es";
import React, { Component, lazy } from "react";

import { Button, Command, Image, Input, Select, Slider, Text, Textarea } from "../components";
import { AimComponentStore } from "../types";

export type LayoutId = string
export type LayoutProps = Record<string, any>
export type LayoutData = Record<string, any>
export const layoutProps: LayoutProps = {};
export const layoutData: LayoutData = {};

// const Button = lazy(() => import('./Button'))

// loadRemoteComponent('http://localhost/ec.es.js')

export const localComponents: Record<string, typeof React.Component | React.FC<any>> = {
  "@components/Button": Button.default || Button,
  "@components/Text": Text.default || Text,
  "@components/Image": Image.default || Image,
  "@components/Select": Select.default || Select,
  "@components/Slider": Slider.default || Slider,
  "@components/Input": Input.default || Input,
  "@components/Textarea": Textarea.default || Textarea,
  "@components/Command": Command.default || Command,
};

export const localComponentsProperties: Record<string, Array<any>> = {
  "@components/Button": Button.properties || [],
  "@components/Text": Text.properties || [],
  "@components/Image": Image.properties || [],
  "@components/Select": Select.properties || [],
  "@components/Slider": Slider.properties || [],
  "@components/Input": Input.properties || [],
  "@components/Textarea": Textarea.properties || [],
  "@components/Command": Command.properties || [],
};

export const localComponentsData: Record<string, Record<string, any>> = {
  "@components/Button": Button.data || {},
  "@components/Text": Text.data || {},
  "@components/Image": Image.data || {},
  "@components/Select": Select.data || [],
  "@components/Slider": Slider.data || [],
  "@components/Input": Input.data || [],
  "@components/Textarea": Textarea.data || [],
  "@components/Command": Command.data || [],
};

export const componentsMap = {
  password: "@components/Input",
  text: "@components/Input",
  select: "@components/Select",
  number: "@components/Input",
  checkbox: "@components/Input",
  textarea: "@components/Textarea",
  command: "@components/Command",
  slider: "@components/Slider",
};

export function loadRemoteComponent(url: string): Promise<{ default: React.ComponentType<any> }> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const tempGlobal: string = "__tempModuleLoadingVariable" + Math.random().toString(32).substring(2);
    script.type = "module";
    script.crossOrigin = "true";
    script.textContent = `import * as m from "${url}"; window.${tempGlobal} = m;`;
    const _window = window as any;
    script.onload = () => {
      console.log("_window[tempGlobal]");
      resolve(_window[tempGlobal]);
      delete _window[tempGlobal];
      script.remove();
    };

    script.onerror = () => {
      reject(new Error("Failed to load module script with URL " + url));
      delete _window[tempGlobal];
      script.remove();
    };

    document.documentElement.appendChild(script);
  });
}

export function getComponent(name: string, lid: LayoutId, path?: string): {
  properties: AimComponentStore["properties"],
  data: AimComponentStore["data"],
  component: typeof React.Component | React.FC
} | null {
  if (localComponents[name]) {
    layoutProps[lid] = cloneDeep(localComponentsProperties[name]);
    layoutData[lid] = cloneDeep(localComponentsData[name]);

    return {
      properties: localComponentsProperties[name],
      data: localComponentsData[name],
      component: localComponents[name]
    };
  }

  // if (path) {
  //   localComponents[name] = lazy(
  //     () => loadRemoteComponent(path)
  //   )
  //   return localComponents[name]
  // }
  return null;
}
