export type RegisterInfo = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  uid: string;
  email: string;
  password: string;
};

export type CreateUser = {
  _id: string;
  email: string;
  uid: string;
};
