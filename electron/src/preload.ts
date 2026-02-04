import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { UpdateErrorPayload, UpdateProgressPayload } from "../../electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel: string, data: unknown) => ipcRenderer.send(channel, data),
    on: (
      channel: string,
      listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
    ) => ipcRenderer.on(channel, listener),
  },
});

contextBridge.exposeInMainWorld("updater", {
  onAvailable: (cb: () => void) =>
    ipcRenderer.on("update:available", () => cb()),

  onProgress: (cb: (data: UpdateProgressPayload) => void) =>
    ipcRenderer.on("update:progress", (_event, data: UpdateProgressPayload) =>
      cb(data),
    ),

  onDownloaded: (cb: () => void) =>
    ipcRenderer.on("update:downloaded", () => cb()),

  onError: (cb: (error: UpdateErrorPayload) => void) =>
    ipcRenderer.on("update:error", (_event, error: UpdateErrorPayload) =>
      cb(error),
    ),

  download: () => ipcRenderer.invoke("update:download"),
  install: () => ipcRenderer.invoke("update:install"),
});
