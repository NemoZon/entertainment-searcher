import { ValidationError } from 'express-validator';

class ApiError extends Error {
  status: number;
  errors: (Error | ValidationError)[];

  constructor(
    status: number,
    message: string,
    errors: (Error | ValidationError)[] = []
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
    console.log('ApiError:', this);
  }

  static UnauthorizedError(): ApiError {
    return new ApiError(401, 'User is unauthorized');
  }

  static InternalError(): ApiError {
    return new ApiError(500, 'Internal server error');
  }

  static BadRequest(
    message: string,
    errors: (Error | ValidationError)[] = []
  ): ApiError {
    return new ApiError(400, message, errors);
  }

  static NotFound(
    message: string,
    errors: (Error | ValidationError)[] = []
  ): ApiError {
    return new ApiError(404, message, errors);
  }
}

export default ApiError;