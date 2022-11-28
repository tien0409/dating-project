import { emailRegex } from "./regexes";

export const firstNameValidator = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("First name is required"));
  }
  if (value && value.length > 20) {
    return Promise.reject(new Error("First name must be less than 20 characters"));
  }
};

export const lastNameValidator = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Last name is required"));
  }
  if (value && value.length > 15) {
    return Promise.reject(new Error("Last name must be less than 15 characters"));
  }
};

export const birthdayValidator = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Birthday is required"));
  }
};

export const genderValidator = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Gender is required"));
  }
};

export const emailValidator = async (_: any, value: string) => {
  if (value && !emailRegex.test(value)) {
    return Promise.reject(new Error("Please enter a valid email address!"));
  }
};

export const passwordValidator = async (_: any, value: string) => {
  if (value && value?.length < 8) {
    return Promise.reject(new Error("Password must be at least 8 characters!"));
  }
};

export const confirmPasswordValidator = ({ getFieldValue }: { getFieldValue: any }) => ({
  validator(_: any, value: string) {
    if (!value || getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords that you entered do not match!"));
  },
});
