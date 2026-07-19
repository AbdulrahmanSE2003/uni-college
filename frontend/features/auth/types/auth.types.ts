export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  auth: {
    token: string;
    user: import("@/types/user.types").User;
  };
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ForgotPasswordResponse {
  status: boolean;
  message: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface ResetPasswordPayload {
  password: string;
  passwordConfirm: string;
}

export interface AuthMessageResponse {
  status: boolean;
  message: string;
}

export interface LogoutResponse {
  status: true;
}
