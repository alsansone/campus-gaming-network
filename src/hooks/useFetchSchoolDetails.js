import React from "react";
import isEmpty from "lodash.isempty";

import { firebaseFirestore } from "../firebase";
import { mapSchool } from "../utilities";
import { useAppState } from "../store";

const useFetchSchoolDetails = id => {
  const state = useAppState();
  const [isLoading, setIsLoading] = React.useState(true);
  const [school, setSchool] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchSchoolDetails = async () => {
      setIsLoading(true);
      setSchool(null);
      setError(null);

      if (state.schools[id] && !isEmpty(state.schools[id])) {
        console.log(`[CACHE] fetchSchoolDetails...${id}`);

        setSchool(state.schools[id]);
        setIsLoading(false);
      } else {
        console.log(`[API] fetchSchoolDetails...${id}`);

        firebaseFirestore
          .collection("schools")
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              setSchool(mapSchool(doc.data(), doc));
            }
            setIsLoading(false);
          })
          .catch(error => {
            console.error({ error });
            setError(error);
            setIsLoading(false);
          });
      }
    };

    if (id) {
      fetchSchoolDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return [school, isLoading, error];
};

export default useFetchSchoolDetails;
