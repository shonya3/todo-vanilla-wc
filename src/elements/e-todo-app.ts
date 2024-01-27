import { Todo } from '../types';
import { BaseElement, createTodo } from '../utils';

import './e-add-todo';
import './e-todo-list';

declare global {
	interface HTMLElementTagNameMap {
		'e-todo-app': TodoAppElement;
	}
}

export interface Events {
	'e-todo-app@upd:todos': CustomEvent<Todo[]>;
}

declare global {
	interface HTMLElementEventMap extends Events {}
}

export class TodoAppElement extends BaseElement {
	#shadowRoot = this.attachShadow({ mode: 'open' });
	#todos: Todo[] = [];

	constructor() {
		super();

		this.render();
		this.bindListeners();
	}

	set todos(val: Todo[]) {
		this.#todos = val;
		this.render();
		this.emit('e-todo-app@upd:todos', val);
	}

	get todos(): Todo[] {
		return this.#todos;
	}

	render() {
		this.#shadowRoot.innerHTML = '';
		this.#shadowRoot.append(
			document.createElement('e-add-todo'),
			Object.assign(document.createElement('e-todo-list'), { todos: this.#todos })
		);
	}

	bindListeners() {
		this.addEventListener('e-add-todo@submit', e => {
			this.todos = [createTodo(e.detail), ...this.todos];
		});

		this.addEventListener('e-todo@delete', e => {
			this.todos = this.#todos.filter(t => t.id !== e.detail);
		});

		this.addEventListener('e-todo@upd:done', e => {
			const { id, done } = e.detail;
			this.todos = this.todos.map(t => {
				if (t.id === id) {
					t.done = done;
				}
				return t;
			});
		});
	}
}

customElements.define('e-todo-app', TodoAppElement);
