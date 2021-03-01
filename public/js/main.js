const sendBttn = document.getElementById('send');
const dataHolder = document.getElementById('canvasDataHolder');
const mssgDiv = document.getElementById('containerMssg');
// const mssgName = document.querySelector('.mssgUsername');

const canvasEl = document.getElementById('drawLayer');
const usernameEl = document.getElementById('name');
const foot = document.getElementById('footer');
var footHidden = false;

const dropHeight = document.body.offsetHeight - document.getElementById('containerHeader').offsetHeight - document.getElementById('mobileHideUserElements').offsetHeight + 13;
const dropStr = dropHeight + "px";
const origStr = mssgDiv.offsetHeight + "px";
mssgDiv.style.height = origStr;
foot.style.height = foot.offsetHeight + "px";
// const {userJoin, getCurrentUser} = require('../utils/users');
// const formatColor = require('../utils/colors');


const socket = io();


// Get username and color from url
const {username, color} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// User joins the chat
socket.emit('joinChat', {username, color});

socket.on('canvasProp', (currentUser, userColor)=>{
    const user = currentUser;
    // console.log(canvasEl, usernameEl);
    canvasEl.setAttribute('style', `border-color: ${userColor.primary}`);
    usernameEl.setAttribute('style', `background-color: ${userColor.secondary};
                                        border-color: ${userColor.primary};
                                        color: ${userColor.primary}`);
    usernameEl.innerHTML = user.username;
    // usernameEl.setAttribute('style', ``);
    // usernameEl.setAttribute('style', ``);
});

// Mesages from server
socket.on('mssg', (mssg)=>{
    outputMessage(mssg);
    mssgDiv.scrollTop = mssgDiv.scrollHeight;
});
// Messages from user
socket.on('canvasMssg', (mssg)=>{
    outputCanvasMssg(mssg);
    // formatNameStyle(mssg);
    mssgDiv.scrollTop = mssgDiv.scrollHeight;
});

// Send message
$(document).on('canvasSrcAdded', (e)=>{
    // get canvas data once toDataURL() completes
    const mssgData = dataHolder.getAttribute('src');
    
    // emit message (canvas data) to server
    socket.emit('canvasMssg', mssgData); 
});

// Output message to DOM (#containerMssg)
function outputCanvasMssg(mssg){
    const div = document.createElement('div')
    div.classList.add('mssg');
    div.setAttribute('style', `border-color: ${mssg.color.primary}`);
    
    div.innerHTML = `<p class='h6 disableSelect mssgUsername' 
                        style='border-color: ${mssg.color.primary};
                        background-color: ${mssg.color.secondary};
                        color: ${mssg.color.primary}'>
                        ${mssg.username}
                    </p>
                    <img src="${mssg.mssg}">`;
    // $(div).html(`<p class='h6 disableSelect mssgUsername'>${mssg.username}</p>
    //             <img src="${mssg.mssg}">`);
    
    // console.log(mssgName);

    mssgDiv.appendChild(div);

    // mssgName.setAttribute('style', `border-color: ${mssg.color.primary}`);
    // mssgName.setAttribute('style', `background-color: ${mssg.color.secondary}`);
}
// function formatNameStyle(mssg){
//     mssgName.setAttribute('style', `border-color: ${mssg.color.primary}`);
//     mssgName.setAttribute('style', `background-color: ${mssg.color.secondary}`);
// }
function outputMessage(mssg){
    const div = document.createElement('div')
    div.classList.add('sysMssg');
    div.classList.add('disableSelect');
    div.innerHTML = `<p class='sysText'>${mssg}</p>`;
    mssgDiv.appendChild(div);
}

function hidePalette(){
    if (!footHidden) {
        foot.style.height = "0";
        mssgDiv.style.height = dropStr;
        footHidden = true;
    } else {
        foot.style.height = "200px";
        mssgDiv.style.height = origStr;
        footHidden = false;
    }
}