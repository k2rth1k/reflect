(() => {
  var __webpack_modules__ = {
      152: (e) => {
        "use strict";
        e.exports = class {
          externalApi = void 0;
          isActive = !1;
          logFn = void 0;
          onError = void 0;
          showDialog = !0;
          constructor({
            externalApi: e,
            logFn: t,
            onError: r,
            showDialog: n,
          } = {}) {
            (this.createIssue = this.createIssue.bind(this)),
              (this.handleError = this.handleError.bind(this)),
              (this.handleRejection = this.handleRejection.bind(this)),
              this.setOptions({
                externalApi: e,
                logFn: t,
                onError: r,
                showDialog: n,
              }),
              (this.startCatching = this.startCatching.bind(this)),
              (this.stopCatching = this.stopCatching.bind(this));
          }
          handle(
            e,
            {
              logFn: t = this.logFn,
              onError: r = this.onError,
              processType: n = "browser",
              showDialog: o = this.showDialog,
              errorName: s = "",
            } = {},
          ) {
            e = (function (e) {
              if (e instanceof Error) return e;
              if (e && "object" == typeof e) {
                if (e.message) return Object.assign(new Error(e.message), e);
                try {
                  return new Error(JSON.stringify(e));
                } catch (t) {
                  return new Error(
                    `Couldn't normalize error ${String(e)}: ${t}`,
                  );
                }
              }
              return new Error(`Can't normalize error ${String(e)}`);
            })(e);
            try {
              if ("function" == typeof r) {
                const t = this.externalApi?.getVersions() || {};
                if (
                  !1 ===
                  r({
                    createIssue: this.createIssue,
                    error: e,
                    errorName: s,
                    processType: n,
                    versions: t,
                  })
                )
                  return;
              }
              s ? t(s, e) : t(e),
                o &&
                  !s.includes("rejection") &&
                  this.externalApi &&
                  this.externalApi.showErrorBox(
                    `A JavaScript error occurred in the ${n} process`,
                    e.stack,
                  );
            } catch {
              console.error(e);
            }
          }
          setOptions({ externalApi: e, logFn: t, onError: r, showDialog: n }) {
            "object" == typeof e && (this.externalApi = e),
              "function" == typeof t && (this.logFn = t),
              "function" == typeof r && (this.onError = r),
              "boolean" == typeof n && (this.showDialog = n);
          }
          startCatching({ onError: e, showDialog: t } = {}) {
            this.isActive ||
              ((this.isActive = !0),
              this.setOptions({ onError: e, showDialog: t }),
              process.on("uncaughtException", this.handleError),
              process.on("unhandledRejection", this.handleRejection));
          }
          stopCatching() {
            (this.isActive = !1),
              process.removeListener("uncaughtException", this.handleError),
              process.removeListener(
                "unhandledRejection",
                this.handleRejection,
              );
          }
          createIssue(e, t) {
            this.externalApi?.openUrl(
              `${e}?${new URLSearchParams(t).toString()}`,
            );
          }
          handleError(e) {
            this.handle(e, { errorName: "Unhandled" });
          }
          handleRejection(e) {
            const t = e instanceof Error ? e : new Error(JSON.stringify(e));
            this.handle(t, { errorName: "Unhandled rejection" });
          }
        };
      },
      401: (e, t, r) => {
        "use strict";
        const n = r(4434),
          o = r(9896),
          s = r(6928),
          i = r(4438),
          a = r(8951);
        e.exports = class extends n {
          store = {};
          constructor() {
            super(), (this.emitError = this.emitError.bind(this));
          }
          provide({ filePath: e, writeOptions: t = {}, writeAsync: r = !1 }) {
            let n;
            try {
              if (((e = s.resolve(e)), this.store[e])) return this.store[e];
              n = this.createFile({
                filePath: e,
                writeOptions: t,
                writeAsync: r,
              });
            } catch (t) {
              (n = new a({ path: e })), this.emitError(t, n);
            }
            return n.on("error", this.emitError), (this.store[e] = n), n;
          }
          createFile({ filePath: e, writeOptions: t, writeAsync: r }) {
            return (
              this.testFileWriting({ filePath: e, writeOptions: t }),
              new i({ path: e, writeOptions: t, writeAsync: r })
            );
          }
          emitError(e, t) {
            this.emit("error", e, t);
          }
          testFileWriting({ filePath: e, writeOptions: t }) {
            o.mkdirSync(s.dirname(e), { recursive: !0 }),
              o.writeFileSync(e, "", { flag: "a", mode: t.mode });
          }
        };
      },
      422: (e) => {
        "use strict";
        const t = {
          value: "SqliteError",
          writable: !0,
          enumerable: !1,
          configurable: !0,
        };
        function r(e, n) {
          if (new.target !== r) return new r(e, n);
          if ("string" != typeof n)
            throw new TypeError("Expected second argument to be a string");
          Error.call(this, e),
            (t.value = "" + e),
            Object.defineProperty(this, "message", t),
            Error.captureStackTrace(this, r),
            (this.code = n);
        }
        Object.setPrototypeOf(r, Error),
          Object.setPrototypeOf(r.prototype, Error.prototype),
          Object.defineProperty(r.prototype, "name", t),
          (e.exports = r);
      },
      857: (e) => {
        "use strict";
        e.exports = require("os");
      },
      1045: (e, t, r) => {
        "use strict";
        const n = r(5317),
          o = r(857),
          s = r(6928),
          i = r(6902);
        e.exports = class {
          appName = void 0;
          appPackageJson = void 0;
          platform = process.platform;
          getAppLogPath(e = this.getAppName()) {
            return "darwin" === this.platform
              ? s.join(this.getSystemPathHome(), "Library/Logs", e)
              : s.join(this.getAppUserDataPath(e), "logs");
          }
          getAppName() {
            const e = this.appName || this.getAppPackageJson()?.name;
            if (!e)
              throw new Error(
                "electron-log can't determine the app name. It tried these methods:\n1. Use `electron.app.name`\n2. Use productName or name from the nearest package.json`\nYou can also set it through log.transports.file.setAppName()",
              );
            return e;
          }
          getAppPackageJson() {
            return (
              "object" != typeof this.appPackageJson &&
                (this.appPackageJson = i.findAndReadPackageJson()),
              this.appPackageJson
            );
          }
          getAppUserDataPath(e = this.getAppName()) {
            return e ? s.join(this.getSystemPathAppData(), e) : void 0;
          }
          getAppVersion() {
            return this.getAppPackageJson()?.version;
          }
          getElectronLogPath() {
            return this.getAppLogPath();
          }
          getMacOsVersion() {
            const e = Number(o.release().split(".")[0]);
            return e <= 19 ? "10." + (e - 4) : e - 9;
          }
          getOsVersion() {
            let e = o.type().replace("_", " "),
              t = o.release();
            return (
              "Darwin" === e && ((e = "macOS"), (t = this.getMacOsVersion())),
              `${e} ${t}`
            );
          }
          getPathVariables() {
            const e = this.getAppName(),
              t = this.getAppVersion(),
              r = this;
            return {
              appData: this.getSystemPathAppData(),
              appName: e,
              appVersion: t,
              get electronDefaultDir() {
                return r.getElectronLogPath();
              },
              home: this.getSystemPathHome(),
              libraryDefaultDir: this.getAppLogPath(e),
              libraryTemplate: this.getAppLogPath("{appName}"),
              temp: this.getSystemPathTemp(),
              userData: this.getAppUserDataPath(e),
            };
          }
          getSystemPathAppData() {
            const e = this.getSystemPathHome();
            switch (this.platform) {
              case "darwin":
                return s.join(e, "Library/Application Support");
              case "win32":
                return process.env.APPDATA || s.join(e, "AppData/Roaming");
              default:
                return process.env.XDG_CONFIG_HOME || s.join(e, ".config");
            }
          }
          getSystemPathHome() {
            return o.homedir?.() || process.env.HOME;
          }
          getSystemPathTemp() {
            return o.tmpdir();
          }
          getVersions() {
            return {
              app: `${this.getAppName()} ${this.getAppVersion()}`,
              electron: void 0,
              os: this.getOsVersion(),
            };
          }
          isDev() {
            return "1" === process.env.ELECTRON_IS_DEV;
          }
          isElectron() {
            return Boolean(process.versions.electron);
          }
          onAppEvent(e, t) {}
          onAppReady(e) {
            e();
          }
          onEveryWebContentsEvent(e, t) {}
          onIpc(e, t) {}
          onIpcInvoke(e, t) {}
          openUrl(e, t = console.error) {
            const r =
              { darwin: "open", win32: "start", linux: "xdg-open" }[
                process.platform
              ] || "xdg-open";
            n.exec(`${r} ${e}`, {}, (e) => {
              e && t(e);
            });
          }
          setAppName(e) {
            this.appName = e;
          }
          setPlatform(e) {
            this.platform = e;
          }
          setPreloadFileForSessions({
            filePath: e,
            includeFutureSession: t = !0,
            getSessions: r = () => [],
          }) {}
          sendIpc(e, t) {}
          showErrorBox(e, t) {}
        };
      },
      1198: (e, t, r) => {
        "use strict";
        let n = {};
        try {
          n = r(4157);
        } catch (e) {}
        function o({ contextBridge: e, ipcRenderer: t }) {
          if (!t) return;
          t.on("__ELECTRON_LOG_IPC__", (e, t) => {
            window.postMessage({ cmd: "message", ...t });
          }),
            t
              .invoke("__ELECTRON_LOG__", { cmd: "getOptions" })
              .catch((e) =>
                console.error(
                  new Error(
                    `electron-log isn't initialized in the main process. Please call log.initialize() before. ${e.message}`,
                  ),
                ),
              );
          const r = {
            sendToMain(e) {
              try {
                t.send("__ELECTRON_LOG__", e);
              } catch (r) {
                console.error("electronLog.sendToMain ", r, "data:", e),
                  t.send("__ELECTRON_LOG__", {
                    cmd: "errorHandler",
                    error: { message: r?.message, stack: r?.stack },
                    errorName: "sendToMain",
                  });
              }
            },
            log(...e) {
              r.sendToMain({ data: e, level: "info" });
            },
          };
          for (const e of [
            "error",
            "warn",
            "info",
            "verbose",
            "debug",
            "silly",
          ])
            r[e] = (...t) => r.sendToMain({ data: t, level: e });
          if (e && process.contextIsolated)
            try {
              e.exposeInMainWorld("__electronLog", r);
            } catch {}
          "object" == typeof window
            ? (window.__electronLog = r)
            : (__electronLog = r);
        }
        n.ipcRenderer && o(n), (e.exports = o);
      },
      1491: (e, t, r) => {
        function n() {
          var e;
          try {
            e = t.storage.debug;
          } catch (e) {}
          return (
            !e &&
              "undefined" != typeof process &&
              "env" in process &&
              (e = process.env.DEBUG),
            e
          );
        }
        ((t = e.exports = r(7584)).log = function () {
          return (
            "object" == typeof console &&
            console.log &&
            Function.prototype.apply.call(console.log, console, arguments)
          );
        }),
          (t.formatArgs = function (e) {
            var r = this.useColors;
            if (
              ((e[0] =
                (r ? "%c" : "") +
                this.namespace +
                (r ? " %c" : " ") +
                e[0] +
                (r ? "%c " : " ") +
                "+" +
                t.humanize(this.diff)),
              r)
            ) {
              var n = "color: " + this.color;
              e.splice(1, 0, n, "color: inherit");
              var o = 0,
                s = 0;
              e[0].replace(/%[a-zA-Z%]/g, function (e) {
                "%%" !== e && (o++, "%c" === e && (s = o));
              }),
                e.splice(s, 0, n);
            }
          }),
          (t.save = function (e) {
            try {
              null == e ? t.storage.removeItem("debug") : (t.storage.debug = e);
            } catch (e) {}
          }),
          (t.load = n),
          (t.useColors = function () {
            return (
              !(
                "undefined" == typeof window ||
                !window.process ||
                "renderer" !== window.process.type
              ) ||
              ("undefined" != typeof document &&
                document.documentElement &&
                document.documentElement.style &&
                document.documentElement.style.WebkitAppearance) ||
              ("undefined" != typeof window &&
                window.console &&
                (window.console.firebug ||
                  (window.console.exception && window.console.table))) ||
              ("undefined" != typeof navigator &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                parseInt(RegExp.$1, 10) >= 31) ||
              ("undefined" != typeof navigator &&
                navigator.userAgent &&
                navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            );
          }),
          (t.storage =
            "undefined" != typeof chrome && void 0 !== chrome.storage
              ? chrome.storage.local
              : (function () {
                  try {
                    return window.localStorage;
                  } catch (e) {}
                })()),
          (t.colors = [
            "lightseagreen",
            "forestgreen",
            "goldenrod",
            "dodgerblue",
            "darkorchid",
            "crimson",
          ]),
          (t.formatters.j = function (e) {
            try {
              return JSON.stringify(e);
            } catch (e) {
              return "[UnexpectedJSONParseError]: " + e.message;
            }
          }),
          t.enable(n());
      },
      1890: (e, t, r) => {
        "use strict";
        const { concatFirstStringElements: n, format: o } = r(9846),
          { maxDepth: s, toJSON: i } = r(8113),
          { applyAnsiStyles: a, removeStyles: c } = r(9920),
          { transform: l } = r(8569),
          p = {
            error: console.error,
            warn: console.warn,
            info: console.info,
            verbose: console.info,
            debug: console.debug,
            silly: console.debug,
            log: console.log,
          };
        e.exports = d;
        const u = `%c{h}:{i}:{s}.{ms}{scope}%c ${"win32" === process.platform ? ">" : "›"} {text}`;
        function d(e) {
          return Object.assign(
            function t(r) {
              const n = l({ logger: e, message: r, transport: t });
              t.writeFn({ message: { ...r, data: n } });
            },
            {
              format: u,
              level: "silly",
              transforms: [h, o, f, n, s, i],
              useStyles: process.env.FORCE_STYLES,
              writeFn({ message: e }) {
                (p[e.level] || p.info)(...e.data);
              },
            },
          );
        }
        function h({ data: e, message: t, transport: r }) {
          return "string" == typeof r.format && r.format.includes("%c")
            ? [`color:${g(t.level)}`, "color:unset", ...e]
            : e;
        }
        function f(e) {
          const { message: t, transport: r } = e;
          return (
            (function (e, t) {
              if ("boolean" == typeof e) return e;
              const r =
                "error" === t || "warn" === t ? process.stderr : process.stdout;
              return r && r.isTTY;
            })(r.useStyles, t.level)
              ? a
              : c
          )(e);
        }
        function g(e) {
          const t = {
            error: "red",
            warn: "yellow",
            info: "cyan",
            default: "unset",
          };
          return t[e] || t.default;
        }
        Object.assign(d, { DEFAULT_FORMAT: u });
      },
      1933: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.createRawDataTable = void 0),
          (t.createRawDataTable =
            "\n            CREATE TABLE IF NOT EXISTS workout_raw (\n                        date Timestamp NOT NULL,\n                        workout_name TEXT NOT NULL,\n                        duration TEXT,\n                        exercise_name TEXT NOT NULL,\n                        set_order INTEGER NOT NULL,\n                        weight REAL,\n                        reps REAL,\n                        distance REAL DEFAULT 0,\n                        seconds REAL DEFAULT 0,\n                        notes TEXT,\n                        workout_notes TEXT,\n                        rpe INTEGER,\n                        muscle Varchar(255))\n                        ");
      },
      2018: (e) => {
        "use strict";
        e.exports = require("tty");
      },
      2858: (e, t, r) => {
        "use strict";
        const { getBooleanOption: n, cppdb: o } = r(8405);
        e.exports = function (e, t, r) {
          if (
            (null == t && (t = {}),
            "function" == typeof t && ((r = t), (t = {})),
            "string" != typeof e)
          )
            throw new TypeError("Expected first argument to be a string");
          if ("function" != typeof r)
            throw new TypeError("Expected last argument to be a function");
          if ("object" != typeof t)
            throw new TypeError(
              "Expected second argument to be an options object",
            );
          if (!e)
            throw new TypeError(
              "User-defined function name cannot be an empty string",
            );
          const s = "safeIntegers" in t ? +n(t, "safeIntegers") : 2,
            i = n(t, "deterministic"),
            a = n(t, "directOnly");
          let c = -1;
          if (!n(t, "varargs")) {
            if (((c = r.length), !Number.isInteger(c) || c < 0))
              throw new TypeError(
                "Expected function.length to be a positive integer",
              );
            if (c > 100)
              throw new RangeError(
                "User-defined functions cannot have more than 100 arguments",
              );
          }
          return this[o].function(r, e, c, s, i, a), this;
        };
      },
      2995: (e, t, r) => {
        var n = r(6928),
          o = r(5317).spawn,
          s = r(6063)("electron-squirrel-startup"),
          i = r(4157).app,
          a = function (e, t) {
            var r = n.resolve(n.dirname(process.execPath), "..", "Update.exe");
            s("Spawning `%s` with args `%s`", r, e),
              o(r, e, { detached: !0 }).on("close", t);
          };
        e.exports = (function () {
          if ("win32" === process.platform) {
            var e = process.argv[1];
            s("processing squirrel command `%s`", e);
            var t = n.basename(process.execPath);
            if ("--squirrel-install" === e || "--squirrel-updated" === e)
              return a(["--createShortcut=" + t], i.quit), !0;
            if ("--squirrel-uninstall" === e)
              return a(["--removeShortcut=" + t], i.quit), !0;
            if ("--squirrel-obsolete" === e) return i.quit(), !0;
          }
          return !1;
        })();
      },
      3242: (e, t, r) => {
        "use strict";
        const n = r(6928),
          o = r(1045);
        e.exports = class extends o {
          electron = void 0;
          constructor({ electron: e } = {}) {
            super(), (this.electron = e);
          }
          getAppName() {
            let e;
            try {
              e =
                this.appName ||
                this.electron.app?.name ||
                this.electron.app?.getName();
            } catch {}
            return e || super.getAppName();
          }
          getAppUserDataPath(e) {
            return this.getPath("userData") || super.getAppUserDataPath(e);
          }
          getAppVersion() {
            let e;
            try {
              e = this.electron.app?.getVersion();
            } catch {}
            return e || super.getAppVersion();
          }
          getElectronLogPath() {
            return this.getPath("logs") || super.getElectronLogPath();
          }
          getPath(e) {
            try {
              return this.electron.app?.getPath(e);
            } catch {
              return;
            }
          }
          getVersions() {
            return {
              app: `${this.getAppName()} ${this.getAppVersion()}`,
              electron: `Electron ${process.versions.electron}`,
              os: this.getOsVersion(),
            };
          }
          getSystemPathAppData() {
            return this.getPath("appData") || super.getSystemPathAppData();
          }
          isDev() {
            return void 0 !== this.electron.app?.isPackaged
              ? !this.electron.app.isPackaged
              : "string" == typeof process.execPath
                ? n
                    .basename(process.execPath)
                    .toLowerCase()
                    .startsWith("electron")
                : super.isDev();
          }
          onAppEvent(e, t) {
            return (
              this.electron.app?.on(e, t),
              () => {
                this.electron.app?.off(e, t);
              }
            );
          }
          onAppReady(e) {
            this.electron.app?.isReady()
              ? e()
              : this.electron.app?.once
                ? this.electron.app?.once("ready", e)
                : e();
          }
          onEveryWebContentsEvent(e, t) {
            return (
              this.electron.webContents?.getAllWebContents()?.forEach((r) => {
                r.on(e, t);
              }),
              this.electron.app?.on("web-contents-created", r),
              () => {
                this.electron.webContents?.getAllWebContents().forEach((r) => {
                  r.off(e, t);
                }),
                  this.electron.app?.off("web-contents-created", r);
              }
            );
            function r(r, n) {
              n.on(e, t);
            }
          }
          onIpc(e, t) {
            this.electron.ipcMain?.on(e, t);
          }
          onIpcInvoke(e, t) {
            this.electron.ipcMain?.handle?.(e, t);
          }
          openUrl(e, t = console.error) {
            this.electron.shell?.openExternal(e).catch(t);
          }
          setPreloadFileForSessions({
            filePath: e,
            includeFutureSession: t = !0,
            getSessions: r = () => [this.electron.session?.defaultSession],
          }) {
            for (const e of r().filter(Boolean)) n(e);
            function n(t) {
              "function" == typeof t.registerPreloadScript
                ? t.registerPreloadScript({
                    filePath: e,
                    id: "electron-log-preload",
                    type: "frame",
                  })
                : t.setPreloads([...t.getPreloads(), e]);
            }
            t &&
              this.onAppEvent("session-created", (e) => {
                n(e);
              });
          }
          sendIpc(e, t) {
            this.electron.BrowserWindow?.getAllWindows()?.forEach((r) => {
              !1 === r.webContents?.isDestroyed() &&
                !1 === r.webContents?.isCrashed() &&
                r.webContents.send(e, t);
            });
          }
          showErrorBox(e, t) {
            this.electron.dialog?.showErrorBox(e, t);
          }
        };
      },
      3601: (e) => {
        "use strict";
        e.exports = class {
          constructor({ processMessage: e }) {
            (this.processMessage = e),
              (this.buffer = []),
              (this.enabled = !1),
              (this.begin = this.begin.bind(this)),
              (this.commit = this.commit.bind(this)),
              (this.reject = this.reject.bind(this));
          }
          addMessage(e) {
            this.buffer.push(e);
          }
          begin() {
            this.enabled = [];
          }
          commit() {
            (this.enabled = !1),
              this.buffer.forEach((e) => this.processMessage(e)),
              (this.buffer = []);
          }
          reject() {
            (this.enabled = !1), (this.buffer = []);
          }
        };
      },
      3799: (e, t, r) => {
        "use strict";
        const { getBooleanOption: n, cppdb: o } = r(8405);
        e.exports = function (e, t) {
          if ("string" != typeof e)
            throw new TypeError("Expected first argument to be a string");
          if ("object" != typeof t || null === t)
            throw new TypeError(
              "Expected second argument to be an options object",
            );
          if (!e)
            throw new TypeError(
              "User-defined function name cannot be an empty string",
            );
          const r = "start" in t ? t.start : null,
            a = s(t, "step", !0),
            c = s(t, "inverse", !1),
            l = s(t, "result", !1),
            p = "safeIntegers" in t ? +n(t, "safeIntegers") : 2,
            u = n(t, "deterministic"),
            d = n(t, "directOnly");
          let h = -1;
          if (
            !n(t, "varargs") &&
            ((h = Math.max(i(a), c ? i(c) : 0)), h > 0 && (h -= 1), h > 100)
          )
            throw new RangeError(
              "User-defined functions cannot have more than 100 arguments",
            );
          return this[o].aggregate(r, a, c, l, e, h, p, u, d), this;
        };
        const s = (e, t, r) => {
            const n = t in e ? e[t] : null;
            if ("function" == typeof n) return n;
            if (null != n)
              throw new TypeError(
                `Expected the "${t}" option to be a function`,
              );
            if (r) throw new TypeError(`Missing required option "${t}"`);
            return null;
          },
          i = ({ length: e }) => {
            if (Number.isInteger(e) && e >= 0) return e;
            throw new TypeError(
              "Expected function.length to be a positive integer",
            );
          };
      },
      3952: (module, __unused_webpack_exports, __webpack_require__) => {
        "use strict";
        const fs = __webpack_require__(9896),
          path = __webpack_require__(6928),
          util = __webpack_require__(8405),
          SqliteError = __webpack_require__(422);
        let DEFAULT_ADDON;
        function Database(filenameGiven, options) {
          if (null == new.target) return new Database(filenameGiven, options);
          let buffer;
          if (
            (Buffer.isBuffer(filenameGiven) &&
              ((buffer = filenameGiven), (filenameGiven = ":memory:")),
            null == filenameGiven && (filenameGiven = ""),
            null == options && (options = {}),
            "string" != typeof filenameGiven)
          )
            throw new TypeError("Expected first argument to be a string");
          if ("object" != typeof options)
            throw new TypeError(
              "Expected second argument to be an options object",
            );
          if ("readOnly" in options)
            throw new TypeError(
              'Misspelled option "readOnly" should be "readonly"',
            );
          if ("memory" in options)
            throw new TypeError(
              'Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)',
            );
          const filename = filenameGiven.trim(),
            anonymous = "" === filename || ":memory:" === filename,
            readonly = util.getBooleanOption(options, "readonly"),
            fileMustExist = util.getBooleanOption(options, "fileMustExist"),
            timeout = "timeout" in options ? options.timeout : 5e3,
            verbose = "verbose" in options ? options.verbose : null,
            nativeBinding =
              "nativeBinding" in options ? options.nativeBinding : null;
          if (readonly && anonymous && !buffer)
            throw new TypeError(
              "In-memory/temporary databases cannot be readonly",
            );
          if (!Number.isInteger(timeout) || timeout < 0)
            throw new TypeError(
              'Expected the "timeout" option to be a positive integer',
            );
          if (timeout > 2147483647)
            throw new RangeError(
              'Option "timeout" cannot be greater than 2147483647',
            );
          if (null != verbose && "function" != typeof verbose)
            throw new TypeError(
              'Expected the "verbose" option to be a function',
            );
          if (
            null != nativeBinding &&
            "string" != typeof nativeBinding &&
            "object" != typeof nativeBinding
          )
            throw new TypeError(
              'Expected the "nativeBinding" option to be a string or addon object',
            );
          let addon;
          if (null == nativeBinding)
            addon =
              DEFAULT_ADDON ||
              (DEFAULT_ADDON = require(
                __webpack_require__.ab + "build/Release/better_sqlite3.node",
              ));
          else if ("string" == typeof nativeBinding) {
            const requireFunc =
              "function" == typeof require ? eval("require") : require;
            addon = requireFunc(
              path.resolve(nativeBinding).replace(/(\.node)?$/, ".node"),
            );
          } else addon = nativeBinding;
          if (
            (addon.isInitialized ||
              (addon.setErrorConstructor(SqliteError),
              (addon.isInitialized = !0)),
            !anonymous && !fs.existsSync(path.dirname(filename)))
          )
            throw new TypeError(
              "Cannot open database because the directory does not exist",
            );
          Object.defineProperties(this, {
            [util.cppdb]: {
              value: new addon.Database(
                filename,
                filenameGiven,
                anonymous,
                readonly,
                fileMustExist,
                timeout,
                verbose || null,
                buffer || null,
              ),
            },
            ...wrappers.getters,
          });
        }
        const wrappers = __webpack_require__(9390);
        (Database.prototype.prepare = wrappers.prepare),
          (Database.prototype.transaction = __webpack_require__(4352)),
          (Database.prototype.pragma = __webpack_require__(5070)),
          (Database.prototype.backup = __webpack_require__(8780)),
          (Database.prototype.serialize = __webpack_require__(9346)),
          (Database.prototype.function = __webpack_require__(2858)),
          (Database.prototype.aggregate = __webpack_require__(3799)),
          (Database.prototype.table = __webpack_require__(6644)),
          (Database.prototype.loadExtension = wrappers.loadExtension),
          (Database.prototype.exec = wrappers.exec),
          (Database.prototype.close = wrappers.close),
          (Database.prototype.defaultSafeIntegers =
            wrappers.defaultSafeIntegers),
          (Database.prototype.unsafeMode = wrappers.unsafeMode),
          (Database.prototype[util.inspect] = __webpack_require__(4684)),
          (module.exports = Database);
      },
      4157: (e) => {
        "use strict";
        e.exports = require("electron");
      },
      4285: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__importDefault) ||
          function (e) {
            return e && e.__esModule ? e : { default: e };
          };
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.initializeDatabase = void 0);
        const o = n(r(8101)),
          s = r(1933),
          i = r(8081),
          a = n(r(6928)),
          c = r(4157),
          l = n(r(9493)),
          p = n(r(9896));
        class u {
          constructor() {
            (this.db = new o.default(":memory:")),
              this.db.pragma("foreign_keys = ON"),
              this.createStrongTable();
          }
          createStrongTable() {
            try {
              this.db.prepare(s.createRawDataTable).run(),
                console.log("Workout raw table created successfully"),
                l.default.info(process.resourcesPath);
              let e = "";
              console.log("look here", __dirname),
                console.log(c.app.getAppPath()),
                (e = a.default.join(process.resourcesPath, "/strong.csv"));
              const t = p.default
                  .readFileSync(e, { encoding: "utf-8" })
                  .split("\n"),
                r = this.db.prepare(
                  "\n                INSERT INTO workout_raw (date, workout_name, duration, exercise_name, set_order, weight, reps, distance, seconds, notes, workout_notes, rpe, muscle)\n                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,'')\n            ",
                ),
                n = this.db.transaction((e) => {
                  for (const t of e) r.run(...t);
                }),
                o = [];
              for (let e = 1; e < t.length; e++) {
                const r = t[e].trim();
                if (r && !r.includes("Rest Timer")) {
                  const e = r.split(",").map((e) => {
                    const t = e.trim().replace(/^"/, "").replace(/"$/, "");
                    return "" === t ? null : t;
                  });
                  if ("D" === e[4]) continue;
                  e.length >= 12 &&
                    o.push([
                      e[0],
                      e[1],
                      e[2],
                      e[3],
                      parseInt(e[4]) || null,
                      parseFloat(e[5]) || null,
                      parseFloat(e[6]) || null,
                      parseFloat(e[7]) || 0,
                      parseFloat(e[8]) || 0,
                      e[9] || null,
                      e[10] || null,
                      parseInt(e[11]) || null,
                    ]);
                }
              }
              n(o), console.log(`Inserted ${o.length} workout records`);
            } catch (e) {
              console.error(
                "Error creating workout table or importing data:",
                e,
              );
            }
          }
          getAllWorkoutData() {
            return this.db.prepare("SELECT * FROM workout_raw").all();
          }
          getAllExercises() {
            return this.db
              .prepare("select distinct exercise_name from workout_raw")
              .all();
          }
          getAllWeeklySets() {
            return this.db.prepare(i.all_weekly_sets).all();
          }
          close() {
            this.db.close();
          }
        }
        (t.initializeDatabase = function () {
          return new u();
        }),
          (t.default = u);
      },
      4352: (e, t, r) => {
        "use strict";
        const { cppdb: n } = r(8405),
          o = new WeakMap();
        e.exports = function (e) {
          if ("function" != typeof e)
            throw new TypeError("Expected first argument to be a function");
          const t = this[n],
            r = s(t, this),
            { apply: o } = Function.prototype,
            a = {
              default: { value: i(o, e, t, r.default) },
              deferred: { value: i(o, e, t, r.deferred) },
              immediate: { value: i(o, e, t, r.immediate) },
              exclusive: { value: i(o, e, t, r.exclusive) },
              database: { value: this, enumerable: !0 },
            };
          return (
            Object.defineProperties(a.default.value, a),
            Object.defineProperties(a.deferred.value, a),
            Object.defineProperties(a.immediate.value, a),
            Object.defineProperties(a.exclusive.value, a),
            a.default.value
          );
        };
        const s = (e, t) => {
            let r = o.get(e);
            if (!r) {
              const n = {
                commit: e.prepare("COMMIT", t, !1),
                rollback: e.prepare("ROLLBACK", t, !1),
                savepoint: e.prepare("SAVEPOINT `\t_bs3.\t`", t, !1),
                release: e.prepare("RELEASE `\t_bs3.\t`", t, !1),
                rollbackTo: e.prepare("ROLLBACK TO `\t_bs3.\t`", t, !1),
              };
              o.set(
                e,
                (r = {
                  default: Object.assign(
                    { begin: e.prepare("BEGIN", t, !1) },
                    n,
                  ),
                  deferred: Object.assign(
                    { begin: e.prepare("BEGIN DEFERRED", t, !1) },
                    n,
                  ),
                  immediate: Object.assign(
                    { begin: e.prepare("BEGIN IMMEDIATE", t, !1) },
                    n,
                  ),
                  exclusive: Object.assign(
                    { begin: e.prepare("BEGIN EXCLUSIVE", t, !1) },
                    n,
                  ),
                }),
              );
            }
            return r;
          },
          i = (
            e,
            t,
            r,
            {
              begin: n,
              commit: o,
              rollback: s,
              savepoint: i,
              release: a,
              rollbackTo: c,
            },
          ) =>
            function () {
              let l, p, u;
              r.inTransaction
                ? ((l = i), (p = a), (u = c))
                : ((l = n), (p = o), (u = s)),
                l.run();
              try {
                const r = e.call(t, this, arguments);
                if (r && "function" == typeof r.then)
                  throw new TypeError(
                    "Transaction function cannot return a promise",
                  );
                return p.run(), r;
              } catch (e) {
                throw (r.inTransaction && (u.run(), u !== s && p.run()), e);
              }
            };
      },
      4434: (e) => {
        "use strict";
        e.exports = require("events");
      },
      4438: (e, t, r) => {
        "use strict";
        const n = r(4434),
          o = r(9896),
          s = r(857);
        e.exports = class extends n {
          asyncWriteQueue = [];
          bytesWritten = 0;
          hasActiveAsyncWriting = !1;
          path = null;
          initialSize = void 0;
          writeOptions = null;
          writeAsync = !1;
          constructor({
            path: e,
            writeOptions: t = { encoding: "utf8", flag: "a", mode: 438 },
            writeAsync: r = !1,
          }) {
            super(),
              (this.path = e),
              (this.writeOptions = t),
              (this.writeAsync = r);
          }
          get size() {
            return this.getSize();
          }
          clear() {
            try {
              return (
                o.writeFileSync(this.path, "", {
                  mode: this.writeOptions.mode,
                  flag: "w",
                }),
                this.reset(),
                !0
              );
            } catch (e) {
              return "ENOENT" === e.code || (this.emit("error", e, this), !1);
            }
          }
          crop(e) {
            try {
              const t = (function (e, t) {
                const r = Buffer.alloc(t),
                  n = o.statSync(e),
                  s = Math.min(n.size, t),
                  i = Math.max(0, n.size - t),
                  a = o.openSync(e, "r"),
                  c = o.readSync(a, r, 0, s, i);
                return o.closeSync(a), r.toString("utf8", 0, c);
              })(this.path, e || 4096);
              this.clear(), this.writeLine(`[log cropped]${s.EOL}${t}`);
            } catch (e) {
              this.emit(
                "error",
                new Error(`Couldn't crop file ${this.path}. ${e.message}`),
                this,
              );
            }
          }
          getSize() {
            if (void 0 === this.initialSize)
              try {
                const e = o.statSync(this.path);
                this.initialSize = e.size;
              } catch (e) {
                this.initialSize = 0;
              }
            return this.initialSize + this.bytesWritten;
          }
          increaseBytesWrittenCounter(e) {
            this.bytesWritten += Buffer.byteLength(
              e,
              this.writeOptions.encoding,
            );
          }
          isNull() {
            return !1;
          }
          nextAsyncWrite() {
            const e = this;
            if (this.hasActiveAsyncWriting || 0 === this.asyncWriteQueue.length)
              return;
            const t = this.asyncWriteQueue.join("");
            (this.asyncWriteQueue = []),
              (this.hasActiveAsyncWriting = !0),
              o.writeFile(this.path, t, this.writeOptions, (r) => {
                (e.hasActiveAsyncWriting = !1),
                  r
                    ? e.emit(
                        "error",
                        new Error(`Couldn't write to ${e.path}. ${r.message}`),
                        this,
                      )
                    : e.increaseBytesWrittenCounter(t),
                  e.nextAsyncWrite();
              });
          }
          reset() {
            (this.initialSize = void 0), (this.bytesWritten = 0);
          }
          toString() {
            return this.path;
          }
          writeLine(e) {
            if (((e += s.EOL), this.writeAsync))
              return this.asyncWriteQueue.push(e), void this.nextAsyncWrite();
            try {
              o.writeFileSync(this.path, e, this.writeOptions),
                this.increaseBytesWrittenCounter(e);
            } catch (e) {
              this.emit(
                "error",
                new Error(`Couldn't write to ${this.path}. ${e.message}`),
                this,
              );
            }
          }
        };
      },
      4684: (e) => {
        "use strict";
        const t = function () {};
        e.exports = function (e, r) {
          return Object.assign(new t(), this);
        };
      },
      4923: (e, t, r) => {
        "use strict";
        const n = r(5371),
          o = r(3601);
        class s {
          static instances = {};
          dependencies = {};
          errorHandler = null;
          eventLogger = null;
          functions = {};
          hooks = [];
          isDev = !1;
          levels = null;
          logId = null;
          scope = null;
          transports = {};
          variables = {};
          constructor({
            allowUnknownLevel: e = !1,
            dependencies: t = {},
            errorHandler: r,
            eventLogger: i,
            initializeFn: a,
            isDev: c = !1,
            levels: l = ["error", "warn", "info", "verbose", "debug", "silly"],
            logId: p,
            transportFactories: u = {},
            variables: d,
          } = {}) {
            (this.addLevel = this.addLevel.bind(this)),
              (this.create = this.create.bind(this)),
              (this.initialize = this.initialize.bind(this)),
              (this.logData = this.logData.bind(this)),
              (this.processMessage = this.processMessage.bind(this)),
              (this.allowUnknownLevel = e),
              (this.buffering = new o(this)),
              (this.dependencies = t),
              (this.initializeFn = a),
              (this.isDev = c),
              (this.levels = l),
              (this.logId = p),
              (this.scope = n(this)),
              (this.transportFactories = u),
              (this.variables = d || {});
            for (const e of this.levels) this.addLevel(e, !1);
            (this.log = this.info),
              (this.functions.log = this.log),
              (this.errorHandler = r),
              r?.setOptions({ ...t, logFn: this.error }),
              (this.eventLogger = i),
              i?.setOptions({ ...t, logger: this });
            for (const [e, r] of Object.entries(u))
              this.transports[e] = r(this, t);
            s.instances[p] = this;
          }
          static getInstance({ logId: e }) {
            return this.instances[e] || this.instances.default;
          }
          addLevel(e, t = this.levels.length) {
            !1 !== t && this.levels.splice(t, 0, e),
              (this[e] = (...t) => this.logData(t, { level: e })),
              (this.functions[e] = this[e]);
          }
          catchErrors(e) {
            return (
              this.processMessage(
                {
                  data: [
                    "log.catchErrors is deprecated. Use log.errorHandler instead",
                  ],
                  level: "warn",
                },
                { transports: ["console"] },
              ),
              this.errorHandler.startCatching(e)
            );
          }
          create(e) {
            return (
              "string" == typeof e && (e = { logId: e }),
              new s({
                dependencies: this.dependencies,
                errorHandler: this.errorHandler,
                initializeFn: this.initializeFn,
                isDev: this.isDev,
                transportFactories: this.transportFactories,
                variables: { ...this.variables },
                ...e,
              })
            );
          }
          compareLevels(e, t, r = this.levels) {
            const n = r.indexOf(e),
              o = r.indexOf(t);
            return -1 === o || -1 === n || o <= n;
          }
          initialize(e = {}) {
            this.initializeFn({ logger: this, ...this.dependencies, ...e });
          }
          logData(e, t = {}) {
            this.buffering.enabled
              ? this.buffering.addMessage({ data: e, date: new Date(), ...t })
              : this.processMessage({ data: e, ...t });
          }
          processMessage(e, { transports: t = this.transports } = {}) {
            if ("errorHandler" === e.cmd)
              return void this.errorHandler.handle(e.error, {
                errorName: e.errorName,
                processType: "renderer",
                showDialog: Boolean(e.showDialog),
              });
            let r = e.level;
            this.allowUnknownLevel ||
              (r = this.levels.includes(e.level) ? e.level : "info");
            const n = {
              date: new Date(),
              logId: this.logId,
              ...e,
              level: r,
              variables: { ...this.variables, ...e.variables },
            };
            for (const [r, o] of this.transportEntries(t))
              if (
                "function" == typeof o &&
                !1 !== o.level &&
                this.compareLevels(o.level, e.level)
              )
                try {
                  const e = this.hooks.reduce(
                    (e, t) => (e ? t(e, o, r) : e),
                    n,
                  );
                  e && o({ ...e, data: [...e.data] });
                } catch (e) {
                  this.processInternalErrorFn(e);
                }
          }
          processInternalErrorFn(e) {}
          transportEntries(e = this.transports) {
            return (Array.isArray(e) ? e : Object.entries(e))
              .map((e) => {
                switch (typeof e) {
                  case "string":
                    return this.transports[e] ? [e, this.transports[e]] : null;
                  case "function":
                    return [e.name, e];
                  default:
                    return Array.isArray(e) ? e : null;
                }
              })
              .filter(Boolean);
          }
        }
        e.exports = s;
      },
      5070: (e, t, r) => {
        "use strict";
        const { getBooleanOption: n, cppdb: o } = r(8405);
        e.exports = function (e, t) {
          if ((null == t && (t = {}), "string" != typeof e))
            throw new TypeError("Expected first argument to be a string");
          if ("object" != typeof t)
            throw new TypeError(
              "Expected second argument to be an options object",
            );
          const r = n(t, "simple"),
            s = this[o].prepare(`PRAGMA ${e}`, this, !0);
          return r ? s.pluck().get() : s.all();
        };
      },
      5317: (e) => {
        "use strict";
        e.exports = require("child_process");
      },
      5371: (e) => {
        "use strict";
        e.exports = function (e) {
          return Object.defineProperties(t, {
            defaultLabel: { value: "", writable: !0 },
            labelPadding: { value: !0, writable: !0 },
            maxLabelLength: { value: 0, writable: !0 },
            labelLength: {
              get() {
                switch (typeof t.labelPadding) {
                  case "boolean":
                    return t.labelPadding ? t.maxLabelLength : 0;
                  case "number":
                    return t.labelPadding;
                  default:
                    return 0;
                }
              },
            },
          });
          function t(r) {
            t.maxLabelLength = Math.max(t.maxLabelLength, r.length);
            const n = {};
            for (const t of e.levels)
              n[t] = (...n) => e.logData(n, { level: t, scope: r });
            return (n.log = n.info), n;
          }
        };
      },
      5391: function (e, t, r) {
        "use strict";
        var n =
          (this && this.__awaiter) ||
          function (e, t, r, n) {
            return new (r || (r = Promise))(function (o, s) {
              function i(e) {
                try {
                  c(n.next(e));
                } catch (e) {
                  s(e);
                }
              }
              function a(e) {
                try {
                  c(n.throw(e));
                } catch (e) {
                  s(e);
                }
              }
              function c(e) {
                var t;
                e.done
                  ? o(e.value)
                  : ((t = e.value),
                    t instanceof r
                      ? t
                      : new r(function (e) {
                          e(t);
                        })).then(i, a);
              }
              c((n = n.apply(e, t || [])).next());
            });
          };
        Object.defineProperty(t, "__esModule", { value: !0 });
        const o = r(4157),
          s = r(4285);
        r(2995) && o.app.quit();
        const i = () => {
          const e = new o.BrowserWindow({
            height: 600,
            width: 800,
            webPreferences: {
              preload: require("path").resolve(
                __dirname,
                "../renderer",
                "main_window",
                "preload.js",
              ),
            },
          });
          !(function () {
            const e = (0, s.initializeDatabase)();
            o.ipcMain.handle("db:get-workout-raw", () =>
              n(this, void 0, void 0, function* () {
                return e.getAllWorkoutData();
              }),
            ),
              o.ipcMain.handle("db:get-exercises", () =>
                n(this, void 0, void 0, function* () {
                  return e.getAllExercises();
                }),
              ),
              o.ipcMain.handle("db:get-weekly-sets", () =>
                n(this, void 0, void 0, function* () {
                  return e.getAllWeeklySets();
                }),
              );
          })(),
            e.loadURL(
              `file://${require("path").resolve(__dirname, "..", "renderer", "main_window", "index.html")}`,
            ),
            e.webContents.openDevTools();
        };
        o.app.on("ready", i),
          o.app.on("window-all-closed", () => {
            "darwin" !== process.platform && o.app.quit();
          }),
          o.app.on("activate", () => {
            0 === o.BrowserWindow.getAllWindows().length && i();
          });
      },
      5567: (e) => {
        var t = 1e3,
          r = 60 * t,
          n = 60 * r,
          o = 24 * n;
        function s(e, t, r) {
          if (!(e < t))
            return e < 1.5 * t
              ? Math.floor(e / t) + " " + r
              : Math.ceil(e / t) + " " + r + "s";
        }
        e.exports = function (e, i) {
          i = i || {};
          var a,
            c = typeof e;
          if ("string" === c && e.length > 0)
            return (function (e) {
              if (!((e = String(e)).length > 100)) {
                var s =
                  /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                    e,
                  );
                if (s) {
                  var i = parseFloat(s[1]);
                  switch ((s[2] || "ms").toLowerCase()) {
                    case "years":
                    case "year":
                    case "yrs":
                    case "yr":
                    case "y":
                      return 315576e5 * i;
                    case "days":
                    case "day":
                    case "d":
                      return i * o;
                    case "hours":
                    case "hour":
                    case "hrs":
                    case "hr":
                    case "h":
                      return i * n;
                    case "minutes":
                    case "minute":
                    case "mins":
                    case "min":
                    case "m":
                      return i * r;
                    case "seconds":
                    case "second":
                    case "secs":
                    case "sec":
                    case "s":
                      return i * t;
                    case "milliseconds":
                    case "millisecond":
                    case "msecs":
                    case "msec":
                    case "ms":
                      return i;
                    default:
                      return;
                  }
                }
              }
            })(e);
          if ("number" === c && !1 === isNaN(e))
            return i.long
              ? s((a = e), o, "day") ||
                  s(a, n, "hour") ||
                  s(a, r, "minute") ||
                  s(a, t, "second") ||
                  a + " ms"
              : (function (e) {
                  return e >= o
                    ? Math.round(e / o) + "d"
                    : e >= n
                      ? Math.round(e / n) + "h"
                      : e >= r
                        ? Math.round(e / r) + "m"
                        : e >= t
                          ? Math.round(e / t) + "s"
                          : e + "ms";
                })(e);
          throw new Error(
            "val is not a non-empty string or a valid number. val=" +
              JSON.stringify(e),
          );
        };
      },
      5618: (e, t, r) => {
        "use strict";
        const n = r(9896),
          o = r(857),
          s = r(6928),
          i = r(401),
          { transform: a } = r(8569),
          { removeStyles: c } = r(9920),
          { format: l, concatFirstStringElements: p } = r(9846),
          { toString: u } = r(8113);
        e.exports = function (e, { registry: t = d, externalApi: r } = {}) {
          let i;
          return (
            t.listenerCount("error") < 1 &&
              t.on("error", (e, t) => {
                m(`Can't write to ${t}`, e);
              }),
            Object.assign(f, {
              fileName: h(e.variables.processType),
              format: "[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]{scope} {text}",
              getFile: w,
              inspectOptions: { depth: 5 },
              level: "silly",
              maxSize: 1048576,
              readAllLogs: function ({
                fileFilter: e = (e) => e.endsWith(".log"),
              } = {}) {
                g();
                const t = s.dirname(f.resolvePathFn(i));
                return n.existsSync(t)
                  ? n
                      .readdirSync(t)
                      .map((e) => s.join(t, e))
                      .filter(e)
                      .map((e) => {
                        try {
                          return {
                            path: e,
                            lines: n.readFileSync(e, "utf8").split(o.EOL),
                          };
                        } catch {
                          return null;
                        }
                      })
                      .filter(Boolean)
                  : [];
              },
              sync: !0,
              transforms: [c, l, p, u],
              writeOptions: { flag: "a", mode: 438, encoding: "utf8" },
              archiveLogFn(e) {
                const t = e.toString(),
                  r = s.parse(t);
                try {
                  n.renameSync(t, s.join(r.dir, `${r.name}.old${r.ext}`));
                } catch (t) {
                  m("Could not rotate log", t);
                  const r = Math.round(f.maxSize / 4);
                  e.crop(Math.min(r, 262144));
                }
              },
              resolvePathFn: (e) => s.join(e.libraryDefaultDir, e.fileName),
              setAppName(t) {
                e.dependencies.externalApi.setAppName(t);
              },
            })
          );
          function f(t) {
            const r = w(t);
            f.maxSize > 0 &&
              r.size > f.maxSize &&
              (f.archiveLogFn(r), r.reset());
            const n = a({ logger: e, message: t, transport: f });
            r.writeLine(n);
          }
          function g() {
            i ||
              ((i = Object.create(Object.prototype, {
                ...Object.getOwnPropertyDescriptors(r.getPathVariables()),
                fileName: { get: () => f.fileName, enumerable: !0 },
              })),
              "function" == typeof f.archiveLog &&
                ((f.archiveLogFn = f.archiveLog),
                m("archiveLog is deprecated. Use archiveLogFn instead")),
              "function" == typeof f.resolvePath &&
                ((f.resolvePathFn = f.resolvePath),
                m("resolvePath is deprecated. Use resolvePathFn instead")));
          }
          function m(t, r = null, n = "error") {
            const o = [`electron-log.transports.file: ${t}`];
            r && o.push(r),
              e.transports.console({ data: o, date: new Date(), level: n });
          }
          function w(e) {
            g();
            const r = f.resolvePathFn(i, e);
            return t.provide({
              filePath: r,
              writeAsync: !f.sync,
              writeOptions: f.writeOptions,
            });
          }
        };
        const d = new i();
        function h(e = process.type) {
          switch (e) {
            case "renderer":
              return "renderer.log";
            case "worker":
              return "worker.log";
            default:
              return "main.log";
          }
        }
      },
      5692: (e) => {
        "use strict";
        e.exports = require("https");
      },
      6063: (e, t, r) => {
        "undefined" != typeof process && "renderer" === process.type
          ? (e.exports = r(1491))
          : (e.exports = r(7487));
      },
      6644: (e, t, r) => {
        "use strict";
        const { cppdb: n } = r(8405);
        function o(e, t, r) {
          if (!c.call(e, "rows"))
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition without a "rows" property`,
            );
          if (!c.call(e, "columns"))
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition without a "columns" property`,
            );
          const n = e.rows;
          if ("function" != typeof n || Object.getPrototypeOf(n) !== p)
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition with an invalid "rows" property (should be a generator function)`,
            );
          let o,
            i = e.columns;
          if (
            !Array.isArray(i) ||
            !(i = [...i]).every((e) => "string" == typeof e)
          )
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition with an invalid "columns" property (should be an array of strings)`,
            );
          if (i.length !== new Set(i).size)
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition with duplicate column names`,
            );
          if (!i.length)
            throw new RangeError(
              `Virtual table module "${r}" ${t} a table definition with zero columns`,
            );
          if (c.call(e, "parameters")) {
            if (
              ((o = e.parameters),
              !Array.isArray(o) ||
                !(o = [...o]).every((e) => "string" == typeof e))
            )
              throw new TypeError(
                `Virtual table module "${r}" ${t} a table definition with an invalid "parameters" property (should be an array of strings)`,
              );
          } else
            o = (function ({ length: e }) {
              if (!Number.isInteger(e) || e < 0)
                throw new TypeError(
                  "Expected function.length to be a positive integer",
                );
              const t = [];
              for (let r = 0; r < e; ++r) t.push(`$${r + 1}`);
              return t;
            })(n);
          if (o.length !== new Set(o).size)
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition with duplicate parameter names`,
            );
          if (o.length > 32)
            throw new RangeError(
              `Virtual table module "${r}" ${t} a table definition with more than the maximum number of 32 parameters`,
            );
          for (const e of o)
            if (i.includes(e))
              throw new TypeError(
                `Virtual table module "${r}" ${t} a table definition with column "${e}" which was ambiguously defined as both a column and parameter`,
              );
          let a = 2;
          if (c.call(e, "safeIntegers")) {
            const n = e.safeIntegers;
            if ("boolean" != typeof n)
              throw new TypeError(
                `Virtual table module "${r}" ${t} a table definition with an invalid "safeIntegers" property (should be a boolean)`,
              );
            a = +n;
          }
          let l = !1;
          if (
            c.call(e, "directOnly") &&
            ((l = e.directOnly), "boolean" != typeof l)
          )
            throw new TypeError(
              `Virtual table module "${r}" ${t} a table definition with an invalid "directOnly" property (should be a boolean)`,
            );
          return [
            `CREATE TABLE x(${[...o.map(u).map((e) => `${e} HIDDEN`), ...i.map(u)].join(", ")});`,
            s(n, new Map(i.map((e, t) => [e, o.length + t])), r),
            o,
            a,
            l,
          ];
        }
        function s(e, t, r) {
          return function* (...n) {
            const o = n.map((e) => (Buffer.isBuffer(e) ? Buffer.from(e) : e));
            for (let e = 0; e < t.size; ++e) o.push(null);
            for (const s of e(...n))
              if (Array.isArray(s)) i(s, o, t.size, r), yield o;
              else {
                if ("object" != typeof s || null === s)
                  throw new TypeError(
                    `Virtual table module "${r}" yielded something that isn't a valid row object`,
                  );
                a(s, o, t, r), yield o;
              }
          };
        }
        function i(e, t, r, n) {
          if (e.length !== r)
            throw new TypeError(
              `Virtual table module "${n}" yielded a row with an incorrect number of columns`,
            );
          const o = t.length - r;
          for (let n = 0; n < r; ++n) t[n + o] = e[n];
        }
        function a(e, t, r, n) {
          let o = 0;
          for (const s of Object.keys(e)) {
            const i = r.get(s);
            if (void 0 === i)
              throw new TypeError(
                `Virtual table module "${n}" yielded a row with an undeclared column "${s}"`,
              );
            (t[i] = e[s]), (o += 1);
          }
          if (o !== r.size)
            throw new TypeError(
              `Virtual table module "${n}" yielded a row with missing columns`,
            );
        }
        e.exports = function (e, t) {
          if ("string" != typeof e)
            throw new TypeError("Expected first argument to be a string");
          if (!e)
            throw new TypeError(
              "Virtual table module name cannot be an empty string",
            );
          let r = !1;
          if ("object" == typeof t && null !== t)
            (r = !0), (t = d(o(t, "used", e)));
          else {
            if ("function" != typeof t)
              throw new TypeError(
                "Expected second argument to be a function or a table definition object",
              );
            t = (function (e) {
              return function (t, r, n, ...s) {
                const i = { module: t, database: r, table: n },
                  a = l.call(e, i, s);
                if ("object" != typeof a || null === a)
                  throw new TypeError(
                    `Virtual table module "${t}" did not return a table definition object`,
                  );
                return o(a, "returned", t);
              };
            })(t);
          }
          return this[n].table(t, e, r), this;
        };
        const { hasOwnProperty: c } = Object.prototype,
          { apply: l } = Function.prototype,
          p = Object.getPrototypeOf(function* () {}),
          u = (e) => `"${e.replace(/"/g, '""')}"`,
          d = (e) => () => e;
      },
      6902: (e, t, r) => {
        "use strict";
        const n = r(9896),
          o = r(6928);
        function s(...e) {
          if (e[0])
            try {
              const t = (function (e, t) {
                let r = t;
                for (;;) {
                  const t = o.parse(r),
                    s = t.root,
                    i = t.dir;
                  if (n.existsSync(o.join(r, e)))
                    return o.resolve(o.join(r, e));
                  if (r === s) return null;
                  r = i;
                }
              })("package.json", o.join(...e));
              if (!t) return;
              const r = JSON.parse(n.readFileSync(t, "utf8")),
                s = r?.productName || r?.name;
              if (!s || "electron" === s.toLowerCase()) return;
              return s ? { name: s, version: r?.version } : void 0;
            } catch (e) {
              return;
            }
        }
        e.exports = {
          findAndReadPackageJson: function () {
            return (
              s(
                (function () {
                  try {
                    return require.main?.filename;
                  } catch {
                    return;
                  }
                })(),
              ) ||
              s(
                (function () {
                  const e = process.argv.filter(
                    (e) => 0 === e.indexOf("--user-data-dir="),
                  );
                  return 0 === e.length || "string" != typeof e[0]
                    ? null
                    : e[0].replace("--user-data-dir=", "");
                })(),
              ) ||
              s(process.resourcesPath, "app.asar") ||
              s(process.resourcesPath, "app") ||
              s(process.cwd()) || { name: void 0, version: void 0 }
            );
          },
          tryReadJsonAt: s,
        };
      },
      6928: (e) => {
        "use strict";
        e.exports = require("path");
      },
      7227: (e, t, r) => {
        "use strict";
        const n = r(9896),
          o = r(857),
          s = r(6928),
          i = r(1198);
        e.exports = {
          initialize({
            externalApi: e,
            getSessions: t,
            includeFutureSession: a,
            logger: c,
            preload: l = !0,
            spyRendererConsole: p = !1,
          }) {
            e.onAppReady(() => {
              try {
                l &&
                  (function ({
                    externalApi: e,
                    getSessions: t,
                    includeFutureSession: a,
                    preloadOption: c,
                  }) {
                    let l = "string" == typeof c ? c : void 0;
                    try {
                      l = r.ab + "electron-log-preload.js";
                    } catch {}
                    if (!l || !n.existsSync(l)) {
                      l = s.join(
                        e.getAppUserDataPath() || o.tmpdir(),
                        "electron-log-preload.js",
                      );
                      const t = `\n      try {\n        (${i.toString()})(require('electron'));\n      } catch(e) {\n        console.error(e);\n      }\n    `;
                      n.writeFileSync(
                        r.ab + "electron-log-preload.js",
                        t,
                        "utf8",
                      );
                    }
                    e.setPreloadFileForSessions({
                      filePath: r.ab + "electron-log-preload.js",
                      includeFutureSession: a,
                      getSessions: t,
                    });
                  })({
                    externalApi: e,
                    getSessions: t,
                    includeFutureSession: a,
                    preloadOption: l,
                  }),
                  p &&
                    (function ({ externalApi: e, logger: t }) {
                      const r = ["debug", "info", "warn", "error"];
                      e.onEveryWebContentsEvent(
                        "console-message",
                        (e, n, o) => {
                          t.processMessage({
                            data: [o],
                            level: r[n],
                            variables: { processType: "renderer" },
                          });
                        },
                      );
                    })({ externalApi: e, logger: c });
              } catch (e) {
                c.warn(e);
              }
            });
          },
        };
      },
      7232: (e) => {
        "use strict";
        e.exports = class {
          disposers = [];
          format = "{eventSource}#{eventName}:";
          formatters = {
            app: {
              "certificate-error": ({ args: e }) =>
                this.arrayToObject(e.slice(1, 4), [
                  "url",
                  "error",
                  "certificate",
                ]),
              "child-process-gone": ({ args: e }) =>
                1 === e.length ? e[0] : e,
              "render-process-gone": ({ args: [e, t] }) =>
                t && "object" == typeof t
                  ? { ...t, ...this.getWebContentsDetails(e) }
                  : [],
            },
            webContents: {
              "console-message": ({ args: [e, t, r, n] }) => {
                if (!(e < 3)) return { message: t, source: `${n}:${r}` };
              },
              "did-fail-load": ({ args: e }) =>
                this.arrayToObject(e, [
                  "errorCode",
                  "errorDescription",
                  "validatedURL",
                  "isMainFrame",
                  "frameProcessId",
                  "frameRoutingId",
                ]),
              "did-fail-provisional-load": ({ args: e }) =>
                this.arrayToObject(e, [
                  "errorCode",
                  "errorDescription",
                  "validatedURL",
                  "isMainFrame",
                  "frameProcessId",
                  "frameRoutingId",
                ]),
              "plugin-crashed": ({ args: e }) =>
                this.arrayToObject(e, ["name", "version"]),
              "preload-error": ({ args: e }) =>
                this.arrayToObject(e, ["preloadPath", "error"]),
            },
          };
          events = {
            app: {
              "certificate-error": !0,
              "child-process-gone": !0,
              "render-process-gone": !0,
            },
            webContents: {
              "did-fail-load": !0,
              "did-fail-provisional-load": !0,
              "plugin-crashed": !0,
              "preload-error": !0,
              unresponsive: !0,
            },
          };
          externalApi = void 0;
          level = "error";
          scope = "";
          constructor(e = {}) {
            this.setOptions(e);
          }
          setOptions({
            events: e,
            externalApi: t,
            level: r,
            logger: n,
            format: o,
            formatters: s,
            scope: i,
          }) {
            "object" == typeof e && (this.events = e),
              "object" == typeof t && (this.externalApi = t),
              "string" == typeof r && (this.level = r),
              "object" == typeof n && (this.logger = n),
              ("string" != typeof o && "function" != typeof o) ||
                (this.format = o),
              "object" == typeof s && (this.formatters = s),
              "string" == typeof i && (this.scope = i);
          }
          startLogging(e = {}) {
            this.setOptions(e), this.disposeListeners();
            for (const e of this.getEventNames(this.events.app))
              this.disposers.push(
                this.externalApi.onAppEvent(e, (...t) => {
                  this.handleEvent({
                    eventSource: "app",
                    eventName: e,
                    handlerArgs: t,
                  });
                }),
              );
            for (const e of this.getEventNames(this.events.webContents))
              this.disposers.push(
                this.externalApi.onEveryWebContentsEvent(e, (...t) => {
                  this.handleEvent({
                    eventSource: "webContents",
                    eventName: e,
                    handlerArgs: t,
                  });
                }),
              );
          }
          stopLogging() {
            this.disposeListeners();
          }
          arrayToObject(e, t) {
            const r = {};
            return (
              t.forEach((t, n) => {
                r[t] = e[n];
              }),
              e.length > t.length && (r.unknownArgs = e.slice(t.length)),
              r
            );
          }
          disposeListeners() {
            this.disposers.forEach((e) => e()), (this.disposers = []);
          }
          formatEventLog({ eventName: e, eventSource: t, handlerArgs: r }) {
            const [n, ...o] = r;
            if ("function" == typeof this.format)
              return this.format({
                args: o,
                event: n,
                eventName: e,
                eventSource: t,
              });
            const s = this.formatters[t]?.[e];
            let i = o;
            if (
              ("function" == typeof s &&
                (i = s({ args: o, event: n, eventName: e, eventSource: t })),
              !i)
            )
              return;
            const a = {};
            return (
              Array.isArray(i)
                ? (a.args = i)
                : "object" == typeof i && Object.assign(a, i),
              "webContents" === t &&
                Object.assign(a, this.getWebContentsDetails(n?.sender)),
              [
                this.format
                  .replace("{eventSource}", "app" === t ? "App" : "WebContents")
                  .replace("{eventName}", e),
                a,
              ]
            );
          }
          getEventNames(e) {
            return e && "object" == typeof e
              ? Object.entries(e)
                  .filter(([e, t]) => t)
                  .map(([e]) => e)
              : [];
          }
          getWebContentsDetails(e) {
            if (!e?.loadURL) return {};
            try {
              return { webContents: { id: e.id, url: e.getURL() } };
            } catch {
              return {};
            }
          }
          handleEvent({ eventName: e, eventSource: t, handlerArgs: r }) {
            const n = this.formatEventLog({
              eventName: e,
              eventSource: t,
              handlerArgs: r,
            });
            if (n) {
              const e = this.scope
                ? this.logger.scope(this.scope)
                : this.logger;
              e?.[this.level]?.(...n);
            }
          }
        };
      },
      7425: (e, t, r) => {
        "use strict";
        const n = r(4923),
          o = r(152),
          s = r(7232),
          i = r(1890),
          a = r(5618),
          c = r(7689),
          l = r(9113);
        e.exports = function ({ dependencies: e, initializeFn: t }) {
          const r = new n({
            dependencies: e,
            errorHandler: new o(),
            eventLogger: new s(),
            initializeFn: t,
            isDev: e.externalApi?.isDev(),
            logId: "default",
            transportFactories: { console: i, file: a, ipc: c, remote: l },
            variables: { processType: "main" },
          });
          return (
            (r.default = r),
            (r.Logger = n),
            (r.processInternalErrorFn = (e) => {
              r.transports.console.writeFn({
                message: {
                  data: ["Unhandled electron-log error", e],
                  level: "error",
                },
              });
            }),
            r
          );
        };
      },
      7487: (e, t, r) => {
        var n = r(2018),
          o = r(9023);
        ((t = e.exports = r(7584)).init = function (e) {
          e.inspectOpts = {};
          for (var r = Object.keys(t.inspectOpts), n = 0; n < r.length; n++)
            e.inspectOpts[r[n]] = t.inspectOpts[r[n]];
        }),
          (t.log = function () {
            return i.write(o.format.apply(o, arguments) + "\n");
          }),
          (t.formatArgs = function (e) {
            var r = this.namespace;
            if (this.useColors) {
              var n = this.color,
                o = "  [3" + n + ";1m" + r + " [0m";
              (e[0] = o + e[0].split("\n").join("\n" + o)),
                e.push("[3" + n + "m+" + t.humanize(this.diff) + "[0m");
            } else e[0] = new Date().toUTCString() + " " + r + " " + e[0];
          }),
          (t.save = function (e) {
            null == e ? delete process.env.DEBUG : (process.env.DEBUG = e);
          }),
          (t.load = a),
          (t.useColors = function () {
            return "colors" in t.inspectOpts
              ? Boolean(t.inspectOpts.colors)
              : n.isatty(s);
          }),
          (t.colors = [6, 2, 3, 4, 5, 1]),
          (t.inspectOpts = Object.keys(process.env)
            .filter(function (e) {
              return /^debug_/i.test(e);
            })
            .reduce(function (e, t) {
              var r = t
                  .substring(6)
                  .toLowerCase()
                  .replace(/_([a-z])/g, function (e, t) {
                    return t.toUpperCase();
                  }),
                n = process.env[t];
              return (
                (n =
                  !!/^(yes|on|true|enabled)$/i.test(n) ||
                  (!/^(no|off|false|disabled)$/i.test(n) &&
                    ("null" === n ? null : Number(n)))),
                (e[r] = n),
                e
              );
            }, {}));
        var s = parseInt(process.env.DEBUG_FD, 10) || 2;
        1 !== s &&
          2 !== s &&
          o.deprecate(
            function () {},
            "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)",
          )();
        var i =
          1 === s
            ? process.stdout
            : 2 === s
              ? process.stderr
              : (function (e) {
                  var t;
                  switch (process.binding("tty_wrap").guessHandleType(e)) {
                    case "TTY":
                      ((t = new n.WriteStream(e))._type = "tty"),
                        t._handle && t._handle.unref && t._handle.unref();
                      break;
                    case "FILE":
                      (t = new (r(9896).SyncWriteStream)(e, {
                        autoClose: !1,
                      }))._type = "fs";
                      break;
                    case "PIPE":
                    case "TCP":
                      ((t = new (r(9278).Socket)({
                        fd: e,
                        readable: !1,
                        writable: !0,
                      })).readable = !1),
                        (t.read = null),
                        (t._type = "pipe"),
                        t._handle && t._handle.unref && t._handle.unref();
                      break;
                    default:
                      throw new Error(
                        "Implement me. Unknown stream file type!",
                      );
                  }
                  return (t.fd = e), (t._isStdio = !0), t;
                })(s);
        function a() {
          return process.env.DEBUG;
        }
        (t.formatters.o = function (e) {
          return (
            (this.inspectOpts.colors = this.useColors),
            o
              .inspect(e, this.inspectOpts)
              .split("\n")
              .map(function (e) {
                return e.trim();
              })
              .join(" ")
          );
        }),
          (t.formatters.O = function (e) {
            return (
              (this.inspectOpts.colors = this.useColors),
              o.inspect(e, this.inspectOpts)
            );
          }),
          t.enable(a());
      },
      7584: (e, t, r) => {
        var n;
        function o(e) {
          function r() {
            if (r.enabled) {
              var e = r,
                o = +new Date(),
                s = o - (n || o);
              (e.diff = s), (e.prev = n), (e.curr = o), (n = o);
              for (
                var i = new Array(arguments.length), a = 0;
                a < i.length;
                a++
              )
                i[a] = arguments[a];
              (i[0] = t.coerce(i[0])),
                "string" != typeof i[0] && i.unshift("%O");
              var c = 0;
              (i[0] = i[0].replace(/%([a-zA-Z%])/g, function (r, n) {
                if ("%%" === r) return r;
                c++;
                var o = t.formatters[n];
                if ("function" == typeof o) {
                  var s = i[c];
                  (r = o.call(e, s)), i.splice(c, 1), c--;
                }
                return r;
              })),
                t.formatArgs.call(e, i),
                (r.log || t.log || console.log.bind(console)).apply(e, i);
            }
          }
          return (
            (r.namespace = e),
            (r.enabled = t.enabled(e)),
            (r.useColors = t.useColors()),
            (r.color = (function (e) {
              var r,
                n = 0;
              for (r in e) (n = (n << 5) - n + e.charCodeAt(r)), (n |= 0);
              return t.colors[Math.abs(n) % t.colors.length];
            })(e)),
            "function" == typeof t.init && t.init(r),
            r
          );
        }
        ((t = e.exports = o.debug = o.default = o).coerce = function (e) {
          return e instanceof Error ? e.stack || e.message : e;
        }),
          (t.disable = function () {
            t.enable("");
          }),
          (t.enable = function (e) {
            t.save(e), (t.names = []), (t.skips = []);
            for (
              var r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                n = r.length,
                o = 0;
              o < n;
              o++
            )
              r[o] &&
                ("-" === (e = r[o].replace(/\*/g, ".*?"))[0]
                  ? t.skips.push(new RegExp("^" + e.substr(1) + "$"))
                  : t.names.push(new RegExp("^" + e + "$")));
          }),
          (t.enabled = function (e) {
            var r, n;
            for (r = 0, n = t.skips.length; r < n; r++)
              if (t.skips[r].test(e)) return !1;
            for (r = 0, n = t.names.length; r < n; r++)
              if (t.names[r].test(e)) return !0;
            return !1;
          }),
          (t.humanize = r(5567)),
          (t.names = []),
          (t.skips = []),
          (t.formatters = {});
      },
      7689: (e, t, r) => {
        "use strict";
        const { maxDepth: n, toJSON: o } = r(8113),
          { transform: s } = r(8569);
        e.exports = function (e, { externalApi: t }) {
          return (
            Object.assign(r, {
              depth: 3,
              eventId: "__ELECTRON_LOG_IPC__",
              level: !!e.isDev && "silly",
              transforms: [o, n],
            }),
            t?.isElectron() ? r : void 0
          );
          function r(n) {
            "renderer" !== n?.variables?.processType &&
              t?.sendIpc(r.eventId, {
                ...n,
                data: s({ logger: e, message: n, transport: r }),
              });
          }
        };
      },
      8081: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.all_weekly_sets = void 0),
          (t.all_weekly_sets =
            "\n    WITH first_date AS (SELECT date(date) AS min_date\n                    FROM workout_raw\n                    ORDER BY date\n                    LIMIT 1),\n     start_week AS (SELECT date(min_date, 'weekday 0', '-6 days') AS week_start\n                    FROM first_date),\n     end_week AS (SELECT date('now', 'weekday 0') AS week_end),\n     all_weeks (week) AS (SELECT week_start\n                          FROM start_week\n                          UNION ALL\n                          SELECT date(week, '+7 days')\n                          FROM all_weeks,\n                               end_week\n                          WHERE week\n                                    < date(week_end))\n        ,\n     weekly_counts AS (SELECT date(date, 'weekday 0', '-6 days') AS week_date,\n                              COUNT(*)\n                                                                 AS count_records\n                       FROM workout_raw\n                       GROUP BY week_date),\n     combined AS (SELECT aw.week, COALESCE(wc.count_records, 0) AS count_records\n                  FROM all_weeks aw\n                           LEFT JOIN weekly_counts wc\n                                     ON aw.week = wc.week_date)\nSELECT ROW_NUMBER() OVER (ORDER BY week) AS week_number,\n       week                              AS week_start_date,\n       count_records                     AS sets\nFROM combined\nORDER BY week;\n    ");
      },
      8101: (e, t, r) => {
        "use strict";
        (e.exports = r(3952)), (e.exports.SqliteError = r(422));
      },
      8113: (e, t, r) => {
        "use strict";
        const n = r(9023);
        function o(e = {}) {
          const t = new WeakSet();
          return function (r, n) {
            if ("object" == typeof n && null !== n) {
              if (t.has(n)) return;
              t.add(n);
            }
            return s(0, n, e);
          };
        }
        function s(e, t, r = {}) {
          const n = !1 !== r?.serializeMapAndSet;
          return t instanceof Error
            ? t.stack
            : t
              ? "function" == typeof t
                ? `[function] ${t.toString()}`
                : t instanceof Date
                  ? t.toISOString()
                  : n && t instanceof Map && Object.fromEntries
                    ? Object.fromEntries(t)
                    : n && t instanceof Set && Array.from
                      ? Array.from(t)
                      : t
              : t;
        }
        e.exports = {
          serialize: s,
          maxDepth({ data: t, transport: r, depth: n = r?.depth ?? 6 }) {
            if (!t) return t;
            if (n < 1)
              return Array.isArray(t)
                ? "[array]"
                : "object" == typeof t && t
                  ? "[object]"
                  : t;
            if (Array.isArray(t))
              return t.map((t) =>
                e.exports.maxDepth({ data: t, depth: n - 1 }),
              );
            if ("object" != typeof t) return t;
            if (t && "function" == typeof t.toISOString) return t;
            if (null === t) return null;
            if (t instanceof Error) return t;
            const o = {};
            for (const r in t)
              Object.prototype.hasOwnProperty.call(t, r) &&
                (o[r] = e.exports.maxDepth({ data: t[r], depth: n - 1 }));
            return o;
          },
          toJSON: ({ data: e }) => JSON.parse(JSON.stringify(e, o())),
          toString({ data: e, transport: t }) {
            const r = t?.inspectOptions || {},
              s = e.map((e) => {
                if (void 0 !== e)
                  try {
                    const t = JSON.stringify(e, o(), "  ");
                    return void 0 === t ? void 0 : JSON.parse(t);
                  } catch (t) {
                    return e;
                  }
              });
            return n.formatWithOptions(r, ...s);
          },
        };
      },
      8405: (e, t) => {
        "use strict";
        (t.getBooleanOption = (e, t) => {
          let r = !1;
          if (t in e && "boolean" != typeof (r = e[t]))
            throw new TypeError(`Expected the "${t}" option to be a boolean`);
          return r;
        }),
          (t.cppdb = Symbol()),
          (t.inspect = Symbol.for("nodejs.util.inspect.custom"));
      },
      8569: (e) => {
        "use strict";
        e.exports = {
          transform: function ({
            logger: e,
            message: t,
            transport: r,
            initialData: n = t?.data || [],
            transforms: o = r?.transforms,
          }) {
            return o.reduce(
              (n, o) =>
                "function" == typeof o
                  ? o({ data: n, logger: e, message: t, transport: r })
                  : n,
              n,
            );
          },
        };
      },
      8611: (e) => {
        "use strict";
        e.exports = require("http");
      },
      8780: (e, t, r) => {
        "use strict";
        const n = r(9896),
          o = r(6928),
          { promisify: s } = r(9023),
          { cppdb: i } = r(8405),
          a = s(n.access);
        e.exports = async function (e, t) {
          if ((null == t && (t = {}), "string" != typeof e))
            throw new TypeError("Expected first argument to be a string");
          if ("object" != typeof t)
            throw new TypeError(
              "Expected second argument to be an options object",
            );
          e = e.trim();
          const r = "attached" in t ? t.attached : "main",
            n = "progress" in t ? t.progress : null;
          if (!e)
            throw new TypeError("Backup filename cannot be an empty string");
          if (":memory:" === e)
            throw new TypeError('Invalid backup filename ":memory:"');
          if ("string" != typeof r)
            throw new TypeError(
              'Expected the "attached" option to be a string',
            );
          if (!r)
            throw new TypeError(
              'The "attached" option cannot be an empty string',
            );
          if (null != n && "function" != typeof n)
            throw new TypeError(
              'Expected the "progress" option to be a function',
            );
          await a(o.dirname(e)).catch(() => {
            throw new TypeError(
              "Cannot save backup because the directory does not exist",
            );
          });
          const s = await a(e).then(
            () => !1,
            () => !0,
          );
          return c(this[i].backup(this, r, e, s), n || null);
        };
        const c = (e, t) => {
          let r = 0,
            n = !0;
          return new Promise((o, s) => {
            setImmediate(function i() {
              try {
                const s = e.transfer(r);
                if (!s.remainingPages) return e.close(), void o(s);
                if ((n && ((n = !1), (r = 100)), t)) {
                  const e = t(s);
                  if (void 0 !== e) {
                    if ("number" != typeof e || e != e)
                      throw new TypeError(
                        "Expected progress callback to return a number or undefined",
                      );
                    r = Math.max(0, Math.min(2147483647, Math.round(e)));
                  }
                }
                setImmediate(i);
              } catch (t) {
                e.close(), s(t);
              }
            });
          });
        };
      },
      8951: (e, t, r) => {
        "use strict";
        const n = r(4438);
        e.exports = class extends n {
          clear() {}
          crop() {}
          getSize() {
            return 0;
          }
          isNull() {
            return !0;
          }
          writeLine() {}
        };
      },
      9023: (e) => {
        "use strict";
        e.exports = require("util");
      },
      9113: (e, t, r) => {
        "use strict";
        const n = r(8611),
          o = r(5692),
          { transform: s } = r(8569),
          { removeStyles: i } = r(9920),
          { toJSON: a, maxDepth: c } = r(8113);
        e.exports = function (e) {
          return Object.assign(t, {
            client: { name: "electron-application" },
            depth: 6,
            level: !1,
            requestOptions: {},
            transforms: [i, a, c],
            makeBodyFn: ({ message: e }) =>
              JSON.stringify({
                client: t.client,
                data: e.data,
                date: e.date.getTime(),
                level: e.level,
                scope: e.scope,
                variables: e.variables,
              }),
            processErrorFn({ error: r }) {
              e.processMessage(
                {
                  data: [`electron-log: can't POST ${t.url}`, r],
                  level: "warn",
                },
                { transports: ["console", "file"] },
              );
            },
            sendRequestFn({ serverUrl: e, requestOptions: t, body: r }) {
              const s = (e.startsWith("https:") ? o : n).request(e, {
                method: "POST",
                ...t,
                headers: {
                  "Content-Type": "application/json",
                  "Content-Length": r.length,
                  ...t.headers,
                },
              });
              return s.write(r), s.end(), s;
            },
          });
          function t(r) {
            if (!t.url) return;
            const n = t.makeBodyFn({
                logger: e,
                message: {
                  ...r,
                  data: s({ logger: e, message: r, transport: t }),
                },
                transport: t,
              }),
              o = t.sendRequestFn({
                serverUrl: t.url,
                requestOptions: t.requestOptions,
                body: Buffer.from(n, "utf8"),
              });
            o.on("error", (n) =>
              t.processErrorFn({
                error: n,
                logger: e,
                message: r,
                request: o,
                transport: t,
              }),
            );
          }
        };
      },
      9278: (e) => {
        "use strict";
        e.exports = require("net");
      },
      9346: (e, t, r) => {
        "use strict";
        const { cppdb: n } = r(8405);
        e.exports = function (e) {
          if ((null == e && (e = {}), "object" != typeof e))
            throw new TypeError(
              "Expected first argument to be an options object",
            );
          const t = "attached" in e ? e.attached : "main";
          if ("string" != typeof t)
            throw new TypeError(
              'Expected the "attached" option to be a string',
            );
          if (!t)
            throw new TypeError(
              'The "attached" option cannot be an empty string',
            );
          return this[n].serialize(t);
        };
      },
      9390: (e, t, r) => {
        "use strict";
        const { cppdb: n } = r(8405);
        (t.prepare = function (e) {
          return this[n].prepare(e, this, !1);
        }),
          (t.exec = function (e) {
            return this[n].exec(e), this;
          }),
          (t.close = function () {
            return this[n].close(), this;
          }),
          (t.loadExtension = function (...e) {
            return this[n].loadExtension(...e), this;
          }),
          (t.defaultSafeIntegers = function (...e) {
            return this[n].defaultSafeIntegers(...e), this;
          }),
          (t.unsafeMode = function (...e) {
            return this[n].unsafeMode(...e), this;
          }),
          (t.getters = {
            name: {
              get: function () {
                return this[n].name;
              },
              enumerable: !0,
            },
            open: {
              get: function () {
                return this[n].open;
              },
              enumerable: !0,
            },
            inTransaction: {
              get: function () {
                return this[n].inTransaction;
              },
              enumerable: !0,
            },
            readonly: {
              get: function () {
                return this[n].readonly;
              },
              enumerable: !0,
            },
            memory: {
              get: function () {
                return this[n].memory;
              },
              enumerable: !0,
            },
          });
      },
      9493: (e, t, r) => {
        "use strict";
        const n = r(9893);
        e.exports = n;
      },
      9846: (e, t, r) => {
        "use strict";
        const { transform: n } = r(8569);
        function o(e) {
          const t = Math.abs(e);
          return `${e > 0 ? "-" : "+"}${Math.floor(t / 60)
            .toString()
            .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;
        }
        function s({ data: e, logger: t, message: r }) {
          const { defaultLabel: n, labelLength: o } = t?.scope || {},
            s = e[0];
          let i,
            a = r.scope;
          return (
            a || (a = n),
            (i =
              "" === a
                ? o > 0
                  ? "".padEnd(o + 3)
                  : ""
                : "string" == typeof a
                  ? ` (${a})`.padEnd(o + 3)
                  : ""),
            (e[0] = s.replace("{scope}", i)),
            e
          );
        }
        function i({ data: e, message: t }) {
          let r = e[0];
          if ("string" != typeof r) return e;
          r = r.replace("{level}]", `${t.level}]`.padEnd(6, " "));
          const n = t.date || new Date();
          return (
            (e[0] = r
              .replace(/\{(\w+)}/g, (e, r) => {
                switch (r) {
                  case "level":
                    return t.level || "info";
                  case "logId":
                    return t.logId;
                  case "y":
                    return n.getFullYear().toString(10);
                  case "m":
                    return (n.getMonth() + 1).toString(10).padStart(2, "0");
                  case "d":
                    return n.getDate().toString(10).padStart(2, "0");
                  case "h":
                    return n.getHours().toString(10).padStart(2, "0");
                  case "i":
                    return n.getMinutes().toString(10).padStart(2, "0");
                  case "s":
                    return n.getSeconds().toString(10).padStart(2, "0");
                  case "ms":
                    return n.getMilliseconds().toString(10).padStart(3, "0");
                  case "z":
                    return o(n.getTimezoneOffset());
                  case "iso":
                    return n.toISOString();
                  default:
                    return t.variables?.[r] || e;
                }
              })
              .trim()),
            e
          );
        }
        function a({ data: e }) {
          const t = e[0];
          if ("string" != typeof t) return e;
          if (t.lastIndexOf("{text}") === t.length - 6)
            return (
              (e[0] = t.replace(/\s?{text}/, "")), "" === e[0] && e.shift(), e
            );
          const r = t.split("{text}");
          let n = [];
          return (
            "" !== r[0] && n.push(r[0]),
            (n = n.concat(e.slice(1))),
            "" !== r[1] && n.push(r[1]),
            n
          );
        }
        e.exports = {
          concatFirstStringElements: function ({ data: e }) {
            return "string" != typeof e[0] ||
              "string" != typeof e[1] ||
              e[0].match(/%[1cdfiOos]/)
              ? e
              : [`${e[0]} ${e[1]}`, ...e.slice(2)];
          },
          formatScope: s,
          formatText: a,
          formatVariables: i,
          timeZoneFromOffset: o,
          format({ message: e, logger: t, transport: r, data: o = e?.data }) {
            switch (typeof r.format) {
              case "string":
                return n({
                  message: e,
                  logger: t,
                  transforms: [i, s, a],
                  transport: r,
                  initialData: [r.format, ...o],
                });
              case "function":
                return r.format({
                  data: o,
                  level: e?.level || "info",
                  logger: t,
                  message: e,
                  transport: r,
                });
              default:
                return o;
            }
          },
        };
      },
      9893: (e, t, r) => {
        "use strict";
        const n = r(4157),
          o = r(3242),
          { initialize: s } = r(7227),
          i = r(7425),
          a = new o({ electron: n }),
          c = i({ dependencies: { externalApi: a }, initializeFn: s });
        function l(e) {
          c.Logger.getInstance(e)?.processMessage(e);
        }
        (e.exports = c),
          a.onIpc("__ELECTRON_LOG__", (e, t) => {
            t.scope && c.Logger.getInstance(t).scope(t.scope);
            const r = new Date(t.date);
            l({ ...t, date: r.getTime() ? r : new Date() });
          }),
          a.onIpcInvoke("__ELECTRON_LOG__", (e, { cmd: t = "", logId: r }) =>
            "getOptions" === t
              ? { levels: c.Logger.getInstance({ logId: r }).levels, logId: r }
              : (l({ data: [`Unknown cmd '${t}'`], level: "error" }), {}),
          );
      },
      9896: (e) => {
        "use strict";
        e.exports = require("fs");
      },
      9920: (e) => {
        "use strict";
        e.exports = {
          transformStyles: o,
          applyAnsiStyles: ({ data: e }) => o(e, r, n),
          removeStyles: ({ data: e }) => o(e, () => ""),
        };
        const t = {
          unset: "[0m",
          black: "[30m",
          red: "[31m",
          green: "[32m",
          yellow: "[33m",
          blue: "[34m",
          magenta: "[35m",
          cyan: "[36m",
          white: "[37m",
        };
        function r(e) {
          const r = e.replace(/color:\s*(\w+).*/, "$1").toLowerCase();
          return t[r] || "";
        }
        function n(e) {
          return e + t.unset;
        }
        function o(e, t, r) {
          const n = {};
          return e.reduce((e, o, s, i) => {
            if (n[s]) return e;
            if ("string" == typeof o) {
              let e = s,
                a = !1;
              (o = o.replace(/%[1cdfiOos]/g, (r) => {
                if (((e += 1), "%c" !== r)) return r;
                const s = i[e];
                return "string" == typeof s
                  ? ((n[e] = !0), (a = !0), t(s, o))
                  : r;
              })),
                a && r && (o = r(o));
            }
            return e.push(o), e;
          }, []);
        }
      },
    },
    __webpack_module_cache__ = {};
  function __webpack_require__(e) {
    var t = __webpack_module_cache__[e];
    if (void 0 !== t) return t.exports;
    var r = (__webpack_module_cache__[e] = { exports: {} });
    return (
      __webpack_modules__[e].call(r.exports, r, r.exports, __webpack_require__),
      r.exports
    );
  }
  void 0 !== __webpack_require__ &&
    (__webpack_require__.ab = __dirname + "/native_modules/");
  var __webpack_exports__ = __webpack_require__(5391);
  module.exports = __webpack_exports__;
})();
//# sourceMappingURL=index.js.map
