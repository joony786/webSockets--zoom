const socket = io();

const welcomeDiv = document.getElementById('welcome')
const form = welcomeDiv.querySelector('form')
const room = welcomeDiv.querySelector('#room')
let roomName;

room.hidden = true

function sendMessage(msg) {
    console.log(msg);
    const ul = room.querySelector('ul')
    const li = document.createElement('li')
    li.innerText = msg
    ul.appendChild(li)
}


function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('input')
    const value = input.value;
    socket.emit('send_message', value,roomName, () => {
        sendMessage(`you: ${value}`)
    })
    input.value = ''
}

function roomText() {
    form.hidden = true;
    room.hidden = false;
    const h1 = welcomeDiv.querySelector('h1')
    h1.innerText = `Room ${roomName}`
    // send msg from room inputs
    room.addEventListener('submit', handleMessageSubmit)

}

function handleEnterRoom(event) {
    event.preventDefault();
    const input = form.querySelector('input')
    socket.emit('enter_room', input.value, roomText)
    roomName = input.value;
    input.value = ''
}


form.addEventListener('submit', handleEnterRoom)

function appendRoomCount(rn) {
    const h1 = welcomeDiv.querySelector('h1')
    h1.innerText = `Room ${roomName} (${rn})`
}

socket.on('welcome', (user, count) => {
    console.log(user, count);
    sendMessage(`${user} joined !`);
    appendRoomCount(count);
});
socket.on('left', (user, count) => {
    sendMessage(user)
    appendRoomCount(count)
});
socket.on('send_message', (m) => sendMessage(m));

socket.on('room_changed', (rooms) => {
    const list = welcomeDiv.querySelector('ul')
    list.innerHTML = ''
    if (rooms.length === 0) {
        return;
    }
    rooms.forEach(r => {
        const li = document.createElement('li')
        li.innerText = r
        list.append(li)
    })

})
