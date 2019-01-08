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

// new Telegram Bot 
function returnNewBotMarkup(data) {
  let wrapp = createEl('div.item_grid_wrapp.two.splT[connect="' + data + '"][style="width: 233px"]');

  let blocks = {
    leftSide1: createEl('div.item_grid_block.centerText[connect="' + data + '"][style="position:relative"]_" - Token"'),
    leftSide2: createEl('div.item_grid_block[connect="' + data + '"]'),
    rightSide: createEl('div.item_grid_block.centerBlock[connect="' + data + '"]')
  }

  let tokenInput = createEl('div.theme.connect[connect-method="input"][connect="' + data + '"][title="→ String"]')

  let webType = createEl('select.theme[connect="' + data + '"]')
  let webText = Doc.createTextNode('Updates:')

  webType.appendChild(createEl('option[connect="' + data + '"][title="Отправлять запросы на сервера Телеграма для получения данных"]_"getUpdates"'))
  webType.appendChild(createEl('option[connect="' + data + '"][title="Получать данные напрямую от Телеграма"]_"setWebhook"'))

  blocks.leftSide1.appendChild(tokenInput)

  blocks.leftSide2.appendChild(webText)
  blocks.leftSide2.appendChild(webType)
  blocks.leftSide2.appendChild(createEl('div.settings.hidden[connect="' + data + '"]'))

  let dataBlock = createEl('div.data_bot[connect="' + data + '"]')
  let getUpdates = createEl('div.data_getUpdates[connect="' + data + '"]')
  let updates = {
    fst: createEl('span.lable[connect="' + data + '"][title="Время ожидания обработки сообщения в мс"]_"Timeout: "'),
    scnd: createEl('input.theme[style="color: white;width:48px"][type="number"][placeholder=""][min="200"][max="10000"][step="5"][value="200"][connect="' + data + '"]'),
    thrd: createEl('span.lable[connect="' + data + '"][title="Ограничение колличетсва обрабатываемых сообщений"]_"Limit: "'),
    frth: createEl('input.theme[style="color: white;width:48px"][type="number"][placeholder=""][min="1"][max="100"][value="100"][connect="' + data + '"]')
  }

  let DOut = createEl('div.theme.connect[connect-method="output"][shpt="object"][connect="' + data + '"][title="Object →"]');
  for (block in updates) getUpdates.appendChild(updates[block])

  dataBlock.appendChild(getUpdates)
  dataBlock.appendChild(DOut)
  blocks.rightSide.appendChild(dataBlock)


  for (block in blocks) wrapp.appendChild(blocks[block])
  return wrapp
}

/* ------------------- Прочее ------------------- */

// Создать элемент Emet (tag, #id, .class, [att="ribs"], _" текст ")
function createEl(string) {
  let Eltag = string.match(/^([a-z-_]*)/i);
  let Elclass = string.match(/\.([a-z-_]*)/gi);
  let Elid = string.match(/#([a-z-_]*)/i);
  let Elattrs = string.match(/(\[.*?\])/gi);
  let Eltext = string.match(/_"(.*)"$/i);
  if (Eltag !== '') {
    if (Eltag !== null) {
      let elem = Doc.createElement(Eltag[1]);
      if (Eltag[1].match(/_$/) !== null) elem = Doc.createElement(Eltag[1].split('_')[0]);

      if (Elid !== null) elem.id = Elid[1]
      if (Elclass !== null) {
        for (let i = 0; i < Elclass.length; i++) {
          let cls = Elclass[i].replace('.', '')
          if (cls.match(/_$/) !== null) cls = cls.split('_')[0]
          elem.classList.add(cls)
        }
      }

      if (Elattrs !== null) {
        for (let i = 0; i < Elattrs.length; i++) {
          let attr = Elattrs[i].replace(/\[|\]/gi, '').split('=')
          let name = attr[0]
          let value = attr[1].replace(/"/g, '');
          elem.setAttribute(name, value)
        }
      }

      if (Eltext !== null) {
        let textNode = Doc.createTextNode(Eltext[1]);
        elem.appendChild(textNode)
      }

      return elem
    } else console.warn('tag not found')
  } else console.warn('string is empty')
}
