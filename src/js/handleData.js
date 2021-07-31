
export const getData = () => {
  const chartData = document.getElementById('chart-data');
  return JSON.parse(chartData.textContent);
};

export const addData = (jsonData) => {
  const oldData = getData();
  const newData = Object.assign(oldData, jsonData);
  document.getElementById('chart-data').textContent = JSON.stringify(newData);
};

export const changeFileNameInData = (oldName, newName) => {
  const data = getData();
  data[newName] = data[oldName]
  delete data[oldName]
  document.getElementById('chart-data').textContent = JSON.stringify(data);
};

export const deleteData = fileName => {
  const data = getData();
  delete data[fileName];
  document.getElementById('chart-data').textContent = JSON.stringify(data);
};

export const changeColorIndex = (fileName, newColorIndex) => {
  const data = getData();
  data[fileName].colorIndex = newColorIndex;
  document.getElementById('chart-data').textContent = JSON.stringify(data);
}

export const getColorIndex = fileName => {
  return getData()[fileName].colorIndex;
}
