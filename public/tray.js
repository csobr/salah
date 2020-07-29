const electron = require('electron')

const { app, Tray, Menu } = electron

class SalatTray extends Tray {
    constructor(iconPath, win) {
        super(iconPath)

        this.win = win

        this.setToolTip('Salat Times')
        this.on('click', this.onClick.bind(this))
        this.on('right-click', this.onRightClick.bind(this))
    }
    onClick(event, bounds) {
        const { x, y } = bounds
        const { height, width } = this.win.getBounds()
        if (this.win.isVisible()) {
            this.win.hide()
        } else {
            const yPosition = process.platform === 'darwin' ? y : y - height
            this.win.setBounds({
                x: x - width / 2,
                y: yPosition,
                height,
                width,
            })
            this.win.show()
        }
    }
    onRightClick() {
        const exitMenu = Menu.buildFromTemplate([
            {
                label: 'Quit',
                click: () => app.quit(),
            },
        ])
        this.popUpContextMenu(exitMenu)
    }
}
module.exports = SalatTray
