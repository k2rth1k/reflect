"use strict";
let electron = {};
try {
  electron = require("electron");
} catch (e) {}
function initialize({ contextBridge: e, ipcRenderer: o }) {
  if (!o) return;
  o.on("__ELECTRON_LOG_IPC__", (e, o) => {
    window.postMessage({ cmd: "message", ...o });
  }),
    o
      .invoke("__ELECTRON_LOG__", { cmd: "getOptions" })
      .catch((e) =>
        console.error(
          new Error(
            `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`,
          ),
        ),
      );
  const n = {
    sendToMain(e) {
      try {
        o.send("__ELECTRON_LOG__", e);
      } catch (n) {
        console.error("electronLog.sendToMain ", n, "data:", e),
          o.send("__ELECTRON_LOG__", {
            cmd: "errorHandler",
            error: { message: n?.message, stack: n?.stack },
            errorName: "sendToMain",
          });
      }
    },
    log(...e) {
      n.sendToMain({ data: e, level: "info" });
    },
  };
  for (const e of ["error", "warn", "info", "verbose", "debug", "silly"])
    n[e] = (...o) => n.sendToMain({ data: o, level: e });
  if (e && process.contextIsolated)
    try {
      e.exposeInMainWorld("__electronLog", n);
    } catch {}
  "object" == typeof window ? (window.__electronLog = n) : (__electronLog = n);
}
electron.ipcRenderer && initialize(electron),
  "object" == typeof module && (module.exports = initialize);
