// Высота рабочей области
function resizeMain() {
  let H = window.innerHeight;
  MAIN.style.height = H + 'px'
}

// Отрисовка сетки
function drawLines() {
  let X = GRID.offsetWidth / 20
  let Y = GRID.offsetHeight / 20

  for (let i = 0; i < X; i++) Lines.add('X')
  for (let i = 0; i < Y; i++) Lines.add('Y')

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
