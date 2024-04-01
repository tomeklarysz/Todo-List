import { createTask } from "./tasks";
import { createList } from "./lists";
import { createProject, projectsStorage } from "./projects";
import { dom } from "./dom";
import './style.css';

let task1 = createTask('dishes');
let task2 = createTask('floor');
task1.setDescription('do dishes');
task2.setDescription('clean floor');

let list1 = createList('cleaning');
list1.addTask(task1);
list1.addTask(task2);

let list2 = createList('fixing');
let project1 = createProject('home chores');
project1.addList(list1);
project1.addList(list2);
let task3 = createTask('sink');
task3.setDescription('fix sink');
list2.addTask(task3);
projectsStorage.addProject(project1);


let workTask1 = createTask('make charts');
let workTask2 = createTask('double check data');
let workList1 = createList('raport');
workList1.addTask(workTask1);
workList1.addTask(workTask2);

let workTask3 = createTask('prepare presentation');
let workTask4 = createTask('do practice run');
let workList2 = createList('conference');
workList2.addTask(workTask3);
workList2.addTask(workTask4);

let project2 = createProject('work');
project2.addList(workList1);
project2.addList(workList2);
projectsStorage.addProject(project2);

task1.setDescription('dishes need to be cleaned regularly');
task1.setDueDate(new Date(2024, 5, 10));
task1.setPriority();
task1.setNotes('whateva bro');
task1.setCheck();

dom.initialDisplayContent();
dom.displaySidebar();