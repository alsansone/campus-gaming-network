////////////////////////////////////////////////////////////////////////////////
// Event Response Utilities

// Utilities
import { mapEvent } from "src/utilities/event";
import { mapSchool } from "src/utilities/school";
import { mapUser } from "src/utilities/user";
import { cleanObjectOfBadWords } from "src/utilities/other";

export const mapEventResponse = (eventResponse) => {
  if (!Boolean(eventResponse)) {
    return undefined;
  }

  return cleanObjectOfBadWords({
    ...eventResponse,
    school: mapSchool(eventResponse.school),
    user: mapUser(eventResponse.user),
    event: mapEvent(eventResponse.event),
  });
};
