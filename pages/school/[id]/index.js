// Libraries
import React from "react";
import {
  Stack,
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Flex,
  Avatar,
  VisuallyHidden,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faFlag,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import safeJsonStringify from "safe-json-stringify";
import dynamic from "next/dynamic";

// API
import {
  getSchoolDetails,
  getSchoolEvents,
  getSchoolUsers,
} from "src/api/school";

// Constants
import {
  EMPTY_SCHOOL_WEBSITE,
  SCHOOL_EMPTY_USERS_TEXT,
  SCHOOL_EMPTY_UPCOMING_EVENTS_TEXT,
} from "src/constants/school";

// Components
import SiteLayout from "src/components/SiteLayout";
import Article from "src/components/Article";
import OutsideLink from "src/components/OutsideLink";
import EventListItem from "src/components/EventListItem";
import SchoolLogo from "src/components/SchoolLogo";
import UserListItem from "src/components/UserListItem";
import SliderLazyLoad from "src/components/SliderLazyLoad";

// Providers
import { useAuth } from "src/providers/auth";

// Dynamic Components
const ReportEntityDialog = dynamic(
  () => import("src/components/dialogs/ReportEntityDialog"),
  {
    ssr: false,
  }
);
const NearbySchools = dynamic(() => import("src/components/NearbySchools"), {
  ssr: false,
});
const UpcomingSchoolEvents = dynamic(
  () => import("src/components/UpcomingSchoolEvents"),
  {
    ssr: false,
  }
);

////////////////////////////////////////////////////////////////////////////////
// getServerSideProps

export const getServerSideProps = async (context) => {
  const [schoolResponse, usersResponse, eventsResponse] = await Promise.all([
    getSchoolDetails(context.params.id),
    getSchoolUsers(context.params.id),
    getSchoolEvents(context.params.id),
  ]);
  const { school } = schoolResponse;
  const { users } = usersResponse;
  const { events } = eventsResponse;

  if (!Boolean(school)) {
    return { notFound: true };
  }

  const data = { school, users, events };

  return { props: JSON.parse(safeJsonStringify(data)) };
};

////////////////////////////////////////////////////////////////////////////////
// School

const School = (props) => {
  const { isAuthenticated } = useAuth();
  const [
    isReportingUserDialogOpen,
    setReportingUserDialogIsOpen,
  ] = React.useState(false);

  const openReportEntityDialog = () => {
    setReportingUserDialogIsOpen(true);
  };

  const closeReportEntityDialog = () => {
    setReportingUserDialogIsOpen(false);
  };

  return (
    <SiteLayout meta={props.school.meta}>
      <Box bg="gray.100" h="150px" />
      <Article>
        <Flex align="center" justify="center">
          <Box mt={{ base: -50, sm: -100, md: -150 }}>
            <SchoolLogo
              rounded="full"
              bg="white"
              shadow="sm"
              borderWidth={2}
              borderStyle="solid"
              schoolId={props.school.id}
              schoolName={props.school.formattedName}
              h={40}
              w={40}
              htmlHeight={40}
              htmlWidth={40}
              fallback={
                <Flex
                  rounded="full"
                  bg="white"
                  shadow="sm"
                  borderWidth={2}
                  alignItems="center"
                  justifyContent="center"
                  color="gray.600"
                  h={40}
                  w={40}
                >
                  <FontAwesomeIcon icon={faSchool} size="4x" />
                </Flex>
              }
            />
          </Box>
        </Flex>
        <Stack spacing={10}>
          <Flex
            as="header"
            align="center"
            justify="space-between"
            px={{ base: 4, md: 0 }}
            pt={8}
          >
            <Heading as="h2" fontSize="5xl" fontWeight="bold" pb={2}>
              {props.school.formattedName}
            </Heading>
            {isAuthenticated ? (
              <Box>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    size="sm"
                    icon={<FontAwesomeIcon icon={faEllipsisH} />}
                    aria-label="Options"
                  />
                  <MenuList fontSize="md">
                    <MenuItem
                      onClick={openReportEntityDialog}
                      icon={<FontAwesomeIcon icon={faFlag} />}
                    >
                      Report school
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            ) : null}
          </Flex>
          <Box as="section" pt={4}>
            <VisuallyHidden as="h2">Description</VisuallyHidden>
            <Text>{props.school.description}</Text>
          </Box>
          <Stack as="section" spacing={4}>
            <Heading
              as="h3"
              fontSize="sm"
              textTransform="uppercase"
              color="gray.500"
              px={{ base: 4, md: 0 }}
            >
              Information
            </Heading>
            <Flex as="dl" flexWrap="wrap" w="100%" px={{ base: 4, md: 0 }}>
              <Text as="dt" w="50%" fontWeight="bold">
                Contact Email
              </Text>
              {Boolean(props.school.contactEmail) ? (
                <Text as="dd" w="50%">
                  <OutsideLink href={`mailto:${props.school.contactEmail}`}>
                    {props.school.contactEmail}
                  </OutsideLink>
                </Text>
              ) : (
                <Text as="dd" w="50%" color="gray.400">
                  Nothing set
                </Text>
              )}
              <Text as="dt" w="50%" fontWeight="bold">
                Website
              </Text>
              {props.school.website &&
              props.school.website !== EMPTY_SCHOOL_WEBSITE ? (
                <Text as="dd" w="50%">
                  {props.school.isValidWebsiteUrl ? (
                    <OutsideLink
                      d="inline-block"
                      href={`//${props.school.website}`}
                    >
                      {props.school.website}
                    </OutsideLink>
                  ) : (
                    <Text>{props.school.website}</Text>
                  )}
                </Text>
              ) : (
                <Text as="dd" w="50%" color="gray.400">
                  Nothing set
                </Text>
              )}
              <Text as="dt" w="50%" fontWeight="bold">
                Address
              </Text>
              {Boolean(props.school.address) ? (
                <Text as="dd" w="50%">
                  <OutsideLink
                    d="inline-block"
                    href={props.school.googleMapsAddressLink}
                  >
                    {props.school.formattedAddress}
                  </OutsideLink>
                </Text>
              ) : (
                <Text as="dd" w="50%" color="gray.400">
                  Nothing set
                </Text>
              )}
            </Flex>
          </Stack>
          <SliderLazyLoad>
            <UpcomingSchoolEvents
              school={props.school}
              title="Upcoming Events"
              emptyText={SCHOOL_EMPTY_UPCOMING_EVENTS_TEXT}
            />
          </SliderLazyLoad>
          <Stack as="section" spacing={4}>
            <Heading
              as="h3"
              fontSize="sm"
              textTransform="uppercase"
              color="gray.500"
              px={{ base: 4, md: 0 }}
            >
              Members
            </Heading>
            <UsersList users={props.users} />
          </Stack>
          {props.school.geohash ? (
            <NearbySchools
              latitude={props.school.location._latitude}
              longitude={props.school.location._longitude}
              settings={{ slidesToShow: 3 }}
            />
          ) : null}
        </Stack>
      </Article>

      {isAuthenticated ? (
        <ReportEntityDialog
          entity={{
            type: "schools",
            id: props.school.id,
          }}
          pageProps={props}
          isOpen={isReportingUserDialogOpen}
          onClose={closeReportEntityDialog}
        />
      ) : null}
    </SiteLayout>
  );
};

////////////////////////////////////////////////////////////////////////////////
// UsersList

const UsersList = (props) => {
  // const dispatch = useAppDispatch();
  // const [page, setPage] = React.useState(0);
  // const [users, isLoadingUsers] = useFetchSchoolUsers(
  //   props.id,
  //   undefined,
  //   page
  // );
  const hasUsers = React.useMemo(
    () => Boolean(props.users) && props.users.length && props.users.length > 0,
    [props.users]
  );
  // const isFirstPage = React.useMemo(() => page === 0, [page]);
  // const isLastPage = React.useMemo(
  //   () => hasUsers && users.length === DEFAULT_USERS_LIST_PAGE_SIZE,
  //   [hasUsers, users]
  // );
  // const isValidPage = React.useMemo(() => page >= 0, [page]);

  // const nextPage = () => {
  //   if (!isLastPage) {
  //     setPage(page + 1);
  //   }
  // };

  // const prevPage = () => {
  //   if (!isFirstPage) {
  //     setPage(page - 1);
  //   }
  // };

  if (hasUsers) {
    return (
      <React.Fragment>
        <List display="flex" flexWrap="wrap" mx={-2}>
          {props.users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </List>
        {/* <Flex justifyContent="space-between" m={2}>
          {!isFirstPage ? (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<ArrowBack />}
              colorScheme="brand"
              disabled={isFirstPage}
              onClick={prevPage}
            >
              Prev Page
            </Button>
          ) : null}
          {!isLastPage ? (
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowForward />}
              colorScheme="brand"
              disabled={isLastPage}
              onClick={nextPage}
              ml="auto"
            >
              Next Page
            </Button>
          ) : null}
        </Flex> */}
      </React.Fragment>
    );
  }

  return (
    <Text mt={4} color="gray.400">
      {SCHOOL_EMPTY_USERS_TEXT}
    </Text>
  );
};

export default School;
