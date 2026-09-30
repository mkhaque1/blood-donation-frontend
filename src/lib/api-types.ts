export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiErrorShape {
  success: false;
  message: string;
  errors: { field?: string; message: string }[];
}

export class ApiError extends Error {
  statusCode: number;
  errors: { field?: string; message: string }[];

  constructor(
    statusCode: number,
    message: string,
    errors: { field?: string; message: string }[] = [],
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
