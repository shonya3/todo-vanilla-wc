import { createTodo } from './utils';
import './elements/e-todo-app';

const jsonEl = document.createElement('pre');
document.body.append(jsonEl);

const todoApp = document.createElement('e-todo-app');
todoApp.addEventListener('e-todo-app@upd:todos', ({ detail: todos }) => {
	jsonEl.innerHTML = JSON.stringify(todos, null, 2);
});

const todos = ['A', 'B', 'C'].map(name => createTodo(name));
todoApp.todos = todos;

document.body.prepend(todoApp);
