import React, { useLayoutEffect } from 'react';

import { useAppDispatch } from '../../../../hooks';
import { headerActions } from '../../header-slice';

import { HeaderLayout } from '../header-layout';
import { LangSelect } from '../lang-select';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(headerActions.remindLocale());
  }, [dispatch]);

  return (
    <HeaderLayout>
      <LangSelect />
    </HeaderLayout>
  );
};
