import { useCallback, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { typedMemo } from 'shared/hocs';

import Td from '../td';
import ExpandedRow from '../expanded-row';

import type { GetExpandedComponent, Scheme } from '../types';

import './style.scss';

interface IProps<T> {
  row: T;
  scheme: Scheme<T>;
  painted: boolean;
  getExpandedComponent: GetExpandedComponent<T>;
}

const TrBody = <T extends object>(props: IProps<T>): JSX.Element => {
  // Состояние строки "развернутая" и "свернутая"
  const [isExpanded, setExpanded] = useState<boolean>(false);

  const expandRowHandler = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const ClassNameRow = `
    Table__body-row 
    ${isExpanded ? 'Table__body-row_expanded' : ''}
    ${props.painted ? 'Table__body-row_painted' : ''}
  `;

  // Первый элемент каждой строки - стрелка для разворачивания детальной информации
  const td = [
    <td className="Arrow-expand" key={'arrow'} onClick={expandRowHandler}>
      <ArrowRightIcon />
    </td>,
  ];

  for (const key in props.scheme) {
    const width = props.scheme[key]?.width;
    const formatDataFunction = props.scheme[key]?.formatDataFunction;
    // если передана функция форматирования данных для отображения
    const value = formatDataFunction
      ? formatDataFunction(props.row[key])
      : props.row[key];

    td.push(
      <Td<string | number | T[keyof T]> key={key} width={width} value={value} />
    );
  }

  return (
    <>
      <tr className={ClassNameRow}>{td}</tr>

      {isExpanded && (
        <ExpandedRow
          row={props.row}
          getExpandedComponent={props.getExpandedComponent}
        />
      )}
    </>
  );
};

export default typedMemo(TrBody);
