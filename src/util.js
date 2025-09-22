const spaceRegex = /\s+/;

export const setAttributes = (element, attributes = {}) => {
	if (!attributes) return;
	for (const [key, value] of Object.entries(attributes)) {
		if (typeof value === "undefined") {
			continue;
		} else if (key === "class" && Array.isArray(value)) {
			for (const c of value) {
				if (!c) continue;
				const cArr = c.trim().split(spaceRegex);
				element.classList.add(...cArr);
			}
		} else if (key === "style" && typeof value === "object") {
			Object.assign(element.style, value);
		} else {
			element.setAttribute(key, String(value));
		}
	}
}

export const appendChildren = (el, children, creator) => {
	const frag = document.createDocumentFragment();

	for (const child of children) {
		if (Array.isArray(child)) {
			frag.append(creator(child));
		} else {
			frag.append(child);
		}
	}

	el.append(frag);
}

export const createSvgElement = ([tag, attributes, children]) => {
	const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
	if (attributes) setAttributes(el, attributes);
	if (children?.length) appendChildren(el, children, createSvgElement);
	return el;
};

export const createElement = ([tag, attributes, children]) => {
	const el = document.createElement(tag);
	if (attributes) setAttributes(el, attributes);
	if (children?.length) appendChildren(el, children, createElement);
	return el;
};
