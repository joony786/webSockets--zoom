let messageList = document.querySelector('ul');

let messageForm = document.querySelector('#message');
const nickName  = document.querySelector('#nickname')




const socket = new WebSocket(`ws://${window.location.host}`);


socket.addEventListener('open',()=>{
    console.log(`Connected to Server`);
})

socket.addEventListener('message',(message)=>{
    console.log('incomming message from server');
    const li = document.createElement('li')
    li.innerText = message.data;
    messageList.append(li)
})

socket.addEventListener('close',()=>{
    console.log(`disconnected form server`);
})

socket.addEventListener('error',(error)=>{
    console.log(`run into some error:`,error);
})

function makeMessage(type, payload) {
    const msg = {type,payload}
    return JSON.stringify(msg)
}

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    const value = input.value;
    socket.send(makeMessage('new_message', value))
    input.value = ''
}

function handleNickName(event) {
    event.preventDefault();
    const input = nickName.querySelector('input');
    const value = input.value;
    socket.send(makeMessage('nick_name', value))
    input.value = ''
}

messageForm.addEventListener('submit',handleSubmit)
nickName.addEventListener('submit',handleNickName)