resizeMain() // Размер окна
drawLines() // Отрисовка сетки


/*------------------- MOUSE DOWN ------------------*/
Doc.onmousedown = (e) => {
  Mouse.down = true
  Mouse.tapX = e.pageX
  Mouse.tapY = e.pageY

  //  console.log(Mouse.isIn(GRID))

  return false
}
GRID.onmousedown = (e) => {
  GridMouse.SX = MAIN_b.scrollLeft
  GridMouse.SY = MAIN_b.scrollTop
  //  GridMouse.x = e.clientX
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
