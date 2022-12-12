import './style.css';

/* eslint-disable no-use-before-define */

const addTask = document.querySelector('#add-todo');
const task = document.querySelector('#todo');
const notification = document.querySelector('.notification');
const todoList = document.querySelector('#todoList');
const toDoObject = JSON.parse(localStorage.getItem('todoList')) || [];
const deleteBtn = document.querySelectorAll('#delete');
const move = document.querySelectorAll('.move');
const todo = document.querySelectorAll('#todoItem');
const listItem = document.querySelectorAll('#listItem');
const trash = document.querySelectorAll('.fa-trash-can');
const clear = document.querySelector('.clearCompleted');

// Success messege for making a todo

const isSuccess = () => {
  notification.style.display = 'flex';
  notification.textContent = 'Task added successfully!';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
};

// Error messege for a todo

const isError = () => {
  notification.style.display = 'flex';
  notification.textContent = 'Please enter a task';
  notification.style.color = 'red';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 2000);
};

// Added scroll if height of lists overflow

const addScroll = () => {
  const todoList = document.querySelector('#todoList');
  if (toDoObject.length >= 5) {
    todoList.style.height = '30vh';
  } else {
    todoList.style.height = 'auto';
  }
};

// Storaing Todo list in local storage

const TodoMagazine = (todoList) => {
  todoList.sort((a, b) => a.index - b.index);
  localStorage.setItem('todoList', JSON.stringify(todoList));
};

const toDoItemStatus = () => {
  const checked = document.querySelectorAll('input[type=checkbox]');
  const listItem = document.querySelectorAll('#listItem');
  checked.forEach((input, index) => input.addEventListener('change', () => {
    if (input.checked) {
      toDoObject[index].completed = true;
      listItem[index].style.textDecoration = 'line-through';
      listItem[index].style.color = 'grey';
    } else {
      toDoObject[index].completed = false;
      listItem[index].style.textDecoration = 'none';
      listItem[index].style.color = 'black';
    }
    TodoMagazine(toDoObject);
  }));
};

class Todo {
  constructor(task) {
    this.description = task;
    this.completed = false;
    this.index = toDoObject.length + 1;
  }

 static addTodo = () => {
   addTask.addEventListener('click', () => {
     if (task.value === '') {
       isError();
     } else {
       const todo = new Todo(task.value);
       toDoObject.push(todo);
       createTodoList();
       task.value = '';
       addScroll();
       isSuccess();
     }
   });
 };

  static updateIndex = () => {
    toDoObject.forEach((data, index) => {
      data.index = index + 1;
    });
  };

  static removeTodo = (index) => {
    toDoObject.splice(index - 1, 1);
    this.updateIndex();
  };
}
// Create the todo list in UI

const createTodoList = () => {
  TodoMagazine(toDoObject);
  todoList.innerHTML = toDoObject
    .map((data) => `<li id="todoItem" class="todoItem"><input type="checkbox" id="checked" ${
      data.completed ? 'checked' : ''} >
        <input type="text" id="listItem" value= "${data.description}">
        <i title="Click to Delete" class="fa-solid fa-ellipsis-vertical move"></i>
        <i class="fa-solid fa-trash-can" id="delete"></i></li>`)
    .join('');

  move.forEach((button, index) => button.addEventListener('click', () => {
    move[index].style.display = 'none';
    deleteBtn[index].style.display = 'flex';
    trash[index].style.color = 'red';
    todo[index].style.backgroundColor = '#DFDEAB';
    listItem[index].style.backgroundColor = '#DFDEAB';
    deleteBtn[index].backgroundColor = '#DFDEAB';
  }));

  deleteBtn.forEach((button, index) => button.addEventListener('click', () => {
    const item = index + 1;
    Todo.removeTodo(item);
    createTodoList();
  }));

  listItem.forEach((input, index) => input.addEventListener('click', () => {
    todo[index].style.backgroundColor = '#dfdeab';
    listItem[index].style.backgroundColor = '#dfdeab';
    deleteBtn[index].backgroundColor = '#dfdeab';
  }));

  listItem.forEach((input, index) => input.addEventListener('change', () => {
    toDoObject[index].description = input.value;
    TodoMagazine(toDoObject);
  }));

  clear.addEventListener('click', () => {
    const completed = toDoObject.filter((data) => data.completed === true);
    completed.forEach((data) => {
      const index = toDoObject.indexOf(data);
      toDoObject.splice(index, 1);
    });
    TodoMagazine(toDoObject);
    createTodoList();
  });
  toDoItemStatus();
};
