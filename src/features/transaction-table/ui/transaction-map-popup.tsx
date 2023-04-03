import { FC, memo } from 'react';

import type { ITransaction } from 'entities/transaction';

interface IProps {
  info: ITransaction;
}

export const TransactionMapPopup: FC<IProps> = memo(({ info }) => {
  return (
    <>
      <span>
        Детальная информация о транзакции <b>id:&nbsp;{info._id}</b>{' '}
      </span>
      <br />
      <span>Адрес: {info.address}</span>
    </>
  );
});
