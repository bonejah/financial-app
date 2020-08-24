import ApiService from "./apiService";

import ErroException from "../exceptions/errorException";

class UserService extends ApiService {

  constructor(){
    super("/api/users");
  }

  authenticate(credentials) {
    return this.post("/authenticate", credentials);
  }

  getBalanceById(id) {
    return this.get(`/${id}/balance`);
  }

  save(user) {
    return this.post("/", user);
  }

  validate(user) {
    const messages = [];

    if (!user.name){
      messages.push("Field name is required!");
    }

    if (!user.email){
      messages.push("Field email is required!");
    } else if (!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
      messages.push("Please type an email valid!")
    }

    if (!user.password || !user.passwordConfirm){
      messages.push("Please type the password 2 times!");
    } else if (user.password !== user.passwordConfirm){
      messages.push("Password is need to be the same !");
    }

    if (messages && messages.length > 0) {
      throw new ErroException(messages);
    }
  }

}

export default UserService;