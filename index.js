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
    function register(key, callback)
    {
        function callback_wrapper()
        {
            if(win.isFocused())
                callback()
        }

        if(Array.isArray(key))
            globalShortcut.registerAll(key, callback_wrapper)
        else
            globalShortcut.register(key, callback_wrapper)
    }

    register(['F11', 'CmdOrCtrl+M'], toggleFullscreen)
    register('CmdOrCtrl+P', togglePIPMode)
    register('CmdOrCtrl+L', insertURLInput)
}

app.whenReady().then(() => {
    createWindow()
    registerShortcut()
})
