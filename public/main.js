const electron = require('electron')
const isDev = require('electron-is-dev')

const { app, BrowserWindow, Tray, Menu } = require('electron')

function createWindow() {
    let win = new BrowserWindow()
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, 'index.html')}`
    win.loadURL(startURL)

    win.webContents.openDevTools()
}
let tray = null
app.whenReady().then(() => {
    tray = new Tray('assets/moske.png')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Fajr', type: 'radio', checked: true },
        { label: 'Sunrise', type: 'radio' },
        { label: 'Dhuur', type: 'radio' },
        { label: 'Asr', type: 'radio' },
        { label: 'Maghrib', type: 'radio' },
        { label: 'Isha', type: 'radio' },
    ])
    contextMenu.items[1].checked = false
    tray.setToolTip('Bön')
    tray.setContextMenu(contextMenu)
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
