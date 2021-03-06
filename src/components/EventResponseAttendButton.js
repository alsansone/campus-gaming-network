import React from "react";
import { Button } from "@chakra-ui/react";

const EventResponseAttendButton = (props) => {
  return (
    <Button onClick={props.onClick} colorScheme="brand" w="200px">
      Attend Event
    </Button>
  );
};

export default EventResponseAttendButton;
