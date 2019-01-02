resizeMain() // Размер окна
drawLines() // Отрисовка сетки
eventsToListHeaders() // Скрытие & Раскрытие списков item'ов

/*------------------- MOUSE DOWN ------------------*/
Doc.onmousedown = (e) => {
  Mouse.down = true
  Mouse.tapX = e.pageX
  Mouse.tapY = e.pageY

  return false
}
GRID.onmousedown = (e) => {
  GridMouse.SX = MAIN_b.scrollLeft
  GridMouse.SY = MAIN_b.scrollTop
  GridMouse.down = true
}

/*------------------- MOUSE MOVE ------------------*/
Doc.onmousemove = (e) => {
  Mouse.x = e.pageX
  Mouse.y = e.pageY
  Mouse.target = e.target

  if (GridMouse.down) {
    moveGrid()
    Doc.body.style.cursor = 'grabbing'
  } else Doc.body.style.cursor = 'default'
  
  if (Mouse.down) drag_n_drop() // Перемещение item'ов из списка
  //  console.log(vectorLength(Mouse.tapX, Mouse.tapY, Mouse.x, Mouse.y))
}

/*------------------- MOUSE UP ------------------*/
Doc.onmouseup = (e) => {
  Mouse.tapX = 0
  Mouse.tapY = 0
  GridMouse.down = false

  Mouse.down = false
}


/*------------------- RESIZE ------------------*/
window.onresize = (e) => {
  resizeMain() // Размер окна
}
