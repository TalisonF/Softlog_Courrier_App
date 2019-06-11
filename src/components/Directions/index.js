import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyDvBRTxkMDGIXiJutg0kpfAEsR0086Yz38"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
