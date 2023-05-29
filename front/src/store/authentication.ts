import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UseAuthentication = {
  access_token: string | undefined;
  loginAuth: (token: string) => void;
};

export const useAuthentication = create(
  persist<UseAuthentication>(
    (set) => ({
      access_token: "",
      loginAuth: (token) => {
        set({ access_token: token });
      },
    }),
    { name: "access_token", getStorage: () => sessionStorage }
  )
);
