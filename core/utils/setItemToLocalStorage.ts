import { LOCAL_STORAGE } from "../const/local-storage";

const setItemToLocalStorage = <T>(key: LOCAL_STORAGE, value: T): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `Can not get item with key ${key} from local storage - `,
      error
    );
  }
};

export default setItemToLocalStorage;
