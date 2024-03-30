import { projectsStorage } from "./projects";
import './style.css';

// dom as iife
const dom = (function () {
  const content = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function initialDisplayContent() {
    const h1 = document.createElement('h1');
    h1.textContent = projectsStorage.storage[0].lists[0].getListTitle();
    content.appendChild(h1);
    const tasksList = document.createElement('ul');
    content.appendChild(tasksList);
    for (const task of projectsStorage.storage[0].lists[0].getTasks()) {
      const item = document.createElement('li');
      item.textContent = task.getTitle();
      tasksList.appendChild(item);
    }
  }

  function displayContent(list) {
    removeAllChildNodes(content);
    const h1 = document.createElement('h1');
    h1.textContent = list.getListTitle();
    content.appendChild(h1);
    const tasksList = document.createElement('ul');
    content.appendChild(tasksList);
    for (const task of list.getTasks()) {
      const item = document.createElement('li');
      item.textContent = task.getTitle();
      tasksList.appendChild(item);
    }
    newTask();
  }

  function newTask() {
    const newTaskDiv = document.createElement('div');
    const newTaskBtn = document.createElement('button');
    newTaskBtn.textContent = 'new task';
    newTaskDiv.appendChild(newTaskBtn);
    newTaskBtn.addEventListener('click', () => {
      newTaskDiv.removeChild(newTaskBtn);
      const taskInput = document.createElement('input');
      taskInput.setAttribute('type', 'text');
      taskInput.setAttribute('id', 'task');
      taskInput.setAttribute('name', 'task');
      taskInput.setAttribute('placeholder', 'check mails..');
      taskInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          /* finish this */
        }
      });
      newTaskDiv.appendChild(taskInput);
    });
    content.appendChild(newTaskDiv);
  }

  function displaySidebar() {
    removeAllChildNodes(sidebar);
    for (const project of projectsStorage.storage) {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');
      projectDiv.textContent = project.getProjectTitle();
      projectDiv.style.marginTop = '15px';
      sidebar.appendChild(projectDiv);
      for (const list of project.lists) {
        const listDiv = document.createElement('div');
        listDiv.classList.add('list');
        listDiv.textContent = list.getListTitle();
        listDiv.addEventListener('click', () => {
          displayContent(list);
        });
        sidebar.appendChild(listDiv);
      }

    }
  }

  return { initialDisplayContent, newTask, displaySidebar };
})();

export { dom };