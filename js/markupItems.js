// document
const Doc = document;

function returnStringMarkup(data) {
  let wrapp = createEl('div.item_grid_wrapp.one[connect="'+data+'"]');
  let item = createEl('div.item_grid_block[connect="'+data+'"]');

  let input = createEl('textarea.theme[type="text"][placeholder="input string"][style="width:153px"][connect="'+data+'"]');
  
  input.onresize = (e)=> {
    console.log('res')
  }
  item.appendChild(input)
  wrapp.appendChild(item)
  return wrapp
}


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
          let attr = Elattrs[i].replace(/\[|\]/gi,'').split('=')
          let name = attr[0]
          let value = attr[1].replace(/"/g, '');
          elem.setAttribute(name, value)
        }
      }
        
      return elem
    } else console.warn('tag not found')
  } else console.warn('string is empty')
}
