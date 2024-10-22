import { LOCAL_STORAGE } from "../const/local-storage";

const isJSON = (item: string) => {
  try {
    JSON.parse(item);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

const getItemFromLocalStorage = <T>(key: LOCAL_STORAGE): T | null => {
  try {
    const item = window.localStorage.getItem(key);

    if (item !== null) {
      // If the item is valid JSON, parse it, otherwise return it as a string
      return isJSON(item) ? JSON.parse(item) : (item as unknown as T);
    }
  } catch (error) {
    console.error(
      `Can not get item with key ${key} from local storage - `,
      error
    );
  }

  return null;
};

export default getItemFromLocalStorage;
