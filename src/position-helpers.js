let getNodePositions = (node) => {
  if (node.type.isLeaf) {
    if (node.type.isText) {
      return node.text.split('')
    } else {
      return [
        node.type.name
      ]
    }
  } else {
    let positions = [
      'start ' + node.type.name
    ]
    node.forEach((node) => {
      positions = positions.concat(getNodePositions(node))
    })
    positions = positions.concat(['end ' + node.type.name])
    return positions
  }
}

let renderDocumentPositions = (doc) => {
  let positions = []
  doc.forEach((node) => {
    positions = positions.concat(getNodePositions(node))
  })
  let table = document.querySelector('#positionInfo')
  table.innerHTML = ''
  let positionIndexesRow = document.createElement('tr');
  let positionContentRow = document.createElement('tr');
  positions.forEach((value, index) => {
    let td = document.createElement('td');
    td.appendChild(document.createTextNode(index));
    positionIndexesRow.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(''));
    positionIndexesRow.appendChild(td);

    td = document.createElement('td');
    td.appendChild(document.createTextNode(''));
    positionContentRow.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(value));
    positionContentRow.appendChild(td);
  });
  table.appendChild(positionIndexesRow)
  table.appendChild(positionContentRow)
}

let renderUserPosition = (selection) => {
  let positions = []
  let dom = document.querySelector('#cursorPositionInfo')
  dom.innerHTML = 'Current position: From ' + selection.from + ' to ' + selection.to
}

module.exports = {
  renderDocumentPositions,
  renderUserPosition
}
