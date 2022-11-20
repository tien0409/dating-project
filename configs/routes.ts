import { join } from "path";

export const AUTH_ROUTE = "/auth";
export const LOGIN_ROUTE = join(AUTH_ROUTE, "/login");
export const FORGOT_PASSWORD_ROUTE = join(AUTH_ROUTE, "/forgot-password");
