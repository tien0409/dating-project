type CreateAccountType = {
  firstName: string;
  lastName: string;
  birthday: Date;
  userPhotos: string[];
  bio?: string;
  gender: string;
};

export default CreateAccountType;