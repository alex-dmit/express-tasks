const messagesElem = document.getElementById('messages') // ul

const sendForm = document.getElementById('send-message')
sendForm.onsubmit = async function (event) {
    event.preventDefault()
    const text = event.target.text.value
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    if (response.ok) {
        const { id, text } = await response.json()
        const li = document.createElement('li')
        li.dataset.id = id
        li.innerHTML = `${text} <button>x</button>`
        messagesElem.append(li)
        event.target.text.value = ''
    }
}

init()

messagesElem.onclick = (event) => {
    const button = event.target
    if (button.tagName !== 'BUTTON') return
    const li = button.closest('li')
    const idForDelete = li.dataset.id
    fetch('/api/chat/' + idForDelete, {
        method: 'DELETE'
    }).then((response) => {
        if (response.ok) { // status == 200
            li.remove()
            // init()
        }
    })
}

function init() {
    fetch('/api/chat').then((response) => {
        return response.json()
    }).then((messages) => {
        messagesElem.innerHTML = messages.reduce((acc, cur) => {
            return acc + `<li data-id=${cur.id}>${cur.text} <button>x</button></li>`
        }, '')
    })
}
