import { cloneDeep, isEqual } from "lodash-es";
import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from "react";

import { getComponent } from "./loader";
import DynamicComponent from "./loader/DynamicComponent";
import { AimComponent, AimForm } from "./types";

interface FormRenderProps {
  layout: AimForm<Record<string, any>>
  className?: string
  onDataReady?: (data: Record<string, any>) => any
  onChange?: (data: Record<string, any>) => any
  onOpenChange?: (open: boolean) => any
}

// Define the handle types which will be passed to the forwardRef
export type FormRenderHandle = {
  getFormData: () => Record<string, any>;
};

const FormRender = forwardRef<FormRenderHandle, FormRenderProps>(({
  layout, className, onChange, onOpenChange, onDataReady
}: FormRenderProps, ref) => {

  const [formData, setFormData] = useState<Record<string, any>>({});
  const prevData = useRef<Record<string, any>>({});

  useImperativeHandle(ref, () => ({
    // autoScrollImmediately() has type inference here
    getFormData() {
      return formData;
    },
  }));

  // 初始化，每次渲染表单控件布局时，从缓存中恢复数据
  useEffect(() => {
    console.log("%c渲染表单配置", "color: #CCC000;");

    let data = layout.data || {};
    // 如果布局数据中存在 storageKey，则从缓存中恢复数据
    if (layout.storageKey && localStorage.getItem(layout.storageKey)) {
      const key = localStorage.getItem(layout.storageKey);
      data = key ? JSON.parse(key) : data;
    }
    const fd = cloneDeep(data);
    setFormData(fd);
    if (!isEqual(prevData.current, fd)) {
      onDataReady && onDataReady(fd);
    }
    prevData.current = fd;
  }, [layout, onDataReady]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoaded = (id: string, loadedData: AimComponent) => {
    // console.log('文件加载成功', id, loadedData);
    // if (loadedData.properties) {
    //   console.log(loadedData.data);
    // }
    // if (loadedData.data) {
    //   console.log(loadedData.data);
    // }
  };

  // 表单内容更新时，需要通知父级组件更新之后的内容
  const handleUpdate = (id: string, changedData: [string, any]) => {
    const n = layout.nodes.find(node => node.id === id);
    if (n && n.name) {
      formData[n.name] = changedData[1];
      setFormData((old) => ({
        ...old,
        [n.name!]: changedData[1]
      }));
      if (layout.storageKey) {
        // FIXME: 需要增加props默认值传递，方便在FormRender使用，同时支持多实例仅仅保存需要保存的字段，而不是把所有信息都存在里面
        // const saveData = layout.storageValueKeys?.length ? pick(formData, layout.storageValueKeys) : formData
        // localStorage.setItem(layout.storageKey, JSON.stringify(saveData))
        localStorage.setItem(layout.storageKey, JSON.stringify(formData));
      }
      onChange && onChange(formData);
      prevData.current = formData;
    }
  };

  return <div className={className}>
    {
      layout.nodes.map(node => {
        const C = node && getComponent(node.component, node.id);

        return <div key={node.id}>
          {
            node.url
              ? <DynamicComponent
                __LID={node.id}
                __DCName={node.component}
                __DCUrl={node.url}
                __DCProps={handleLoaded}
                node={node}
                value={node.name && formData[node.name] !== undefined ? formData[node.name] : undefined}
                updateProps={(...arg: [string, any]) => handleUpdate(node.id, arg)}
                formData={formData}
                onOpenChange={onOpenChange}
                label={node.label}
              />
              : C && <C.component
                {...(node.data || {})}
                value={node.name && formData[node.name] !== undefined ? formData[node.name] : undefined}
                updateProps={(...arg: [string, any]) => handleUpdate(node.id, arg)}
                formData={formData}
                onOpenChange={onOpenChange}
                label={node.label}
              />
          }
        </div>;
      })
    }
  </div>;
});

export default memo(FormRender);
