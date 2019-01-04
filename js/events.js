resizeMain() // Размер окна
drawLines() // Отрисовка сетки
eventToItems() // Обработчики нажатия по item'ам
eventsToListHeaders() // Скрытие & Раскрытие списков item'ов
toggleList() // Скрытие & Раскрытие списков item'ов при запуске
scrollGridToCenter() // Скролл на центр сетки



/*------------------- MOUSE DOWN ------------------*/
Doc.onmousedown = (e) => {
  Mouse.down = true
  Mouse.tapX = e.pageX
  Mouse.tapY = e.pageY

  if (Items.item && Mouse.down) {
    Items.itemDif.x = e.offsetX
    Items.itemDif.y = e.offsetY
  } else {
    Items.itemDif.x = 0
    Items.itemDif.y = 0
  }
  //  return false
}

LEFT_b.onmousedown = (e) => {
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

  if (Items.item) {
    if (Mouse.target.nodeName == 'ITEM' && Mouse.target.id == Items.item.id) {
      Items.item.classList.add('hoverTite')
      if (Mouse.down && Mouse.holdVector() > 4) {
        Items.isDrag = true
      } else Items.isDrag = false
    } else {
      Items.item.classList.remove('hoverTite')
    }

    if (Items.isDrag) {
      moveItemOnGrid()
    } else {
      Items.item.classList.remove('ghost')
    }
  }

  if (GridMouse.down && !Items.item) {
    moveGrid()
    Doc.body.style.cursor = 'grabbing'
  } else Doc.body.style.cursor = 'default'

  if (Mouse.down && Avatar.focus) moveAvatar()
  else {
    if (Mouse.isIn(MAIN_b)) {
      Items.dropToGrid()
    }
    removeAvatar()
  }
  //  console.log(vectorLength(Mouse.tapX, Mouse.tapY, Mouse.x, Mouse.y))
}

/*------------------- MOUSE UP ------------------*/
Doc.onmouseup = (e) => {
  Mouse.tapX = 0
  Mouse.tapY = 0
  GridMouse.down = false
  Mouse.down = false

  // Отмена выделения
  if (Items.item) {
    let targConnect = Mouse.target.getAttribute('connect')
    if (targConnect !== Items.item.id && Mouse.target.id !== Items.item.id) Items.removeFocus()
  }

}


/*------------------- RESIZE ------------------*/
window.onresize = (e) => {
  resizeMain() // Размер окна
}
