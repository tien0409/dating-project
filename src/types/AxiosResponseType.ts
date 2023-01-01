type AxiosResponseType<T = undefined> = {
  message: string;
  statusCode: number;
  data?: T | any;
};

export default AxiosResponseType;
