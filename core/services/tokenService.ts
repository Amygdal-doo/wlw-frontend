import { LOCAL_STORAGE } from "../const/local-storage";
import { IToken } from "../interfaces/token.interface";
import  getItemFromLocalStorage  from "../utils/getItemFromLocalStorage";
import  setItemToLocalStorage  from "../utils/setItemToLocalStorage";

class TokenService {
  get token(): IToken | null {
    return getItemFromLocalStorage<IToken>(LOCAL_STORAGE.TOKEN);
  }

  set token(value: IToken | null) {
    setItemToLocalStorage(LOCAL_STORAGE.TOKEN, value);
  }

  clear() {
    this.token = null;
  }
}

export const tokenService = new TokenService();
