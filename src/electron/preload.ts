import { contextBridge } from "electron";
import { LocalStorage } from "./store";

const Store = LocalStorage.getInstance();

contextBridge.exposeInMainWorld("electronTools", {
  Store,
});
