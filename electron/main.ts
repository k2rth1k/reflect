// main.ts - Main Electron process
import {app, BrowserWindow, ipcMain} from 'electron';
import installExtension, {REACT_DEVELOPER_TOOLS} from "electron-devtools-installer";
import * as path from 'path';
import {initializeDatabase, WorkoutData} from "../database/DatabaseService";
import {WeeklySets} from "../database/queryTypes";

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 800,
        webPreferences: {
            // contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (app.isPackaged) {
        // 'build/index.html'
        win.loadURL(`file://${__dirname}/../index.html`);
    } else {
        win.loadURL('http://localhost:3000/index.html');

        win.webContents.openDevTools();

        // Hot Reloading on 'node_modules/.bin/electronPath'
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname,
                '..',
                '..',
                'node_modules',
                '.bin',
                'electron' + (process.platform === "win32" ? ".cmd" : "")),
            forceHardReset: true,
            hardResetMethod: 'exit'
        });
    }
}

app.whenReady().then(() => {
    // DevTools

    installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

    createWindow();
    const db= StartDB();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
            db.close();
        }
    });
});

function StartDB()  {
    const db = initializeDatabase();

    ipcMain.handle('db:get-workout-raw', async (): Promise<WorkoutData[]> => {
        return db.getAllWorkoutData();
    })

    ipcMain.handle('db:get-exercises', async (): Promise<string[]> => {
        return db.getAllExercises();
    })

    ipcMain.handle('db:get-weekly-sets', async (): Promise<WeeklySets[]> => {
        return db.getAllWeeklySets();
    })

    return db;
}