const { app, BrowserWindow, protocol } = require("electron");
const { globalShortcut } = require("electron/main");
const fs = require("fs");
const path = require("path");

let win;

function interceptFileProtocol()
{
    protocol.registerFileProtocol('local', (req, callback) => {
        let local_path = req.url.slice("local://".length)
        callback({
            path: path.normalize(`${__dirname}/${local_path}`)
        })
    })
}

function createWindow()
{
    win = new BrowserWindow({
        frame: false,
        fullscreenable: false,
    })

    win.loadURL('https://google.com')
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

function insertURLInput()
{
    const code = arguments.callee.code ||= fs.readFileSync('./assets/js/insertURLInput.js')
    win.webContents.executeJavaScript(code)
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
    interceptFileProtocol()
    createWindow()
    registerShortcut()
})
