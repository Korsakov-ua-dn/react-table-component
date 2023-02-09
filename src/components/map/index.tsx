import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import { ITransaction } from "../../modules/transactions/transactions.types";

const marker = require("./images/map-marker.png");

type PropsType = {
  center: LatLngExpression;
  transaction: ITransaction;
};

const Map: React.FC<PropsType> = (props) => {
  return (
    <MapContainer center={props.center} zoom={17} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={props.center}
        icon={
          new Icon({
            iconUrl: marker,
            iconSize: [20, 30],
            iconAnchor: [10, 15],
          })
        }
      >
        <Popup>
          <span>
            Детальная информация о транзакции{" "}
            <b>id:&nbsp;{props.transaction._id}</b>{" "}
          </span>
          <br />
          <span>Адрес: {props.transaction.address}</span>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default React.memo(Map) as typeof Map;
