const { app, BrowserWindow } = require("electron");
const { globalShortcut } = require("electron/main");

let win;

function createWindow() {
    win = new BrowserWindow({
        frame: false,
        fullscreenable: false,
    })

    win.webContents.session.webRequest.onHeadersReceived({ urls: ["*://*/*"] },
        (details, callback) => {
            const header = details.responseHeaders
            delete header['X-Frame-Options'];
            delete header['x-frame-options'];

            callback({ cancel: false, responseHeaders: header });
        }
    );

    win.loadFile('./index.html')
}

function toggleFullscreen()
{
    win.setFullScreenable(true)
    win.setFullScreen(!win.isFullScreen())
    win.setFullScreenable(false)
}

function togglePIPMode()
{
    win.setAlwaysOnTop(!win.isAlwaysOnTop())
}

function registerShortcut()
{
    globalShortcut.register('F11', toggleFullscreen)
    globalShortcut.register('CmdOrCtrl+M', toggleFullscreen)
    globalShortcut.register('CmdOrCtrl+P', togglePIPMode)
}

app.whenReady().then(() => {
    createWindow()
    registerShortcut()
})
