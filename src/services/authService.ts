import api from "./api";
import { RegisterRequest, LoginRequest, AuthResponse } from "../types/auth";

export const register = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", data);
  return res.data;
};

export const login = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", data);
  return res.data;
};