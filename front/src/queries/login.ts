import { useMutation } from "react-query";
import { string } from "yup";
import { api } from "../services/connectionAPI";
import { useAuthentication } from "../store/authentication";

type Request = {
  name: string;
  password: string;
};

const loginRequest = async (todo: Request) => {
  return await api.post("/auth/login", todo);
};

export const useLogin = () => {
  const { loginAuth } = useAuthentication();
  const mutation = useMutation((newTodo: Request) => loginRequest(newTodo), {
    onSuccess: (result) => loginAuth(result.data.access_token),
    onError: (error: any) => {
      throw error.response.data.message;
    },
  });

  return mutation;
};
