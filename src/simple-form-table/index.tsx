import React, { useState } from 'react';
import styles from './index.less';
import * as uuid from 'uuid';
import { Form, FormInstance } from 'antd';
import { useRef } from 'react';
import EditableCell from './components/editable-cell';

export interface ColumnsItem {
  lineNumber?: number;
  render?: (toggleeditable: () => void) => React.ReactNode;
  name: string;
  label?: string;
  link?: string[];
  disabled?: boolean;
  display?: boolean;
  labelColSpan?: number;
  labelColumnSpan?: number;
  valueColumnSpan?: number;
  validation?: (oldVal: any, newVal: any) => Promise<any>;
}

export interface HeadColumn {
  title: string;
  style: any;
  columnSpan?: number;
}

export interface CommonFormTableProps {
  columns: ColumnsItem[][];
  labelWidth?: string;
  valueWidth?: string;
  labelBackgroundColor?: string;
  form: FormInstance;
  initialValues?: any;
  tableHeadColumn?: HeadColumn[];
}

const SimpleFormTable: React.FC<CommonFormTableProps> = (props) => {
  const {
    columns,
    labelWidth = '120',
    valueWidth = '120',
    form,
    initialValues,
    labelBackgroundColor,
    tableHeadColumn,
  } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const [singleClickItemName, setSingleClickItemName] = useState<string>('');

  const getTdComponent = (data: ColumnsItem[]) => {
    return data?.map((item) => {
      return (
        <>
          {item.label && (
            <td
              width={labelWidth}
              key={uuid.v1()}
              colSpan={item.labelColumnSpan}
              style={{
                padding: 0,
                backgroundColor: labelBackgroundColor,
                paddingLeft: '8px',
              }}
            >
              {item.label}
            </td>
          )}
          <td
            key={uuid.v1()}
            width={valueWidth}
            colSpan={item.valueColumnSpan}
            style={{ border: '1px solid #F2F2F6', padding: 0 }}
          >
            <EditableCell
              form={form}
              key={uuid.v1()}
              clickName={singleClickItemName}
              onClickLabel={(name) => setSingleClickItemName(name)}
              item={item}
            />
          </td>
        </>
      );
    });
  };

  const trComponent = columns?.map((item) => {
    return (
      <tr style={{ border: '1px solid #F2F2F6' }} key={uuid.v1()}>
        {getTdComponent(item)}
      </tr>
    );
  });

  return (
    <div className={styles.commonFormTable} ref={contentRef}>
      <Form initialValues={initialValues} form={form}>
        <table key={uuid.v1()} className={styles.commonFormTableContent}>
          <thead>
            {tableHeadColumn?.map((v) => (
              <th
                colSpan={v.columnSpan}
                style={{
                  border: '1px solid #F2F2F6',
                  height: '32px',
                  paddingLeft: '8px',
                  ...v.style,
                }}
                key={uuid.v1()}
              >
                {v.title}
              </th>
            ))}
          </thead>
          <tbody>{trComponent}</tbody>
        </table>
      </Form>
    </div>
  );
};

export default SimpleFormTable;
