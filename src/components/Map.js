import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Text, Flex } from "@chakra-ui/react";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "", //your GOOGLE MAPS API key
    libraries,
  });

  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (props.info.lat) {
      setIsSelected(true);
    }
  }, [props.info.lat]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";
  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={props.center}
      options={options}
      onLoad={onMapLoad}
    >
      {Object.values(props.mappers).map(({ gegrLat, gegrLon }) => (
        <Marker
          position={{ lat: parseFloat(gegrLat), lng: parseFloat(gegrLon) }}
        ></Marker>
      ))}

      {isSelected ? (
        <InfoWindow
          position={{ lat: props.info.lat + 0.02, lng: props.info.lng }}
          onCloseClick={() => setIsSelected(false)}
        >
          <Flex direction="column">
            <Text>
              SO2{" "}
              {props.info.indexes.so2IndexLevel?.indexLevelName
                ? props.info.indexes.so2IndexLevel.indexLevelName
                : "Brak danych"}
            </Text>
            <Text>
              PM10{" "}
              {props.info.indexes.pm10IndexLevel?.indexLevelName
                ? props.info.indexes.pm10IndexLevel.indexLevelName
                : "Brak danych"}
            </Text>
            <Text>
              PM25{" "}
              {props.info.indexes.pm25IndexLevel?.indexLevelName
                ? props.info.indexes.pm25IndexLevel.indexLevelName
                : "Brak Danych"}
            </Text>
          </Flex>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  );
};

export default Map;
