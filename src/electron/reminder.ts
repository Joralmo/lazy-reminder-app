import cron, { ScheduledTask } from "node-cron";
import { LocalStorage } from "./store";
import { BrowserWindow, screen, Display } from "electron";
import path from "path";

export interface WindowObject {
  isShow: boolean;
  window: BrowserWindow;
}

export class Reminder {
  private static instance: Reminder;
  private task!: ScheduledTask;
  private store: LocalStorage;
  private unsubscribeChangeInterval!: Function;
  private unsubscribeChangeShowMode!: Function;
  private windows: Array<WindowObject> = [];
  constructor() {
    this.store = LocalStorage.getInstance();
    this.createWindow();
  }

  public static getInstance(): Reminder {
    if (!Reminder.instance) {
      Reminder.instance = new Reminder();
    }

    return Reminder.instance;
  }

  private createWindow() {
    const showOnAllMonitors = this.store.get("showOnAllMonitors") as boolean;
    if (showOnAllMonitors) {
      const displays = screen.getAllDisplays();
      for (const display of displays) {
        this.windows.push({
          isShow: false,
          window: this.returnWindow(display),
        });
      }
    } else {
      const display = screen.getPrimaryDisplay();
      this.windows.push({
        isShow: false,
        window: this.returnWindow(display),
      });
    }
  }

  returnWindow = (display: Display) => {
    const maxSize = display.workAreaSize;
    const { x, y } = display.workArea;
    const mode = this.store.get("showBreaksIn") as number;
    const window = new BrowserWindow({
      height: maxSize.height,
      width: maxSize.width,
      frame: mode === 1,
      show: false,
      x,
      y,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: false,
      },
    });
    window.setFullScreen(mode !== 1);
    window.setOpacity(0.7);
    window.setMenu(null);
    window.loadURL(path.join(__dirname, "..", "public", "break.html"));
    window.setAlwaysOnTop(true, "pop-up-menu");
    window.on("close", (e) => {
      e.preventDefault();
      window.hide();
    });
    return window;
  };

  initialize() {
    const interval = this.store.get("intervalForBreaks");
    this.task = cron.schedule(`*/${interval} * * * *`, this.showReminder);
    this.task.start();
    this.setDates();
    this.registerOnChangeInterval();
    this.registerOnChangeShowMode();
  }

  stop() {
    this.task.stop();
  }

  destroy() {
    this.task.destroy();
    this.unsubscribeChangeInterval();
    this.unsubscribeChangeShowMode();
  }

  setDates = () => {
    const interval = this.store.get("intervalForBreaks") as number;
    const now = new Date(Date.now());
    const nextDate = new Date(now.getTime() + interval*60000);
    this.store.set("actualDate", now.getTime());
    this.store.set("nextDate", nextDate.getTime());
  }

  showReminder = () => {
    const duration: number = (this.store.get("breakDuration") as number) * 1000;
    this.setDates();
    for (const windowObject of this.windows) {
      windowObject.window.show();
    }
    setTimeout(() => {
      for (const windowObject of this.windows) {
        if (windowObject.window.isVisible()) windowObject.window.hide();
      }
    }, duration);
  };

  changeTaskInterval(interval: number) {
    this.setDates();
    this.task.stop();
    this.task = cron.schedule(`*/${interval} * * * *`, this.showReminder);
    this.task.start();
  }

  registerOnChangeShowMode() {
    const reCreateWindows = (newValue: number, oldValue: number) => {
      for (const windowObject of this.windows) {
        windowObject.window.destroy();
      }
      this.windows = [];
      this.createWindow();
    };
    this.unsubscribeChangeShowMode = this.store.onChange(
      "showBreaksIn",
      reCreateWindows
    );
    this.unsubscribeChangeShowMode = this.store.onChange(
      "showOnAllMonitors",
      reCreateWindows
    );
  }

  registerOnChangeInterval() {
    this.unsubscribeChangeInterval = this.store.onChange(
      "intervalForBreaks",
      (newValue: number, oldValue: number) => {
        this.changeTaskInterval(newValue);
      }
    );
  }
}
