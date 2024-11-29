import React, { ComponentType, Suspense, useMemo } from "react";
import ReactDom from "react-dom";

import ErrorBoundary from "../../ErrorBoundary";

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


//
// Regular Expression for URL validation
//
// Author: Diego Perini
// Created: 2010/12/05
// Updated: 2018/09/12
// License: MIT
//
// Copyright (c) 2010-2018 Diego Perini (http://www.iport.it)
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// the regular expression composed & commented
// could be easily tweaked for RFC compliance,
// it was expressly modified to fit & satisfy
// these test for an URL shortener:
//
//   http://mathiasbynens.be/demo/url-regex
//
// Notes on possible differences from a standard/generic validation:
//
// - utf-8 char class take in consideration the full Unicode range
// - TLDs have been made mandatory so single names like "localhost" fails
// - protocols have been restricted to ftp, http and https only as requested
//
// Changes:
//
// - IP address dotted notation validation, range: 1.0.0.0 - 223.255.255.255
//   first and last IP address of each class is considered invalid
//   (since they are broadcast/network addresses)
//
// - Added exclusion of private, reserved and/or local networks ranges
// - Made starting path slash optional (http://example.com?foo=bar)
// - Allow a dot (.) at the end of hostnames (http://example.com.)
// - Allow an underscore (_) character in host/domain names
// - Check dot delimited parts length and total length
// - Made protocol optional, allowed short syntax //
//
// Compressed one-line versions:
//
// Javascript regex version
//
// /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
//
// PHP version (uses % symbol as delimiter)
//
// %^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\x{00a1}-\x{ffff}][a-z0-9\x{00a1}-\x{ffff}_-]{0,62})?[a-z0-9\x{00a1}-\x{ffff}]\.)+(?:[a-z\x{00a1}-\x{ffff}]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$%iuS
//
export const regExp = new RegExp(
  "^" +
  // protocol identifier (optional)
  // short syntax // still required
  "(?:(?:(?:https?|ftp):)?\\/\\/)" +
  // user:pass BasicAuth (optional)
  "(?:\\S+(?::\\S*)?@)?" +
  "(?:" +
  // IP address exclusion
  // private & local networks
  "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
  "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
  "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broadcast addresses
  // (first & last IP address of each class)
  "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
  "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
  "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
  "|" +
  // host & domain names, may end with dot
  // can be replaced by a shortest alternative
  // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
  "(?:" +
  "(?:" +
  "[a-z0-9\\u00a1-\\uffff]" +
  "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
  ")?" +
  "[a-z0-9\\u00a1-\\uffff]\\." +
  ")+" +
  // TLD identifier name, may end with dot
  "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
  ")" +
  // port number (optional)
  "(?::\\d{2,5})?" +
  // resource path (optional)
  "(?:[/?#]\\S*)?" +
  "$", "i"
);


export function isWebURL(url: string): boolean { return regExp.test(url); }
