export interface changePasswordPayload {
  oldPassword: string;
  password: string;
  passwordConfirm: string;
}

export interface ChangePasswordResponse {
  status: boolean;
  message: string;
}
