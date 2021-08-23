const socket = io();

const welcomeDiv = document.getElementById('welcome')
const form = welcomeDiv.querySelector('form')
const room = welcomeDiv.querySelector('#room')
let roomName;

room.hidden = true

function roomText() {
    const h1 = welcomeDiv.querySelector('h1')
    h1.innerText = `Room ${roomName}`
    form.hidden = true;
    room.hidden = false;
    
}

function handleEnterRoom(event) {
    event.preventDefault();
    const input = form.querySelector('input')
    socket.emit('enter_room',{payload: input.value}, roomText)
    roomName = input.value;
    input.value = ''
}


form.addEventListener('submit',handleEnterRoom)