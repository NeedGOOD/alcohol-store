export type AuthInput = {
  email: string;
  password: string;
};

export type SignIn = {
  userId: number;
  email: string;
};

export type AuthResult = {
  accessToken: string;
  userId: number;
  email: string;
};
