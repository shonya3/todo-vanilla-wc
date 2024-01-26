import { Todo } from './types';

export const html = String.raw;
export const css = String.raw;

export function createTodo(name: string, done = false): Todo {
	return {
		name,
		id: crypto.randomUUID(),
		done,
	};
}

export type EventDetail<K extends keyof HTMLElementEventMap> = HTMLElementEventMap[K] extends CustomEvent<infer T>
	? T
	: null;

export class BaseElement extends HTMLElement {
	emit<K extends keyof HTMLElementEventMap>(
		type: K,
		data: EventDetail<K>,
		options: Omit<CustomEventInit, 'detail'> = { bubbles: true, composed: true, cancelable: true }
	): void {
		const event = new CustomEvent<EventDetail<K>>(type, {
			detail: data,
			...options,
		});

		this.dispatchEvent(event);
	}
}
