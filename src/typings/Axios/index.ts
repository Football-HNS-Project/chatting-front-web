import { AxiosError } from "axios";

export type TErrorRes = AxiosError<{
  errorCode: string;
  errorMessage: string;
}>;
