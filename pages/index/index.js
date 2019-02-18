const ipc = require('electron').ipcRenderer;
// import $ from './node_modules/jquery/src/jquery.js';
// const { net } = require('electron')

$("#faceLoginButton").click(function () {
    ipc.send('faceLogin');
});

$("#bookMeetingBtn").click(function () {
    ipc.send('bookMeeting');
});


ipc.on('erroMessage', function (event, erroMessage) {
    $("#alertMsg").text = "syx";
    $("#alertMsg").style.display = 'block';
})
