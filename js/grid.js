const grid = document.getElementById('grid');
const main_block = document.getElementById('main-block');
const main = document.querySelector('main');
const grid_wrapp = document.querySelector('.grid_wrapp');
const V_grid = document.querySelector('.vertical_wrapp');
const H_grid = document.querySelector('.horizontal_wrapp');

var hold = {
  x: 0,
  y: 0,
  bX: 0,
  bY: 0
}
/* Позиция мыши в main_block */
var Mouse = {
  x: 0,
  y: 0
}
var blockHold = false;


// Class
class Lines {
  constructor() {
    this.x
    this.y
    this.linesX = []
    this.linesY = []
  }

  add(dir, i) {
    let arr = (dir == 'X') ? this.linesX : this.linesY;
    let line = document.createElement('div');
    line.classList.add('line');
    line.setAttribute('id', dir + '-Line_' + i);
    arr.push(line)
    return line
  }

  search(x, y) {
    return new Promise((res, rej) => {
      x = Number.parseInt(x)
      x = Number.parseInt(x)
      
      let checkX = 0
      let searchX = []
      for (let i = 0; i < this.linesX.length; i++) {
        let el = this.linesX[i]
        let X = el.offsetLeft
        checkX++;
        if (x >= X) searchX.push(el)
      }

      let checkY = 0
      let searchY = []
      for (let i = 0; i < this.linesY.length; i++) {
        let el = this.linesY[i]
        let Y = el.offsetTop
        checkY++;
        if (y >= Y) searchY.push(el)
      }

      if (checkX == this.linesX.length && checkY == this.linesY.length) res({
        x: searchX[searchX.length - 1],
        y: searchY[searchY.length - 1]
      })
    });
  }
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

function resizeMain() {
  let H = window.innerHeight;
  main.style.height = H + 'px'
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

// object
var lines = new Lines()

function generateGrid() {
  let W = H_grid.offsetWidth
  let H = V_grid.offsetHeight

  let length_H_lines = H / 20
  let length_V_lines = W / 20

  for (let a = 0; a < length_V_lines; a++) {
    let line = lines.add('X', a)
    V_grid.appendChild(line)
  }
  for (let b = 0; b < length_H_lines; b++) {
    let line = lines.add('Y', b)
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

main_block.onmouseup = function (e) {
  blockHold = false
}

main_block.onselectstart = function (e) {
  return false;
}

main_block.onmousedown = function (e) {
  blockHold = true
  hold.x = e.pageX
  hold.y = e.pageY
  hold.bX = main_block.scrollLeft
  hold.bY = main_block.scrollTop
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
    Mouse.x = e.clientX + main_block.scrollLeft - main_block.offsetLeft;
    Mouse.y = e.clientY + main_block.scrollTop - main_block.offsetTop;
  }
}

resizeMain()
generateGrid()
window.onresize = resizeMain
