import Geocode from 'react-geocode';

import type { LatLngExpression } from 'leaflet';

export const init = () => {
  Geocode.setApiKey(`${process.env.REACT_APP_GEOCODE_API_KEY}`);
};

// возвращает координаты центра переданного адреса
export const getCoordFromAdress = async (
  address: string
): Promise<LatLngExpression | undefined> => {
  const response = await Geocode.fromAddress(address);
  const { lat, lng } = response.results[0].geometry.location;
  return [lat, lng];
};
