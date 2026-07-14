export interface changePasswordPayload {
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}
