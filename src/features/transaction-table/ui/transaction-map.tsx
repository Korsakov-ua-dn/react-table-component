import { FC, memo, useLayoutEffect, useState } from 'react';

import { ITransaction, geocode } from 'shared/api';
import { LeafletMap } from 'shared/ui/leaflet-map';

import { mapContainerStyle } from '../config';

import { TransactionMapPopup } from './transaction-map-popup';

import type { LatLngExpression } from 'leaflet';

interface IProps {
  info: ITransaction;
}

export const TransactionMap: FC<IProps> = memo(({ info }) => {
  const [center, setCenter] = useState<LatLngExpression>();
  const [error, setError] = useState<string>('');

  useLayoutEffect(() => {
    geocode
      .getCoordFromAdress(info.address)
      .then((res) => {
        setCenter(res);
      })
      .catch((err) => setError('Ошибка отображения адресса на карте'));
  }, [info.address]);

  if (error) return <span>{error}</span>;

  if (!center) return <span>'Поиск координат'</span>;

  return (
    <LeafletMap
      center={center}
      popup={<TransactionMapPopup info={info} />}
      style={mapContainerStyle}
    />
  );
});
