export class LumeForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._initialized = false;
    this._isSubmitting = false;
  }

  static get observedAttributes() {
    return [
      // Core
      "type",
      "layout",
      "theme",
      "fields",
      // Dimensions
      "width",
      "max-width",
      "height",
      "gap",
      "radius",
      "padding",
      "margin",
      // Background
      "container-bg",
      "body-bg",
      // Info Panel
      "panel-title",
      "panel-description",
      "panel-bg",
      "panel-text-color",
      "panel-padding",
      "panel-radius",
      // Form Styling
      "form-bg",
      "form-text-color",
      "form-padding",
      "form-radius",
      "input-bg",
      "input-color",
      "input-border",
      "input-radius",
      "input-padding",
      "label-color",
      "label-size",
      "label-weight",
      // Button
      "button-text",
      "button-bg",
      "button-color",
      "button-hover-bg",
      "button-hover-color",
      "button-radius",
      "button-padding",
      "button-width",
      // Form Submission
      "action",
      "method",
      "success-message",
      "error-message",
    ];
  }

  connectedCallback() {
    this._upgradeProperties();
    this.render();
    this.setupEventListeners();
    this._initialized = true;
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._initialized && oldValue !== newValue) {
      this.render();
    }
  }

  // Property getters with defaults - EVEN MORE COMPACT
  get type() {
    return this.getAttribute("type") || "contact";
  }
  get layout() {
    return this.getAttribute("layout") || "split";
  }
  get theme() {
    return this.getAttribute("theme") || "dark";
  }

  get fields() {
    const attr = this.getAttribute("fields");
    if (this.type !== "custom" || !attr) {
      return this.getDefaultFields();
    }
    try {
      return JSON.parse(attr);
    } catch (e) {
      console.warn("Invalid fields JSON:", e);
      return this.getDefaultFields();
    }
  }

  // More Compact Dimensions
  get width() {
    return this.getAttribute("width") || "100%";
  }
  get maxWidth() {
    return this.getAttribute("max-width") || "1000px";
  }
  get height() {
    return this.getAttribute("height") || "auto";
  }
  get gap() {
    return this.getAttribute("gap") || "0";
  }
  get radius() {
    return this.getAttribute("radius") || "16px";
  }
  get padding() {
    return this.getAttribute("padding") || "1.5rem";
  }
  get margin() {
    return this.getAttribute("margin") || "0";
  }

  // Background
  get bodyBg() {
    return this.getAttribute("body-bg") || this.getThemeBodyBg();
  }

  // More Compact Info Panel
  get panelTitle() {
    return this.getAttribute("panel-title") || this.getDefaultPanelTitle();
  }
  get panelDescription() {
    return (
      this.getAttribute("panel-description") ||
      this.getDefaultPanelDescription()
    );
  }
  get panelBg() {
    return this.getAttribute("panel-bg") || this.getThemePanelBg();
  }
  get panelTextColor() {
    return this.getAttribute("panel-text-color") || "#ffffff";
  }
  get panelPadding() {
    return this.getAttribute("panel-padding") || "2rem";
  } // Further reduced

  // More Compact Form Styling
  get formBg() {
    return this.getAttribute("form-bg") || this.getThemeFormBg();
  }
  get formTextColor() {
    return this.getAttribute("form-text-color") || this.getThemeTextColor();
  }
  get formPadding() {
    return this.getAttribute("form-padding") || "2rem";
  } // Further reduced

  get inputBg() {
    return this.getAttribute("input-bg") || this.getThemeInputBg();
  }
  get inputColor() {
    return this.getAttribute("input-color") || this.getThemeTextColor();
  }
  get inputBorder() {
    return this.getAttribute("input-border") || this.getThemeInputBorder();
  }
  get inputRadius() {
    return this.getAttribute("input-radius") || "12px";
  }
  get inputPadding() {
    return this.getAttribute("input-padding") || "0.75rem 1rem";
  } // Further reduced

  get labelColor() {
    return this.getAttribute("label-color") || this.getThemeLabelColor();
  }
  get labelSize() {
    return this.getAttribute("label-size") || "0.875rem";
  }
  get labelWeight() {
    return this.getAttribute("label-weight") || "500";
  }

  // More Compact Button
  get buttonText() {
    return this.getAttribute("button-text") || this.getDefaultButtonText();
  }
  get buttonBg() {
    return this.getAttribute("button-bg") || this.getThemeButtonBg();
  }
  get buttonColor() {
    return this.getAttribute("button-color") || "#ffffff";
  }
  get buttonHoverBg() {
    return this.getAttribute("button-hover-bg") || this.getThemeButtonHoverBg();
  }
  get buttonHoverColor() {
    return this.getAttribute("button-hover-color") || "#ffffff";
  }
  get buttonRadius() {
    return this.getAttribute("button-radius") || "12px";
  }
  get buttonPadding() {
    return this.getAttribute("button-padding") || "0.75rem 1.5rem";
  } // Further reduced
  get buttonWidth() {
    return this.getAttribute("button-width") || "100%";
  }

  // Form Submission
  get action() {
    return this.getAttribute("action") || "";
  }
  get method() {
    return this.getAttribute("method") || "POST";
  }
  get successMessage() {
    return (
      this.getAttribute("success-message") || "Form submitted successfully!"
    );
  }
  get errorMessage() {
    return (
      this.getAttribute("error-message") ||
      "Please fill out all required fields."
    );
  }

  // Modern theme colors
  getThemeBodyBg() {
    return this.theme === "light"
      ? "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)"
      : "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)";
  }

  getThemePanelBg() {
    return this.theme === "light"
      ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
      : "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)";
  }

  getThemeFormBg() {
    return this.theme === "light" ? "#ffffff" : "rgba(30, 41, 59, 0.8)";
  }

  getThemeTextColor() {
    return this.theme === "light" ? "#1e293b" : "#f1f5f9";
  }

  getThemeLabelColor() {
    return this.theme === "light" ? "#64748b" : "#cbd5e1";
  }

  getThemeInputBg() {
    return this.theme === "light" ? "#f8fafc" : "rgba(15, 23, 42, 0.6)";
  }

  getThemeInputBorder() {
    return this.theme === "light" ? "#e2e8f0" : "rgba(51, 65, 85, 0.6)";
  }

  getThemeButtonBg() {
    return this.theme === "light" ? "#6366f1" : "#3b82f6";
  }

  getThemeButtonHoverBg() {
    return this.theme === "light" ? "#4f46e5" : "#2563eb";
  }

  _upgradeProperties() {
    this.constructor.observedAttributes.forEach((prop) => {
      if (this.hasOwnProperty(prop)) {
        const value = this[prop];
        delete this[prop];
        this[prop] = value;
      }
    });
  }

  getDefaultFields() {
    switch (this.type) {
      case "login":
        return [
          {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            required: true,
          },
          {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Enter your password",
            required: true,
          },
        ];
      case "register":
        return [
          {
            label: "Full Name",
            type: "text",
            name: "name",
            placeholder: "Enter your full name",
            required: true,
          },
          {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            required: true,
          },
          {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Create a password",
            required: true,
          },
          {
            label: "Confirm Password",
            type: "password",
            name: "confirm_password",
            placeholder: "Confirm your password",
            required: true,
          },
        ];
      case "contact":
      default:
        return [
          {
            label: "Name",
            type: "text",
            name: "name",
            placeholder: "Your name",
            required: true,
          },
          {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "your.email@example.com",
            required: true,
          },
          {
            label: "Subject",
            type: "text",
            name: "subject",
            placeholder: "What's this about?",
            required: true,
          },
          {
            label: "Message",
            type: "textarea",
            name: "message",
            placeholder: "Your message here...",
            rows: 3,
            required: true,
          }, // Reduced rows
        ];
    }
  }

  getDefaultPanelTitle() {
    switch (this.type) {
      case "login":
        return "Welcome Back";
      case "register":
        return "Join Us";
      case "contact":
      default:
        return "Get In Touch";
    }
  }

  getDefaultPanelDescription() {
    switch (this.type) {
      case "login":
        return "Sign in to continue your journey.";
      case "register":
        return "Create your account to get started.";
      case "contact":
      default:
        return "We'd love to hear from you.";
    }
  }

  getDefaultButtonText() {
    switch (this.type) {
      case "login":
        return "Sign In";
      case "register":
        return "Create Account";
      case "contact":
      default:
        return "Send Message";
    }
  }

  generateFieldHTML(field, index) {
    const fieldId = `field-${field.name}-${index}`;
    const isRequired = field.required || false;
    const requiredAttr = isRequired ? "required" : "";

    switch (field.type) {
      case "textarea":
        return `
          <div class="field-group">
            <label for="${fieldId}" class="field-label">
              ${field.label}${isRequired ? " *" : ""}
            </label>
            <textarea
              id="${fieldId}"
              name="${field.name}"
              class="field-input textarea-input"
              placeholder="${field.placeholder || ""}"
              rows="${field.rows || 3}"
              ${requiredAttr}
              aria-describedby="${fieldId}-error"
            ></textarea>
            <div id="${fieldId}-error" class="field-error" role="alert"></div>
          </div>
        `;

      case "select":
        return `
          <div class="field-group">
            <label for="${fieldId}" class="field-label">
              ${field.label}${isRequired ? " *" : ""}
            </label>
            <select
              id="${fieldId}"
              name="${field.name}"
              class="field-input select-input"
              ${requiredAttr}
              aria-describedby="${fieldId}-error"
            >
              <option value="">${
                field.placeholder || "Select an option"
              }</option>
              ${(field.options || [])
                .map(
                  (option) =>
                    `<option value="${option.value || option}">${
                      option.label || option
                    }</option>`
                )
                .join("")}
            </select>
            <div id="${fieldId}-error" class="field-error" role="alert"></div>
          </div>
        `;

      case "checkbox":
        return `
          <div class="field-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                id="${fieldId}"
                name="${field.name}"
                class="checkbox-input"
                value="${field.value || "true"}"
                ${requiredAttr}
                aria-describedby="${fieldId}-error"
              >
              <span class="checkbox-text">${field.label}${
          isRequired ? " *" : ""
        }</span>
            </label>
            <div id="${fieldId}-error" class="field-error" role="alert"></div>
          </div>
        `;

      default: // text, email, password, number
        return `
          <div class="field-group">
            <label for="${fieldId}" class="field-label">
              ${field.label}${isRequired ? " *" : ""}
            </label>
            <input
              type="${field.type}"
              id="${fieldId}"
              name="${field.name}"
              class="field-input"
              placeholder="${field.placeholder || ""}"
              ${requiredAttr}
              ${field.minlength ? `minlength="${field.minlength}"` : ""}
              ${field.maxlength ? `maxlength="${field.maxlength}"` : ""}
              ${field.min ? `min="${field.min}"` : ""}
              ${field.max ? `max="${field.max}"` : ""}
              ${field.pattern ? `pattern="${field.pattern}"` : ""}
              aria-describedby="${fieldId}-error"
            >
            <div id="${fieldId}-error" class="field-error" role="alert"></div>
          </div>
        `;
    }
  }

  validateForm() {
    const form = this.shadowRoot.querySelector("form");
    const formData = new FormData(form);
    let isValid = true;

    // Clear previous errors
    this.shadowRoot.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
      el.style.display = "none";
    });
    this.shadowRoot.querySelectorAll(".field-input").forEach((el) => {
      el.classList.remove("invalid");
    });

    // Custom validation for confirm password
    if (this.type === "register") {
      const password = formData.get("password");
      const confirmPassword = formData.get("confirm_password");
      if (password !== confirmPassword) {
        isValid = false;
        const confirmField = this.shadowRoot.querySelector(
          '[name="confirm_password"]'
        );
        const errorEl = this.shadowRoot.querySelector(
          "#field-confirm_password-3-error"
        );
        if (confirmField) confirmField.classList.add("invalid");
        if (errorEl) {
          errorEl.textContent = "Passwords do not match";
          errorEl.style.display = "block";
        }
      }
    }

    // HTML5 validation
    const inputs = this.shadowRoot.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        isValid = false;
        input.classList.add("invalid");
        const errorEl = this.shadowRoot.querySelector(`#${input.id}-error`);
        if (errorEl) {
          errorEl.textContent = input.validationMessage;
          errorEl.style.display = "block";
        }
      }
    });

    return isValid;
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this._isSubmitting) return;

    if (!this.validateForm()) {
      this.showMessage(this.errorMessage, "error");
      return;
    }

    this._isSubmitting = true;
    const submitButton = this.shadowRoot.querySelector(".submit-button");
    const originalText = submitButton.textContent;
    submitButton.textContent = "Submitting...";
    submitButton.disabled = true;

    try {
      const form = this.shadowRoot.querySelector("form");
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent("form-submit", {
          bubbles: true,
          composed: true,
          detail: { data, formData, type: this.type },
        })
      );

      // Send to server if action is provided
      if (this.action) {
        const response = await fetch(this.action, {
          method: this.method,
          body: this.method === "GET" ? null : formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      // Show success message and reset form
      this.showMessage(this.successMessage, "success");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      this.showMessage("An error occurred. Please try again.", "error");
    } finally {
      this._isSubmitting = false;
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  }

  showMessage(message, type) {
    const messageEl = this.shadowRoot.querySelector(".form-message");
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    messageEl.style.display = "block";
    messageEl.setAttribute("role", type === "error" ? "alert" : "status");

    // Auto-hide after 5 seconds
    setTimeout(() => {
      messageEl.style.display = "none";
    }, 5000);
  }

  setupEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    if (form) {
      form.addEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  removeEventListeners() {
    const form = this.shadowRoot.querySelector("form");
    if (form) {
      form.removeEventListener("submit", this.handleSubmit.bind(this));
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: ${this.width};
          height: ${this.height};
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .background-wrapper {
          background: ${this.bodyBg};
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: ${this.padding};
          position: relative;
        }

        .form-container {
          width: 100%;
          max-width: ${this.maxWidth};
          margin: ${this.margin};
          position: relative;
          z-index: 1;
          ${
            this.layout === "split"
              ? `
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 420px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-radius: ${this.radius};
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid ${
              this.theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
          `
              : this.layout === "stacked"
              ? `
            display: flex;
            flex-direction: column;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-radius: ${this.radius};
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid ${
              this.theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
          `
              : `
            display: block;
            max-width: 450px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            border-radius: ${this.radius};
            overflow: hidden;
            backdrop-filter: blur(10px);
            border: 1px solid ${
              this.theme === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            };
          `
          }
        }

        .info-panel {
          background: ${this.panelBg};
          color: ${this.panelTextColor};
          padding: ${this.panelPadding};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .info-panel::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 50%, 
            transparent 100%
          );
          pointer-events: none;
        }

        .info-content {
          position: relative;
          z-index: 1;
          max-width: 280px;
        }

        .panel-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .panel-description {
          font-size: 0.95rem;
          line-height: 1.4;
          opacity: 0.9;
          font-weight: 400;
        }

        .form-section {
          background: ${this.formBg};
          color: ${this.formTextColor};
          padding: ${this.formPadding};
          display: flex;
          flex-direction: column;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-align: center;
          letter-spacing: -0.02em;
        }

        .form-subtitle {
          font-size: 0.825rem;
          color: ${this.labelColor};
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 400;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: ${this.labelSize};
          font-weight: ${this.labelWeight};
          color: ${this.labelColor};
          margin-bottom: 0;
        }

        .field-input {
          width: 100%;
          padding: ${this.inputPadding};
          background: ${this.inputBg};
          color: ${this.inputColor};
          border: 1px solid ${this.inputBorder};
          border-radius: ${this.inputRadius};
          font-size: 0.9rem;
          font-family: inherit;
          font-weight: 400;
          transition: all 0.2s ease;
          backdrop-filter: blur(5px);
        }

        .field-input:focus {
          outline: none;
          border-color: ${this.buttonBg};
          box-shadow: 0 0 0 3px ${
            this.theme === "light"
              ? "rgba(99, 102, 241, 0.1)"
              : "rgba(59, 130, 246, 0.2)"
          };
          transform: translateY(-1px);
        }

        .field-input.invalid {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .textarea-input {
          resize: vertical;
          min-height: 75px;
          line-height: 1.4;
        }

        .select-input {
          cursor: pointer;
        }

        .field-error {
          color: #ef4444;
          font-size: 0.75rem;
          margin-top: 0.2rem;
          display: none;
        }

        .checkbox-group {
          gap: 0.6rem;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          color: ${this.formTextColor};
        }

        .checkbox-input {
          accent-color: ${this.buttonBg};
          width: 1rem;
          height: 1rem;
        }

        .submit-button {
          width: ${this.buttonWidth};
          padding: ${this.buttonPadding};
          background: ${this.buttonBg};
          color: ${this.buttonColor};
          border: none;
          border-radius: ${this.buttonRadius};
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 0.75rem;
          box-shadow: 0 8px 20px -8px ${this.buttonBg}60;
        }

        .submit-button:hover:not(:disabled) {
          background: ${this.buttonHoverBg};
          transform: translateY(-2px);
          box-shadow: 0 12px 25px -8px ${this.buttonBg}70;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .form-message {
          padding: 0.75rem;
          border-radius: 12px;
          font-weight: 500;
          margin-top: 0.75rem;
          display: none;
          text-align: center;
          font-size: 0.8rem;
        }

        .form-message.success {
          background: ${
            this.theme === "light"
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(34, 197, 94, 0.2)"
          };
          color: ${this.theme === "light" ? "#15803d" : "#4ade80"};
          border: 1px solid ${
            this.theme === "light"
              ? "rgba(34, 197, 94, 0.2)"
              : "rgba(34, 197, 94, 0.3)"
          };
        }

        .form-message.error {
          background: ${
            this.theme === "light"
              ? "rgba(239, 68, 68, 0.1)"
              : "rgba(239, 68, 68, 0.2)"
          };
          color: ${this.theme === "light" ? "#dc2626" : "#f87171"};
          border: 1px solid ${
            this.theme === "light"
              ? "rgba(239, 68, 68, 0.2)"
              : "rgba(239, 68, 68, 0.3)"
          };
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .background-wrapper {
            padding: 1rem;
          }

          .form-container {
            grid-template-columns: 1fr !important;
            max-width: 100%;
            min-height: auto !important;
          }
          
          .info-panel, .form-section {
            padding: 1.75rem;
          }
          
          .panel-title {
            font-size: 1.5rem;
          }

          .form-title {
            font-size: 1.4rem;
          }
        }
        
        @media (max-width: 480px) {
          .info-panel, .form-section {
            padding: 1.5rem;
          }
          
          .panel-title {
            font-size: 1.25rem;
          }

          .form-title {
            font-size: 1.2rem;
          }
          
          .field-input {
            font-size: 16px; /* Prevents zoom on iOS */
            padding: 0.7rem 0.9rem;
          }

          .submit-button {
            padding: 0.7rem 1.25rem;
          }
        }
      </style>

      <div class="background-wrapper">
        <div class="form-container">
          ${
            this.layout !== "single"
              ? `
            <div class="info-panel">
              <div class="info-content">
                <h2 class="panel-title">${this.panelTitle}</h2>
                <p class="panel-description">${this.panelDescription}</p>
              </div>
            </div>
          `
              : ""
          }

          <div class="form-section">
            <h2 class="form-title">${this.panelTitle}</h2>
            <p class="form-subtitle">Fill out the details below</p>
            <form class="form-content" novalidate>
              ${this.fields
                .map((field, index) => this.generateFieldHTML(field, index))
                .join("")}
              
              <button type="submit" class="submit-button">
                ${this.buttonText}
              </button>
              
              <div class="form-message" role="status" aria-live="polite"></div>
            </form>
          </div>
        </div>
      </div>
    `;

    // Re-setup event listeners after render
    if (this._initialized) {
      this.setupEventListeners();
    }
  }
}

// Register the component
if (!customElements.get("lume-form")) {
  customElements.define("lume-form", LumeForm);
}
