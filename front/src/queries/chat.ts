import { useQuery } from "react-query";
import { api } from "../services/connectionAPI";
import { useAuthentication } from "../store/authentication";

export const chat = async (token: string) => {
  return await api.get("/chat", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const useChat = () => {
  const { access_token } = useAuthentication();
  const query = useQuery("chat", () => chat(access_token || ""), {
    staleTime: Infinity,
  });
  return query;
};
