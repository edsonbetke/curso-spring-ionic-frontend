import { Cart } from "./../models/cart";
import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "./../config/storage_keys.config";
import { LocalUser } from "./../models/local_user";
//serviço para recuperar ou inserir no LocalStorage
@Injectable()
export class StorageService {
  //Metodo para obter a chave criada com o nome de localUser no localStorage
  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  //Metodo para receber o valor da chave localUser armazenada no localStorage
  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }
  }

  //Metodo para obter a chave criada com o nome de cursoSpringIonicCart no localStorage
  getCart(): Cart {
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str != null) {
      return JSON.parse(str);
    } else {
      return null;
    }
  }

  //Metodo para receber o valor da chave cursoSpringIonicCart armazenada no localStorage
  setCart(obj: Cart) {
    if (obj != null) {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
    } else {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
  }
}
