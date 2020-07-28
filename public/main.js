const electron = require('electron')
const isDev = require('electron-is-dev')

const { app, BrowserWindow, Tray } = require('electron')
let tray
let win
app.on('ready', () => {
    win = new BrowserWindow({
        height: 300,
        width: 200,
        frame: false,
        resizable: false,
        show: false,
    })
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, 'index.html')}`
    win.loadURL(startURL)

    // win.webContents.openDevTools()

    tray = new Tray('assets/moske.png')
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds
        const { height, width } = win.getBounds()
        if (win.isVisible()) {
            win.hide()
        } else {
            win.setBounds({
                x: x - width / 2,
                y,
                height,
                width,
            })
            win.show()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

//nodemon --watch * --exec "electron ."
