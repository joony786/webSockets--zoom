// const socket = io();
const myFace = document.getElementById('myFace')
const muteBtns = document.getElementById('mute')
const cameraBtns = document.getElementById('camera')
const cameraSelect = document.getElementById('cameras')

let myStream;
let muted = false;
let cameraOff = false;

async function getCameraDevices() {
    try {
        const stream = await navigator.mediaDevices.enumerateDevices();
        const videoSrc = stream.filter(src => src.kind === 'videoinput')
        const selectedCamera = myStream.getVideoTracks()[0]
        console.log(videoSrc)
        videoSrc.forEach(video => {
            const option = document.createElement('option')
            if (video.label === selectedCamera.label) {
                option.selected = true
            }
            option.value = video.deviceId
            option.innerText = video.label
            cameraSelect.appendChild(option)
        })
    } catch (e) {
        console.log(e)
    }
}


async function getMedia(deviceID) {
    const initialConstraints = {audio: true, video: {facingMode: "user"}}
    const userConstraints = {
        audio: true, video: {deviceId: {exact: deviceID}}
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(deviceID ? userConstraints : initialConstraints);
        myFace.srcObject = myStream;
        if (!deviceID) {
            await getCameraDevices()
        }
    } catch (e) {
        console.log(e);
    }
}

getMedia().then(r => console.log(r));

function handleCameraBtnClick() {
    myStream.getVideoTracks().forEach(vide => vide.enabled = !vide.enabled)
    if (cameraOff) {
        cameraBtns.innerText = 'Turn off Camera'
        cameraOff = false;
    } else {
        cameraBtns.innerText = 'Turn Camera on'
        cameraOff = true;
    }
}

function handleMutedBtnClick() {
    console.log('inside btn clck')
    myStream.getAudioTracks().forEach(track => track.enabled = !track.enabled)
    if (muted) {
        muteBtns.innerText = 'unMute'
        muted = false;
    } else {
        muteBtns.innerText = 'Mute'
        muted = true;
    }
}

async function handleCameraSelect({target: {value}}) {
    await getMedia(value)

}


muteBtns.addEventListener('click', handleMutedBtnClick)
cameraBtns.addEventListener('click', handleCameraBtnClick)
cameraSelect.addEventListener('change', handleCameraSelect)
