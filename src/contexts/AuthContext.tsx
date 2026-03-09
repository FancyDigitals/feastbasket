import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../services/authService";
import type { SigninPayload, SignupPayload, User } from "../types/user";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signin: (payload: SigninPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  signout: () => void;
};

const AUTH_STORAGE_KEY = "feast-basket-auth";

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedValue) {
      const parsed = JSON.parse(storedValue) as { user: User | null; token: string | null };
      setUser(parsed.user);
      setToken(parsed.token);
    }

    setIsLoading(false);
  }, []);

  const persistSession = useCallback((nextUser: User | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);

    if (nextToken) {
      window.localStorage.setItem("feast-basket-token", nextToken);
    } else {
      window.localStorage.removeItem("feast-basket-token");
    }

    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user: nextUser, token: nextToken })
    );
  }, []);

  const signin = useCallback(
    async (payload: SigninPayload) => {
      const response = await authService.signin(payload);
      persistSession(response.user, response.token);
    },
    [persistSession]
  );

  const signup = useCallback(
    async (payload: SignupPayload) => {
      const response = await authService.signup(payload);
      persistSession(response.user, response.token);
    },
    [persistSession]
  );

  const signout = useCallback(() => {
    persistSession(null, null);
  }, [persistSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      signin,
      signup,
      signout,
    }),
    [isLoading, signin, signout, signup, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}