// Высота рабочей области
function resizeMain() {
  let H = window.innerHeight;
  MAIN.style.height = H + 'px'
}

// Позиция ITEM_controlls
function itemControlls() {
  let mainW = MAIN_b.offsetWidth;
  ITEM_controlls.style.width = mainW * 0.85 + 'px'
  ITEM_controlls.style.marginLeft = mainW / 2 - ITEM_controlls.offsetWidth / 2 + 'px'
}

function activeItemControlls(id, dir) {
  let varNameInput = Doc.getElementById('input_var_name');
  let varColorInput = Doc.getElementById('input_block_color');
  let trash = Doc.getElementById('trash');
  if (dir == 'down') {
    let finded = Items.searchInMap(id)
    varNameInput.value = finded.name
    if (finded.color !== '') varColorInput.value = finded.color
    else varColorInput.value = '#ffffff';
    varNameInput.addEventListener('keyup', inputTextListenner)
    varColorInput.addEventListener('input', inputColorListenner)
    trash.addEventListener('click', deleteItem)
    trash.addEventListener('mouseup', deleteDraggbleItem)

    ITEM_controlls.classList.remove('up')
    ITEM_controlls.classList.add('down')
  } else {
    varNameInput.removeEventListener('keyup', inputTextListenner, false)
    varColorInput.removeEventListener('input', inputColorListenner, false)
    trash.removeEventListener('click', deleteItem, false)
    trash.removeEventListener('mouseup', deleteDraggbleItem, false)

    varNameInput.classList.remove('warn')
    ITEM_controlls.classList.remove('down')
    ITEM_controlls.classList.add('up')
  }
}


function deleteDraggbleItem(e) {
  if (Items.isDrag) {
    deleteItem('1')
  }
}
// Удаление элемента
function deleteItem(e) {
  let itemName = (Items.item.hasAttribute('name'))? Items.item.getAttribute('name'):Items.item.getAttribute('data-method');
  var isDelete = confirm('Удалить елемент '+itemName+'?');
  if (isDelete == null) {
    alert(isDelete);
  } else if (isDelete) {
    Items.deleteItem()
  } else {
    if (e == '1') activeItemControlls(Items.item, 'up')
  }
}

function inputColorListenner(e) {
  let item = Items.item
  let finded = Items.searchInMap(item.id)
  finded.color = this.value

  let rgb = hex2rgb(this.value)
  let hsl = rgb2hsl(rgb.r, rgb.g, rgb.b);

  item.style.backgroundColor = this.value;
  if (hsl[2] < 40) item.classList.add('lightText')
  else item.classList.remove('lightText')
}
// Присвоение имени item-переменной
function inputTextListenner(e) {
  let varNameInput = this
  let item = Items.item
  let finded = Items.searchInMap(item.id)

  if (this.value !== '') {

    if (/[a-z]/gi.test(this.value) && !/\W/.test(this.value)) {
      this.classList.remove('warn')
      finded.name = this.value
      this.value = finded.name
      item.setAttribute('name', finded.name)
    } else {
      finded.name = ''
      item.removeAttribute('name')
      this.classList.add('warn')
    }
  } else {
    item.removeAttribute('name')
  }

  if (e.which == 13) this.blur()
}
// Отрисовка сетки
function drawLines() {
  let X = GRID.offsetWidth / 20
  let Y = GRID.offsetHeight / 20

  for (let i = 0; i < X; i++) Lines.add('X')
  for (let i = 0; i < Y; i++) Lines.add('Y')
  
  SVG_map.style.height = GRID.offsetHeight+'px'
  SVG_map.style.width = GRID.offsetWidth+'px'
}

// Перемещение сетки
function moveGrid() {
  // Расстояние с зажатой кнопкой мыши
  let distX = Mouse.x - Mouse.tapX
  let distY = Mouse.y - Mouse.tapY
  // Отнимаю это расстояние от скрытых усатков окна
  MAIN_b.scrollLeft = GridMouse.SX - distX
  MAIN_b.scrollTop = GridMouse.SY - distY
}

function scrollGridToCenter() {
  let height = GRID.offsetHeight
  let width = GRID.offsetWidth

  let x = GRID.offsetLeft
  let y = GRID.offsetTop

  let x1 = x + width
  let y1 = y + height
  MAIN_b.scrollTop = height / 2 - MAIN_b.offsetHeight / 2
  MAIN_b.scrollLeft = width / 2 - MAIN_b.offsetWidth / 2
}
