// LumeButton Component
class LumeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.handleClick = this.handleClick.bind(this);
  }

  static get observedAttributes() {
    return ["variant", "size", "disabled", "loading", "type"];
  }

  connectedCallback() {
    this.render();
    this.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleClick);
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  get variant() {
    return this.getAttribute("variant") || "primary";
  }
  get size() {
    return this.getAttribute("size") || "medium";
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  get loading() {
    return this.hasAttribute("loading");
  }
  get type() {
    return this.getAttribute("type") || "button";
  }

  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.dispatchEvent(
      new CustomEvent("lume-click", {
        bubbles: true,
        detail: { button: this },
      })
    );
  }

  render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: inline-block; }
                        button {
                            display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
                            border: 1px solid transparent; border-radius: 8px; font-family: 'Inter', sans-serif;
                            font-weight: 500; cursor: pointer; transition: all 0.15s ease-in-out;
                            text-decoration: none; outline: none; position: relative; overflow: hidden;
                            padding: 0.5rem 1rem; font-size: 1rem;
                        }
                        .size-small { font-size: 0.875rem; padding: 0.25rem 0.75rem; }
                        .size-medium { font-size: 1rem; padding: 0.5rem 1rem; }
                        .size-large { font-size: 1.125rem; padding: 0.75rem 1.5rem; }
                        .variant-primary { background: #3b82f6; color: white; }
                        .variant-primary:hover { background: #2563eb; }
                        .variant-secondary { background: #f3f4f6; color: #374151; }
                        .variant-secondary:hover { background: #e5e7eb; }
                        .variant-danger { background: #ef4444; color: white; }
                        .variant-danger:hover { background: #dc2626; }
                        .variant-outline { background: transparent; color: #3b82f6; border-color: #3b82f6; }
                        .variant-outline:hover { background: #3b82f6; color: white; }
                        .variant-ghost { background: transparent; color: #374151; }
                        .variant-ghost:hover { background: #f3f4f6; }
                        button:disabled { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
                        .loading { pointer-events: none; }
                        .spinner { width: 1rem; height: 1rem; border: 2px solid transparent;
                                   border-top: 2px solid currentColor; border-radius: 50%;
                                   animation: spin 1s linear infinite; }
                        @keyframes spin { to { transform: rotate(360deg); } }
                        button:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
                    </style>
                    <button class="variant-${this.variant} size-${this.size} ${
      this.loading ? "loading" : ""
    }" 
                            ${this.disabled ? "disabled" : ""} type="${
      this.type
    }">
                        ${this.loading ? '<div class="spinner"></div>' : ""}
                        <slot></slot>
                    </button>
                `;
  }
}

// LumeInput Component
class LumeInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._onInput = this._onInput.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  static get observedAttributes() {
    return [
      "label",
      "type",
      "placeholder",
      "value",
      "name",
      "error",
      "required",
    ];
  }

  connectedCallback() {
    this._render();
    this._attachListeners();
  }

  disconnectedCallback() {
    this._detachListeners();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.shadowRoot) return;
    switch (name) {
      case "label":
        if (this._labelEl) this._labelEl.textContent = this.labelText;
        break;
      case "placeholder":
        if (this._fieldEl) this._fieldEl.placeholder = this.placeholder;
        break;
      case "value":
        if (
          this._fieldEl &&
          this._fieldEl.value !== this.getAttribute("value")
        ) {
          this._fieldEl.value = this.getAttribute("value") || "";
        }
        break;
      case "error":
        this._updateError();
        break;
    }
  }

  get labelText() {
    const lbl = this.getAttribute("label");
    return lbl ? (this.hasAttribute("required") ? `${lbl} *` : lbl) : "";
  }
  get type() {
    return this.getAttribute("type") || "text";
  }
  get placeholder() {
    return this.getAttribute("placeholder") || "";
  }
  get value() {
    return (
      (this._fieldEl && this._fieldEl.value) || this.getAttribute("value") || ""
    );
  }
  set value(v) {
    if (this._fieldEl) this._fieldEl.value = v;
    this.setAttribute("value", v == null ? "" : String(v));
  }
  get error() {
    return this.getAttribute("error") || "";
  }
  set error(msg) {
    if (msg) this.setAttribute("error", msg);
    else this.removeAttribute("error");
  }

  _render() {
    const isTextarea = this.type === "textarea";
    const valueAttr = this.getAttribute("value") || "";
    this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: block; font-family: Inter, sans-serif; }
                        .field { display: flex; flex-direction: column; }
                        label { font-size: 0.9rem; font-weight: 600; color: #e5e7eb; margin-bottom: 0.35rem; }
                        input, textarea {
                            width: 100%; padding: 0.6rem 0.75rem; border-radius: 8px;
                            border: 1px solid #374151; background: #1f2937; color: #e5e7eb;
                            font-size: 1rem; box-sizing: border-box;
                        }
                        input:focus, textarea:focus {
                            outline: none; border-color: #3b82f6;
                            box-shadow: 0 0 0 4px rgba(59,130,246,0.08);
                        }
                        textarea { min-height: 100px; resize: vertical; }
                        .error { margin-top: 0.4rem; color: #ef4444; font-size: 0.85rem; min-height: 1rem; }
                        .invalid { border-color: #ef4444; }
                    </style>
                    <div class="field">
                        ${
                          this.labelText
                            ? `<label part="label">${this.labelText}</label>`
                            : ""
                        }
                        ${
                          isTextarea
                            ? `<textarea part="control" placeholder="${this._escape(
                                this.placeholder
                              )}">${this._escape(valueAttr)}</textarea>`
                            : `<input part="control" type="${this._escape(
                                this.type
                              )}" placeholder="${this._escape(
                                this.placeholder
                              )}" value="${this._escape(valueAttr)}" />`
                        }
                        <div class="error" part="error">${this._escape(
                          this.getAttribute("error") || ""
                        )}</div>
                    </div>
                `;
    this._labelEl = this.shadowRoot.querySelector("label");
    this._fieldEl = this.shadowRoot.querySelector("input, textarea");
    this._errorEl = this.shadowRoot.querySelector(".error");
    if (this.hasAttribute("name"))
      this._fieldEl.name = this.getAttribute("name");
    if (this.hasAttribute("required")) this._fieldEl.required = true;
  }

  _attachListeners() {
    if (!this._fieldEl) return;
    this._fieldEl.addEventListener("input", this._onInput);
    this._fieldEl.addEventListener("blur", this._onBlur);
  }

  _detachListeners() {
    if (!this._fieldEl) return;
    this._fieldEl.removeEventListener("input", this._onInput);
    this._fieldEl.removeEventListener("blur", this._onBlur);
  }

  _onInput(e) {
    const v = e.target.value;
    this.setAttribute("value", v);
    if (this.hasAttribute("error")) this.removeAttribute("error");
    this.dispatchEvent(
      new CustomEvent("lume-input", {
        bubbles: true,
        composed: true,
        detail: { value: v, input: this },
      })
    );
  }

  _onBlur() {
    if (this.hasAttribute("required") && !this.value.trim()) {
      this.error = "This field is required";
      this._fieldEl.classList.add("invalid");
    } else {
      this.error = "";
      this._fieldEl.classList.remove("invalid");
    }
  }

  _updateError() {
    if (!this._errorEl || !this._fieldEl) return;
    const msg = this.getAttribute("error") || "";
    this._errorEl.textContent = msg;
    if (msg) {
      this._fieldEl.classList.add("invalid");
    } else {
      this._fieldEl.classList.remove("invalid");
    }
  }

  _escape(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

// LumeCard Component
class LumeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["variant", "hover", "padding"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.shadowRoot) this.render();
  }

  get variant() {
    return this.getAttribute("variant") || "default";
  }
  get hover() {
    return this.hasAttribute("hover");
  }
  get padding() {
    return this.getAttribute("padding") || "default";
  }

  render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: block; width: 100%; }
                        .card {
                            background: #1f2937; border-radius: 12px; border: 1px solid #374151;
                            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3); overflow: hidden;
                            transition: all 0.25s ease-in-out;
                        }
                        .hover:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
                        }
                        .variant-elevated { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3); }
                        .header { padding: 1.5rem 1.5rem 0; border-bottom: 1px solid #374151; margin-bottom: 1.5rem; }
                        .header:empty { display: none; }
                        .header ::slotted(*) { margin: 0 0 1.5rem 0; color: #f3f4f6; }
                        .body { padding: 0 1.5rem; flex: 1; color: #d1d5db; }
                        .body:only-child { padding: 1.5rem; }
                        .footer {
                            padding: 0 1.5rem 1.5rem; border-top: 1px solid #374151;
                            margin-top: 1.5rem; display: flex; align-items: center;
                            justify-content: space-between; gap: 1rem;
                        }
                        .footer:empty { display: none; }
                        .content { display: flex; flex-direction: column; min-height: 100%; }
                    </style>
                    <div class="card variant-${this.variant} ${
      this.hover ? "hover" : ""
    }">
                        <div class="content">
                            <div class="header"><slot name="header"></slot></div>
                            <div class="body"><slot></slot></div>
                            <div class="footer"><slot name="footer"></slot></div>
                        </div>
                    </div>
                `;
  }
}

// LumeModal Component
class LumeModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  static get observedAttributes() {
    return ["open", "size"];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "open") {
      newValue !== null ? this.open() : this.close();
    }
    if (this.shadowRoot) this.render();
  }

  get size() {
    return this.getAttribute("size") || "medium";
  }

  addEventListeners() {
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    const closeButton = this.shadowRoot.querySelector(".close-button");
    if (backdrop) {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) this.close();
      });
    }
    if (closeButton) {
      closeButton.addEventListener("click", () => this.close());
    }
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.style.display = "block";
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      this.shadowRoot.querySelector(".modal").classList.add("open");
      this.shadowRoot.querySelector(".backdrop").classList.add("open");
    });
  }

  close() {
    if (!this.isOpen) return;
    this.isOpen = false;
    const modal = this.shadowRoot.querySelector(".modal");
    const backdrop = this.shadowRoot.querySelector(".backdrop");
    modal.classList.add("closing");
    backdrop.classList.add("closing");
    setTimeout(() => {
      this.style.display = "none";
      document.body.style.overflow = "";
      modal.classList.remove("open", "closing");
      backdrop.classList.remove("open", "closing");
    }, 300);
  }

  render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: none; position: fixed; inset: 0; z-index: 1050; }
                        .backdrop {
                            position: absolute; inset: 0; background: rgba(0, 0, 0, 0.7);
                            opacity: 0; transition: opacity 0.3s ease-out;
                        }
                        .backdrop.open { opacity: 1; }
                        .backdrop.closing { opacity: 0; }
                        .modal {
                            position: relative; display: flex; align-items: center; justify-content: center;
                            min-height: 100vh; padding: 1rem; transform: scale(0.7); opacity: 0;
                            transition: all 0.3s ease-out;
                        }
                        .modal.open { transform: scale(1); opacity: 1; }
                        .modal.closing { transform: scale(0.7); opacity: 0; }
                        .dialog {
                            background: #1f2937; border-radius: 12px; box-shadow: 0 20px 25px rgba(0,0,0,0.3);
                            width: 100%; max-height: 90vh; overflow-y: auto; border: 1px solid #374151;
                        }
                        .dialog.small { max-width: 400px; }
                        .dialog.medium { max-width: 600px; }
                        .dialog.large { max-width: 800px; }
                        .header {
                            padding: 1rem 1.5rem; border-bottom: 1px solid #374151;
                            display: flex; justify-content: space-between; align-items: center;
                        }
                        .header ::slotted(h3) { margin: 0; font-size: 1.2rem; color: #f3f4f6; }
                        .close-button {
                            border: none; background: none; font-size: 1.5rem; cursor: pointer; color: #9ca3af;
                        }
                        .close-button:hover { color: #f3f4f6; }
                        .body { padding: 1.5rem; color: #d1d5db; }
                        .footer { padding: 1rem 1.5rem; border-top: 1px solid #374151; text-align: right; }
                    </style>
                    <div class="backdrop"></div>
                    <div class="modal">
                        <div class="dialog ${this.size}">
                            <div class="header">
                                <slot name="header"><h3>Modal Title</h3></slot>
                                <button class="close-button">&times;</button>
                            </div>
                            <div class="body"><slot></slot></div>
                            <div class="footer"><slot name="footer"></slot></div>
                        </div>
                    </div>
                `;
  }
}

// LumeAccordion Components
class LumeAccordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.panels = [];
  }

  static get observedAttributes() {
    return ["multiple"];
  }

  connectedCallback() {
    this.render();
    this.setupPanels();
  }

  get multiple() {
    return this.hasAttribute("multiple");
  }

  setupPanels() {
    const panels = this.querySelectorAll("lume-accordion-panel");
    this.panels = Array.from(panels);
    this.panels.forEach((panel, index) => {
      panel.setAttribute("data-index", index);
      panel.addEventListener("toggle", (e) => this.onToggle(e, index));
    });
  }

  onToggle(event, index) {
    if (!this.multiple) {
      this.panels.forEach((panel, i) => {
        if (i !== index) panel.close();
      });
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        :host {
                            display: block; border: 1px solid #374151; border-radius: 8px; overflow: hidden;
                        }
                        ::slotted(lume-accordion-panel:not(:last-child)) {
                            border-bottom: 1px solid #374151;
                        }
                    </style>
                    <slot></slot>
                `;
  }
}

class LumeAccordionPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot
      .querySelector(".panel-trigger")
      .addEventListener("click", () => this.toggle());
  }

  get title() {
    return this.getAttribute("title") || "Untitled Panel";
  }

  open() {
    this.isOpen = true;
    this.update();
    this.dispatchEvent(new CustomEvent("toggle", { bubbles: true }));
  }

  close() {
    this.isOpen = false;
    this.update();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  update() {
    const content = this.shadowRoot.querySelector(".panel-content");
    const trigger = this.shadowRoot.querySelector(".panel-trigger");
    const icon = this.shadowRoot.querySelector(".panel-icon");

    if (this.isOpen) {
      content.style.maxHeight = content.scrollHeight + "px";
      trigger.setAttribute("aria-expanded", "true");
      icon.textContent = "−";
    } else {
      content.style.maxHeight = "0";
      trigger.setAttribute("aria-expanded", "false");
      icon.textContent = "+";
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        .panel-trigger {
                            width: 100%; padding: 1rem 1.25rem; background: #1f2937; border: none;
                            display: flex; justify-content: space-between; align-items: center; cursor: pointer;
                            font-size: 1rem; font-weight: 500; color: #e5e7eb; transition: background 0.2s;
                        }
                        .panel-trigger:hover { background: #374151; }
                        .panel-icon { font-weight: bold; color: #9ca3af; }
                        .panel-content {
                            max-height: 0; overflow: hidden; transition: max-height 0.3s ease; background: #111827;
                        }
                        .panel-body { padding: 1rem 1.25rem; color: #d1d5db; }
                    </style>
                    <div class="panel">
                        <button class="panel-trigger" aria-expanded="false">
                            <span>${this.title}</span>
                            <span class="panel-icon">+</span>
                        </button>
                        <div class="panel-content">
                            <div class="panel-body"><slot></slot></div>
                        </div>
                    </div>
                `;
  }
}

// LumeForm Component
class LumeForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._onSubmit = this._onSubmit.bind(this);
  }

  connectedCallback() {
    this._render();
    this._formEl = this.shadowRoot.querySelector("form");
    this._formEl.addEventListener("submit", this._onSubmit);
  }

  disconnectedCallback() {
    if (this._formEl)
      this._formEl.removeEventListener("submit", this._onSubmit);
  }

  _render() {
    this.shadowRoot.innerHTML = `
                    <style>
                        :host { display: block; font-family: Inter, sans-serif; }
                        form {
                            background: #1f2937; padding: 1.25rem; border-radius: 10px;
                            border: 1px solid #374151; max-width: 520px;
                        }
                        .slot-header { margin-bottom: 0.75rem; }
                        .slot-header ::slotted(h3) { color: #f3f4f6; margin: 0; }
                        .slot-footer { margin-top: 0.75rem; }
                        ::slotted(lume-input) { margin-bottom: 0.5rem; display: block; }
                    </style>
                    <form novalidate>
                        <div class="slot-header"><slot name="header"></slot></div>
                        <slot></slot>
                        <div class="slot-footer"><slot name="footer"></slot></div>
                    </form>
                `;
  }

  _onSubmit(e) {
    e.preventDefault();
    const elements = this.querySelectorAll(
      "lume-input, input, textarea, select"
    );
    const formData = new FormData();
    const data = {};
    let isValid = true;

    elements.forEach((el) => {
      if (el.tagName === "LUME-INPUT") el.error = "";
    });

    elements.forEach((el, idx) => {
      let value = "";
      let required = false;
      let fieldName = "";

      if (el.tagName === "LUME-INPUT") {
        value = (el.value || "").trim();
        required = el.hasAttribute("required");
        fieldName =
          el.getAttribute("name") ||
          (el.getAttribute("label")
            ? el.getAttribute("label").toLowerCase().replace(/\s+/g, "_")
            : `field_${idx}`);
      }

      if (required && !value) {
        isValid = false;
        if (el.tagName === "LUME-INPUT") el.error = "This field is required";
      }

      formData.append(fieldName, value);
      data[fieldName] = value;
    });

    if (isValid) {
      this.dispatchEvent(
        new CustomEvent("lume-form-submit", {
          bubbles: true,
          detail: { formData, data, form: this },
        })
      );
    }
  }
}

// Register all components
customElements.define("lume-button", LumeButton);
customElements.define("lume-input", LumeInput);
customElements.define("lume-card", LumeCard);
customElements.define("lume-modal", LumeModal);
customElements.define("lume-accordion", LumeAccordion);
customElements.define("lume-accordion-panel", LumeAccordionPanel);
customElements.define("lume-form", LumeForm);

// Toast functionality
let toastContainer = null;
function showToast(message, type = "info", options = {}) {
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.style.cssText = `
                    position: fixed; top: 1rem; right: 1rem; display: flex;
                    flex-direction: column; align-items: flex-end; z-index: 1080;
                `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.style.cssText = `
                display: flex; align-items: center; gap: 0.75rem; padding: 1rem 1.25rem;
                background: #1f2937; border-radius: 8px; box-shadow: 0 6px 12px rgba(0,0,0,0.3);
                border-left: 4px solid; min-width: 280px; max-width: 400px; margin-bottom: 0.5rem;
                color: #e5e7eb; font-family: Inter, sans-serif; font-size: 0.875rem;
                transform: translateX(120%); opacity: 0; transition: all 0.3s ease-out;
            `;

  const icons = { success: "✓", error: "✕", warning: "⚠", info: "ℹ" };
  const colors = {
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  };

  toast.style.borderLeftColor = colors[type] || colors.info;
  toast.innerHTML = `
                <div style="font-size: 1rem;">${icons[type] || icons.info}</div>
                <div style="flex: 1;">${message}</div>
            `;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = "translateX(0)";
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.transform = "translateX(120%)";
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, options.duration || 4000);

  return toast;
}

// Navigation functionality
function showSection(sectionId) {
  document
    .querySelectorAll(".section")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".sidebar-item")
    .forEach((s) => s.classList.remove("active"));

  const section = document.getElementById(sectionId);
  const navItem = document.querySelector(`a[href="#${sectionId}"]`);

  if (section) section.classList.add("active");
  if (navItem) navItem.classList.add("active");
}

// Modal functions
function openModal() {
  document.getElementById("demo-modal").open();
}

function closeModal() {
  document.getElementById("demo-modal").close();
}

// Copy code functionality
function copyCode(button) {
  const codeBlock = button.closest(".code-container").querySelector("code");
  const text = codeBlock.textContent;
  navigator.clipboard.writeText(text).then(() => {
    button.textContent = "Copied!";
    setTimeout(() => (button.textContent = "Copy"), 2000);
  });
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  document.querySelectorAll(".sidebar-item, .nav a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        showSection(href.substring(1));
      }
    });
  });

  // Form submission
  document
    .getElementById("contact-form")
    ?.addEventListener("lume-form-submit", (e) => {
      showToast("Form submitted successfully!", "success");
      console.log("Form data:", e.detail.data);
    });

  // Hash navigation
  if (window.location.hash) {
    showSection(window.location.hash.substring(1));
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform =
    sidebar.style.transform === "translateX(0px)"
      ? "translateX(-100%)"
      : "translateX(0px)";
}

// Add mobile menu button functionality
if (window.innerWidth <= 768) {
  const header = document.querySelector(".header");
  const menuButton = document.createElement("button");
  menuButton.innerHTML = "☰";
  menuButton.style.cssText = `
                background: none; border: none; color: #e5e7eb; font-size: 1.5rem;
                cursor: pointer; display: block; margin-left: auto;
            `;
  menuButton.onclick = toggleMobileMenu;
  header.appendChild(menuButton);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    showSection(targetId);
    window.history.pushState(null, null, `#${targetId}`);
  });
});

// Handle browser back/forward
window.addEventListener("popstate", () => {
  const hash = window.location.hash.substring(1) || "home";
  showSection(hash);
});

// Add syntax highlighting enhancement
if (typeof Prism !== "undefined") {
  Prism.highlightAll();
}

// Add responsive image loading
document.querySelectorAll("img").forEach((img) => {
  img.style.maxWidth = "100%";
  img.style.height = "auto";
});

// Performance optimization: lazy load sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Add search functionality (basic)
function addSearchFunctionality() {
  const searchContainer = document.createElement("div");
  searchContainer.style.cssText = `
                position: sticky; top: 0; background: #111827; padding: 1rem;
                border-bottom: 1px solid #374151; z-index: 10;
            `;

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search components...";
  searchInput.style.cssText = `
                width: 100%; padding: 0.5rem; border-radius: 6px; border: 1px solid #374151;
                background: #1f2937; color: #e5e7eb; font-size: 0.9rem;
            `;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll(".sidebar-item").forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? "block" : "none";
    });
  });

  searchContainer.appendChild(searchInput);
  document.querySelector(".sidebar").prepend(searchContainer);
}
