const { app, BrowserWindow, ipcMain } = require('electron')

// const SerialPort = require('serialport')

let win

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })

    win.loadFile('index.html')

    // win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}

ipcMain.on('type-url', (event, arg) => {
    console.log('typing in url bar', arg)
})

ipcMain.on('type-content', (event, arg) => {
    console.log('typing in content', arg)
})

ipcMain.on('navigate-to', (event, arg) => {
    console.log('navigate to', arg)
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
