export interface RegisterRequest {
  name: string;
  username:string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id?: string;
    name?: string;
    email: string;
  };
}