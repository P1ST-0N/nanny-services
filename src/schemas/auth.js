import * as yup from "yup";

const messages = {
  required: "field is requiered",
  email: "value is not email",
  minLength: "length must be at least",
  maxLength: "length must be not more that",
  hasWhiteSpace: "value must not contain whitespaces",
};

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const signUp = yup.object({
  name: yup
    .string()
    .trim()
    .required(messages.required)
    .min(2, `${messages.minLength} 2`)
    .max(32, `${messages.maxLength} 32`),
  email: yup
    .string()
    .trim()
    .lowercase()
    .required(messages.required)
    .matches(emailRegExp, messages.email),
  password: yup
    .string()
    .required(messages.required)
    .min(5, `${messages.minLength} 5`)
    .matches(/^\S*$/, messages.hasWhiteSpace),
});

export const logIn = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required(messages.required)
    .matches(emailRegExp, messages.email),
  password: yup
    .string()
    .required(messages.required)
    .min(5, `${messages.minLength} 5`)
    .matches(/^\S*$/, messages.hasWhiteSpace),
});

export default {
  signUp,
  logIn,
};
