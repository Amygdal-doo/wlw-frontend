import { AxiosInstance } from "axios";
import appendToken from "./appendToken";
import { tokenService } from "../services/tokenService";

const interceptRequest = (httpClient: AxiosInstance): void => {
  httpClient.interceptors.request.use(
    (config) => {
      const userToken = tokenService.token;

      if (userToken) {
        appendToken(config, userToken);
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default interceptRequest;
