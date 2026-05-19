import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string | undefined {
  if (isAxiosError(error)) {
    const description = (error.response?.data as { description?: string })
      ?.description;
    return description ?? error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return undefined;
}
