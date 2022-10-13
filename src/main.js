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

const deleteTodo = (e) => {
  const todoID = e.target.parentElement.parentNode.getAttribute('id');
  const filteredTodos = todoAppState.todos.filter((todo) => )
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



