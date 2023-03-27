import React from 'react';

import { Translate } from 'shared/lib/intl';

interface IProps {
  title: string;
  translate: Translate<'table'>;
}

const TestProps: React.FC<IProps> = (props) => {
  console.log('Render TestProps');

  return <div>sdfds</div>;
};

export default React.memo(TestProps) as typeof TestProps;
