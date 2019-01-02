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
// События на item'ы
function eventToItems() {
  for (let i = 0; i < ITEMS.length; i++) {
    ITEMS[i].onmousedown = pin_avatar
    ITEMS[i].onmousemove = drag_n_drop
  }
}

function pin_avatar(e) {
  Avatar.created = this
  Avatar.difX = e.offsetX
  Avatar.difY = e.offsetY
}

function drag_n_drop(e) {
  if (Mouse.down && e.which == 1 && !Avatar.focus) {
    if (Mouse.holdVector() > 2) {
      Avatar.focus = createAvatar()
    }
  } else {
    removeAvatar()
  }
}

function moveAvatar() {
  Avatar.focus.style.left = Mouse.x - Avatar.difX + 'px'
  Avatar.focus.style.top = Mouse.y - Avatar.difY + 'px'
}

function createAvatar() {
  let av = Avatar.created
  if (av) {
    let avatar = av.cloneNode(false)
    avatar.classList.add('avatar')

    let width = av.offsetWidth
    avatar.style.width = width + 'px'


    avatar.style.left = Mouse.x - Avatar.difX + 'px'
    avatar.style.top = Mouse.y - Avatar.difY + 'px'

    Doc.body.appendChild(avatar)
    MAIN_b.classList.add('highlight')
    return avatar;
  }
  Avatar.created = false
}

function removeAvatar() {
  if (Avatar.focus) {
    Doc.body.removeChild(Avatar.focus)
    MAIN_b.classList.remove('highlight')
    Avatar.created = false
    Avatar.focus = false
  }
}
