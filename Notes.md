# 📘 Web Components Development Notes (Beginner Friendly)

These notes explain step by step how to build **Lume-style Web Components** (or any other), handle different situations, and create reusable UI systems.

---

## 1. 🌱 Basics of Web Components

A Web Component is a **custom HTML tag** you define yourself.

Example:
```js
class MyButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<button>Click Me</button>`;
  }
}
customElements.define("my-button", MyButton);
```

- `customElements.define("my-button", MyButton)` registers the component.  
- Now you can use `<my-button></my-button>` in HTML.

---

## 2. 🔒 Shadow DOM

- By default, CSS leaks in/out of components.  
- Use **Shadow DOM** to encapsulate styles and HTML.

```js
this.attachShadow({ mode: "open" });
this.shadowRoot.innerHTML = `
  <style>button { color: red; }</style>
  <button><slot></slot></button>
`;
```

- `mode: "open"` lets you access `element.shadowRoot`.  
- `<slot>` allows passing content from outside.

---

## 3. 🎨 Styling & Theming

### Scoped styles
- Styles inside shadow DOM don’t leak.
- Use `:host` to style the component itself.

```css
:host {
  display: inline-block;
  border-radius: 6px;
}
```

### CSS Variables
- Allow easy **light/dark theme** or **color customization**.

```css
button {
  background: var(--btn-bg, #3b82f6);
  color: var(--btn-text, white);
}
```

Now `<my-button style="--btn-bg: red">` will have a red button.

---

## 4. 🎛 Ways to Pass Data

### (a) Attributes
- Simple values (string, boolean, number).
```html
<my-button variant="primary"></my-button>
```
Inside JS:
```js
static get observedAttributes() { return ["variant"]; }
attributeChangedCallback(name, oldVal, newVal) {
  if (name === "variant") this.variant = newVal;
}
```

### (b) Properties (JS only)
```js
document.querySelector("my-button").disabled = true;
```

### (c) Slots (Content Projection)
- Useful for children or flexible HTML.
```html
<my-card>
  <h3 slot="title">Hello</h3>
  <p slot="body">This is a card</p>
</my-card>
```

### (d) JSON / Array Attributes
- When dynamic/multiple items are needed (sliders, properties tables).
```html
<my-slider slides='[{"img":"1.jpg","text":"Slide 1"}]'></my-slider>
```

---

## 5. 🧱 Component Development Order

Start from **independent → dependent → complex**:

1. **Independent**: Button, Input, Card (no dependency, just slots/attributes).
2. **Semi-dependent**: Form (uses inputs & buttons), Accordion (toggles child slots).
3. **Layout**: Navbar, Sidebar, Footer (slots for links, brand).
4. **Dynamic / Interactive**: Slider, Testimonials (loop through data, next/prev).
5. **Feedback/Overlay**: Toast, Modal (show/hide logic).

---

## 6. 📑 Patterns You’ll Use Often

### Buttons
- Variants (primary, secondary, outline, ghost).
- Sizes (sm, md, lg).
- States (disabled, loading).

### Inputs
- Attributes: `placeholder`, `type`, `value`.
- Styling for focus/hover.

### Form
- Groups inputs, validates, emits custom events.

### Navbar / Sidebar
- Slots for brand + links.
- Responsive toggle.
- Attributes for color management.

### Slider / Testimonials
- Accept **unlimited items** via JSON or slots.
- Default data shown if none provided.
- Responsive full-screen container.

### CodeBlock
- Use `<slot>` for `<pre><code>` content.
- Add "Copy" button via JS.
- Prism.js (or Highlight.js) for syntax highlighting.

### Properties Table
- JSON for rows.
- Responsive mobile table (stacked).

---

## 7. 🌓 Light/Dark Mode

Use `data-theme` or CSS variables:
```css
:host([theme="dark"]) {
  --bg: #111827;
  --text: #f9fafb;
}
```

Then:
```html
<my-card theme="dark"></my-card>
```

---

## 8. 🎨 UI Enhancements

- Rounded corners (`border-radius: 0.5rem`).
- Shadows (`box-shadow`).
- Smooth transitions (`transition: all 0.3s`).
- Hover/focus states.
- Responsive (`@media (max-width: 768px)`).

---

## 9. 📦 Default Data

Always provide fallback if user doesn’t supply slots/props.

```js
render() {
  const title = this.getAttribute("title") || "Default Title";
  const img = this.getAttribute("img") || "/src/images/default.png";
}
```

---

## 10. 📢 Events

Use `CustomEvent` to communicate out.

```js
this.dispatchEvent(new CustomEvent("submit", {
  detail: { value: this.value }
}));
```

Now parent can:
```js
document.querySelector("my-form").addEventListener("submit", e => {
  console.log(e.detail.value);
});
```

---

## 11. 🛠 Best Practices

- Keep **one responsibility per component**.
- Use **attributes for simple config**, **slots for content**, **JSON for dynamic lists**.
- Provide **default fallback** so component never breaks.
- Make **responsive by default**.
- Support **theming via CSS variables**.
- Write **clean CSS with hover/focus states**.
- Add **keyboard accessibility** (`tabindex`, `aria-*`).
- Allow **any number of children** (avoid hard-coded counts).

---

## 12. 📚 Learning Roadmap

1. Build a `<lume-button>` → Learn attributes, states, styling.
2. Build a `<lume-input>` → Learn slots + attributes.
3. Combine into `<lume-form>` → Learn events.
4. Build `<lume-card>` → Learn slot layouts.
5. Build `<lume-navbar>` / `<lume-sidebar>` → Learn responsive design & toggles.
6. Build `<lume-slider>` → Learn JSON props, dynamic rendering.
7. Build `<lume-toast>` / `<lume-modal>` → Learn overlays & accessibility.
8. Build `<lume-properties>` → Learn JSON → table mapping.
9. Build `<lume-codeblock>` → Learn third-party library integration (Prism.js).

---

✅ Follow this path, and you’ll be able to create **any UI component**.  
The main ideas are **slots, attributes, shadow DOM, JSON props, theming, responsiveness**.  
