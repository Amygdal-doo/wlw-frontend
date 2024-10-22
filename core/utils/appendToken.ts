import { AxiosRequestConfig } from "axios";
import { IToken } from "../interfaces/token.interface";

const appendToken = (
  config: AxiosRequestConfig,
  token: null | IToken
): void => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
};

export default appendToken;
