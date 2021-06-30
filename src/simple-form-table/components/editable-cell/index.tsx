import { useBoolean, useClickAway } from 'ahooks';
import { Form, FormInstance } from 'antd';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import moment from 'moment';
import styles from './index.less';
import { ColumnsItem } from '../..';
export interface EditableCellProps {
  item: ColumnsItem;
  form: FormInstance;
  onClickLabel: (name: string) => void;
  clickName: string;
}
const EditableCell: FC<EditableCellProps> = ({
  item,
  form,
  onClickLabel,
  clickName,
}) => {
  const [editable, { toggle: toggleEditable }] = useBoolean(false);
  const [
    clickAway,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { setTrue: setClickAwayTrue, setFalse: setClickAwayFalse },
  ] = useBoolean(false);
  const [value, setValue] = useState<any>(form.getFieldValue(item.name));
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setClickAwayTrue();
    if (value !== form.getFieldValue(item.name)) {
      setValue(form.getFieldValue(item.name));
    }
  }, ref);

  useEffect(() => {
    if (value !== form.getFieldValue(item.name)) {
      if (item.validation) {
        item
          .validation?.(value, form.getFieldValue(item.name))
          .then(() => {
            setValue(form.getFieldValue(item.name));
          })
          .catch(() => {});
      } else {
        setValue(form.getFieldValue(item.name));
      }
    } else {
      // 如果不需要校验就直接设置值
    }
  }, [editable]);

  /**
   * 不同表单item类型不一样
   * select 是labelInValue类型，label是要显示的值，value是实际要取得值
   * date 是moment类型
   * @param {any} value any
   * @return {void}
   */
  const whichType = (value: any) => {
    // 是日期
    if (value instanceof moment) {
      return moment(value).format('YYYY-MM-DD');
    }
    // 是多选的select
    if (Array.isArray(value)) {
      return value.map((v, idx) => (
        <span key={v.value}>
          {v.label}
          {idx !== value.length - 1 ? ',' : null}&nbsp;
        </span>
      ));
    }
    // 普通的select
    if (typeof value === 'object' && 'label' in value) {
      return value.label;
    }

    return value;
  };

  const isClickLabel = () =>
    clickName === item.name && !clickAway && item.render && !item.disabled;

  const isEditable = editable && item.render && !item.display;
  const clickStyle = useMemo(
    () =>
      isClickLabel()
        ? { background: '#E5EEFB ', border: '2px solid #73A2E3' }
        : {},
    [clickName, clickAway],
  );

  const disableStyle = item.disabled ? { background: '#EBEBED' } : {};
  return (
    <div className={styles.item}>
      <div
        ref={ref}
        className={styles.formItem}
        onDoubleClick={() => toggleEditable()}
      >
        {isEditable ? (
          <Form.Item name={item.name} noStyle>
            {item.render?.(toggleEditable)}
          </Form.Item>
        ) : (
          <div
            className={styles.itemValue}
            style={{ ...clickStyle, ...disableStyle }}
            onClick={() => {
              setClickAwayFalse();
              onClickLabel(item.name);
            }}
          >
            {whichType(value)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableCell;
