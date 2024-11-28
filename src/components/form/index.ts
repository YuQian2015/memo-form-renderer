import type { Manifest, ManifestConfiguration } from "@memo-plugins/manager";
import { t } from "i18next";
import { merge } from "lodash-es";

import { componentsMap } from "./loader";
import { AimForm } from "./types";

const getPropsMap = (c: ManifestConfiguration, configurationRequired?: string[], languagePrefix?: string) => {
  const options = JSON.parse(JSON.stringify(c.options || []));
  const props = {
    type: c.type,
    placeholder: c.placeholder ? t(languagePrefix + "." + c.placeholder) : c.placeholder,
    helpText: c.helpText ? t(languagePrefix + "." + c.helpText) : c.helpText,
    searchPlaceholder: c.searchPlaceholder ? t(languagePrefix + "." + c.searchPlaceholder) : c.searchPlaceholder,
    emptyPlaceholder: c.emptyPlaceholder ? t(languagePrefix + "." + c.emptyPlaceholder) : c.emptyPlaceholder,
    useI18nOptions: c.useI18nOptions,
    options: c.useI18nOptions ? options.map((o: { value: string, label: string }) => {
      o.label = t(languagePrefix + "." + o.label);

      return o;
    }) : options,
    min: c.type === "slider" ? c.range?.min || 0 : undefined,
    max: c.type === "slider" ? c.range?.max || 100 : undefined,
    step: c.type === "slider" ? c.range?.step || 1 : undefined,
    _languagePrefix: languagePrefix,
    _t: t,
    required: configurationRequired?.includes(c.key)
  };

  return props;
};

function createConfiguration(
  configuration: Manifest["configuration"],
  configurationRequired?: string[],
  languagePrefix?: string,
  file?: string
) {
  if (configuration && configuration.length) {
    return configuration.map((c, index) => {
      return {
        id: languagePrefix + "_" + index.toString(),
        url: /@plugins-components\//.test(c.type) && file ? file.replace("index.js", "components.js") : "",
        component: /@plugins-components\//.test(c.type) ? c.type.replace("@plugins-components/", "") : componentsMap[c.type || "input"],
        label: c.label ? t(languagePrefix + "." + c.label) : c.label,
        name: c.key,
        data: getPropsMap(c, configurationRequired, languagePrefix)
      };
    });
  }

  return [];
}

export function createRequiredLayout(
  manifest?: Manifest,
  data?: Record<string, any>,
  languagePrefix?: string,
  file?: string,
  // 参数中需要开放多实例ID，让插件的storageKey搭配多实例ID，可以实现不同的实例配置保存
  configurationId = ""
) {
  let localStorageKey: string | undefined;
  if (!manifest) {
    return {
      storageKey: localStorageKey,
      nodes: [],
      data: data || {},
      actions: {}
    };
  }
  const { configuration, configurationRequired, defaultsConfiguration, pluginId, storageKey, configurationStorage } = manifest;
  if (storageKey) {
    localStorageKey = pluginId + ":" + storageKey + ":" + configurationId;
  }
  const layout: AimForm<Partial<Record<string, any>>> = {
    // TODO: 需要增加默认值传递，方便在FormRenderer使用
    storageValueKeys: configurationStorage,
    storageKey: localStorageKey,
    nodes: createConfiguration(configuration, configurationRequired, languagePrefix, file),
    data: merge(defaultsConfiguration || {}, data || {}),
    actions: {}
  };

  return layout;
}

export function createExposedLayout(
  manifest?: Manifest,
  data?: Record<string, any>,
  languagePrefix?: string,
  file?: string,
  // 参数中需要开放多实例ID，让插件的storageKey搭配多实例ID，可以实现不同的实例配置保存
  configurationId = ""
) {
  let localStorageKey: string | undefined;
  if (!manifest) {
    return {
      storageKey: localStorageKey,
      nodes: [],
      data: data || {},
      actions: {}
    };
  }
  const { configuration, configurationExposed, configurationRequired, defaultsConfiguration, pluginId, storageKey, configurationStorage } = manifest;
  if (storageKey) {
    localStorageKey = pluginId + ":" + storageKey + ":" + configurationId;
  }
  const newConfiguration = configuration.filter(conf => configurationExposed.indexOf(conf.key) >= 0);
  const layout: AimForm<Partial<Record<string, any>>> = {
    // TODO: 需要增加默认值传递，方便在FormRenderer使用
    storageValueKeys: configurationStorage,
    storageKey: localStorageKey,
    nodes: createConfiguration(newConfiguration, configurationRequired, languagePrefix, file),
    data: merge(defaultsConfiguration || {}, data || {}),
    actions: {}
  };

  return layout;
}
