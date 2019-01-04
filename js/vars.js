// document
const Doc = document;
// tag main
const MAIN = Doc.querySelector('main');
// id grid
const GRID = Doc.getElementById('grid');
// class main_b
const MAIN_b = Doc.getElementsByClassName('main_b')[0];
// class list_header
const LIST_headers = Doc.getElementsByClassName('list_header');
// items
const ITEMS = Doc.getElementsByTagName('item');

// Данные курсора мыши
var Mouse = {
  x: 0,
  y: 0,
  tapX: 0,
  tapY: 0,
  down: false,
  target: false,
  isIn: function (block) {
    let b_X = block.offsetLeft,
      b_Y = block.offsetTop,
      b_X1 = b_X + block.offsetWidth,
      b_Y1 = b_Y + block.offsetHeight;

    if (Mouse.x >= b_X && Mouse.x <= b_X1 && Mouse.y >= b_Y && Mouse.y <= b_Y1) return true
    else return false
  },
  holdVector: () => {
    return vectorLength(Mouse.tapX, Mouse.tapY, Mouse.x, Mouse.y)
  }
}

// Данные курсора внутри сетки
var GridMouse = {
  SX: 0,
  SY: 0,
  down: false
}

// Аватар элемента списка при Drag&Drop
var Avatar = {
  created: false,
  focus: false,
  grid: false,
  difX: 0,
  difY: 0
}

// Класс сетки
class Constr_Lines {

  constructor() {
    this.linesX = []
    this.linesY = []
    this.wrappX = GRID.children[0]
    this.wrappY = GRID.children[1]
  }

  add(dir) {
    let wrapp = (dir == 'X') ? this.wrappX : this.wrappY;
    let arr = (dir == 'X') ? this.linesX : this.linesY;
    let line = Doc.createElement('div')
    line.className = 'line'
    wrapp.appendChild(line)
    arr.push(line)
  }

  search(block) {
    return new Promise((res, rej) => {
      let x = block.offsetLeft + MAIN_b.scrollLeft - MAIN_b.offsetLeft
      let y = block.offsetTop + MAIN_b.scrollTop - MAIN_b.offsetTop
      let amountX = 0
      let matchXLine = false
      let posX = 0
      for (let i = 0; i < this.linesX.length; i++) {
        let lineX = this.linesX[i].offsetLeft
        let lineX1 = lineX + this.linesX[i].offsetWidth

        if (x >= lineX && x <= lineX1) {
          matchXLine = this.linesX[i]
          posX = lineX
        }
        amountX++
      }

      let amountY = 0
      let matchYLine = false
      let posY = 0
      for (let i = 0; i < this.linesY.length; i++) {
        let lineY = this.linesY[i].offsetTop
        let lineY1 = lineY + this.linesY[i].offsetHeight

        if (y >= lineY && y <= lineY1) {
          matchYLine = this.linesY[i];
          posY = lineY
        }
        amountY++
      }

      if (amountX == this.linesX.length && amountY == this.linesY.length) {
        let obj = {
          //          lineX: matchXLine,
          posX,
          //          lineY: matchYLine,
          posY
        }
        if (matchXLine && matchYLine) res(obj)
        else rej(obj)
      }
    })
  }
}
// Объект сетки
var Lines = new Constr_Lines();

// Класс Grid
class Grid_Items {
  constructor() {
    this.map = []
    this.items = []
    this.lastIndex = 0
    this.config = {
      var_string: {
        type: 'variable',
        data_type: 'string'
      },
      var_number: {
        type: 'variable',
        data_type: 'number'
      }
    }
  }

  add(itm) {
    if (itm) {
      let conf = this.config[itm.id]
      if (conf !== undefined) {
        // get position
        let posX = Avatar.grid.offsetLeft
        let posY = Avatar.grid.offsetTop
        // clone
        itm = itm.cloneNode(true)
        // push
        let item = this.items.push(itm)
        // toggle classes
        itm.classList.remove('hidden', 'avatar')
        itm.classList.add('grid_draggble')
        // set position
        itm.style.left = posX -3 + 'px'
        itm.style.top = posY +2+ 'px'
        // returning ready item
        return itm
      } else {
        console.warn(itm.id, '- not found in config')
      }
    }
    return false
  }
}
// Объект Grid
var GridItems = new Grid_Items()


/*--------------- DEFAULT FUNCTIONS --------------*/
// Длина вектора
function vectorLength(aX, aY, bX, bY) {
  let sqr = (a) => a * a;
  return Math.ceil(Math.sqrt(sqr(aX - bX) + sqr(aY - bY)))
}
//function isIn(block)
