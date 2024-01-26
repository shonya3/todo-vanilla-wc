import { Todo } from '../types';
import './e-todo';

declare global {
	interface HTMLElementTagNameMap {
		'e-todo-list': TodoListElement;
	}
}

export class TodoListElement extends HTMLElement {
	#todos: Todo[] = [];
	#shadowRoot = this.attachShadow({ mode: 'open' });

	get todos(): Todo[] {
		return this.#todos;
	}

	set todos(val: Todo[]) {
		this.#todos = val;
		this.render();
	}

	render() {
		this.#shadowRoot.innerHTML = '';

		for (const todo of this.#todos) {
			this.#shadowRoot.append(
				Object.assign(document.createElement('e-todo'), {
					name: todo.name,
					done: todo.done,
					todoId: todo.id,
				})
			);
		}
	}
}

customElements.define('e-todo-list', TodoListElement);
