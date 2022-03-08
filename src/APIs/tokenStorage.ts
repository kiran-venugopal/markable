class TokenStorage {
  #token = "";

  getToken() {
    return this.#token;
  }
  setToken(token = "") {
    this.#token = token;
  }
}

const tokenStorage = new TokenStorage();
export default tokenStorage;
