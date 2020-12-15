import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React from "react";

const SearchBar = (props) => {
  return (
    <Flex direction="column" p={2}>
      <Text>Wyszukaj</Text>
      <InputGroup>
        <InputLeftElement pointerEvent="none" children={<SearchIcon />} />
        <Input onChange={(e) => props.onChange(e.target.value)} />
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
