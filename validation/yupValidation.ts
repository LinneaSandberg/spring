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
  plannedExpenses: Yup.number().optional(),
  plannedSaving: Yup.number().optional(),
}).required();

export const expenseSchema = Yup.object({
  _id: Yup.string().required(),
  date: Yup.date()
    .required("Date is required")
    .test("is-past-date", "Date cannot be in the future", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate <= today;
    }),
  description: Yup.string()
    .required("Description is required")
    .min(2, "Description must be at least 2 characters"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number")
    .test("not-zero", "Amount cannot be zero", (value) => value !== 0),
  necessary: Yup.boolean().default(false),
});
