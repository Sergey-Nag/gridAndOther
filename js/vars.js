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
  isIn: function(block) {
    let b_X = block.offsetLeft,
        b_Y = block.offsetTop,
        b_X1 = b_X + block.offsetWidth,
        b_Y1 = b_Y + block.offsetHeight;
    
    if (Mouse.x >= b_X && Mouse.x <= b_X1 && Mouse.y >= b_Y && Mouse.y <= b_Y1) return true
    else return false
  },
  holdVector: ()=>{
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
  created:false,
  focus:false,
  difX:0,
  difY:0
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
    let wrapp = (dir == 'X')? this.wrappX:this.wrappY;
    let line = Doc.createElement('div')
    line.className = 'line'
    wrapp.appendChild(line)
  }
}
// Объект сетки
var Lines = new Constr_Lines();




/*--------------- DEFAULT FUNCTIONS --------------*/
// Длина вектора
function vectorLength(aX, aY, bX, bY) {
  let sqr = (a) => a * a;
  return Math.ceil(Math.sqrt(sqr(aX - bX) + sqr(aY - bY)))
}
//function isIn(block)