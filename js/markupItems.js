// document
const Doc = document;

/* ------------------- ПЕРЕМЕННЫЕ ------------------- */
// Строка
function returnStringMarkup(data) {
  let wrapp = createEl('div.item_grid_wrapp.one[connect="' + data + '"]');
  let settingsButt = createEl('div.settings.hidden[connect="' + data + '"]');
  let item = createEl('div.item_grid_block[connect="' + data + '"]');
  let textWrapp = createEl('div.items_wrapp[connect="' + data + '"]');

  let contrl = {
    input: createEl('div.theme.connect.hidden[connect-method="input"][connect="' + data + '"]'),
    textarea: createEl('textarea.theme[placeholder="input string"][style="width:103px"][connect="' + data + '"]'),
    output: createEl('div.theme.connect[connect-method="output"][connect="' + data + '"]')
  }

  for (input in contrl) textWrapp.appendChild(contrl[input])

  item.appendChild(settingsButt)
  item.appendChild(textWrapp)
  wrapp.appendChild(item)
  return wrapp
}

// Число
function returnNumberMarkup(data) {
  let wrapp = createEl('div.item_grid_wrapp.one[connect="' + data + '"]');
  let settingsButt = createEl('div.settings.hidden[connect="' + data + '"]');
  let item = createEl('div.item_grid_block[connect="' + data + '"]');
  let textWrapp = createEl('div.items_wrapp[connect="' + data + '"]');

  let contrl = {
    input: createEl('div.theme.connect.hidden[connect-method="input"][connect="' + data + '"]'),
    textarea: createEl('input.theme[type="number"][placeholder="NaN"][style="width:43px;height:21px"][connect="' + data + '"]'),
    output: createEl('div.theme.connect[connect-method="output"][connect="' + data + '"]')
  }

  for (input in contrl) textWrapp.appendChild(contrl[input])

  item.appendChild(settingsButt)
  item.appendChild(textWrapp)
  wrapp.appendChild(item)
  return wrapp
}

// Boolean
function returnBoolMarkup(data) {
  let wrapp = createEl('div.item_grid_wrapp.one[connect="' + data + '"]');
  let settingsButt = createEl('div.settings.hidden[connect="' + data + '"]');
  let item = createEl('div.item_grid_block[connect="' + data + '"]');
  let textWrapp = createEl('div.items_wrapp[connect="' + data + '"][style="padding-top:2px;padding-bottom:1px"]');

  let contrl = {
    input: createEl('div.theme.connect.hidden[connect-method="input"][connect="' + data + '"]'),
    radio: createEl('input.theme[type="checkbox"][placeholder="NaN"][style="width:43px;height:15px"][connect="' + data + '"]'),
    output: createEl('div.theme.connect[connect-method="output"][connect="' + data + '"]')
  }

  for (input in contrl) textWrapp.appendChild(contrl[input])

  item.appendChild(settingsButt)
  item.appendChild(textWrapp)
  wrapp.appendChild(item)
  return wrapp
}



/* ------------------- Прочее ------------------- */

// Создать элемент Emet (tag, #id, .class, [att="ribs"])
function createEl(string) {
  let Eltag = string.match(/^([a-z-_]*)/i);
  let Elclass = string.match(/\.([a-z-_]*)/gi);
  let Elid = string.match(/#([a-z-_]*)/i);
  let Elattrs = string.match(/(\[.*?\])/gi);
  if (Eltag !== '') {
    if (Eltag !== null) {
      let elem = Doc.createElement(Eltag[1])
      if (Elid !== null) elem.id = Elid[1]
      if (Elclass !== null)
        for (let i = 0; i < Elclass.length; i++) elem.classList.add(Elclass[i].replace('.', ''))

      if (Elattrs !== null) {
        for (let i = 0; i < Elattrs.length; i++) {
          let attr = Elattrs[i].replace(/\[|\]/gi, '').split('=')
          let name = attr[0]
          let value = attr[1].replace(/"/g, '');
          elem.setAttribute(name, value)
        }
      }

      return elem
    } else console.warn('tag not found')
  } else console.warn('string is empty')
}
