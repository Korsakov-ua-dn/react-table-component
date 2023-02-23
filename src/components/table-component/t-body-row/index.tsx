import React, { useCallback, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { ExpandedContentComponent, ViewDataFormatScheme } from '../table.types';
import TbodyItem from '../t-body-item';
import TBodyExpandedRow from '../t-body-expanded-row';

import './style.scss';

interface IProps<T> {
  row: T;
  viewDataFormatScheme: ViewDataFormatScheme<T>;
  painted: boolean;
  getExpandedContentComponent: ExpandedContentComponent;
}

const TbodyRow = <T extends object>(props: IProps<T>): JSX.Element => {
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

  for (const key in props.viewDataFormatScheme) {
    const width = props.viewDataFormatScheme[key]?.width;
    const renderFunction = props.viewDataFormatScheme[key]?.renderFunction!;
    const value = renderFunction(props.row[key]);

    td.push(<TbodyItem key={key} width={width} value={value} />);
  }

  return (
    <>
      <tr className={ClassNameRow}>{td}</tr>

      {isExpanded && (
        <TBodyExpandedRow
          row={props.row}
          getExpandedContentComponent={props.getExpandedContentComponent}
        />
      )}
    </>
  );
};

export default React.memo(TbodyRow) as typeof TbodyRow;
