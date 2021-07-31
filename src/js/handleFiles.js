import { addData } from './handleData';
import { addOrder, getOrder } from './handleOrder';
import { getHeaders, changeHeaders, setHeadersToAxis } from './handleHeaders';
import { addList } from './sortList';
import { showToast } from './myComponents';
import { choiceColorIndex } from './palette';

export function dropHandler(e) {
  e.preventDefault();

  let fileNumber = getOrder().length

  const files = e.dataTransfer.files;
  for (let i = 0, f; f = files[i]; i++) {
    handleFile(f, fileNumber, this.chart);
    fileNumber++;
  }
}

export function fileChangeHandler(e) {
  let fileNumber = getOrder().length;
  const files = e.target.files;
  for (let i = 0, f; f = files[i]; i++) {
    handleFile(f, fileNumber, this.chart);
    fileNumber++;
  }
  document.getElementById('select-files').value = '';
}

const handleFile = (file, fileNumber, chart) => {
  if (!/(csv|CSV)$/.test(file.name)) {
    showToast(`${file.name}はCSVファイルではありません`)
    return;
  }
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    const xAxis = document.getElementById('x-axis').value
    const yAxis = document.getElementById('y-axis').value
    const text = reader.result;
    const {data, headerSet} = csvTextToObject(text);
    data.colorIndex = choiceColorIndex(fileNumber);
    changeHeaders(headerSet);
    const fileName = incrementWordIfOverlapping(file.name.split('.')[0], getOrder());
    addData({[fileName]: data});
    addOrder(fileName);
    addList(fileName);
    setHeadersToAxis(xAxis, yAxis);
    chart.addTrace(fileName);
  };
};

export const incrementWordIfOverlapping = (word, wordList) => {
  let i = 1
  let newWord = word;
  while (wordList.includes(newWord)) {
    newWord = newWord.replace(/($|_\d*$)/, `_${i}`);
    i++
  }
  return newWord;
};

const csvTextToObject = text => {
  let data = {};
  const mat = [];
  const lines = text.trim().split('\n');
  const rowNumber = lines.length;
  const headers = lines[0].trim().split(',');
  const columnNumber = headers.length;
  const headerSet = getHeaders();

  headers.forEach((header) => {
    mat.push([]);
    if (!headerSet.includes(header)) {
      headerSet.push(header)
    }
  })

  for (let row = 1; row < rowNumber; row++) {
    const line = lines[row].trim().split(',')
    for (let col = 0; col < columnNumber; col++) {
      mat[col].push(Number(line[col]));
    }
  }

  for (let col = 0; col < columnNumber; col++) {
    if (mat[col].includes(NaN)) {
      showToast(`${headers[col]}列は数値列ではないため読み込めません`)
      continue;
    }
    data = Object.assign(data, {[headers[col]]: mat[col]});
  }
  data = Object.assign(
    data, {'No.': [...Array(rowNumber-1)].map((_, i) => i)}
  );
  return {data, headerSet};
};

