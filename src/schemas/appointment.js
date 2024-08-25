import * as yup from "yup";

const messages = {
  required: "field is requiered",
  email: "value is not email",
  phone: "must be in format +xxxxxxxxxxxx",
  time: "value is not a time",
  childAge: "value must be from 1 to 17",
  minLength: "length must be at least",
  maxLength: "length must be not more that",
};

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegExp = /^\+\d{12}$/;
const ageRegExp = /^\d{1,2}$/;
const timeRegExp = /^\d{2}:\d{2}$/;

export const appointment = yup.object({
  nannyId: yup.string().required(messages.required),
  address: yup
    .string()
    .trim()
    .required(messages.required)
    .min(2, `${messages.minLength} 2`)
    .max(128, `${messages.maxLength} 128`),
  phone: yup
    .string()
    .trim()
    .required(messages.required)
    .matches(phoneRegExp, messages.phone),
  childAge: yup
    .string()
    .trim()
    .required(messages.required)
    .matches(ageRegExp, messages.childAge)
    .test("child-age", messages.childAge, (value) => {
      const age = Number(value);
      return Number.isNaN(age) || age === 0 || age > 17 ? false : true;
    }),
  time: yup
    .string()
    .trim()
    .required(messages.required)
    .matches(timeRegExp, messages.time)
    .test("time", messages.time, (value) => value !== "00:00"),
  parent: yup
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
  comment: yup
    .string()
    .trim()
    .required(messages.required)
    .min(2, `${messages.minLength} 2`)
    .max(512, `${messages.maxLength} 512`),
});
