import { Error as MongooseError } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { CustomError } from '../utils/custom-error';

const handleMongooseErrors = (err: Error): Error | CustomError => {
  let error: Error | CustomError = err;

  // If there are some other errors like (mongoose errors), then create CustomError out of it
  if (err instanceof MongooseError.CastError) {
    // in case of mongoose CastError, message does
    const message = `Resource not found, Invalid '${err.path}'`;
    error = new CustomError(message, 400);
  }

  if (err instanceof MongooseError.ValidationError) {
    const requiredFields: string[] = [];
    for (const keys in err.errors) {
      requiredFields.push(err.errors[keys].path);
    }

    const fieldsStr = requiredFields.join(', ');
    const msg = `Please enter these required fields correctly: [${fieldsStr}]`;
    error = new CustomError(msg, 400);
  }

  return error;
};

export const errorHandler = (
  err: Error,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // if error is not one of the mongoose errors, it just returns the previous error
  err = handleMongooseErrors(err);

  if (err instanceof CustomError) {
    // if this is a known error, just send the response
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // if this is an unknown error
  console.log('✨✨✨', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
};
