export type ReducerResponse<T> = {
  data: T;
  status: number;
};

export type BaseReducerState = {
  loading: boolean,
  error: string,
  status: number,
};

export type ReducerError = {
  message: string;
  status: number;
};

export function isReducerError(error: unknown): error is ReducerError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error &&
    typeof (error as any).message === 'string' &&
    typeof (error as any).status === 'number'
  );
}
