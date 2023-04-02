import { memo } from 'react';

import './style.scss';

type Props = JSX.IntrinsicElements['button'] & {
  iconHref: string;
  className?: string;
};

export const IconButton: React.FC<Props> = memo(
  ({ iconHref, className, ...restProps }) => {
    const props = {
      ...restProps,
      className: `IconButton ${className ? 'IconButton_' + className : ''}`,
      style: { backgroundImage: `url(${iconHref})` },
    };

    return <button {...props} />;
  }
);
