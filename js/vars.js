// tag main
const MAIN = Doc.querySelector('main');
// class left_b
const LEFT_b = Doc.getElementsByClassName('left_b')[0];
// id grid
const GRID = Doc.getElementById('grid');
// class main_b
const MAIN_b = Doc.getElementsByClassName('main_b')[0];
// class list_header
const LIST_headers = Doc.getElementsByClassName('list_header');
// items
const ITEMS = Doc.getElementsByTagName('item');
// inputs.theme
const THEME_inputs = Doc.getElementsByTagName('input');


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

// Аватар элемнта списка при Drag&Drop
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
// Класс item'ов
class Constr_Items_Grid {
  constructor() {
    this.lastIndex = 0
    this.map = []
    this.currPos = {
      x: 0,
      y: 0
    }
    this.ghost = false
    this.item = false
    this.config = {
      string: {
        type: 'variable',
        data_type: 'string',
        markup: returnStringMarkup
      }
    }
  }

  dropToGrid() {
    if (this.ghost) {
      this.item = this.ghost
      this.ghost = false

      this.item.classList.remove('ghost')
      let obj = {
        pos: Object.assign({}, this.currPos),
        item: this.item
      }
      let ITM = this
      obj.item.addEventListener('mousedown', (e) => {
        if (e.which == 1) {
          ITM.focusItem(obj.item)
        }
      })
      this.restoreVars()
    }
  }
  focusItem(item) {
    this.removeFocus()
    this.item = item
    this.item.classList.add('focus');

  }
  removeFocus() {
    if (this.item) {
      this.item.classList.remove('focus')
      this.item = false
    }
  }
  restoreVars() {
    this.ghost = false
    this.item = false
    this.currPos.x = 0
    this.currPos.y = 0
  }
  addGhost(item) {
    if (!this.ghost) {
      this.ghost = item.cloneNode(true);
      this.ghost.classList.remove('avatar', 'hidden')
      this.ghost.classList.add('on_grid', 'ghost')
      
      this.ghost.style.width = 'auto'
      
      this.ghost.id = this.ghost.id + '__G' + this.lastIndex;
      this.lastIndex++;
      
      let data = this.ghost.getAttribute('data-method')
      let id = this.ghost.id
      if (this.config[data] !== undefined) this.ghost.appendChild(this.config[data].markup(id))
      GRID.appendChild(this.ghost)
    }
  }
  removeGhost() {
    if (this.ghost) {
      GRID.removeChild(this.ghost)
      this.ghost = false
    }
  }
  position(x, y) {
    if (this.ghost) {
      this.ghost.style.left = x + 3 + 'px'
      this.ghost.style.top = y + 3 + 'px'
      this.currPos.x = x
      this.currPos.y = y
    }
  }
  formingTemplate() {

  }

}
// Объект item'ов
var Items = new Constr_Items_Grid()



/*--------------- DEFAULT FUNCTIONS --------------*/
// Длина вектора
function vectorLength(aX, aY, bX, bY) {
  let sqr = (a) => a * a;
  return Math.ceil(Math.sqrt(sqr(aX - bX) + sqr(aY - bY)))
}
//function isIn(block)
