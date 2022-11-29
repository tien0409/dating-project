type AxiosResponseType<T = undefined> = {
  message: string;
  statusCode: number;
  data?: T;
};

export default AxiosResponseType;
