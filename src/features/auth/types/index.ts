export type AuthUser = {
  id: string;
  username: string;
  email: string;
};

export type UserResponse = {
  user: AuthUser;
  token: string;
  expiresIn: number;
};
