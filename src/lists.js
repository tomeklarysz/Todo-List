function createList(title) {
  const getListTitle = () => title;
  const setListTitle = (text) => title = text;

  let tasks = [];

  const getTasks = () => tasks;
  const addTask = (task) => tasks.push(task);
  const removeTask = (task) => tasks.pop(task);

  return { getListTitle, setListTitle, getTasks, addTask, removeTask };
}

export { createList };