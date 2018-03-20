const word = document.getElementById('word');
const btnsGoBaby = document.getElementsByClassName('btnGoBaby');
const btnsGoParent = document.getElementsByClassName('btnGoParent');
const storedWord = localStorage.word;

function getHash() {
    const formValue = word.value;
    const encoded = encodeURIComponent(formValue);
    return encoded.replace(/[^A-Za-z0-9_-]/g, '');
}

function launchApp(url) {
    localStorage.word = word.value;
    const hash = getHash();
    location.href = url + '#' + hash;
}

function enableButton() {
    const hash = getHash();
    if (hash.length > 0) {
        Array.prototype.forEach.call(btnsGoBaby, element => {
            element.disabled = false;
        });
        Array.prototype.forEach.call(btnsGoParent, element => {
            element.disabled = false;
        });
    } else {
        Array.prototype.forEach.call(btnsGoBaby, element => {
            element.disabled = true;
        });
        Array.prototype.forEach.call(btnsGoParent, element => {
            element.disabled = true;
        });
    }
}

if (storedWord) {
    word.value = storedWord;
    enableButton();
}

Array.prototype.forEach.call(btnsGoBaby, element => {
    element.addEventListener('click', () => {
        launchApp('camera.html');
    });
});

Array.prototype.forEach.call(btnsGoParent, element => {
    element.addEventListener('click', () => {
        launchApp('monitor.html');
    });
});

word.addEventListener('input', enableButton);

const platform = navigator.platform;
const isIos = platform === 'iPhone' || platform === 'iPad' || platform === 'iPod';
const isAndroid = /Android/.test(navigator.userAgent);
const alertIos = document.getElementById('alert-ios');
const alertAndroid = document.getElementById('alert-android');
const alertPc = document.getElementById('alert-pc');

if (!(window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)
    || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (isIos) {
        alertIos.classList.remove('d-none');
    } else if (isAndroid) {
        alertAndroid.classList.remove('d-none');
    } else {
        alertPc.classList.remove('d-none');
    }
}