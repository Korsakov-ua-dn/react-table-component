import { FC, ReactNode, memo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

import marker from './map-marker.png';

interface IProps {
  center: LatLngExpression;
  popup?: ReactNode;
  style?: object;
}

export const LeafletMap: FC<IProps> = memo(({ center, popup, style }) => {
  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom={false}
      style={style}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={center}
        icon={
          new Icon({
            iconUrl: marker,
            iconSize: [20, 30],
            iconAnchor: [10, 15],
          })
        }
      >
        {popup && <Popup>{popup}</Popup>}
      </Marker>
    </MapContainer>
  );
});
