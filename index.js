const { app, BrowserWindow } = require("electron");
const { globalShortcut } = require("electron/main");

let win;

function createWindow() {
    win = new BrowserWindow({
        frame: false,
        fullscreenable: false,
    })

    win.loadFile('./index.html')
}
app.whenReady().then(() => {
    createWindow()
})
