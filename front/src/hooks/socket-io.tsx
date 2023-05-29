import { io } from "socket.io-client";
import { useAuthentication } from "../store/authentication";

// @ts-ignore
const URL = import.meta.env.VITE_BASE_URL;

export const useSocket = () => {
  const { access_token } = useAuthentication();

  const socket = io(URL, {
    auth: {
      token: access_token,
    },
  });
  return socket;
};
