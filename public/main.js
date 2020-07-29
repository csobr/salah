const path = require('path')
const electron = require('electron')
const isDev = require('electron-is-dev')
const SalatTray = require('./tray')

const { app, BrowserWindow, Tray, Menu } = require('electron')
let tray
let win
app.on('ready', () => {
    win = new BrowserWindow({
        height: 300,
        width: 200,
        frame: false,
        resizable: false,
        show: false,
        title: 'Salat',
    })
    const startURL = isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, 'index.html')}`
    win.loadURL(startURL)
    win.on('blur', () => {
        win.hide()
    })

    // win.webContents.openDevTools()
    const iconPath = path.join(__dirname, `../assets/icon.png`)
    tray = new SalatTray(iconPath, win)
})
