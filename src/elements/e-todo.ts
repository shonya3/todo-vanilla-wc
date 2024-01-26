import { BaseElement, html } from '../utils';

declare global {
	interface HTMLElementTagNameMap {
		'e-todo': TodoElement;
	}
}

export interface Events {
	'e-todo@upd:done': CustomEvent<{ id: string; done: boolean }>;
	'e-todo@delete': CustomEvent<string>;
}

declare global {
	interface HTMLElementEventMap extends Events {}
}

export class TodoElement extends BaseElement {
	#shadowRoot = this.attachShadow({ mode: 'open' });
	name = '';
	done = false;
	todoId = '';

	connectedCallback() {
		this.render();
		this.bindListeners();
	}

	bindListeners() {
		this.checkboxDoneEl.addEventListener('input', () => {
			this.emit('e-todo@upd:done', {
				id: this.todoId,
				done: this.checkboxDoneEl.checked,
			});
		});

		this.deleteButtonEl.addEventListener('click', () => {
			this.emit('e-todo@delete', this.todoId);
		});
	}

	get checkboxDoneEl(): HTMLInputElement {
		return this.#shadowRoot.querySelector('input#done')!;
	}

	get deleteButtonEl(): HTMLButtonElement {
		return this.#shadowRoot.querySelector('button#delete-btn')!;
	}

	render() {
		this.#shadowRoot.innerHTML = html`<div class="name">${this.name}</div>
			<input type="checkbox" name="done" id="done" />
			<button id="delete-btn">delete</button> `;
		this.checkboxDoneEl.checked = this.done;
	}
}

customElements.define('e-todo', TodoElement);
