// import { createTask } from 
import { projectsStorage } from "./projects";
import './style.css';

function dom() {
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('main-content');
  
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
      sidebar.appendChild(listDiv);
    }
  }
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

      }
    });
    newTaskDiv.appendChild(taskInput);
  });
  content.appendChild(newTaskDiv);
}

export { dom };