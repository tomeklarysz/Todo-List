import { projectsStorage } from "./projects";
import './style.css';

function dom() {
  const container = document.getElementById('container');
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
}

export { dom };