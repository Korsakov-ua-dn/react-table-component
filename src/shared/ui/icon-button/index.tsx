import React, { ButtonHTMLAttributes } from 'react';

import './style.scss';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconHref: string;
  className?: string;
};

export const IconButton: React.FC<Props> = React.memo(
  ({ iconHref, className, ...restProps }) => {
    const classN = `IconButton ${className ? 'IconButton_' + className : ''}`;
    const style = {
      backgroundImage: `url(${iconHref})`,
    };

    return <button className={classN} style={style} {...restProps}></button>;
  }
);
