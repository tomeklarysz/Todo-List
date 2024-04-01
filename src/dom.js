import { projectsStorage } from "./projects";
import './style.css';
import { createTask } from "./tasks";

// dom as iife
const dom = (function () {
  const content = document.getElementById('main-content');
  const sidebar = document.getElementById('sidebar');

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function showTaskInfo(task) {
    const taskInfo = document.createElement('div');
    const title = document.createElement('p');
    title.textContent = task.getTitle();
    taskInfo.appendChild(title);

    const description = document.createElement('div');
    description.textContent = task.getDescription();
    taskInfo.appendChild(description);

    const dueDate = document.createElement('div');
    dueDate.textContent = task.getDueDate();
    taskInfo.appendChild(dueDate);

    if (task.getPriority()) {
      const priority = document.createElement('div');
      priority.textContent = `High Priority`;
      taskInfo.appendChild(priority);
    }
    const notes = document.createElement('div');
    notes.textContent = task.getNotes();
    taskInfo.appendChild(notes);

    content.appendChild(taskInfo);
  }

  function initialDisplayContent() {
    displayContent(projectsStorage.storage[0].lists[0]);
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
      item.style.width = 'fit-content';
      item.classList.add('task');
      item.textContent = task.getTitle();
      item.addEventListener('click', () => {
        removeAllChildNodes(content);
        displayContent(list);
        showTaskInfo(task);
      });
      tasksList.appendChild(item);
    }
    newTask(list);
  }

  function newTask(list) {
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
        if (property === 'title') {
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
      submitBtn.addEventListener('click', () => {
        let newTask = createTask(form.querySelector('input').value);
        let propertiesNodes = form.querySelectorAll('input');
        let properties = {};
        propertiesNodes.forEach((property) => {
          if (property.getAttribute('id') === 'priority') {
            properties[property.getAttribute('id')] = property.checked;
          } else {
            properties[property.getAttribute('id')] = property.value;
          }
        });
        newTask.setDescription(properties['description']);
        newTask.setDueDate(properties['dueDate']);
        if (properties['priority']) {
          newTask.setPriority();
        }
        newTask.setNotes(properties['notes']);
        list.addTask(newTask);
        displayContent(list);
      })
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
          displayContent(list);
        });
        sidebar.appendChild(listDiv);
      }
    }
  }

  return { initialDisplayContent, displaySidebar };
})();

export { dom };