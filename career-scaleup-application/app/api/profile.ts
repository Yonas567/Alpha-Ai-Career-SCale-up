import api from ".";
import { User } from "../types";

export const ProfileApi = {
  getProfile: async () => {
    return api
      .get("/profile")
      .then((res) => res.data as User)
      .catch((error) => {
        throw new Error("Failed to fetch profile", error);
      });
  },

  getAllUsers: async () => {
    return api
      .get("/user")
      .then((res) => res.data as User[])
      .catch((error) => {
        throw new Error("failed to fetch users", error);
      });
  },
};
