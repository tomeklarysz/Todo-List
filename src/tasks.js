import { format } from "date-fns" 
function createTask(title) {
  
  const getTitle = () => title;
  const setTitle = (text) => title = text;
  
  let description = '';
  const getDescription = () => description;
  const setDescription = (text) => description = text;
  const removeDescription = () => description = '';
  
  let dueDate = '';
  const getDueDate = () => dueDate;
  const setDueDate = (date) => dueDate = format(date, "dd/MM/yyyy");
  const removeDueDate = () => dueDate = '';
  
  let priority = false;
  const getPriority = () => priority;
  const setPriority = () => priority = true;
  const removePriority = () => priority = false;
  
  let notes = '';
  const getNotes = () => notes;
  const setNotes = (text) => notes = text;
  const removeNotes = () => notes = '';

  let check = false;
  const getCheck = () => check;
  const setCheck = () => check = true;
  const removeCheck = () => check = false;

  return { getTitle, setTitle, getDescription, setDescription, 
    removeDescription, getDueDate, setDueDate, removeDueDate, 
    getPriority, setPriority, removePriority, getNotes, setNotes, 
    removeNotes, getCheck, setCheck, removeCheck };
}


export { createTask };