import firebaseAdmin from "src/firebaseAdmin";

// Utilities
import { mapUser } from "src/utilities/user";

export const getRecentlyCreatedUsers = async () => {
  let users = [];

  try {
    const recentlyCreatedUsersSnapshot = await firebaseAdmin
      .firestore()
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(25)
      .get();

    if (!recentlyCreatedUsersSnapshot.empty) {
      recentlyCreatedUsersSnapshot.forEach(doc => {
        const user = { ...mapUser(doc.data(), doc) };
        users.push(user);
      });
    }

    return { users };
  } catch (error) {
    console.log(error);
    return { users, error };
  }
};