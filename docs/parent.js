const TIMEOUT_WAIT_STREAM = 5000;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const argObj = { audioCtx };

function streamAsync(argObj) {
    return new Promise((resolve, reject) => {
        const room = argObj.room;
        const timer = setTimeout(() => {
            reject('カメラが起動していません。');
        }, TIMEOUT_WAIT_STREAM);
        room.on('stream', remoteStream => {
            if (remoteStream.peerId !== PARENT) {
                return;
            }
            clearTimeout(timer);
            room.on('peerLeave', remotePeerId => {
                if (remotePeerId !== PARENT) {
                    return;
                }
                alert('カメラが閉じられました。モニターを終了します。');
                location.href = './';
            });
            argObj.remoteStream = remoteStream;
            resolve(argObj);
        });
    });
}

function tapScreenAsync(argObj) {
    return new Promise((resolve, reject) => {
        html.classList.remove('waitingRemoteStream');
        html.classList.add('waitingUserAction');

        const remoteStream = argObj.remoteStream;
        video.srcObject = remoteStream;

        const ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1) {
            const btnPlay = document.getElementById('btnPlay');
            btnPlay.addEventListener('click', () => {
                resolve(argObj);
            });
            return;
        }
        resolve(argObj);
    });
}

function getAudioSourceAsync(argObj) {
    return new Promise((resolve, reject) => {
        const remoteStream = argObj.remoteStream;
        const audioCtx = argObj.audioCtx;
        if (navigator.userAgent.search(/Chrome/) !== -1) {
            const audio = new Audio();
            audio.srcObject = remoteStream;
            audio.addEventListener('loadedmetadata', () => {
                argObj.source = audioCtx.createMediaStreamSource(remoteStream);
                resolve(argObj);
            });
            return;
        }
        argObj.source = audioCtx.createMediaStreamSource(remoteStream);
        resolve(argObj);
    });
}

newPeerAsync(argObj)
    .then(newPeerAsync)
    .then(joinRoomAsync)
    .then(streamAsync)
    .then(tapScreenAsync)
    .then(getAudioSourceAsync)
    .then(argObj => {
        html.classList.remove('waitingUserAction');
        html.classList.add('monitoring');

        const source = argObj.source;
        const audioCtx = argObj.audioCtx;
        source.connect(audioCtx.destination);
    })
    .catch(error => {
        console.error(error);
        alert('エラーが発生しました。モニターできていない可能性があるので、終了します。(' + error + ')');
        location.href = './';
    });
