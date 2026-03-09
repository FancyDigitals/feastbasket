const FALLBACK_API_BASE_URL = "https://api.feastbasket.com";

type AppEnv = {
  apiBaseUrl: string;
  appName: string;
};

export const env: AppEnv = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || FALLBACK_API_BASE_URL,
  appName: import.meta.env.VITE_APP_NAME?.trim() || "Feast Basket",
};

export type { AppEnv };