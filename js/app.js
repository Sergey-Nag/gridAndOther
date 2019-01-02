const items = document.getElementsByClassName('draggble');
const list_wrapp = document.querySelector('.list_wrapp');

var blockHold = false;
var focusGridItem = false
var drag = {
  check: false,
  startX: 0,
  startY: 0
};
var MouseClick = {
  x: 0,
  y: 0
}
var myMouseEvent = {
  x: 0,
  y: 0,
  hold: false
}
var focus = false
var avatarFocus = false
var avatarCreated = false
var avatarId = false
var MouseTap = {
  x: 0,
  y: 0
}
var draggingBool = false
var MousePositionInItem = {
  x: 0,
  y: 0
}
var itemsOnGrid = []


list_wrapp.onmousedown = function (e) {
  return false;
}

/* Длина вектора */
function vectorLength(aX, aY, bX, bY) {
  let sqr = (a) => a * a;
  return Math.ceil(Math.sqrt(sqr(aX - bX) + sqr(aY - bY)))
}

/* Обработчики на itemы */
for (let i = 0; i < items.length; i++) {
  let item = items[i];
  let color = (item.classList.item(2)) ? '_' + item.classList.item(2) : ''
  item.setAttribute('id', 'item_' + i + color)
  item.addEventListener('mousedown', (e) => {
    if (e.which == 1) onMouseDown(e, item)
  })
  item.addEventListener('mouseup', (e) => {
    onMouseUp(e, item)
  })

}

/* Нажатие кнопки */
function onMouseDown(e, item) {
  focus = item
  MousePositionInItem.x = item.offsetLeft - e.clientX
  MousePositionInItem.y = item.offsetTop - e.clientY
}

function createAvatar(e, item) {
  if (!avatarCreated) {
    let widthNode = item.offsetWidth;
    let avatar = item.cloneNode(true);
    avatar.classList.add('avatar');
    avatar.setAttribute('id', item.getAttribute('id') + '_avatar');
    avatarId = avatar.getAttribute('id')
    avatar.style.position = 'absolute'
    avatar.style.width = widthNode + 'px';
    avatar.style.left = e.pageX + MousePositionInItem.x + 'px'
    avatar.style.top = e.pageY + MousePositionInItem.y + 'px'
    avatar.style.opacity = .6
    document.body.appendChild(avatar)

    avatar.addEventListener('mouseup', function (e) {
      if (isIn(e, main_block)) {
        dropAvatarToGrid(e)
      } else removeAvatar()
    })
    focus = false
    avatarFocus = avatar
    avatarCreated = true
  }
}

function removeAvatar() {
  if (avatarFocus) {
    document.body.removeChild(avatarFocus)
  } else console.log('avatar is undefined')
  avatarId = false
  avatarCreated = false
  avatarFocus = false
  MousePositionInItem = {
    x: 0,
    y: 0
  }
}

function dropAvatarToGrid(e) {
  let item = avatarFocus.cloneNode(false)

  grid.appendChild(item)

  item.classList.remove('avatar')
  item.classList.remove('draggble')
  item.style.opacity = 1;
  item.classList.add('grid_draggble')

  let type = avatarFocus.getAttribute('type')
  let gridInsert = createGridElement(avatarFocus.textContent, type);
  item.appendChild(gridInsert)
  item.addEventListener('click', (e) => {
    if (e.which == 1 && isGridMoving == false) itemControl(e, item)
    return false
  })
  item.addEventListener('mousedown', function (e) {
    checkPosInBlock(e, item)
  })
  // Выравнивание по сетке
  let search = lines.search(Mouse.x + avatarFocus.offsetLeft - e.clientX, Mouse.y + avatarFocus.offsetTop - e.clientY)


  search.then((res) => {

    let posX = res.x.offsetLeft + 3;
    let posY = res.y.offsetTop + 2;
    item.style.left = posX + 'px'
    item.style.top = posY + 'px'

  }).catch((err) => {
    // Тут можно вставить блок расширения сетки
    console.log(err)
  })

  //  item.style.left = Mouse.x + avatarFocus.offsetLeft - e.clientX + 'px'
  //  item.style.top = Mouse.y + avatarFocus.offsetTop - e.clientY + 'px'
  removeAvatar()

}

var focusGridItemTap = {
  x: 0,
  y: 0
}
var isMoveGridItem = false

