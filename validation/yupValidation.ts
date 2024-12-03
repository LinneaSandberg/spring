import * as Yup from "yup";

export const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const createNumberField = () => Yup.number().default(0);

export const budgetSchema = Yup.object({
  _id: Yup.string().optional(),
  month: Yup.number().required(),
  year: Yup.number().required(),
  totalIncome: Yup.number().required("You need to enter your total income"),
  fixedExpenses: Yup.object({
    housingCosts: createNumberField(),
    transportation: createNumberField(),
    subscriptions: createNumberField(),
    healthAndWellness: createNumberField(),
    entertainment: createNumberField(),
  }).required(),
  remaningBalance: Yup.number().required(),
  variableExpenses: Yup.object({
    planned: Yup.number().required(),
    expenses: Yup.array()
      .of(
        Yup.object({
          date: Yup.string().required(),
          description: Yup.string().required(),
          amount: Yup.number().required(),
        })
      )
      .default([]),
  }).required(),
}).required();
