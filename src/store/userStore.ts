import { createContext } from "react";
import type { SigninPayload, SignupPayload, User } from "../types/user";

export type UserStoreValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  signout: () => void;
};

export const UserStoreContext = createContext<UserStoreValue | undefined>(undefined);