export type RegisterInfo = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  uid: string;
  name: string;
  email: string;
  password: string;
};

export type CreateUser = {
  name: string;
  _id: string;
  email: string;
  uid: string;
};

export type LoginInfo = {
  email: string;
  password: string;
};

export type ResetPasswordInfo = {
  email: string;
};
