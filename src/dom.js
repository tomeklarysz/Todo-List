import { projectsStorage } from "./projects";
import { createTask } from "./tasks";
import './style.css';

// dom as iife
const dom = (function () {
  const content = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');

  // let currentList = projectsStorage.storage[0].lists[0];
  let currentList = {};
  function updateCurrentList(list) {
    currentList = list;
  }

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
    updateCurrentList(projectsStorage.storage[0].lists[0]);
    console.log(`current list: ${currentList}`);
    newTask();
  }

  function displayContent(list) {
    removeAllChildNodes(content);
    console.log('yoooo');
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
      const form = document.createElement('form');
      const tasksProperties = ['title', 'description', 'dueDate', 'priority', 'notes'];
      for (const property of tasksProperties) {
        const taskLabel = document.createElement('label');
        const taskInput = document.createElement('input');
        taskLabel.setAttribute('for', property);
        taskLabel.textContent = property;
        if (property == 'title') {
          taskInput.setAttribute('required', '');
          const span = document.createElement('span');
          span.setAttribute('aria-label', 'required');
          span.textContent = '*';
          taskLabel.appendChild(span);
        }
        if (property == 'dueDate') {
          taskInput.setAttribute('type', 'date');
        } else if (property == 'priority') {
          taskInput.setAttribute('type', 'radio');
          taskInput.setAttribute('value', 'High priority');
        } else {
          taskInput.setAttribute('type', 'text');
        }
        taskInput.setAttribute('id', property);
        taskInput.setAttribute('name', property);
        form.appendChild(taskLabel);
        form.appendChild(taskInput);
      }
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Submit';
      submitBtn.addEventListener("click", () => {
        let newTask = createTask(form.querySelector('input').getAttribute('id'));
        for (child in form.querySelectorAll('input')) {
          property = child.getAttribute('id');
          switch (property) {
            case 'description':
              newTask.setDescription(child.textContent);
              break;
            case 'dueDate':
              newTask.setDueDate()
          }
        }
        currentList.addTask(newTask);
        console.log(`current list: ${currentList}`);
        displayContent(currentList);
      });
      form.appendChild(submitBtn);
      newTaskDiv.appendChild(form);
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
          updateCurrentList(list);
          displayContent(currentList);
        });
        sidebar.appendChild(listDiv);
      }

    }
  }

  return { initialDisplayContent, displaySidebar };
})();

export { dom };