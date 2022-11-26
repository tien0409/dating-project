import { emailRegex } from "./regexes";

export const emailValidator = async (_: any, value: string) => {
  if (value && !emailRegex.test(value)) {
    return Promise.reject(new Error("Please input a valid email address!"));
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
