import { is } from "@electron-toolkit/utils";
import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFileSync } from "fs";
import { getPort } from "get-port-please";
import { startServer } from "next/dist/server/lib/start-server";
import { join } from "path";
import { autoUpdater } from "electron-updater";

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 800,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  mainWindow.maximize();
  mainWindow.on("ready-to-show", () => mainWindow.show());

  const loadURL = async () => {
    if (is.dev) {
      mainWindow.loadURL("http://localhost:3000");
    } else {
      try {
        const port = await startNextJSServer();
        console.log("Next.js server started on port:", port);
        mainWindow.loadURL(`http://localhost:${port}`);
      } catch (error) {
        console.error("Error starting Next.js server:", error);
      }
    }
  };

  loadURL();
  return mainWindow;
};

const startNextJSServer = async () => {
  try {
    const nextJSPort = await getPort({ port: 3000 });
    const webDir = join(app.getAppPath(), "app");

    const configFilePath = join(webDir, ".next", "required-server-files.json");
    const configFile = JSON.parse(readFileSync(configFilePath, "utf-8"));
    const nextConfig = configFile.config;
    process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig);

    await startServer({
      dir: webDir,
      isDev: false,
      hostname: "localhost",
      port: nextJSPort,
      customServer: true,
      allowRetry: false,
      keepAliveTimeout: 5000,
      minimalMode: true,
    });

    return nextJSPort;
  } catch (error) {
    console.error("Error starting Next.js server:", error);
    throw error;
  }
};

app.whenReady().then(() => {
  createWindow();

  if (!is.dev) {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdates();
  }
  ipcMain.on("ping", () => console.log("pong"));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

autoUpdater.on("update-available", () => {
  dialog
    .showMessageBox({
      type: "info",
      title: "Обновление",
      message: "Доступна новая версия. Скачать?",
      buttons: ["Скачать", "Позже"],
    })
    .then((r) => {
      if (r.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

autoUpdater.on("update-downloaded", () => {
  dialog
    .showMessageBox({
      title: "Готово",
      message: "Обновление загружено. Перезапустить?",
      buttons: ["Да", "Позже"],
    })
    .then((r) => {
      if (r.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
});

autoUpdater.on("error", (err) => {
  console.error("Updater error:", err);
});
