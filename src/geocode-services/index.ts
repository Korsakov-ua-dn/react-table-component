import { LatLngExpression } from "leaflet";
import Geocode from "react-geocode";

export const geocode = {
  init() {
    Geocode.setApiKey(`${process.env.REACT_APP_GEOCODE_API_KEY}`);
  },

  async getCoordFromAdress(
    address: string
  ): Promise<LatLngExpression | undefined> {
      const response = await Geocode.fromAddress(address);
      const { lat, lng } = response.results[0].geometry.location;
      return [lat, lng];
  },
};
