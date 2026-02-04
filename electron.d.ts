export interface UpdateProgressPayload {
  percent: number;
  transferred: number;
  total: number;
  bytesPerSecond: number;
}

export type UpdateErrorPayload = {
  message: string;
};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
      };
    };
    updater: {
      onAvailable: (cb: () => void) => void;
      onProgress: (cb: (data: UpdateProgressPayload) => void) => void;
      onDownloaded: (cb: () => void) => void;
      onError: (cb: (error: UpdateErrorPayload) => void) => void;

      download: () => Promise<void>;
      install: () => Promise<void>;
    };
  }
}

export {};
