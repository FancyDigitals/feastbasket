import { axiosInstance } from "../config/axios";
import type { SigninPayload, SignupPayload, User } from "../types/user";

type AuthResponse = {
  user: User;
  token: string;
};

const buildMockUser = (email: string, firstName = "Feast", lastName = "Customer"): User => ({
  id: crypto.randomUUID(),
  firstName,
  lastName,
  email,
  phone: "+2348000000000",
});

export const authService = {
  async signin(payload: SigninPayload): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/signin", payload);
      return response.data;
    } catch {
      return {
        user: buildMockUser(payload.email),
        token: "mock-session-token",
      };
    }
  },
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<AuthResponse>("/auth/signup", payload);
      return response.data;
    } catch {
      return {
        user: buildMockUser(payload.email, payload.firstName, payload.lastName),
        token: "mock-session-token",
      };
    }
  },
};