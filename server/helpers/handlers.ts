export const succesMessageHelper = (statusCode: number, message: string) => {
  return {
    statusCode,
    success: true,
    message,
  };
};

interface ErrorObject {
  statusCode: number;
  name: string;
  message: string;
}

export const errorMessageHelper = (errorObject: ErrorObject) => {
  return {
    error: true,
    ...errorObject,
  };
};
