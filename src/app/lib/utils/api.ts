// utils/api.ts

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }
  
  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  if (typeof error === 'string') {
    return new ApiError(error);
  }
  
  return new ApiError('Error desconocido');
};