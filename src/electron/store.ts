import Store, { Schema } from "electron-store";

const schema: Schema<Record<string, unknown>> = {
  showBreaksIn: {
    type: "number",
    maximum: 2,
    minimum: 1,
    default: 2,
  },
  intervalForBreaks: {
    type: "number",
    maximum: 60,
    minimum: 5,
    default: 15,
  },
};

export class LocalStorage {
  private store: Store;
  constructor() {
    this.store = new Store({ schema });
  }

  get = (key: string) => {
    return this.store.get(key);
  };

  set = (key: string, value: any) => {
    this.store.set(key, value);
  };

  delete = (key: string) => {
    this.store.delete(key);
  };
}