function checkPosInBlock(e, item) {
  focusGridItemTap.x = item.offsetLeft + e.offsetX
  focusGridItemTap.y = item.offsetTop - e.clientY
}

function itemControl(e, item) {
  focusGridItem = item
  item.classList.add('focus')
}

function removeFocusGridItem() {
  focusGridItem.classList.remove('focus')
  focusGridItem = false
}


function createGridElement(text, type) {
  let grid = DIV()
  grid.className = 'grid_item'
  grid.setAttribute('grid-type', type)

  let col1 = DIV()
  col1.className = 'col'
  col1.innerHTML = text

  let col2 = DIV()
  col2.className = 'col'

  let col3 = DIV()
  col3.className = 'col'

  if (type == 'incoming_data') {
    let dataAdd = DIV()
    dataAdd.className = 'data_load'
    col2.appendChild(dataAdd)
  } else if (type == 'min') {

  }

  grid.appendChild(col1)
  grid.appendChild(col2)
  grid.appendChild(col3)

  return grid
}

function DIV() {
  return document.createElement('div')
}

/* Отжатие кнопки */
function onMouseUp(e, item) {
  focus = false
}

document.onmousemove = function (e) {
  myMouseEvent.x = e.pageX
  myMouseEvent.y = e.pageY
  if (focus) {
    if (vectorLength(MouseTap.x, MouseTap.y, e.pageX, e.pageY) > 5) {
      createAvatar(e, focus)
    }
  }

  if (avatarCreated) {
    main_block.style.borderColor = '#3737ff'
    main_block.style.boxShadow = '0 0px 2px 3px rgba(89, 127, 255, 0.4)';
    avatarFocus.style.left = e.pageX + MousePositionInItem.x + 'px'
    avatarFocus.style.top = e.pageY + MousePositionInItem.y + 'px'
    if (isIn(e, main_block)) {
      if (!ghost) {
        ghost = document.createElement('div')
        ghost.id = 'GHOST'
        let ghost_in = avatarFocus.cloneNode(false)
        ghost_in.style.position = 'relative'
        ghost_in.style.left = '0'
        ghost_in.style.top = '0'
        ghost_in.style.opacity = '0.4'
        ghost_in.classList.add('grid_draggble')
        ghost_in.appendChild(createGridElement('', avatarFocus.getAttribute('type')));
        ghost.appendChild(ghost_in)
        main_block.appendChild(ghost)
      }
      let search = lines.search(Mouse.x + avatarFocus.offsetLeft - e.clientX, Mouse.y + avatarFocus.offsetTop - e.clientY)
      search.then((res) => {
        avatarFocus.style.opacity = 0
        ghost.style.left = res.x.offsetLeft + 3 + 'px'
        ghost.style.top = res.y.offsetTop + 2 + 'px'
      }).catch((err) => {
        avatarFocus.style.opacity = 1
        lines.removeGhost()
      })
    } else {
      avatarFocus.style.opacity = 1
      lines.removeGhost()
    }
  } else {
    main_block.style.borderColor = '#bfbfbf';
    main_block.style.boxShadow = 'inset 0 1px 8px rgba(0, 0, 0, 0.2)';
  }

  if (focusGridItem) {

    if (e.target == focusGridItem.children[0].children[0]) {
      if (myMouseEvent.hold) {
        if (vectorLength(MouseTap.x, MouseTap.y, e.pageX, e.pageY) > 3) isMoveGridItem = true
      } else isMoveGridItem = false
    }

    if (isMoveGridItem) {
      console.log(focusGridItem.offsetLeft)
      console.log(e.pageX - main_block.scrollLeft - main_block.offsetLeft)
      console.log(focusGridItemTap)
      focusGridItem.style.left = e.pageX - focusGridItemTap.x + 'px'
      console.log('move')
    }
  } else {
    isMoveGridItem = false
  }
}

document.onmousedown = function (e) {
  MouseTap.x = e.pageX
  MouseTap.y = e.pageY

  myMouseEvent.hold = true

  return false;
}

document.onmouseup = function (e) {
  myMouseEvent.hold = false
  if (focus) onMouseUp(e, focus)

  if (isIn(e, main_block) && ghost !== false) {
    lines.removeGhost()
  }
  if (focusGridItem) {
    if (!isIn(e, focusGridItem)) removeFocusGridItem()
  }
  //  if (avatarCreated) removeAvatar()
  //  return false;
}
