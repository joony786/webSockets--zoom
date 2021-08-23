const socket = new WebSocket(`ws://${window.location.host}`);


socket.addEventListener('open',()=>{
    console.log(`Connected to Server`);
})

socket.addEventListener('message',(message)=>{
    console.log(`new message:`, message.data);
})

socket.addEventListener('close',()=>{
    console.log(`disconnected form server`);
})

socket.addEventListener('error',(error)=>{
    console.log(`run into some error:`,error);
})



let messageList = document.querySelector('ul');

let messageForm = document.querySelector('form');


function handleSubmit(event) {
    event.preventDefault();
    
    const input = messageForm.querySelector('input');
    const value = input.value;
    socket.send(JSON.stringify(value))
    input.value = ''
}

messageForm.addEventListener('submit',handleSubmit)