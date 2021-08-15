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
app.whenReady().then(() => {
    createWindow()
})
