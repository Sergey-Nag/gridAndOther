// tag main
const MAIN = Doc.querySelector('main');
// class left_b
const LEFT_b = Doc.getElementsByClassName('left_b')[0];
// id grid
const GRID = Doc.getElementById('grid');
// id mainSVG
const SVG_map = Doc.getElementById('mainSVG');
// class main_b
const MAIN_b = Doc.getElementsByClassName('main_b')[0];
// id item_controlls
const ITEM_controlls = Doc.getElementById('item_controlls');
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

// Данные клавиатуры
var Keyboard = {
  down: false,
  up: false
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
      let x = 0
      let y = 0
      if (block.isMouse) {
        x = block.x
        y = block.y
      } else {
        x = block.offsetLeft + MAIN_b.scrollLeft - MAIN_b.offsetLeft
        y = block.offsetTop + MAIN_b.scrollTop - MAIN_b.offsetTop
      }
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
    this.isDrag = false
    this.itemDif = {
      x: 0,
      y: 0
    }
    this.currPos = {
      x: 0,
      y: 0
    }
    this.ghost = false
    this.item = false
    this.curve = false
    this.config = {
      string: {
        type: 'variable',
        data_type: 'string',
        markup: returnStringMarkup
      },
      number: {
        type: 'variable',
        data_type: 'number',
        markup: returnNumberMarkup
      },
      bool: {
        type: 'variable',
        data_type: 'boolean',
        markup: returnBoolMarkup
      },
      Bot: {
        type: 'telegram',
        data_type: 'class',
        markup: returnNewBotMarkup
      }
    }
  }

  dropToGrid() {
    if (this.ghost) {
      this.item = this.ghost
      this.ghost = false

      this.item.classList.remove('ghost')
      let obj = {
        id: this.item.id,
        name: '',
        color: '',
        pos: Object.assign({}, this.currPos),
        item: this.item,
        data: {}
      }
      let ITM = this
      obj.item.addEventListener('mousedown', (e) => {
        if (e.which == 1) {
          ITM.focusItem(obj.item)
        }
      })
      this.map.push(obj)
      this.restoreVars()
    }
  }
  focusItem(item) {
    if (!this.item) {
      this.removeFocus()
      this.item = item
      this.item.classList.add('focus');

      let settings = this.item.getElementsByClassName('settings')[0];
      settings.addEventListener('click', function () {
        if (ITEM_controlls.classList.contains('up')) activeItemControlls(item.id, 'down')
      })
      let output = this.item.querySelector('div.connect[connect-method="output"]')
      output.onmousedown = function (e) {
        if (e.which == 1) {
          if (Mouse.holdVector() > 3 && !Items.curve) {
            startDrawCurve(item, output)
          }
        }
      }
      settings.classList.remove('hidden')

    }
  }
  removeFocus() {
    if (this.item) {
      let settings = this.item.getElementsByClassName('settings')[0];
      settings.classList.add('hidden')

      this.item.classList.remove('focus')
      activeItemControlls(this.item, 'up')

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
    let item = false
    if (this.ghost) item = this.ghost
    else if (this.item) item = this.item


    if (item) {
      item.style.left = x + 3 + 'px'
      item.style.top = y + 3 + 'px'
      this.currPos.x = x
      this.currPos.y = y
      if (this.item) {
        let mapItem = this.searchInMap(item);
        if (mapItem !== undefined) {
          mapItem.pos.x = x
          mapItem.pos.y = y
        }
      }
    }

  }
  searchInMap(item) {
    if (typeof item == 'string') {
      let finded = this.map.filter((el, i) => el.id == item)[0]
      if (finded == undefined) finded = this.map.filter((el, i) => el.name == item)[0]
      return finded;
    } else return this.map.filter((el, i) => el.item == item)[0]
  }
  deleteItem() {
    if (this.item) {
      let finded = this.searchInMap(this.item.id)
      let index = this.map.findIndex((el) => el.id == finded.id)
      if (index >= 0) {
        this.map.splice(index, 1);
        GRID.removeChild(Items.item)

        activeItemControlls(this.item, 'up')
        Items.item = false
      }
    }
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
// Конвертация HEX в RGB
function hex2rgb(c) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
// Конвертация RGB в HSL
function rgb2hsl(r, g, b) {
  r = r / 255;
  g = g / 255;
  b = b / 255;

  var maxColor = Math.max(r, g, b);
  var minColor = Math.min(r, g, b);
  //Calculate L:
  var L = (maxColor + minColor) / 2;
  var S = 0;
  var H = 0;
  if (maxColor != minColor) {
    //Calculate S:
    if (L < 0.5) {
      S = (maxColor - minColor) / (maxColor + minColor);
    } else {
      S = (maxColor - minColor) / (2.0 - maxColor - minColor);
    }
    //Calculate H:
    if (r == maxColor) {
      H = (g - b) / (maxColor - minColor);
    } else if (g == maxColor) {
      H = 2.0 + (b - r) / (maxColor - minColor);
    } else {
      H = 4.0 + (r - g) / (maxColor - minColor);
    }
  }

  L = L * 100;
  S = S * 100;
  H = H * 60;
  if (H < 0) {
    H += 360;
  }

  return [H, S, L];
}
