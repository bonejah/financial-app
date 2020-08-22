import ApiService from "./apiService";

import ErroException from "../exceptions/errorException";

class UsuarioService extends ApiService {

  constructor(){
    super("/api/usuarios")
  }

  autenticar(credentials) {
    return this.post("/autenticar", credentials);
  }

  obterSaldoPorUsuario(id) {
    return this.get(`/${id}/saldo`);
  }

  saveUser(user) {
    return this.post("/", user);
  }

  validar(user) {
    const errors = [];

    if (!user.nome){
      errors.push("Field name is required!");
    }

    if (!user.email){
      errors.push("Field email is required!");
    } else if (!user.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
      errors.push("Please type an email valid!")
    }

    if (!user.senha || !user.senhaRepeticao){
      errors.push("Please type the password 2 times!");
    } else if (user.senha !== user.senhaRepeticao){
      errors.push("Password is need to be the same !");
    }

    if (errors && errors.length > 0) {
      throw new ErroException(errors);
    }
  }

}

export default UsuarioService;