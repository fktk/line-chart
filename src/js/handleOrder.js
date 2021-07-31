export const getOrder = () => {
  const chartOrder = document.getElementById('chart-order');
  return JSON.parse(chartOrder.textContent);
};

export const addOrder = (fileName) => {
  const order = getOrder();
  order.push(fileName);
  document.getElementById('chart-order').textContent = JSON.stringify(order);
}

export const changeOrder = newOrder => {
  document.getElementById('chart-order').textContent = JSON.stringify(newOrder);
};

export const changeFileNameInOrder = (oldName, newName) => {
  const order = getOrder();
  const newOrder = order.map(name => {
    return ((name === oldName) ? newName: name);
  });
  changeOrder(newOrder);
}

export const deleteOrder = fileName => {
  const order = getOrder();
  document.getElementById('chart-order').textContent = JSON.stringify(
    order.filter(text => text !== fileName)
  );
};


