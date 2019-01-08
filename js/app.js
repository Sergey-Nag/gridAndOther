// События на заголовки категрий
function eventsToListHeaders() {
  let listLength = LIST_headers.length
  for (let i = 0; i < listLength; i++) {
    LIST_headers[i].onmouseup = function () {
      let arrow = this.children[2]
      let itemsWrapp = this.parentElement.children[1]
      let storage = localStorage.getItem('List-of-items-' + LIST_headers[i].children[1].textContent)

      if (itemsWrapp.classList.contains('hidden')) {
        storage = 'true'
      } else storage = 'false'

      localStorage.setItem('List-of-items-' + LIST_headers[i].children[1].textContent, storage)
      toggleList()
    }
  }
}

function toggleList() {
  for (let i = 0; i < LIST_headers.length; i++) {
    let isHidden = localStorage.getItem('List-of-items-' + LIST_headers[i].children[1].textContent)
    let arrow = LIST_headers[i].children[2]
    let itemsWrapp = LIST_headers[i].parentElement.children[1]
    if (isHidden == 'false') {
      itemsWrapp.classList.add('hidden')
      arrow.classList.add('up')
    } else {
      itemsWrapp.classList.remove('hidden')
      arrow.classList.remove('up')
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
  }
}

function moveAvatar() {
  Avatar.focus.style.left = Mouse.x - Avatar.difX + 'px'
  Avatar.focus.style.top = Mouse.y - Avatar.difY + 'px'
  if (Mouse.isIn(MAIN_b)) {
    let search = Lines.search(Avatar.focus)

    Avatar.focus.classList.add('hidden')
    Items.addGhost(Avatar.focus)

    search.then((res) => {
      Items.position(res.posX, res.posY)
    }).catch((rej) => {
      Avatar.focus.classList.remove('hidden')
    })
  } else {
    Items.removeGhost()
    Avatar.focus.classList.remove('hidden')
  }
}

function moveItemOnGrid() {
  let search = Lines.search({
    isMouse: true,
    x: Mouse.x - Items.itemDif.x + MAIN_b.scrollLeft - MAIN_b.offsetLeft,
    y: Mouse.y - Items.itemDif.y + MAIN_b.scrollTop - MAIN_b.offsetTop
  })
  search.then((res) => {
    Items.item.classList.add('ghost', 'hoverTite')
    Items.position(res.posX, res.posY)
  }).catch((rej) => {
    Items.item.classList.remove('ghost', 'hoverTite')
  })
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

function createAvatarGrid() {}

function insertDataGridInItem(item, show) {
  let attr = {
    id: item.id,
    pfx: item.getAttribute('pfx'),
    for: item.getAttribute('for'),
    data_method: item.getAttribute('data-method')
  }
  if (show) {

  } else {

    return Doc.createElement('div')
  }

}

function removeAvatar() {
  if (Avatar.focus) {
    Doc.body.removeChild(Avatar.focus)
    MAIN_b.classList.remove('highlight')
    Avatar.created = false
    Avatar.focus = false
    removeGridGhost()
  }
}

function removeGridGhost() {
  if (Avatar.grid) {
    GRID.removeChild(Avatar.grid)
    Avatar.grid = false
  }
}

function startDrawCurve(item, output) {
  let line = Doc.createElementNS('http://www.w3.org/2000/svg', 'line');
  
  line.classList.add('output_line')
  let startX = item.offsetLeft + output.offsetLeft + 8
  let startY = item.offsetTop + output.offsetTop + 8

  line.setAttribute('x1', startX)
  line.setAttribute('y1', startY)
  line.setAttribute('from', item.id)
  line.setAttribute('shpt', output.getAttribute('shpt'))

  output.classList.add('active')
  Items.curve = line
  SVG_map.appendChild(line)
}

function moveCurve() {
  if (Items.curve) {
    let line = Items.curve

    let moveX = Mouse.x + MAIN_b.scrollLeft - MAIN_b.offsetLeft;
    let moveY = Mouse.y + MAIN_b.scrollTop - MAIN_b.offsetTop;

    line.setAttribute('x2', moveX)
    line.setAttribute('y2', moveY)
  }
}

function removeCurve() {
  if (Items.curve) {
    let outputActive = GRID.querySelector('#'+Items.curve.getAttribute('from')).querySelector('.connect.active')
    outputActive.classList.remove('active')
    let curvePath = Items.curve
    SVG_map.removeChild(curvePath)
    Items.curve = false
  }
}

function pinCurve() {
  
}
