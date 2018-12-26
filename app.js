const main = document.querySelector('main');
const main_block = document.getElementById('main-block');
const grid_wrapp = document.querySelector('.grid_wrapp');
const grid = document.querySelector('.grid');
const V_grid = document.querySelector('.vertical_wrapp');
const H_grid = document.querySelector('.horizontal_wrapp');
const items = document.getElementsByClassName('draggble');
var itemsArr = Array.from(items);

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
  
  let difX = m_x-drag.startX
  let difY = m_y-drag.startY
  
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

  for (let i = 0; i < itemsArr.length; i++) {
    if (isIn(e, itemsArr[i])) {
      if (isDrag(e, itemsArr[i])) {
        let item = itemsArr[i]
        console.log('ues')
      }
    }
  }

}
window.onmousedown = function (e) {
  for (let i = 0; i < itemsArr.length; i++) {
    if (isIn(e, itemsArr[i])) {
      drag.check = true
      drag.startX = e.pageX
      drag.startY = e.pageY
    }
  }
}

resizeMain()
generateGrid()
window.onresize = resizeMain
