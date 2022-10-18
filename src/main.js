const todoAppState = {
  todos: [],
  nextId: 0,
};

const todoListElement = document.querySelector('.todo-list');

const createTodoNode = (todo) => {
  const todoNode = document.querySelector('.todo-item');
  const newTodoNode = todoNode.cloneNode(true);
  newTodoNode.style.display = 'flex';

  const textSpan = newTodoNode.querySelector('span');
  textSpan.innerText = todo.task;

  newTodoNode.setAttribute('id', todo.id);
  
  todoListElement.appendChild(newTodoNode);
}

const completeTodo = (event) => {
  const todoID = event.target.parentElement.getAttribute('id');
  const todosWithoutFilteredTodo = todoAppState.todos.filter((todo) => todo.id !== +todoID);
  const filteredTodo = todoAppState.todos.filter((todo) => todo.id === +todoID);
 
  if(filteredTodo.done === false) {
    filteredTodo.done = true;
    event.target.style.textDecoration = 'line-through';
  } else {
    filteredTodo.done = false;
    event.target.style.textDecoration = 'none';
  }

  console.log('spred', ...todosWithoutFilteredTodo)

  todoAppState.todos = [
    ...todosWithoutFilteredTodo,
    filteredTodo,
  ];

  console.log(todoAppState.todos);
} 


const deleteTodo = (e) => {
  const todoID = e.target.parentElement.parentNode.getAttribute('id');
  const filteredTodos = todoAppState.todos.filter((todo) => todo.id !== todoID);
  
  todoAppState.todos = filteredTodos;
  document.getElementById(todoID).remove();
};


const createTodo = () => {
  const task = document.getElementById('todoInput').value;

  const todo = {
    task: task,
    done: false,
    id: todoAppState.nextId,
  }

  todoAppState.nextId++;
  todoAppState.todos.push(todo);

  createTodoNode(todo);
};



