var electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
// while(true) {
    //激活摄像头
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
    navigator.getUserMedia({video: true}, gotStream, noStream);

    function gotStream(stream) {
    myVideo.src = URL.createObjectURL(stream);
    myVideo.onerror = function () {
        stream.stop();
    };
    stream.onended = noStream;
    // myVideo.onloadedmetadata = function () {
    //     alert('摄像头成功打开！');
    // };
    }

    function noStream(err) {
        alert(err);
    }


    // ipcRenderer.on('startTrack', function (event, start) {
    //     if (start === "start") {
    //         console.log("syx");
    //     }
    // })

    // /*
    //获取画布
    const canvas = document.getElementById('canvas');
    const myCanvas = document.getElementById('myCanvas');
    const video = document.getElementById('myVideo');
    var context = canvas.getContext('2d');
    var context1 = myCanvas.getContext('2d');
    //检测人脸
    var objects = new tracking.ObjectTracker(['face']);

    objects.on('track', function (event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (event.data.length === 0) {
        console.log("erro!");
    } else {
        event.data.forEach(function (rect) {
            //在默认画布上中画框框
            console.log("识别到人脸");
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            //在画布1上绘图
            context1.drawImage(video, 0, 0, 400, 300);
            // const snapeData = myCanvas.toDataURL();
            const snapeData = myCanvas.toDataURL('image/jpeg');
            console.log(snapeData);
            // var a = typeof(snapeData);
            // console.log(a);
            var message = snapeData.substring(23);
            console.log(message);
            // var w = window.open('about:blank', 'image from canvas');
            // w.document.write("<img src='" + snapeData + "' alt='from canvas'/>");
            // context.font = '11px Helvetica';
            // context.fillStyle = "#fff";
            // context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            // context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            

            //显示遮罩层
            // ipcRenderer.on('displayModal', () => {
            // var displayModal = setTimeout(function () {
            var modal = document.getElementById('modal');
            modal.style.display='block';
                // }, 100000)           
                // });

            // 子进程的 ipc 模块 
            // setTimeout(function(){ }, 10000);

            setTimeout(function () {
                electron.ipcRenderer.sendSync('userLoginPost', message);
            }, 10000);
            
            
            // tracker.stop(objects);
            
            // ipcRenderer.sendSync 是一个同步的发送消息事件，它的第一个参数是和主进程约定好的自定义事件名，后面可以接多个参数
        });
    }
    });
    //激活

    var tracker = tracking.track('#myVideo', objects);
    // */
// }

// var closeFaceLoginWin = setTimeout(function() {
//     console.log("1");
// },5000);
// clearTimeout(closeFaceLoginWin);