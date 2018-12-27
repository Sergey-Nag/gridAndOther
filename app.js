const grid = document.getElementById('grid');
const main_block = document.getElementById('main-block');
const items = document.getElementsByClassName('draggble');
const main = document.querySelector('main');
const grid_wrapp = document.querySelector('.grid_wrapp');
const V_grid = document.querySelector('.vertical_wrapp');
const H_grid = document.querySelector('.horizontal_wrapp');
const list_wrapp = document.querySelector('.list_wrapp');

var blockHold = false;
var hold = {
  x: 0,
  y: 0,
  bX: 0,
  bY: 0
}
var drag = {
  check: false,
  startX: 0,
  startY: 0
};

function resizeMain() {
  let H = window.innerHeight;
  main.style.height = H + 'px'
}

function generateGrid() {

  let W = H_grid.offsetWidth
  let H = V_grid.offsetHeight

  let length_H_lines = H / 20
  let length_V_lines = W / 20

  for (let a = 0; a < length_V_lines; a++) {
    let line = createLine('V', a);
    V_grid.appendChild(line)
  }
  for (let b = 0; b < length_H_lines; b++) {
    let line = createLine('H', b);
    H_grid.appendChild(line)
  }

}

function createLine(type, i) {
  let line = document.createElement('div');
  line.classList.add('line');
  line.setAttribute('id', type + '-Line_' + i);
  if (type == 'H') line.style.marginTop = 20 * i + 'px';
  else line.style.marginLeft = 20 * i + 'px';

  return line
}
var isMouseDown = false;
var Mouse = {
  x: 0,
  y: 0
}

function isIn(event, block) {
  let m_x = event.pageX
  let m_y = event.pageY

  let b_x = block.offsetLeft;
  let b_y = block.offsetTop;
  let b_w = block.offsetWidth;
  let b_h = block.offsetHeight;

  if (m_x > b_x && m_x < b_x + b_w && m_y > b_y && m_y < b_y + b_h) return true
  else return false
}

function moveGrid(e) {
  let m_x = e.pageX
  let m_y = e.pageY

  if (hold.x !== 0 || hold.y !== 0) {

    let distX = m_x - hold.x
    let distY = m_y - hold.y

    main_block.scrollTop = hold.bY - distY
    main_block.scrollLeft = hold.bX - distX
  }
}

function isDrag(e, block) {
  let m_x = e.pageX
  let m_y = e.pageY

  let difX = m_x - drag.startX
  let difY = m_y - drag.startY

  if (difX > 2 || difY > 2) return true
  else false
}

main_block.onmousedown = function (e) {
  blockHold = true
  hold.x = e.pageX
  hold.y = e.pageY
  hold.bX = main_block.scrollLeft
  hold.bY = main_block.scrollTop
}

var gridMousePoints = {
  x: 0,
  y: 0
}

main_block.onmouseup = function (e) {
  blockHold = false
  hold.x = 0
  hold.y = 0
}

main_block.onselectstart = function (e) {
  return false;
}
window.onmousemove = function (e) {
  e.preventDefault()
  let insideMain = isIn(e, main_block);

  if (insideMain && blockHold) {
    moveGrid(e)
    main.style.cursor = 'grabbing'
  } else {
    main.style.cursor = 'default'
    blockHold = false
  }
  if (isIn(e, main_block)) {
    Mouse.x = e.clientX+main_block.scrollLeft-main_block.offsetLeft;
    Mouse.y = e.clientY+main_block.scrollTop-main_block.offsetTop;
  }
}
list_wrapp.onmousedown = function (e) {
  return false;
}

function createItemAvatar(item) {
  let avatar = item.cloneNode(true)
  let color = item.classList.item(2) || false
  avatar.classList.add('draggble');
  avatar.classList.add('item');
  if (color) avatar.classList.add(color);
  avatar.style.width = item.offsetWidth + 'px';
  avatar.style.cursor = 'move'
  avatar.style.position = 'absolute'

  return avatar
}

function onMouseDown(e, item) {
  isMouseDown = true;

  mouseOffset = {
    x: item.offsetLeft - e.clientX,
    y: item.offsetTop - e.clientY
  }
  let avatar = createItemAvatar(item);
  document.body.appendChild(avatar)
  item.style.opacity = 0.7

  avatar.onselectstart = function (e) {
    return false;
  }
  document.body.addEventListener('mousemove', (e) => {
    onMouseMove(e, avatar)
  })

  avatar.addEventListener('mouseup', (e) => {
    onMouseUp(e, avatar, item)
  })
}

function onMouseUp(e, avatar, parent) {
  isMouseDown = false;

  if (isIn(e, main_block)) {
    let item = avatar.cloneNode(true)
    grid.appendChild(item)
    let posX = main_block.offsetLeft + (e.pageX - main_block.offsetLeft)
    item.style.left = Mouse.x+avatar.offsetLeft-e.clientX+ 'px'
    item.style.top = Mouse.y+avatar.offsetTop-e.clientY+ 'px'
  }

  document.body.removeChild(avatar)
  parent.style.opacity = 1
}


function onMouseMove(e, item) {
  e.preventDefault();
  if (isMouseDown) {
    item.style.left = e.clientX + mouseOffset.x + "px";
    item.style.top = e.clientY + mouseOffset.y + "px";
    main_block.style.boxShadow = '0 0 1px 2px rgba(24, 112, 255, 0.35)'
    main_block.style.borderColor = 'rgba(24, 112, 255, 0.6)'

  } else {
    main_block.style.boxShadow = 'inset 0 1px 8px rgba(0, 0, 0, 0.2)'
    main_block.style.borderColor = '#bfbfbf'
  }
}

for (let i = 0; i < items.length; i++) {
  let item = items[i];
  let color = (item.classList.item(2)) ? '_' + item.classList.item(2) : ''
  item.setAttribute('id', 'item_' + i + color)
  item.addEventListener('mousedown', (e) => {
    onMouseDown(e, item)
  })

}

resizeMain()
generateGrid()
window.onresize = resizeMain
