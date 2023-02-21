import React, { useLayoutEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import Map from "../../components/map";
import { geocode } from "../../services/geocode-services";

interface IProps {
  info: any;
};

const ExpandedContent: React.FC<IProps> = (props) => {
  const [center, setCenter] = useState<LatLngExpression>();
  const [error, setError] = useState<string>("");

  useLayoutEffect(() => {
    geocode
      .getCoordFromAdress(props.info.address)
      .then((res) => {
        setCenter(res);
      })
      .catch((err) => setError("Ошибка отображения адресса на карте"));
  }, [props.info.address]);

  return (
    <>
      {error}
      {center && <Map center={center} transaction={props.info} />}
    </>
  );
};

export default React.memo(ExpandedContent) as typeof ExpandedContent;
