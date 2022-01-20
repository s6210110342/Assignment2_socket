//client
(function connect() {
    let socket = io.connect("http://localhost:3000")

    /* เป็นโค้ดในส่วนของการเปลี่ยนชื่อของผู้ใช้งาน */
    let username = document.querySelector('#username');
    let usernameBtn = document.querySelector('#usernameBtn');
    let curUsername = document.querySelector('.card-header');

    /* เมื่อผู้ใช้คลิกปุ่มเปลี่ยนชื่อ ก็จะทำการเปลี่ยนชื่อของผู้ใช้งานแทน Anonymous และในกล่องข้อความก็จะกลับมาเป็นค่าว่างเหมือนเดิม*/
    usernameBtn.addEventListener('click', e => {
        console.log(username.value)
        socket.emit('change_username', { username: username.value })
        curUsername.textContent = username.value
        username.value = ''
    })

    /* เป็นโค้ดในส่วนของการส่งข้อความของผู้ใช้งาน */
    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');

    /* เมื่อผู้ใช้คลิกปุ่มส่งข้อความ ข้อความก็จะปรากฎบน real time chat ให้ผู้ใช้เห็น และในกล่องข้อความที่ผู้ใช้ใช้ส่งข้อความก็จะกลับมาเป็นค่าว่างเหมือนเดิมเพื่อให้ผู้ใช้ได้ส่งข้อความใหม่ในครั้งถัดไป */
    messageBtn.addEventListener('click', e => {
        console.log(message.value)
        socket.emit('new_message', { message: message.value })
        message.value = ''
    })

    /* ผู้ใช้คนอื่นๆจะสามารถเห็นข้อความที่ผู้ใช้อีกคนส่งข้อความหา โดยที่จะเห็นข้อความขึ้นต้นด้วยชื่อผู้ใช้งานคนที่ส่ง แล้วตามด้วยข้อความของผู้ใช้คนนั้น */
    socket.on('receive_message', data => {
        console.log(data)
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem)
    })
})();