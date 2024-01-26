import { html } from '../utils';

declare global {
	interface HTMLElementTagNameMap {
		'e-add-todo': AddTodoElement;
	}
}

export interface Events {
	'e-add-todo@submit': CustomEvent<string>;
}

declare global {
	interface HTMLElementEventMap extends Events {}
}

export class AddTodoElement extends HTMLElement {
	#shadowRoot = this.attachShadow({ mode: 'open' });

	get formElement(): HTMLFormElement {
		return this.#shadowRoot.querySelector('form')!;
	}

	get inputNameElement(): HTMLInputElement {
		return this.#shadowRoot.querySelector('input')!;
	}

	render() {
		this.#shadowRoot.innerHTML = html`
			<form>
				<label>
					Add todo element
					<input type="text" />
				</label>
				<button>Submit</button>
			</form>
		`;
	}

	connectedCallback() {
		this.render();
		this.formElement.addEventListener('submit', e => {
			e.preventDefault();

			this.dispatchEvent(
				new CustomEvent('e-add-todo@submit', {
					detail: this.inputNameElement.value,
					bubbles: true,
					composed: true,
				})
			);
		});
	}
}

customElements.define('e-add-todo', AddTodoElement);
