import Store, { Schema } from "electron-store";
import { Reminder } from "./reminder";

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
  breakDuration: {
    type: "number",
    maximum: 60,
    minimum: 5,
    default: 15,
  },
  showOnAllMonitors: {
    type: "boolean",
    default: false,
  },
  actualDate: {
    type: "number",
    default: 0,
  },
  nextDate: {
    type: "number",
    default: 0,
  },
};

export class LocalStorage {
  private static instance: LocalStorage;
  private store: Store;
  constructor() {
    this.store = new Store({ schema, watch: true });
  }

  public static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }

    return LocalStorage.instance;
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

  onChange = (key: string, callback: Function): Function => {
    return this.store.onDidChange(key, (newValue, oldValue) => {
      callback(newValue, oldValue);
    });
  };
}
