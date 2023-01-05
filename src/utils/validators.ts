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
  } else if (value && new Date(value) > new Date()) {
    return Promise.reject(new Error("Birthday must be in the past"));
  } else if (value && new Date(value) < new Date("1900-01-01")) {
    return Promise.reject(new Error("Birthday must be after 1900"));
  } else {
    const currentTime = new Date();
    const currentYear = currentTime.getFullYear();
    const yearMin = currentYear - 18;
    currentTime.setFullYear(yearMin);
    if (new Date(value) > currentTime) {
      return Promise.reject(new Error("You must be at least 18 years old"));
    }
  }
};

export const genderValidator = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Gender is required"));
  }
};

export const lookingForGenderValidate = async (_: any, value: string) => {
  if (!value) {
    return Promise.reject(new Error("Interested in gender is required"));
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

export const confirmNewPasswordValidator = ({ getFieldValue }: { getFieldValue: any }) => ({
  validator(_: any, value: string) {
    if (!value || getFieldValue("newPassword") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("The two passwords that you entered do not match!"));
  },
});

export const userPhotosValidator = async (_: any, value: any) => {
  if (!value || value?.fileList?.length < 3) {
    return Promise.reject(new Error("Please upload at least 3 photos!"));
  }
};
