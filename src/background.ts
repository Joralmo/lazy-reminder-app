"use strict";

import { app, protocol, BrowserWindow, Menu, Tray, NativeImage } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import path from 'path';
import Store from 'electron-store';
import { Reminder } from './electron/reminder';
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

Store.initRenderer();

let win: BrowserWindow, tray: Tray;

function createTray() {
  tray = new Tray(path.join(__dirname, "..", "public", "img", "icons", "lazyReminderTray.png"));
  tray.setToolTip("Lazy Reminder");
  tray.on("click", e => {
    if (e.shiftKey) {
      app.quit();
    } else {
      win.isVisible() ? win.hide() : win.show();
    }
  });
  tray.setContextMenu(Menu.buildFromTemplate([
    { role: "quit" }
  ]));
}

async function createWindow() {
  // Create the browser window.
  createTray();
  const dimension: number = 500;
  win = new BrowserWindow({
    width: dimension,
    height: dimension,
    minWidth: dimension,
    minHeight: dimension,
    maxHeight: dimension,
    maxWidth: dimension,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    },
    icon: path.join(__dirname, "..", "public", "img", "icons", "lazyReminder.png")
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
  const reminder: Reminder = Reminder.getInstance();
  reminder.initialize();

  win.on("close", e => {
    e.preventDefault();
    win.hide();
  })
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
