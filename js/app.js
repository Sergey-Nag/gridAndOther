// События на заголовки категрий
function eventsToListHeaders() {
  let listLength = LIST_headers.length
  for (let i = 0; i < listLength; i++) {
    LIST_headers[i].onmouseup = function () {
      let arrow = this.children[2]
      let itemsWrapp = this.parentElement.children[1]
      itemsWrapp.classList.toggle('hidden')
      arrow.classList.toggle('up')
    }
  }
}

function drag_n_drop(e) {
  if (Mouse.target.tagName == 'ITEM') {
    if (Mouse.target.parentElement.classList.contains('list_items')) {
      if (!Avatar.created && Mouse.holdVector() > 5) {
        Avatar.focus = Mouse.target
        createAvatar()
      }
    }
  }
}

function createAvatar() {
  let avatar = Avatar.focus.cloneNode(false)
  console.log(avatar)
  
  Avatar.created = true
}