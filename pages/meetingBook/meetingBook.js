const ipc = require('electron').ipcRenderer;

$("#indexHtml").click(function () {
    ipc.send('returnIndex');
})