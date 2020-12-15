import { Button, Stack } from "@chakra-ui/react";
import React from "react";

const Stations = (props) => {
  return (
    <Stack overflow="scroll" spacing={2} px={2} h="100%" w="100%">
      {Object.values(props.stations).map((value) => (
        <Button
          key={value.id}
          size="lg"
          p={2}
          fontSize=".7rem"
          onClick={() => {
            fetch(
              `https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${value.id}`
            )
              .then((response) => response.json())
              .then((json) =>
                props.onClick(
                  parseFloat(value.gegrLon),
                  parseFloat(value.gegrLat),
                  json
                )
              );
          }}
        >
          {value.stationName}
        </Button>
      ))}
    </Stack>
  );
};

export default Stations;
