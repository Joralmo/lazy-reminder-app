import { contextBridge } from "electron";
import { LocalStorage } from "./store";

const Store = new LocalStorage();

contextBridge.exposeInMainWorld("electronTools", {
  Store,
});
