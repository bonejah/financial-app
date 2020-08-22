import LocalStorageService from "./localStorageService";

export const USER_LOGGED = "_usuarioLogado";

export default class AuthService {

  static isUserAuthenticated() {
    const user = LocalStorageService.getItem(USER_LOGGED);
    return user && user.id;
  }

  static removeUserAuthenticated() {
    LocalStorageService.remmoveItem(USER_LOGGED);
  }

  static login(user){
    LocalStorageService.addItem(USER_LOGGED, user);
  }

  static getUserAuthenticated() {
    return LocalStorageService.getItem(USER_LOGGED);
  }

}
