const messagesElem = document.getElementById('messages') // ul

init()

messagesElem.onclick = (event) => {
    const button = event.target
    const li = button.closest('li')
    const indexForDelete = li.dataset.index
    fetch('/api/chat/' + indexForDelete, {
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
        messagesElem.innerHTML = messages.reduce((acc, cur, index) => {
            return acc + `<li data-index=${index}>${cur} <button>x</button></li>`
        }, '')
    })
}
