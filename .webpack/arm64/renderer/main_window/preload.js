(() => {
  "use strict";
  var e = {
      288: (e) => {
        e.exports = require("electron");
      },
    },
    r = {};
  function t(o) {
    var n = r[o];
    if (void 0 !== n) return n.exports;
    var s = (r[o] = { exports: {} });
    return e[o](s, s.exports, t), s.exports;
  }
  (() => {
    const e = t(288);
    e.contextBridge.exposeInMainWorld("electronAPI", {
      getAllWorkoutData: () => e.ipcRenderer.invoke("db:get-workout-raw"),
      getAllExercises: () => e.ipcRenderer.invoke("db:get-exercises"),
      getAllWeeklySets: () => e.ipcRenderer.invoke("db:get-weekly-sets"),
    });
  })();
})();
//# sourceMappingURL=preload.js.map
