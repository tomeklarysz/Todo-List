function createProject(title) {
  const getProjectTitle = () => title;
  const setProjectTitle = (text) => title = text;

  let lists = [];
  
  const getLists = () => lists;
  const addList = (list) => lists.push(list);
  const removeList = (list) => lists.pop(list);

  return { getProjectTitle, setProjectTitle, 
    lists, getLists, addList, removeList };
}

const projectsStorage = (function () {
  let storage = [];
  const addProject = (project) => storage.push(project);
  const removeProject = (project) => storage.pop(project);
  return { addProject, removeProject, storage };
})();

export { createProject, projectsStorage };

