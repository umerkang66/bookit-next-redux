export class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    // returns the location of the particular error in code
    Error.captureStackTrace(this, this.constructor);
  }
}
