import { AxiosInstance } from "axios";
import clearLocalStorage from "./clearLocalStorage";

const interceptResponse = (httpClient: AxiosInstance): void => {
  httpClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        if (error.message === "Network Error") {
          console.error("Network error - server is probably down");
          throw error;
        } else {
          console.error("Unknown error", error);
          throw error;
        }
      } else {
        switch (error.response.status) {
          case 401: // Unauthorized
            clearLocalStorage();
            break;
        }
      }
      return error.response;
    }
  );
};
export default interceptResponse;
