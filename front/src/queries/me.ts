import { useQuery } from "react-query";
import { api } from "../services/connectionAPI";
import { useAuthentication } from "../store/authentication";

export const profile = async (token: string) => {
  return await api.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useProfile = () => {
  const { access_token } = useAuthentication();

  const query = useQuery("profile", () => profile(access_token || ""));

  return query;
};
