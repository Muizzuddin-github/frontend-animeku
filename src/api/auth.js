import axiosIns from "./axiosIns";

class Auth {
  static register(body) {
    return axiosIns.post("/user/register", body);
  }
  static registerSave(otp) {
    return axiosIns.post("/user/register-save", {
      otp: otp,
    });
  }
  static login(body) {
    return axiosIns.post("/user/login", body);
  }
  static isLogin() {
    return axiosIns.get("/user/islogin");
  }
}

export default Auth;
