import React from "react";
import { Box, Text, Flex, Stack, Badge } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import startCase from "lodash.startcase";

// Components
import SchoolLogo from "src/components/SchoolLogo";
import Link from "src/components/Link";
import SliderCard from "src/components/SliderCard";

const EventListItem = (props) => {
  if (!props.event || !props.school) {
    return null;
  }

  return (
    <SliderCard h="200px">
      <Flex direction="column" justify="space-between" height="100%">
        <Stack>
          <Flex justify="space-between" align="Center">
            {props.event.hasEnded ? (
              <Text
                d="inline"
                color="red.400"
                fontSize="sm"
                textTransform="uppercase"
                fontWeight="bold"
                isTruncated
              >
                Event ended
              </Text>
            ) : props.event.hasStarted ? (
              <Text
                d="inline"
                color="green.400"
                fontSize="sm"
                textTransform="uppercase"
                fontWeight="bold"
                isTruncated
              >
                Happening now
              </Text>
            ) : (
              <Text
                d="inline"
                as="time"
                color="blue.500"
                fontWeight="bold"
                dateTime={props.event.startDateTime.locale}
                title={props.event.startDateTime.locale}
                fontSize="sm"
                isTruncated
              >
                {startCase(props.event.startDateTime.relative)}
              </Text>
            )}
            <SchoolLogo
              schoolId={props.school.id}
              schoolName={props.school.formattedName}
              h={6}
              w={6}
              htmlHeight={6}
              htmlWidth={6}
              ml={2}
              fallback={
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  color="gray.500"
                  h={6}
                  w={6}
                  ml={2}
                >
                  <FontAwesomeIcon icon={faSchool} />
                </Flex>
              }
            />
          </Flex>
          <Link
            href={`/event/${props.event.id}`}
            color="gray.700"
            fontWeight={900}
            fontSize="2xl"
            title={props.event.name}
            noOfLines={3}
            lineHeight="1.2"
          >
            {props.event.name}
          </Link>
          <Link
            href={`/school/${props.school.id}`}
            color="gray.400"
            fontWeight={600}
            fontSize="sm"
            isTruncated
            title={props.school.formattedName}
          >
            {props.school.formattedName}
          </Link>
        </Stack>
        <Flex justifyContent="space-between" alignItems="center">
          {props.event.isOnlineEvent ? (
            <Badge fontSize="xs" color="gray.500" isTruncated>
              Online event
            </Badge>
          ) : null}
          {Boolean(props.event.responses) &&
          props.event.responses.yes &&
          props.event.responses.yes > 0 ? (
            <Text
              fontSize="xs"
              color="gray.400"
              fontWeight={600}
              flexShrink={0}
            >
              {props.event.responses.yes} Attending
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </SliderCard>
  );
};

export default EventListItem;
