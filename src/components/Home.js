import { Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Map from "./Map";
import Stations from "./Stations";
import SearchBar from "./SearchBar";

const Home = () => {
  const [stations, setStations] = useState({});
  const [center, setCenter] = useState({ lng: 0, lat: 0 });
  const [info, setInfo] = useState({});
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    fetch(
      "https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll"
    )
      .then((response) => response.json())
      .then((json) => setStations(json));
  }, []);
  return (
    <Flex position="relative">
      <Flex direction="column" h="100vh" w="30%">
        <SearchBar onChange={(value) => setKeyword(value)} />
        <Stations
          stations={
            !keyword
              ? stations
              : Object.values(stations).filter((value) =>
                  value.stationName
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
                )
          }
          onClick={(lng, lat, indexes) => {
            setCenter({ lng: lng, lat: lat });
            setInfo({ indexes: indexes, lat: lat, lng: lng });
          }}
        />
      </Flex>
      <Map mappers={stations} info={info} center={center} />
    </Flex>
  );
};

export default Home;
