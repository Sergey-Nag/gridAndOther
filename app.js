const items = document.getElementsByClassName('draggble');
const list_wrapp = document.querySelector('.list_wrapp');

var blockHold = false;

var drag = {
  check: false,
  startX: 0,
  startY: 0
};
var MouseClick = {
  x: 0,
  y: 0
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
  MouseTap.x = e.pageX
  MouseTap.y = e.pageY
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
  let item = avatarFocus.cloneNode(true)

  grid.appendChild(item)

  item.classList.remove('avatar')
  item.classList.remove('draggble')

  item.classList.add('grid_draggble')
  
  let itemText = item.textContent
  let gridInsert = createGridElement();
  item.appendChild(gridInsert)
  
  item.style.left = Mouse.x + avatarFocus.offsetLeft - e.clientX + 'px'
  item.style.top = Mouse.y + avatarFocus.offsetTop - e.clientY + 'px'
  removeAvatar()
}

function createGridElement() {
  let grid = document.createElement('div');
  grid.className = 'grid_item'
  let col = document.createElement('div')
  col.className = 'col'
  
  grid.appendChild(col,col,col)
//  grid.appendChild(col)
//  grid.appendChild(col)
  
  return grid
}

/* Отжатие кнопки */
function onMouseUp(e, item) {
  focus = false
}

document.onmousemove = function (e) {
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
  } else {
    main_block.style.borderColor = '#bfbfbf';
    main_block.style.boxShadow = 'inset 0 1px 8px rgba(0, 0, 0, 0.2)';
  }
  //  console.log(focus)
}

document.onmousedown = function (e) {
  return false;
}

document.onmouseup = function (e) {
  if (focus) onMouseUp(e, focus)
  //  if (avatarCreated) removeAvatar()
  //  return false;
}
