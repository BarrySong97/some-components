---
nav:
  title: 可编辑表格
---

# SimpleFormTable

基于 antd form 组件封装的轻量级表格布局的表单

- 双击编辑
- 点击高亮
- disable 置灰
- 不可编辑，只显示

## 代码演示

### 基础使用

```tsx
/**
 * title: 基本
 * desc: 最简单的用法，注意这里的toggleEditable是用来关闭编辑状态的，所以需要autoFocus来自动聚焦，如果没有自动聚焦，需要用户自己聚焦，所以会导致多一步操作
 *
 *
 */
import React from 'react';
import { SimpleFormTable } from 'some-components';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const [form] = Form.useForm();

const tableColumns = [
  [
    {
      name: 'name',
      label: '姓名',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
    {
      name: 'gender',
      label: '性别',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
  ],
];

const init = {
  name: 'Barry Song',
  gender: 'Male',
};

export default () => (
  <SimpleFormTable
    form={form}
    initialValues={init}
    labelBackgroundColor={'#F4F7F6 '}
    columns={tableColumns}
  />
);
```

### 添加 header Column

```tsx
/**
 * title: 添加header Column
 * desc: 如果不需要显示内容，title传空字符串，label不需要传值，可以通过style修改样式，注意这里的第一个label看起来显示的是某一行label，但其实只是第一个input的label，所以这里要注意！
 *
 *
 */
import React from 'react';
import { SimpleFormTable } from 'some-components';
import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const [form] = Form.useForm();
const tableHeadColumn = [
  {
    title: '',
    style: { textAlign: 'center', fontWeight: '200' },
  },
  {
    title: '性别',
    style: { textAlign: 'center', fontWeight: '200' },
  },
  {
    title: '性别',
    style: { textAlign: 'center', fontWeight: '200' },
  },
];
const tableColumns = [
  [
    {
      name: 'name',
      label: '姓名',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
    {
      name: 'gender',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
  ],
];

const init = {
  name: 'Barry Song',
  gender: 'Male',
};

export default () => (
  <SimpleFormTable
    form={form}
    initialValues={init}
    tableHeadColumn={tableHeadColumn}
    labelBackgroundColor={'#F4F7F6 '}
    columns={tableColumns}
  />
);
```

### 不同类型的 form item 值

```tsx
/**
 * title: 不同类型的值
 * desc: date picker是moment类型，select可以是labelInValue也可以是labelInValue数组，当然原始就value也是可以的。如果一个value需要显示的内容过长可以调整valueColumn的的倍数一般是valueWidth的倍数。
 *
 *
 */
import React from 'react';
import { SimpleFormTable } from 'some-components';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const [form] = Form.useForm();

const tableColumns = [
  [
    {
      name: 'name',
      label: '姓名',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
    {
      name: 'gender',
      label: '性别',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <Select
            autoFocus
            labelInValue
            onBlur={() => toggleEditable()}
            style={{ width: '100%' }}
          >
            <Select.Option value="0">male</Select.Option>
            <Select.Option value="1">female</Select.Option>
          </Select>
        );
      },
    },
  ],
  [
    {
      name: 'birthday',
      label: '生日',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <DatePicker
            style={{ width: '100%' }}
            locale={locale}
            autoFocus
            onBlur={() => toggleEditable()}
          />
        );
      },
    },
    {
      name: 'age',
      label: '年龄',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <InputNumber
            autoFocus
            onBlur={() => toggleEditable()}
            min={0}
            style={{ width: '100%' }}
            defaultValue={3}
          />
        );
      },
    },
  ],
  [
    {
      name: 'habbits',
      label: '爱好',
      lineNumber: 1,
      valueColumnSpan: 3,
      render: (toggleEditable: () => void) => {
        return (
          <Select
            autoFocus
            labelInValue
            allowClear
            mode="multiple"
            onBlur={() => toggleEditable()}
            style={{ width: '100%' }}
          >
            <Select.Option value="0">吃饭</Select.Option>
            <Select.Option value="1">睡觉</Select.Option>
            <Select.Option value="2">摸鱼</Select.Option>
          </Select>
        );
      },
    },
  ],
];

const init = {
  name: 'Barry Song',
  gender: { label: 'male', value: '0' },
  birthday: moment('1997-10-17'),
  habbits: [
    { label: '吃饭', value: '0' },
    { label: '睡觉', value: '1' },
    { label: '摸鱼', value: '2' },
  ],
  age: 18,
};

export default () => (
  <SimpleFormTable
    form={form}
    initialValues={init}
    labelBackgroundColor={'#F4F7F6 '}
    columns={tableColumns}
  />
);
```

### 校验

```tsx
/**
 * title: 不同类型的值
 * desc: date picker是moment类型，select可以是labelInValue也可以是labelInValue数组，当让原始就value也是可以的。如果一个value需要显示的内容过长可以调整valueColumn的的倍数一般是valueWidth的倍数。
 *
 *
 */
import React from 'react';
import { SimpleFormTable } from 'some-components';
import { DatePicker, Form, Input, InputNumber, Select } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const [form] = Form.useForm();

const tableColumns = [
  [
    {
      name: 'name',
      label: '姓名',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return <Input autoFocus onBlur={() => toggleEditable()} />;
      },
    },
    {
      name: 'gender',
      label: '性别',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <Select
            autoFocus
            labelInValue
            onBlur={() => toggleEditable()}
            style={{ width: '100%' }}
          >
            <Select.Option value="0">male</Select.Option>
            <Select.Option value="1">female</Select.Option>
          </Select>
        );
      },
    },
  ],
  [
    {
      name: 'birthday',
      label: '生日',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <DatePicker
            style={{ width: '100%' }}
            locale={locale}
            autoFocus
            onBlur={() => toggleEditable()}
          />
        );
      },
    },
    {
      name: 'age',
      label: '年龄',
      lineNumber: 1,
      render: (toggleEditable: () => void) => {
        return (
          <InputNumber
            autoFocus
            onBlur={() => toggleEditable()}
            min={0}
            style={{ width: '100%' }}
            defaultValue={3}
          />
        );
      },
    },
  ],
  [
    {
      name: 'habbits',
      label: '爱好',
      lineNumber: 1,
      valueColumnSpan: 3,
      render: (toggleEditable: () => void) => {
        return (
          <Select
            autoFocus
            labelInValue
            allowClear
            mode="multiple"
            onBlur={() => toggleEditable()}
            style={{ width: '100%' }}
          >
            <Select.Option value="0">吃饭</Select.Option>
            <Select.Option value="1">睡觉</Select.Option>
            <Select.Option value="2">摸鱼</Select.Option>
          </Select>
        );
      },
    },
  ],
];

const init = {
  name: 'Barry Song',
  gender: { label: 'male', value: '0' },
  birthday: moment('1997-10-17'),
  habbits: [
    { label: '吃饭', value: '0' },
    { label: '睡觉', value: '1' },
    { label: '摸鱼', value: '2' },
  ],
  age: 18,
};

export default () => (
  <SimpleFormTable
    form={form}
    initialValues={init}
    labelBackgroundColor={'#F4F7F6 '}
    columns={tableColumns}
  />
);
```
