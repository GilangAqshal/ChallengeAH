// interface definition
interface Auth {
  email: string;
  password: string;
  login(): void;
  logout(): void;
}

// usage as object
const userAuth: Auth = {
  email: "agung@wpucourse.id",
  password: "12341234",
  login() {},
  logout() {},
};

// usage as class
class UserAuth implements Auth {
  email: string = "";
  password: string = "";
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  login(): void {}
  logout(): void {}
}

const userAgung = new UserAuth("agung@wpucourse.id", "12341234");
