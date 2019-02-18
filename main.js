const { app, BrowserWindow, ipcMain } = require('electron');

// 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let win;
let faceLoginWindow;

function createWindow () {
    // 创建浏览器窗口。
    let mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        //隐藏菜单栏，ALT显示
        // autoHideMenuBar: true
    });
    // 然后加载应用的 index.html
    mainWindow.loadFile('./pages/index/index.html');
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
    //设置不显示菜单栏
    mainWindow.setMenu(null);


    /*
    let faceLoginWindow = new BrowserWindow({
        weight: 800,
        height: 600,
        show: false
        // parent: mainWindow
    });
    faceLoginWindow.loadFile('faceLogin.html');
    faceLoginWindow.webContents.openDevTools();
    //监听faceLogin，当接收到新的消息时，方法得到执行
    ipcMain.on('faceLogin', function (event) {
        faceLoginWindow.show();
        mainWindow.hide();
        event.sender.send('startTrack', 'start');
        // faceLoginWindow.on('closed',()=>{faceLoginWindow = null});
        // var closeFaceloginWin = setTimeout(function(){
        //     faceLoginWindow.hide();
        //     mainWindow.show();
        // },5000);
        // faceLoginWindow.show();
        // mainWindow.hide();
    });
    */    

//    /*
    //监听faceLogin，当接收到新的消息时，方法得到执行
    ipcMain.on('faceLogin', function () {
        faceLoginWindow = new BrowserWindow({
            weight: 800,
            height: 600,
            // show: false
            parent: mainWindow,
            autoHideMenuBar: true
        });
        faceLoginWindow.loadFile('./pages/faceLogin/faceLogin.html');
        faceLoginWindow.webContents.openDevTools();
        faceLoginWindow.setMenu(null);
        mainWindow.hide();
        // faceLoginWindow.on('closed',()=>{faceLoginWindow = null});
        // var closeFaceloginWin = setTimeout(function(){
        //     faceLoginWindow.close();
        //     mainWindow.show();
        // },10000);
        // faceLoginWindow.show();
        // mainWindow.hide();
       
    });
    // */

    ipcMain.on('userLoginPost', (event, snapeData) => {
        // 引入 request模块
        var request = require('request')
        var requestData = {
            "faceImageBase64": snapeData
        };
        // 根据发送的数据类型不同，request 的使用也不同
        // application/json 格式的数据
        request({
            url: 'http://58.87.120.47:8002/api/v1/face/login',
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            // body: JSON.stringify(requestData)
            body: requestData
        }, function(error, response, body) {
            console.log(response);
            // var responseData = JSON.stringify(response)
            // faceLoginWindow.close();
            // mainWindow.show();
            // event.sender.send('erroMessage', "shangyuxiu");
            if (!error && response.code === 201) {
                console.log(response.body.code);
                faceLoginWindow.close();
                mainWindow.show();
                // event.sender.send('loginComp lete', response.message)
            }  else {
                console.log();
                faceLoginWindow.close();
                mainWindow.show();
                console.log(response.body.code);
                // event.sender.send('erroMessage', "shangyuxiu");
            }
        });



        // faceLoginWindow.close();
        // mainWindow.show();
    })
  
    ipcMain.on('bookMeeting', () => {
        mainWindow.loadFile('./pages/meetingBook/meetingBook.html');
        mainWindow.webContents.openDevTools();
    })

    ipcMain.on('returnIndex', () => {
        mainWindow.loadFile('./pages/index/index.html');
    })
}


// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
        createWindow()
    }
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用 require 导入。
