import Store from "electron-store";

export default class LocalStorage {
  #store: Store;
  constructor() {
    this.#store = new Store();
  }

  get(key: string) {
    return this.#store.get(key);
  }

  set(key: string, value: any) {
    this.#store.set(key, value);
  }

  delete(key: string) {
    this.#store.delete(key);
  }
}
