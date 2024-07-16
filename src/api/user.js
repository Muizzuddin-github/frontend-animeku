import axiosIns from "./axiosIns";

class UserApi {
  static getAll() {
    return axiosIns.get("/user/history");
  }

  static add(body) {
    return axiosIns.post("/user/history", body);
  }
  static del(id) {
    return axiosIns.delete(`/user/history/${id}`);
  }
}

export default UserApi;
