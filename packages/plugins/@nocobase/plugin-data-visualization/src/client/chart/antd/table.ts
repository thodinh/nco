import { RenderProps } from '../chart';
import { AntdChart } from './antd';
import { Table as AntdTable } from 'antd';
import * as math from 'mathjs';

export class Table extends AntdChart {
  constructor() {
    super({ name: 'table', title: 'Table', component: AntdTable });
  }

  getProps({ data, fieldProps, general, advanced }: RenderProps) {
    const columns = data.length
      ? Object.keys(data[0]).map((item) => ({
          title: fieldProps[item]?.label || item,
          dataIndex: item,
          key: item,
        }))
      : [];
    const dataSource = data.map((item: any) => {
      Object.keys(item).map((key: string) => {
        const props = fieldProps[key];
        if (props?.interface === 'percent') {
          const value = math.round(parseFloat(item[key]) * 100, 9).toFixed(2);
          item[key] = `${value}%`;
        }
        if (typeof item[key] === 'boolean') {
          item[key] = item[key].toString();
        }
        if (props?.transformer) {
          item[key] = props.transformer(item[key]);
        }
      });
      return item;
    });
    const pageSize = advanced?.pagination?.pageSize || 10;
    return {
      bordered: true,
      size: 'middle',
      // pagination:
      //   dataSource.length < pageSize
      //     ? false
      //     : {
      //         pageSize,
      //       },
      dataSource,
      columns,
      scroll: {
        x: 'max-content',
      },
      ...general,
      ...advanced,
    };
  }
}
