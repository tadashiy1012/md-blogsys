class LoggedListProcessor {
  constructor() {
    this.logged = {};
  }
  add(user) {
    this.logged[user.name] = user;
  }
  rm(user) {
    this.logged[user.name] = null;
  }
  find(name) {
    const user = this.logged[name];
    return user;
  }
}
class UserAuthenticator {
  constructor() {
    this.ls = [
      {name: "yama", pass: "hogehoge"}
    ];
  }
  check(user) {
    let valid = false;
    for (let item of this.ls) {
      if (item.name === user.name && item.pass === user.pass) {
        valid = true;
        break;
      }
    }
    return valid;
  }
}
const LoginService = (() => {
  let instance = null;
  return class LoginService {
    constructor() {
      this.listProc = new LoggedListProcessor();
      this.authProc = new UserAuthenticator();
    }
    static getInstance() {
      if (instance === null) {
        instance = new LoginService();
      }
      return instance;
    }
    execLogin(name, pass) {
      const check = this.authProc.check({name: name, pass: pass});
      if (check) {
        this.listProc.add({name: name, pass: pass});
        return true;
      } else {
        return false;
      }
    }
    getLogged(name) {
      const result = this.listProc.find(name);
      if (result !== null && result !== undefined) {
        return true;
      } else {
        return false;
      }
    }
    execLogout(name) {
      this.listProc.rm({name:name});
    }
  }
})();

module.exports = LoginService;