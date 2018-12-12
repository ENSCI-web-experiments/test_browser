const { ipcRenderer } = require('electron')

let view
let omni

$(document).ready(init)

function init() {
    view = $('#view').get(0)
    omni = $('#url').get(0)
    $('#refresh').on('click', reloadView)
    $('#back').on('click', backView)
    $('#forward').on('click', forwardView)
    view.addEventListener('did-finish-load', updateNav)
    view.getWebContents().on('before-input-event', (event, input) => {
        if (input.type === 'keyDown') {
            ipcRenderer.send('type-content', input.key)
        }
    })
    omni.addEventListener('keydown', updateURL)
}

function updateURL(event) {
    if (event.keyCode === 13) {
        omni.blur()
        let val = omni.value
        let https = val.slice(0, 8).toLowerCase()
        let http = val.slice(0, 7).toLowerCase()
        if (https === 'https://') {
            view.loadURL(val)
        } else if (http === 'http://') {
            view.loadURL(val)
        } else {
            if (/\./i.test(val) === false || /\s/i.test(val) === true) {
                view.loadURL('https://www.google.com/search?q=' + encodeURIComponent(val))
            } else {
                view.loadURL('http://' + val)
            }
        }
    } else {
        ipcRenderer.send('type-url', event.key)
    }
}

function reloadView() {
    view.reload()
}

function backView() {
    view.goBack()
}

function forwardView() {
    view.goForward()
}

function updateNav() {
    ipcRenderer.send('navigate-to', view.src)
    omni.value = view.src
}
