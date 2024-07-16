import axiosIns from "./axiosIns";

class Anime {
  static search(name) {
    return axiosIns.get(`/anime/search/${name}`);
  }
}

export default Anime;
