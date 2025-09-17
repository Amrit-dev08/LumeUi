(function () {
  "use strict";

  // LumeButton.js - Fixed Hover/Active States Version

  class LumeButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      // Bind methods
      this.handleClick = this.handleClick.bind(this);
      this.createRipple = this.createRipple.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);

      // Internal state
      this._initialized = false;
      this._rippleCleanup = null;
    }

    static get observedAttributes() {
      return [
        "variant",
        "size",
        "disabled",
        "href",
        "target",
        "color",
        "bg-color",
        "hover-color",
        "hover-bg-color",
        "active-color",
        "active-bg-color",
        "border",
        "radius",
        "padding",
        "font-size",
        "font-weight",
        "width",
        "height",
        "glow-color",
        "shadow",
        "onclick-handler",
        "loading",
        "full-width",
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

    // Property getters with validation and defaults
    get variant() {
      const value = this.getAttribute("variant") || "primary";
      const validVariants = [
        "primary",
        "secondary",
        "outlined",
        "ghost",
        "glow",
        "icon-btn",
        "link",
      ];
      return validVariants.includes(value) ? value : "primary";
    }

    get size() {
      const value = this.getAttribute("size") || "medium";
      const validSizes = ["small", "medium", "large"];
      return validSizes.includes(value) ? value : "medium";
    }

    get disabled() {
      return this.hasAttribute("disabled");
    }

    get loading() {
      return this.hasAttribute("loading");
    }

    get fullWidth() {
      return this.hasAttribute("full-width");
    }

    get href() {
      return this.getAttribute("href");
    }

    get target() {
      const value = this.getAttribute("target") || "_self";
      const validTargets = ["_self", "_blank", "_parent", "_top"];
      return validTargets.includes(value) ? value : "_self";
    }

    // Style property getters
    get color() {
      return this.getAttribute("color");
    }
    get bgColor() {
      return this.getAttribute("bg-color");
    }
    get hoverColor() {
      return this.getAttribute("hover-color");
    }
    get hoverBgColor() {
      return this.getAttribute("hover-bg-color");
    }
    get activeColor() {
      return this.getAttribute("active-color");
    }
    get activeBgColor() {
      return this.getAttribute("active-bg-color");
    }
    get border() {
      return this.getAttribute("border");
    }
    get radius() {
      return this.getAttribute("radius");
    }
    get padding() {
      return this.getAttribute("padding");
    }
    get fontSize() {
      return this.getAttribute("font-size");
    }
    get fontWeight() {
      return this.getAttribute("font-weight");
    }
    get width() {
      return this.getAttribute("width");
    }
    get height() {
      return this.getAttribute("height");
    }
    get glowColor() {
      return this.getAttribute("glow-color");
    }
    get shadow() {
      return this.getAttribute("shadow");
    }
    get onclickHandler() {
      return this.getAttribute("onclick-handler");
    }

    // Property setters with proper reflection
    set variant(value) {
      this.setAttribute("variant", value);
    }
    set size(value) {
      this.setAttribute("size", value);
    }
    set disabled(value) {
      if (value) this.setAttribute("disabled", "");
      else this.removeAttribute("disabled");
    }
    set loading(value) {
      if (value) this.setAttribute("loading", "");
      else this.removeAttribute("loading");
    }
    set href(value) {
      if (value) this.setAttribute("href", value);
      else this.removeAttribute("href");
    }

    // Upgrade properties that might have been set before element definition
    _upgradeProperties() {
      this.constructor.observedAttributes.forEach((prop) => {
        if (this.hasOwnProperty(prop)) {
          const value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      });
    }

    setupEventListeners() {
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeydown);
    }

    removeEventListeners() {
      this.removeEventListener("click", this.handleClick);
      this.removeEventListener("keydown", this.handleKeydown);
      if (this._rippleCleanup) {
        this._rippleCleanup();
        this._rippleCleanup = null;
      }
    }

    handleKeydown(event) {
      if (
        (event.key === "Enter" || event.key === " ") &&
        !this.disabled &&
        !this.loading
      ) {
        event.preventDefault();
        this.handleClick(event);
      }
    }

    handleClick(event) {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Execute custom onclick handler if provided
      if (this.onclickHandler) {
        try {
          const handler = new Function("event", "button", this.onclickHandler);
          handler.call(this, event, this);
        } catch (error) {
          console.error("Error executing onclick handler:", error);
        }
      }

      // Handle href navigation
      if (this.href && !event.defaultPrevented) {
        event.preventDefault();
        if (this.target === "_blank") {
          window.open(this.href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = this.href;
        }
      }

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent("lume-click", {
          bubbles: true,
          composed: true,
          detail: {
            button: this,
            originalEvent: event,
            href: this.href,
            variant: this.variant,
            size: this.size,
          },
        })
      );
    }

    // Generate inline styles for custom attributes (WITHOUT !important for hover/active)
    generateInlineStyles() {
      const styles = [];

      // Use regular styles without !important to allow hover/active to override
      if (this.color) styles.push(`color: ${this.color}`);
      if (this.bgColor) styles.push(`background: ${this.bgColor}`);
      if (this.border) styles.push(`border: ${this.border} !important`);
      if (this.radius) styles.push(`border-radius: ${this.radius} !important`);
      if (this.padding) styles.push(`padding: ${this.padding} !important`);
      if (this.fontSize) styles.push(`font-size: ${this.fontSize} !important`);
      if (this.fontWeight)
        styles.push(`font-weight: ${this.fontWeight} !important`);
      if (this.width) styles.push(`width: ${this.width} !important`);
      if (this.height) styles.push(`height: ${this.height} !important`);
      if (this.shadow) styles.push(`box-shadow: ${this.shadow} !important`);

      return styles.join("; ");
    }

    // Generate unique class name for this instance
    getInstanceId() {
      if (!this._instanceId) {
        this._instanceId =
          "lume-btn-" + Math.random().toString(36).substr(2, 9);
      }
      return this._instanceId;
    }

    render() {
      const isLink = !!this.href;
      const isDisabled = this.disabled || this.loading;
      const elementType = isLink ? "a" : "button";
      const inlineStyles = this.generateInlineStyles();
      const instanceId = this.getInstanceId();

      // Generate glow effect for glow variant
      let glowEffect = "";
      if (this.variant === "glow") {
        const glowColor = this.glowColor || "rgba(37, 99, 235, 0.5)";
        glowEffect = `
        .btn.variant-glow {
          box-shadow: 0 0 20px ${glowColor} !important;
        }
        .btn.variant-glow:hover:not(.disabled):not(.loading) {
          box-shadow: 0 0 30px ${glowColor} !important;
        }
      `;
      }

      // Generate custom hover and active styles with proper specificity
      const customHoverActiveStyles = `
      /* Custom hover styles with higher specificity */
      .btn.${instanceId}:hover:not(.disabled):not(.loading) {
        ${this.hoverColor ? `color: ${this.hoverColor} !important;` : ""}
        ${
          this.hoverBgColor
            ? `background: ${this.hoverBgColor} !important;`
            : ""
        }
      }
      
      /* Custom active styles with higher specificity */
      .btn.${instanceId}:active:not(.disabled):not(.loading) {
        ${this.activeColor ? `color: ${this.activeColor} !important;` : ""}
        ${
          this.activeBgColor
            ? `background: ${this.activeBgColor} !important;`
            : ""
        }
      }
    `;

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: ${this.fullWidth ? "block" : "inline-block"};
          --primary-bg: #2563eb;
          --primary-color: #ffffff;
          --primary-hover-bg: #1d4ed8;
          --primary-active-bg: #1e40af;
          
          --secondary-bg: #6b7280;
          --secondary-color: #ffffff;
          --secondary-hover-bg: #4b5563;
          --secondary-active-bg: #374151;
          
          --outlined-bg: transparent;
          --outlined-color: #2563eb;
          --outlined-border: 1px solid #2563eb;
          --outlined-hover-bg: #2563eb;
          --outlined-hover-color: #ffffff;
          
          --ghost-bg: transparent;
          --ghost-color: #374151;
          --ghost-hover-bg: #f3f4f6;
          --ghost-active-bg: #e5e7eb;
          
          --link-bg: transparent;
          --link-color: #2563eb;
          --link-hover-color: #1d4ed8;
        }

        :host([hidden]) {
          display: none !important;
        }

        :host([full-width]) .btn {
          width: 100%;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
          
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 500;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          vertical-align: middle;
          line-height: 1.2;
          
          min-width: 0;
          border: 1px solid transparent;
          border-radius: 0.5rem;
          
          cursor: pointer;
          transition: all 0.15s ease-in-out;
          outline: none;
        }

        /* Size variants */
        .size-small {
          font-size: 0.875rem;
          padding: 0.375rem 0.75rem;
          min-height: 2rem;
        }

        .size-medium {
          font-size: 1rem;
          padding: 0.5rem 1rem;
          min-height: 2.5rem;
        }

        .size-large {
          font-size: 1.125rem;
          padding: 0.75rem 1.5rem;
          min-height: 3rem;
        }

        /* Variant styles */
        .variant-primary {
          background-color: var(--primary-bg);
          color: var(--primary-color);
          border-color: var(--primary-bg);
        }

        .variant-primary:hover:not(.disabled):not(.loading) {
          background-color: var(--primary-hover-bg);
          border-color: var(--primary-hover-bg);
          transform: translateY(-1px);
        }

        .variant-primary:active:not(.disabled):not(.loading) {
          background-color: var(--primary-active-bg);
          border-color: var(--primary-active-bg);
          transform: translateY(0);
        }

        .variant-secondary {
          background-color: var(--secondary-bg);
          color: var(--secondary-color);
          border-color: var(--secondary-bg);
        }

        .variant-secondary:hover:not(.disabled):not(.loading) {
          background-color: var(--secondary-hover-bg);
          border-color: var(--secondary-hover-bg);
          transform: translateY(-1px);
        }

        .variant-secondary:active:not(.disabled):not(.loading) {
          background-color: var(--secondary-active-bg);
          border-color: var(--secondary-active-bg);
          transform: translateY(0);
        }

        .variant-outlined {
          background-color: var(--outlined-bg);
          color: var(--outlined-color);
          border: var(--outlined-border);
        }

        .variant-outlined:hover:not(.disabled):not(.loading) {
          background-color: var(--outlined-hover-bg);
          color: var(--outlined-hover-color);
          transform: translateY(-1px);
        }

        .variant-outlined:active:not(.disabled):not(.loading) {
          background-color: var(--primary-active-bg);
          color: var(--outlined-hover-color);
          transform: translateY(0);
        }

        .variant-ghost {
          background-color: var(--ghost-bg);
          color: var(--ghost-color);
          border-color: transparent;
        }

        .variant-ghost:hover:not(.disabled):not(.loading) {
          background-color: var(--ghost-hover-bg);
          transform: translateY(-1px);
        }

        .variant-ghost:active:not(.disabled):not(.loading) {
          background-color: var(--ghost-active-bg);
          transform: translateY(0);
        }

        .variant-glow {
          background-color: var(--primary-bg);
          color: var(--primary-color);
          border-color: var(--primary-bg);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
        }

        .variant-glow:hover:not(.disabled):not(.loading) {
          background-color: var(--primary-hover-bg);
          border-color: var(--primary-hover-bg);
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.8);
          transform: translateY(-1px);
        }

        .variant-glow:active:not(.disabled):not(.loading) {
          background-color: var(--primary-active-bg);
          border-color: var(--primary-active-bg);
          transform: translateY(0);
        }

        .variant-link {
          background-color: var(--link-bg);
          color: var(--link-color);
          border: none;
          box-shadow: none;
          padding: 0;
          min-height: auto;
          text-decoration: underline;
        }

        .variant-link:hover:not(.disabled):not(.loading) {
          color: var(--link-hover-color);
          transform: none;
        }

        .variant-link:active:not(.disabled):not(.loading) {
          color: var(--primary-active-bg);
          transform: none;
        }

        .variant-icon-btn {
          padding: 0.5rem;
          aspect-ratio: 1;
          border-radius: 50%;
          background-color: var(--primary-bg);
          color: var(--primary-color);
        }

        .variant-icon-btn.size-small {
          padding: 0.375rem;
        }

        .variant-icon-btn.size-large {
          padding: 0.75rem;
        }

        .variant-icon-btn:hover:not(.disabled):not(.loading) {
          background-color: var(--primary-hover-bg);
          transform: translateY(-1px);
        }

        .variant-icon-btn:active:not(.disabled):not(.loading) {
          background-color: var(--primary-active-bg);
          transform: translateY(0);
        }

        /* Custom glow effect */
        ${glowEffect}

        /* Custom hover and active styles with proper specificity */
        ${customHoverActiveStyles}

        .btn:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }

        .btn.disabled,
        .btn.loading {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
          transform: none !important;
        }

        /* Loading state */
        .loading-spinner {
          width: 1em;
          height: 1em;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Ripple effect */
        .ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes ripple-animation {
          to { 
            transform: scale(4); 
            opacity: 0; 
          }
        }

        /* Slot styles */
        ::slotted(svg),
        ::slotted(i),
        ::slotted(.icon) {
          width: 1em;
          height: 1em;
          flex-shrink: 0;
        }

        .btn-content {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
          position: relative;
        }
      </style>

      <${elementType}
        class="btn ${instanceId} variant-${this.variant} size-${this.size} ${
        isDisabled ? "disabled" : ""
      } ${this.loading ? "loading" : ""}"
        ${!isLink ? 'type="button"' : ""}
        ${isLink ? `href="${this.href}"` : ""}
        ${isLink ? `target="${this.target}"` : ""}
        ${isDisabled ? "disabled" : ""}
        ${isLink ? "" : `aria-disabled="${isDisabled}"`}
        tabindex="${isDisabled ? "-1" : "0"}"
        role="${isLink ? "link" : "button"}"
        ${this.loading ? 'aria-busy="true"' : ""}
        ${this.loading ? 'aria-live="polite"' : ""}
        ${inlineStyles ? `style="${inlineStyles}"` : ""}
      >
        <span class="btn-content">
          ${
            this.loading
              ? '<span class="loading-spinner" aria-hidden="true"></span>'
              : ""
          }
          <slot></slot>
        </span>
      </${elementType}>
    `;

      // Setup ripple effect after rendering
      this.setupRippleEffect();
    }

    setupRippleEffect() {
      const btn = this.shadowRoot?.querySelector(".btn");
      if (btn && !this.disabled && !this.loading) {
        // Clean up previous listener
        if (this._rippleCleanup) {
          this._rippleCleanup();
        }

        const rippleHandler = (event) => this.createRipple(event);
        btn.addEventListener("click", rippleHandler);

        this._rippleCleanup = () => {
          btn.removeEventListener("click", rippleHandler);
        };
      }
    }

    createRipple(event) {
      if (this.disabled || this.loading || this.variant === "link") return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      button.appendChild(ripple);
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove();
        }
      }, 600);
    }

    // Enhanced public methods
    click() {
      if (!this.disabled && !this.loading) {
        const btn = this.shadowRoot?.querySelector(".btn");
        if (btn) btn.click();
      }
    }

    focus() {
      const btn = this.shadowRoot?.querySelector(".btn");
      if (btn) btn.focus();
    }

    blur() {
      const btn = this.shadowRoot?.querySelector(".btn");
      if (btn) btn.blur();
    }

    setDisabled(disabled) {
      this.disabled = disabled;
    }

    setLoading(loading) {
      this.loading = loading;
    }

    updateStyle(property, value) {
      if (value === null || value === undefined) {
        this.removeAttribute(property);
      } else {
        this.setAttribute(property, value);
      }
    }

    // Validation method
    validate() {
      const issues = [];

      if (this.disabled && this.loading) {
        issues.push("Button cannot be both disabled and loading");
      }

      return issues;
    }
  }

  // Register the custom element
  if (!customElements.get("lume-button")) {
    customElements.define("lume-button", LumeButton);
  }

  // LumeNavbar.js - Modern Navbar Web Component

  class LumeNavbar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      // Bind methods
      this.handleToggle = this.handleToggle.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
      this.handleLinkClick = this.handleLinkClick.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);

      // Internal state
      this._initialized = false;
      this._isOpen = false;
      this._resizeObserver = null;
    }

    static get observedAttributes() {
      return [
        // Core
        "variant",
        "theme",

        // Logo
        "logo-text",
        "logo-src",
        "logo-width",
        "logo-height",

        // Colors
        "brand-color",
        "bg-color",
        "text-color",

        // Layout
        "mobile-breakpoint",
        "sticky",
        "shadow",
        "blur-bg",
        "border-bottom",
        "height",
        "padding",
        "max-width",
        "container-padding",

        // Mobile Menu
        "mobile-menu-bg",
        "mobile-menu-position",
        "animation-duration",
        "hamburger-color",

        // Links
        "active-link-color",
        "hover-link-color",

        // Button Styling
        "button-bg",
        "button-color",
        "button-hover-bg",
        "button-hover-color",
        "button-radius",
        "button-padding",

        // Options
        "transparent",
        "center-links",
        "reverse-layout",
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
      if (this._resizeObserver) {
        this._resizeObserver.disconnect();
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (this._initialized && oldValue !== newValue) {
        this.render();
      }
    }

    // Property getters with validation and defaults
    get variant() {
      const value = this.getAttribute("variant") || "default";
      const validVariants = [
        "default",
        "glassmorphism",
        "gradient",
        "split",
        "sidebar",
        "floating",
        "mega",
        "transparent",
      ];
      return validVariants.includes(value) ? value : "default";
    }

    get theme() {
      const value = this.getAttribute("theme") || "dark"; // Default to dark theme
      const validThemes = ["dark", "light"];
      return validThemes.includes(value) ? value : "dark";
    }

    get logoText() {
      return this.getAttribute("logo-text") || "Brand";
    }

    get logoSrc() {
      return this.getAttribute("logo-src");
    }

    get logoWidth() {
      return this.getAttribute("logo-width") || "auto";
    }

    get logoHeight() {
      return this.getAttribute("logo-height") || "40px";
    }

    get brandColor() {
      return this.getAttribute("brand-color") || this.getThemeBrandColor();
    }

    get bgColor() {
      return this.getAttribute("bg-color") || this.getThemeBgColor();
    }

    get textColor() {
      return this.getAttribute("text-color") || this.getThemeTextColor();
    }

    get mobileBreakpoint() {
      return this.getAttribute("mobile-breakpoint") || "768px";
    }

    get sticky() {
      return this.hasAttribute("sticky");
    }

    get shadow() {
      return this.getAttribute("shadow") || this.getThemeShadow();
    }

    get blurBg() {
      return this.hasAttribute("blur-bg");
    }

    get borderBottom() {
      return this.getAttribute("border-bottom") || this.getThemeBorder();
    }

    get height() {
      return this.getAttribute("height") || "auto";
    }

    get padding() {
      return this.getAttribute("padding");
    }

    get maxWidth() {
      return this.getAttribute("max-width") || "1200px";
    }

    get containerPadding() {
      return this.getAttribute("container-padding") || "1rem";
    }

    get mobileMenuBg() {
      return this.getAttribute("mobile-menu-bg") || this.getThemeMobileMenuBg();
    }

    get mobileMenuPosition() {
      const value = this.getAttribute("mobile-menu-position") || "top";
      const validPositions = ["top", "left", "right", "overlay"];
      return validPositions.includes(value) ? value : "top";
    }

    get animationDuration() {
      return this.getAttribute("animation-duration") || "0.3s";
    }

    get hamburgerColor() {
      return this.getAttribute("hamburger-color") || this.textColor;
    }

    get activeLinkColor() {
      return this.getAttribute("active-link-color") || this.brandColor;
    }

    get hoverLinkColor() {
      return this.getAttribute("hover-link-color") || this.brandColor;
    }

    // Button styling
    get buttonBg() {
      return this.getAttribute("button-bg") || this.getThemeButtonBg();
    }

    get buttonColor() {
      return this.getAttribute("button-color") || "#ffffff";
    }

    get buttonHoverBg() {
      return (
        this.getAttribute("button-hover-bg") || this.getThemeButtonHoverBg()
      );
    }

    get buttonHoverColor() {
      return this.getAttribute("button-hover-color") || "#ffffff";
    }

    get buttonRadius() {
      return this.getAttribute("button-radius") || "8px";
    }

    get buttonPadding() {
      return this.getAttribute("button-padding") || "0.5rem 1rem";
    }

    get transparent() {
      return this.hasAttribute("transparent");
    }

    get centerLinks() {
      return this.hasAttribute("center-links");
    }

    get reverseLayout() {
      return this.hasAttribute("reverse-layout");
    }

    // Theme-based defaults
    getThemeBrandColor() {
      return this.theme === "light" ? "#2563eb" : "#3b82f6";
    }

    getThemeBgColor() {
      return this.theme === "light" ? "#ffffff" : "#1e293b";
    }

    getThemeTextColor() {
      return this.theme === "light" ? "#374151" : "#f1f5f9";
    }

    getThemeShadow() {
      return this.theme === "light"
        ? "0 2px 10px rgba(0, 0, 0, 0.1)"
        : "0 4px 20px rgba(0, 0, 0, 0.3)";
    }

    getThemeBorder() {
      return this.theme === "light"
        ? "1px solid rgba(0, 0, 0, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.1)";
    }

    getThemeMobileMenuBg() {
      return this.theme === "light" ? "#ffffff" : "#1e293b";
    }

    getThemeButtonBg() {
      return this.theme === "light" ? "#2563eb" : "#3b82f6";
    }

    getThemeButtonHoverBg() {
      return this.theme === "light" ? "#1d4ed8" : "#2563eb";
    }

    // Property setters with proper reflection
    set variant(value) {
      this.setAttribute("variant", value);
    }

    set theme(value) {
      this.setAttribute("theme", value);
    }

    set logoText(value) {
      this.setAttribute("logo-text", value);
    }

    set sticky(value) {
      if (value) this.setAttribute("sticky", "");
      else this.removeAttribute("sticky");
    }

    // Upgrade properties that might have been set before element definition
    _upgradeProperties() {
      this.constructor.observedAttributes.forEach((prop) => {
        if (this.hasOwnProperty(prop)) {
          const value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      });
    }

    setupEventListeners() {
      // Mobile menu toggle
      const hamburger = this.shadowRoot?.querySelector(".hamburger");
      if (hamburger) {
        hamburger.addEventListener("click", this.handleToggle);
      }

      // Resize listener for mobile breakpoint
      window.addEventListener("resize", this.handleResize);

      // Close mobile menu when clicking outside
      document.addEventListener("click", this.handleOutsideClick);

      // Handle link clicks
      const links = this.shadowRoot?.querySelectorAll(
        ".nav-link, .mobile-nav-link"
      );
      links?.forEach((link) => {
        link.addEventListener("click", this.handleLinkClick);
      });

      // Handle button clicks
      const buttons = this.shadowRoot?.querySelectorAll(".nav-button");
      buttons?.forEach((button) => {
        button.addEventListener("click", this.handleButtonClick);
      });
    }

    removeEventListeners() {
      const hamburger = this.shadowRoot?.querySelector(".hamburger");
      if (hamburger) {
        hamburger.removeEventListener("click", this.handleToggle);
      }

      window.removeEventListener("resize", this.handleResize);
      document.removeEventListener("click", this.handleOutsideClick);

      const links = this.shadowRoot?.querySelectorAll(
        ".nav-link, .mobile-nav-link"
      );
      links?.forEach((link) => {
        link.removeEventListener("click", this.handleLinkClick);
      });

      const buttons = this.shadowRoot?.querySelectorAll(".nav-button");
      buttons?.forEach((button) => {
        button.removeEventListener("click", this.handleButtonClick);
      });
    }

    handleToggle(event) {
      event.stopPropagation();
      this._isOpen = !this._isOpen;
      this.updateMobileMenuState();
    }

    handleResize() {
      const mobileBreakpoint = parseInt(this.mobileBreakpoint);
      if (window.innerWidth > mobileBreakpoint) {
        this._isOpen = false;
        this.updateMobileMenuState();
      }
    }

    handleOutsideClick(event) {
      if (!this.contains(event.target) && this._isOpen) {
        this._isOpen = false;
        this.updateMobileMenuState();
      }
    }

    handleLinkClick(event) {
      const link = event.currentTarget;
      const href = link.getAttribute("href");
      link.getAttribute("target");

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent("lume-nav-click", {
          bubbles: true,
          composed: true,
          detail: {
            navbar: this,
            link: link,
            href: href,
            text: link.textContent,
            type: "link",
            originalEvent: event,
          },
        })
      );

      // Close mobile menu on link click
      if (this._isOpen) {
        this._isOpen = false;
        this.updateMobileMenuState();
      }
    }

    handleButtonClick(event) {
      const button = event.currentTarget;
      const href = button.getAttribute("data-href");
      const target = button.getAttribute("data-target");

      // Dispatch custom event
      this.dispatchEvent(
        new CustomEvent("lume-nav-click", {
          bubbles: true,
          composed: true,
          detail: {
            navbar: this,
            button: button,
            href: href,
            text: button.textContent,
            type: "button",
            originalEvent: event,
          },
        })
      );

      // Handle navigation if href is provided
      if (href) {
        if (target === "_blank") {
          window.open(href, "_blank");
        } else {
          window.location.href = href;
        }
      }

      // Close mobile menu on button click
      if (this._isOpen) {
        this._isOpen = false;
        this.updateMobileMenuState();
      }
    }

    updateMobileMenuState() {
      const mobileMenu = this.shadowRoot?.querySelector(".mobile-menu");
      const hamburger = this.shadowRoot?.querySelector(".hamburger");

      if (mobileMenu && hamburger) {
        mobileMenu.classList.toggle("open", this._isOpen);
        hamburger.classList.toggle("open", this._isOpen);
      }
    }

    // Generate variant-specific styles
    generateVariantStyles() {
      const variant = this.variant;
      let variantStyles = "";

      switch (variant) {
        case "glassmorphism":
          variantStyles = `
          .navbar {
            background: rgba(${
              this.theme === "light" ? "255, 255, 255" : "30, 41, 59"
            }, 0.8);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(${
              this.theme === "light" ? "0, 0, 0" : "255, 255, 255"
            }, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, ${
              this.theme === "light" ? "0.1" : "0.3"
            });
          }
          .mobile-menu {
            background: rgba(${
              this.theme === "light" ? "255, 255, 255" : "30, 41, 59"
            }, 0.95);
            backdrop-filter: blur(20px);
          }
        `;
          break;

        case "gradient":
          variantStyles = `
          .navbar {
            background: ${
              this.theme === "light"
                ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                : "linear-gradient(135deg, #1e293b 0%, #334155 100%)"
            };
            color: #ffffff;
          }
          .nav-link, .logo-text {
            color: rgba(255, 255, 255, 0.9);
          }
          .nav-link:hover, .nav-link.active {
            color: white;
            background: rgba(255, 255, 255, 0.1);
          }
        `;
          break;

        case "floating":
          variantStyles = `
          .navbar {
            margin: 1.5rem auto;
            max-width: calc(${this.maxWidth} - 3rem);
            border-radius: 25px;
            background: ${
              this.theme === "light"
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(30, 41, 59, 0.95)"
            };
            backdrop-filter: blur(30px);
            border: 1px solid rgba(${
              this.theme === "light" ? "0, 0, 0" : "255, 255, 255"
            }, 0.15);
            box-shadow: 
              0 20px 50px -15px rgba(0, 0, 0, ${
                this.theme === "light" ? "0.15" : "0.4"
              }),
              0 8px 30px -8px rgba(0, 0, 0, ${
                this.theme === "light" ? "0.1" : "0.3"
              }),
              inset 0 1px 0 rgba(255, 255, 255, ${
                this.theme === "light" ? "0.8" : "0.1"
              });
            position: relative;
            overflow: hidden;
          }
          
          .navbar::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, ${
                this.theme === "light" ? "0.8" : "0.1"
              }) 0%, 
              rgba(255, 255, 255, ${
                this.theme === "light" ? "0.4" : "0.05"
              }) 50%, 
              rgba(255, 255, 255, 0) 100%
            );
            pointer-events: none;
            z-index: 0;
          }
          
          .nav-container {
            padding: 0.75rem 2rem;
            position: relative;
            z-index: 1;
          }
          
          .nav-links {
            gap: 2.5rem;
          }
          
          .nav-link {
            padding: 0.75rem 1.25rem;
            border-radius: 15px;
            font-weight: 600;
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-link::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.1), transparent);
            transition: left 0.5s ease;
          }
          
          .nav-link:hover::before {
            left: 100%;
          }
          
          .nav-link:hover {
            transform: translateY(-2px);
            background: rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.1);
            box-shadow: 0 8px 25px -8px rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.3);
          }
          
          .nav-button {
            border-radius: 20px;
            padding: 0.75rem 1.75rem;
            font-weight: 600;
            position: relative;
            overflow: hidden;
            box-shadow: 0 4px 15px -4px rgba(0, 0, 0, 0.2);
          }
          
          .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 0.6s ease;
          }
          
          .nav-button:hover::before {
            transform: translateX(100%);
          }
          
          .mobile-menu {
            margin-top: 1.5rem;
            border-radius: 20px;
            background: ${
              this.theme === "light"
                ? "rgba(255, 255, 255, 0.95)"
                : "rgba(30, 41, 59, 0.95)"
            };
            backdrop-filter: blur(30px);
            border: 1px solid rgba(${
              this.theme === "light" ? "0, 0, 0" : "255, 255, 255"
            }, 0.15);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, ${
              this.theme === "light" ? "0.2" : "0.4"
            });
          }
        `;
          break;

        case "transparent":
          variantStyles = `
          .navbar {
            background: transparent;
            border: none;
            box-shadow: none;
            position: relative;
          }
          
          .navbar::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
            height: 1px;
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(${
                this.theme === "light" ? "0, 0, 0" : "255, 255, 255"
              }, 0.3) 50%, 
              transparent 100%
            );
            transition: all 0.3s ease;
          }
          
          .navbar:hover::after {
            width: 80%;
            background: linear-gradient(90deg, 
              transparent 0%, 
              rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 0.6) 50%, 
              transparent 100%
            );
          }
          
          .nav-link {
            position: relative;
            font-weight: 600;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, 
              rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 1) 0%, 
              rgba(${
                this.theme === "light" ? "99, 102, 241" : "139, 92, 246"
              }, 1) 100%
            );
            border-radius: 2px;
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-link:hover::after,
          .nav-link.active::after {
            transform: translateX(-50%) scaleX(1);
          }
          
          .nav-link:hover {
            transform: translateY(-2px);
            text-shadow: 0 4px 20px rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.4);
            background: rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.08);
            backdrop-filter: blur(10px);
          }
          
          .logo {
            position: relative;
            transition: all 0.3s ease;
          }
          
          .logo::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0);
            width: 120%;
            height: 120%;
            background: radial-gradient(circle, 
              rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 0.1) 0%, 
              transparent 70%
            );
            border-radius: 50%;
            transition: transform 0.3s ease;
            pointer-events: none;
          }
          
          .logo:hover::before {
            transform: translate(-50%, -50%) scale(1);
          }
          
          .nav-button {
            background: rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.1);
            border: 2px solid rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.3);
            color: ${this.theme === "light" ? "#2563eb" : "#6366f1"};
            backdrop-filter: blur(10px);
            position: relative;
            overflow: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, 
              rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 0.8) 0%, 
              rgba(${
                this.theme === "light" ? "99, 102, 241" : "139, 92, 246"
              }, 0.8) 100%
            );
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .nav-button:hover {
            transform: translateY(-3px);
            border-color: rgba(${
              this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
            }, 0.8);
            box-shadow: 
              0 10px 30px -10px rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 0.4),
              0 0 0 1px rgba(${
                this.theme === "light" ? "59, 130, 246" : "99, 102, 241"
              }, 0.1);
            color: white;
          }
          
          .nav-button:hover::before {
            opacity: 1;
          }
          
          .mobile-menu {
            background: rgba(${
              this.theme === "light" ? "255, 255, 255" : "30, 41, 59"
            }, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(${
              this.theme === "light" ? "0, 0, 0" : "255, 255, 255"
            }, 0.1);
            box-shadow: 0 20px 40px -15px rgba(0, 0, 0, ${
              this.theme === "light" ? "0.15" : "0.4"
            });
          }
        `;
          break;

        case "sidebar":
          variantStyles = `
          .navbar {
            height: 100vh;
            width: 280px;
            position: fixed;
            top: 0;
            left: 0;
            flex-direction: column;
            border-right: ${this.borderBottom};
            border-bottom: none;
          }
          .nav-container {
            flex-direction: column;
            height: 100%;
            padding: 2rem 1rem;
            align-items: flex-start;
          }
          .nav-links {
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;
          }
          .nav-link {
            width: 100%;
            padding: 1rem;
            border-radius: 0.5rem;
          }
        `;
          break;

        case "mega":
          variantStyles = `
          .navbar {
            box-shadow: 0 4px 20px rgba(0, 0, 0, ${
              this.theme === "light" ? "0.15" : "0.3"
            });
          }
          .nav-container {
            padding: 1.5rem;
            min-height: 80px;
          }
          .nav-links {
            gap: 2.5rem;
          }
          .nav-link {
            font-size: 1.1rem;
            padding: 0.75rem 1.5rem;
          }
        `;
          break;
      }

      return variantStyles;
    }

    // Generate inline styles for custom attributes
    generateInlineStyles() {
      const styles = [];

      if (this.height !== "auto") styles.push(`height: ${this.height}`);
      if (this.padding) styles.push(`padding: ${this.padding}`);

      return styles.join("; ");
    }

    // Generate unique class name for this instance
    getInstanceId() {
      if (!this._instanceId) {
        this._instanceId =
          "lume-nav-" + Math.random().toString(36).substr(2, 9);
      }
      return this._instanceId;
    }

    // Extract navigation data from slots
    getNavigationData() {
      const navLinks = [];
      const navButtons = [];

      // Get links from slot
      const linkSlots = this.querySelectorAll('[slot="links"] a');
      linkSlots.forEach((link) => {
        navLinks.push({
          href: link.getAttribute("href") || "#",
          text: link.textContent?.trim() || "Link",
          target: link.getAttribute("target") || "_self",
          active: link.hasAttribute("active"),
        });
      });

      // Get buttons from slot
      const buttonSlots = this.querySelectorAll(
        '[slot="actions"] button, [slot="actions"] a[role="button"]'
      );
      buttonSlots.forEach((button) => {
        navButtons.push({
          text: button.textContent?.trim() || "Button",
          href: button.getAttribute("href"),
          target: button.getAttribute("target") || "_self",
          variant: button.getAttribute("variant") || "primary",
        });
      });

      // Default navigation if none provided
      if (navLinks.length === 0 && navButtons.length === 0) {
        return {
          links: [
            { href: "#", text: "Home", active: true },
            { href: "#", text: "About" },
            { href: "#", text: "Services" },
            { href: "#", text: "Contact" },
          ],
          buttons: [{ text: "Get Started", variant: "primary" }],
        };
      }

      return {
        links: navLinks,
        buttons: navButtons,
      };
    }

    render() {
      const instanceId = this.getInstanceId();
      const inlineStyles = this.generateInlineStyles();
      const variantStyles = this.generateVariantStyles();
      const navData = this.getNavigationData();

      // Generate logo HTML
      let logoHTML = "";
      if (this.logoSrc) {
        logoHTML = `
        <img 
          src="${this.logoSrc}" 
          alt="${this.logoText}"
          class="logo-image"
          style="width: ${this.logoWidth}; height: ${this.logoHeight};"
        />
      `;
      } else {
        logoHTML = `<span class="logo-text">${this.logoText}</span>`;
      }

      // Generate navigation links
      const linksHTML = navData.links
        .map(
          (link) => `
      <a href="${link.href}" 
         target="${link.target}" 
         class="nav-link ${link.active ? "active" : ""}"
         ${link.active ? 'aria-current="page"' : ""}>
        ${link.text}
      </a>
    `
        )
        .join("");

      // Generate action buttons (independent of LumeButton)
      const buttonsHTML = navData.buttons
        .map(
          (button) => `
      <button 
        class="nav-button ${button.variant}"
        ${button.href ? `data-href="${button.href}"` : ""}
        ${button.target ? `data-target="${button.target}"` : ""}
        type="button">
        ${button.text}
      </button>
    `
        )
        .join("");

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          position: ${this.sticky ? "sticky" : "relative"};
          top: ${this.sticky ? "0" : "auto"};
          z-index: 1000;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          --brand-color: ${this.brandColor};
          --mobile-breakpoint: ${this.mobileBreakpoint};
          --animation-duration: ${this.animationDuration};
        }

        .navbar {
          width: 100%;
          background: ${this.transparent ? "transparent" : this.bgColor};
          border-bottom: ${this.transparent ? "none" : this.borderBottom};
          box-shadow: ${this.transparent ? "none" : this.shadow};
          transition: all var(--animation-duration) ease;
          ${this.blurBg ? "backdrop-filter: blur(20px);" : ""}
          ${inlineStyles ? inlineStyles : ""}
        }

        .nav-container {
          max-width: ${this.maxWidth};
          margin: 0 auto;
          padding: ${this.containerPadding};
          display: flex;
          align-items: center;
          justify-content: ${this.centerLinks ? "center" : "space-between"};
          gap: 2rem;
          min-height: 60px;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--brand-color);
          flex-shrink: 0;
          transition: color var(--animation-duration) ease;
          ${this.reverseLayout ? "order: 2;" : ""}
        }

        .logo:hover {
          color: ${this.hoverLinkColor};
        }

        .logo-image {
          object-fit: contain;
        }

        .logo-text {
          color: inherit;
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-grow: 1;
          justify-content: ${this.centerLinks ? "center" : "space-between"};
          ${this.reverseLayout ? "order: 1;" : ""}
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: ${this.textColor};
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all var(--animation-duration) ease;
          position: relative;
        }

        .nav-link:hover {
          color: ${this.hoverLinkColor};
          background: ${
            this.theme === "light"
              ? "rgba(37, 99, 235, 0.1)"
              : "rgba(59, 130, 246, 0.2)"
          };
        }

        .nav-link.active {
          color: ${this.activeLinkColor};
          background: ${
            this.theme === "light"
              ? "rgba(37, 99, 235, 0.1)"
              : "rgba(59, 130, 246, 0.2)"
          };
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Independent Button Styling */
        .nav-button {
          padding: ${this.buttonPadding};
          background: ${this.buttonBg};
          color: ${this.buttonColor};
          border: none;
          border-radius: ${this.buttonRadius};
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--animation-duration) ease;
          font-family: inherit;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          position: relative;
        }

        .nav-button:hover {
          background: ${this.buttonHoverBg};
          color: ${this.buttonHoverColor};
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .nav-button.secondary {
          background: transparent;
          color: ${this.textColor};
          border: 1px solid ${
            this.theme === "light"
              ? "rgba(0, 0, 0, 0.2)"
              : "rgba(255, 255, 255, 0.2)"
          };
        }

        .nav-button.secondary:hover {
          background: ${
            this.theme === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)"
          };
          color: ${this.textColor};
        }

        /* Mobile menu */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 24px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 10;
          ${this.reverseLayout ? "order: 3;" : ""}
        }

        .hamburger-line {
          width: 24px;
          height: 3px;
          background: ${this.hamburgerColor};
          border-radius: 2px;
          transition: all var(--animation-duration) ease;
          transform-origin: center;
        }

        .hamburger.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: ${this.mobileMenuBg};
          border-bottom: ${this.borderBottom};
          box-shadow: 0 4px 20px rgba(0, 0, 0, ${
            this.theme === "light" ? "0.1" : "0.3"
          });
          opacity: 0;
          transform: translateY(-10px);
          transition: all var(--animation-duration) ease;
          z-index: 9;
        }

        .mobile-menu.open {
          display: block;
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-nav-content {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .mobile-nav-link {
          color: ${this.textColor};
          text-decoration: none;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all var(--animation-duration) ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: ${
            this.theme === "light"
              ? "rgba(37, 99, 235, 0.1)"
              : "rgba(59, 130, 246, 0.2)"
          };
          color: var(--brand-color);
        }

        .mobile-nav-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          border-top: ${this.borderBottom};
          padding-top: 1rem;
        }

        .mobile-nav-actions .nav-button {
          width: 100%;
          justify-content: center;
        }

        /* Responsive design */
        @media (max-width: ${this.mobileBreakpoint}) {
          .hamburger {
            display: flex;
          }

          .nav-content {
            display: none;
          }

          .mobile-menu {
            display: block;
          }
        }

        /* Variant-specific styles */
        ${variantStyles}

        /* Custom hover and active styles */
        ${
          this.activeLinkColor !== this.brandColor
            ? `
          .nav-link.active { color: ${this.activeLinkColor} !important; }
          .mobile-nav-link.active { color: ${this.activeLinkColor} !important; }
        `
            : ""
        }
        
        ${
          this.hoverLinkColor !== this.brandColor
            ? `
          .nav-link:hover { color: ${this.hoverLinkColor} !important; }
          .mobile-nav-link:hover { color: ${this.hoverLinkColor} !important; }
        `
            : ""
        }
      </style>

      <nav class="navbar ${instanceId}">
        <div class="nav-container">
          <a href="/" class="logo">
            ${logoHTML}
          </a>

          <div class="nav-content">
            <div class="nav-links">
              ${linksHTML}
            </div>

            <div class="nav-actions">
              ${buttonsHTML}
            </div>
          </div>

          <button class="hamburger" aria-label="Toggle menu">
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
            <div class="hamburger-line"></div>
          </button>
        </div>

        <div class="mobile-menu">
          <div class="mobile-nav-content">
            <div class="mobile-nav-links">
              ${navData.links
                .map(
                  (link) => `
                <a href="${link.href}" 
                   target="${link.target}" 
                   class="mobile-nav-link ${link.active ? "active" : ""}">
                  ${link.text}
                </a>
              `
                )
                .join("")}
            </div>

            <div class="mobile-nav-actions">
              ${navData.buttons
                .map(
                  (button) => `
                <button 
                  class="nav-button ${button.variant}"
                  ${button.href ? `data-href="${button.href}"` : ""}
                  ${button.target ? `data-target="${button.target}"` : ""}
                  type="button">
                  ${button.text}
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
      </nav>
    `;

      // Re-setup event listeners after render
      if (this._initialized) {
        this.removeEventListeners();
        this.setupEventListeners();
      }
    }

    // Public methods
    toggle() {
      this.handleToggle(new Event("click"));
    }

    close() {
      if (this._isOpen) {
        this._isOpen = false;
        this.updateMobileMenuState();
      }
    }

    open() {
      if (!this._isOpen) {
        this._isOpen = true;
        this.updateMobileMenuState();
      }
    }

    updateNavigation(links, buttons) {
      // Clear existing slot content
      this.querySelectorAll('[slot="links"], [slot="actions"]').forEach((el) =>
        el.remove()
      );

      // Add new links
      if (links) {
        const linksContainer = document.createElement("div");
        linksContainer.slot = "links";
        links.forEach((link) => {
          const a = document.createElement("a");
          a.href = link.href || "#";
          a.textContent = link.text || "Link";
          if (link.target) a.target = link.target;
          if (link.active) a.setAttribute("active", "");
          linksContainer.appendChild(a);
        });
        this.appendChild(linksContainer);
      }

      // Add new buttons
      if (buttons) {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.slot = "actions";
        buttons.forEach((button) => {
          const btn = document.createElement("button");
          btn.textContent = button.text || "Button";
          if (button.variant) btn.setAttribute("variant", button.variant);
          if (button.href) btn.setAttribute("href", button.href);
          if (button.target) btn.setAttribute("target", button.target);
          buttonsContainer.appendChild(btn);
        });
        this.appendChild(buttonsContainer);
      }

      this.render();
    }
  }

  // Register the custom element
  if (!customElements.get("lume-navbar")) {
    customElements.define("lume-navbar", LumeNavbar);
  }

  class LumeHero extends HTMLElement {
    /* ------------- Lifecycle & setup ------------- */
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._initialized = false;

      // Bind methods for consistency
      this.handlePrimaryClick = this.handlePrimaryClick.bind(this);
      this.handleSecondaryClick = this.handleSecondaryClick.bind(this);
    }

    /* ------------- Attribute observation ------------- */
    static get observedAttributes() {
      return [
        // Core layout & theme (reordered for consistency)
        "theme",
        "layout",
        "height",
        "width",
        "padding",
        "margin",
        // Background
        "background-type",
        "background-color",
        "background-image",
        "background-position",
        "background-size",
        "background-overlay",
        "background-overlay-opacity",
        "background-gradient",
        // Content alignment - More precise control
        "content-align",
        "text-align",
        "vertical-align",
        "max-width",
        // Heading
        "heading-text",
        "heading-color",
        "heading-size",
        "heading-weight",
        // Subheading
        "subheading-text",
        "subheading-color",
        "subheading-size",
        // Description
        "description-text",
        "description-color",
        "description-size",
        // Primary CTA
        "primary-button-text",
        "primary-button-color",
        "primary-button-bg-color",
        "primary-button-hover-color",
        "primary-button-hover-bg-color",
        "primary-button-href",
        "primary-button-target",
        "primary-button-size",
        // Secondary CTA
        "secondary-button-text",
        "secondary-button-color",
        "secondary-button-bg-color",
        "secondary-button-hover-color",
        "secondary-button-hover-bg-color",
        "secondary-button-href",
        "secondary-button-target",
        "secondary-button-variant",
        // Animation
        "animate",
        "animation-delay",
        "animation-duration",
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

    attributeChangedCallback(name, oldVal, newVal) {
      if (this._initialized && oldVal !== newVal) this.render();
    }

    /* ------------- Property getters / setters ------------- */
    _strAttr(key, def = "") {
      return this.getAttribute(key) ?? def;
    }
    _boolAttr(key) {
      return this.hasAttribute(key);
    }

    /* Layout & theme - UPDATED FOR CONSISTENCY */
    get layout() {
      return this._strAttr("layout", "centered");
    }
    set layout(v) {
      this.setAttribute("layout", v);
    }

    get theme() {
      const value = this.getAttribute("theme") || "dark"; // DEFAULT TO DARK
      const validThemes = ["dark", "light"];
      return validThemes.includes(value) ? value : "dark";
    }
    set theme(v) {
      this.setAttribute("theme", v);
    }

    get height() {
      return this._strAttr("height", "100vh");
    }
    set height(v) {
      this.setAttribute("height", v);
    }

    get width() {
      return this._strAttr("width", "100%");
    }
    set width(v) {
      this.setAttribute("width", v);
    }

    get padding() {
      return this._strAttr("padding", "2rem");
    }
    set padding(v) {
      this.setAttribute("padding", v);
    }

    get margin() {
      return this._strAttr("margin", "0");
    }
    set margin(v) {
      this.setAttribute("margin", v);
    }

    get maxWidth() {
      return this._strAttr("max-width", "800px");
    }
    set maxWidth(v) {
      this.setAttribute("max-width", v);
    }

    /* Background properties - UPDATED DEFAULTS */
    get backgroundType() {
      return this._strAttr("background-type", "color");
    }
    set backgroundType(v) {
      this.setAttribute("background-type", v);
    }

    get backgroundColor() {
      return this._strAttr("background-color", this.getThemeBgColor()); // Use theme method
    }
    set backgroundColor(v) {
      this.setAttribute("background-color", v);
    }

    get backgroundImage() {
      return this._strAttr("background-image");
    }
    set backgroundImage(v) {
      this.setAttribute("background-image", v);
    }

    get backgroundPosition() {
      return this._strAttr("background-position", "center center");
    }
    set backgroundPosition(v) {
      this.setAttribute("background-position", v);
    }

    get backgroundSize() {
      return this._strAttr("background-size", "cover");
    }
    set backgroundSize(v) {
      this.setAttribute("background-size", v);
    }

    get backgroundOverlay() {
      return this._strAttr("background-overlay", "rgba(0, 0, 0, 0.5)");
    }
    set backgroundOverlay(v) {
      this.setAttribute("background-overlay", v);
    }

    get backgroundOverlayOpacity() {
      return this._strAttr("background-overlay-opacity", "0.5");
    }
    set backgroundOverlayOpacity(v) {
      this.setAttribute("background-overlay-opacity", v);
    }

    get backgroundGradient() {
      return this._strAttr("background-gradient");
    }
    set backgroundGradient(v) {
      this.setAttribute("background-gradient", v);
    }

    /* Content alignment - Enhanced */
    get contentAlign() {
      return this._strAttr("content-align", "center");
    }
    set contentAlign(v) {
      this.setAttribute("content-align", v);
    }

    get textAlign() {
      return this._strAttr("text-align", "center");
    }
    set textAlign(v) {
      this.setAttribute("text-align", v);
    }

    get verticalAlign() {
      return this._strAttr("vertical-align", "center");
    }
    set verticalAlign(v) {
      this.setAttribute("vertical-align", v);
    }

    /* Content properties */
    get headingText() {
      return this._strAttr("heading-text", "Welcome to Our Platform");
    }
    set headingText(v) {
      this.setAttribute("heading-text", v);
    }

    get headingColor() {
      return this._strAttr("heading-color");
    }
    set headingColor(v) {
      this.setAttribute("heading-color", v);
    }

    get headingSize() {
      return this._strAttr("heading-size", "clamp(2.5rem, 8vw, 5rem)");
    }
    set headingSize(v) {
      this.setAttribute("heading-size", v);
    }

    get headingWeight() {
      return this._strAttr("heading-weight", "800");
    }
    set headingWeight(v) {
      this.setAttribute("heading-weight", v);
    }

    get subheadingText() {
      return this._strAttr("subheading-text", "Build amazing experiences");
    }
    set subheadingText(v) {
      this.setAttribute("subheading-text", v);
    }

    get subheadingColor() {
      return this._strAttr("subheading-color");
    }
    set subheadingColor(v) {
      this.setAttribute("subheading-color", v);
    }

    get subheadingSize() {
      return this._strAttr("subheading-size", "clamp(1.25rem, 3vw, 1.75rem)");
    }
    set subheadingSize(v) {
      this.setAttribute("subheading-size", v);
    }

    get descriptionText() {
      return this._strAttr(
        "description-text",
        "Create beautiful, responsive websites with our modern web components. Built for developers who care about performance and user experience."
      );
    }
    set descriptionText(v) {
      this.setAttribute("description-text", v);
    }

    get descriptionColor() {
      return this._strAttr("description-color");
    }
    set descriptionColor(v) {
      this.setAttribute("description-color", v);
    }

    get descriptionSize() {
      return this._strAttr("description-size", "clamp(1rem, 2vw, 1.25rem)");
    }
    set descriptionSize(v) {
      this.setAttribute("description-size", v);
    }

    /* Primary button properties */
    get primaryButtonText() {
      return this._strAttr("primary-button-text", "Get Started");
    }
    set primaryButtonText(v) {
      this.setAttribute("primary-button-text", v);
    }

    get primaryButtonColor() {
      return this._strAttr("primary-button-color");
    }
    set primaryButtonColor(v) {
      this.setAttribute("primary-button-color", v);
    }

    get primaryButtonBgColor() {
      return this._strAttr("primary-button-bg-color");
    }
    set primaryButtonBgColor(v) {
      this.setAttribute("primary-button-bg-color", v);
    }

    get primaryButtonHoverColor() {
      return this._strAttr("primary-button-hover-color");
    }
    set primaryButtonHoverColor(v) {
      this.setAttribute("primary-button-hover-color", v);
    }

    get primaryButtonHoverBgColor() {
      return this._strAttr("primary-button-hover-bg-color");
    }
    set primaryButtonHoverBgColor(v) {
      this.setAttribute("primary-button-hover-bg-color", v);
    }

    get primaryButtonHref() {
      return this._strAttr("primary-button-href");
    }
    set primaryButtonHref(v) {
      this.setAttribute("primary-button-href", v);
    }

    get primaryButtonTarget() {
      return this._strAttr("primary-button-target", "_self");
    }
    set primaryButtonTarget(v) {
      this.setAttribute("primary-button-target", v);
    }

    get primaryButtonSize() {
      return this._strAttr("primary-button-size", "large");
    }
    set primaryButtonSize(v) {
      this.setAttribute("primary-button-size", v);
    }

    /* Secondary button properties */
    get secondaryButtonText() {
      return this._strAttr("secondary-button-text", "Learn More");
    }
    set secondaryButtonText(v) {
      this.setAttribute("secondary-button-text", v);
    }

    get secondaryButtonColor() {
      return this._strAttr("secondary-button-color");
    }
    set secondaryButtonColor(v) {
      this.setAttribute("secondary-button-color", v);
    }

    get secondaryButtonBgColor() {
      return this._strAttr("secondary-button-bg-color");
    }
    set secondaryButtonBgColor(v) {
      this.setAttribute("secondary-button-bg-color", v);
    }

    get secondaryButtonHoverColor() {
      return this._strAttr("secondary-button-hover-color");
    }
    set secondaryButtonHoverColor(v) {
      this.setAttribute("secondary-button-hover-color", v);
    }

    get secondaryButtonHoverBgColor() {
      return this._strAttr("secondary-button-hover-bg-color");
    }
    set secondaryButtonHoverBgColor(v) {
      this.setAttribute("secondary-button-hover-bg-color", v);
    }

    get secondaryButtonHref() {
      return this._strAttr("secondary-button-href");
    }
    set secondaryButtonHref(v) {
      this.setAttribute("secondary-button-href", v);
    }

    get secondaryButtonTarget() {
      return this._strAttr("secondary-button-target", "_self");
    }
    set secondaryButtonTarget(v) {
      this.setAttribute("secondary-button-target", v);
    }

    get secondaryButtonVariant() {
      return this._strAttr("secondary-button-variant", "outlined");
    }
    set secondaryButtonVariant(v) {
      this.setAttribute("secondary-button-variant", v);
    }

    /* Animation properties */
    get animate() {
      return this._boolAttr("animate");
    }
    set animate(v) {
      if (v) this.setAttribute("animate", "");
      else this.removeAttribute("animate");
    }

    get animationDelay() {
      return this._strAttr("animation-delay", "0s");
    }
    set animationDelay(v) {
      this.setAttribute("animation-delay", v);
    }

    get animationDuration() {
      return this._strAttr("animation-duration", "0.3s"); // Consistent with other components
    }
    set animationDuration(v) {
      this.setAttribute("animation-duration", v);
    }

    /* Upgrade properties */
    _upgradeProperties() {
      this.constructor.observedAttributes.forEach((prop) => {
        if (this.hasOwnProperty(prop)) {
          const value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
      });
    }

    // CONSISTENT THEME METHODS (matching other components)
    getThemeBgColor() {
      return this.theme === "light" ? "#ffffff" : "#1e293b";
    }

    getThemeTextColor() {
      return this.theme === "light" ? "#374151" : "#f1f5f9";
    }

    getThemeBrandColor() {
      return this.theme === "light" ? "#2563eb" : "#3b82f6";
    }

    getThemeAccentColor() {
      return this.theme === "light" ? "#4f46e5" : "#6366f1";
    }

    getThemeDescriptionColor() {
      return this.theme === "light" ? "#64748b" : "#cbd5e1";
    }

    getThemeSubtextColor() {
      return this.theme === "light" ? "#4b5563" : "#94a3b8";
    }

    getThemeButtonBg() {
      return this.theme === "light" ? "#2563eb" : "#3b82f6";
    }

    getThemeButtonHoverBg() {
      return this.theme === "light" ? "#1d4ed8" : "#2563eb";
    }

    getThemeShadow() {
      return this.theme === "light"
        ? "0 2px 10px rgba(0, 0, 0, 0.1)"
        : "0 4px 20px rgba(0, 0, 0, 0.3)";
    }

    getThemeBorder() {
      return this.theme === "light"
        ? "1px solid rgba(0, 0, 0, 0.1)"
        : "1px solid rgba(255, 255, 255, 0.1)";
    }

    // Generate unique instance ID
    getInstanceId() {
      if (!this._instanceId) {
        this._instanceId =
          "lume-hero-" + Math.random().toString(36).substr(2, 9);
      }
      return this._instanceId;
    }

    /* ------------- Style generation helpers ------------- */
    _generateThemeVars() {
      if (this.theme === "light") {
        return `
        --hero-bg: ${this.getThemeBgColor()};
        --hero-text: ${this.getThemeTextColor()};
        --hero-subtext: ${this.getThemeSubtextColor()};
        --hero-description: ${this.getThemeDescriptionColor()};
        --hero-brand: ${this.getThemeBrandColor()};
        --hero-accent: ${this.getThemeAccentColor()};
        --primary-btn-bg: ${this.getThemeButtonBg()};
        --primary-btn-color: #ffffff;
        --primary-btn-hover-bg: ${this.getThemeButtonHoverBg()};
        --primary-btn-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
        --primary-btn-hover-shadow: 0 8px 25px rgba(37, 99, 235, 0.35);
        --secondary-btn-color: ${this.getThemeBrandColor()};
        --secondary-btn-border: ${this.getThemeBrandColor()};
        --secondary-btn-hover-bg: ${this.getThemeBrandColor()};
        --secondary-btn-hover-color: #ffffff;
        --secondary-btn-bg: rgba(37, 99, 235, 0.1);
        --accent-gradient: linear-gradient(135deg, ${this.getThemeBrandColor()} 0%, ${this.getThemeAccentColor()} 100%);
      `;
      }
      return `
      --hero-bg: ${this.getThemeBgColor()};
      --hero-text: ${this.getThemeTextColor()};
      --hero-subtext: ${this.getThemeSubtextColor()};
      --hero-description: ${this.getThemeDescriptionColor()};
      --hero-brand: ${this.getThemeBrandColor()};
      --hero-accent: ${this.getThemeAccentColor()};
      --primary-btn-bg: ${this.getThemeButtonBg()};
      --primary-btn-color: #ffffff;
      --primary-btn-hover-bg: ${this.getThemeButtonHoverBg()};
      --primary-btn-shadow: 0 4px 14px rgba(59, 130, 246, 0.25);
      --primary-btn-hover-shadow: 0 8px 25px rgba(59, 130, 246, 0.35);
      --secondary-btn-color: ${this.getThemeBrandColor()};
      --secondary-btn-border: ${this.getThemeBrandColor()};
      --secondary-btn-hover-bg: ${this.getThemeBrandColor()};
      --secondary-btn-hover-color: #ffffff;
      --secondary-btn-bg: rgba(59, 130, 246, 0.2);
      --accent-gradient: linear-gradient(135deg, ${this.getThemeBrandColor()} 0%, ${this.getThemeAccentColor()} 100%);
    `;
    }

    _generateBackground() {
      if (this.backgroundType === "image" && this.backgroundImage) {
        return `url('${this.backgroundImage}')`;
      } else if (
        this.backgroundType === "gradient" &&
        this.backgroundGradient
      ) {
        return this.backgroundGradient;
      } else if (this.hasAttribute("background-color")) {
        return this.backgroundColor;
      } else if (this.theme === "light") {
        // Enhanced light theme default background
        return "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)";
      } else {
        // Enhanced dark theme default background
        return "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)";
      }
    }

    _generateOverlay() {
      if (this.backgroundType === "image" && this.backgroundImage) {
        return `
        .hero-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${this.backgroundOverlay};
          opacity: ${this.backgroundOverlayOpacity};
          z-index: 1;
        }
      `;
      }
      return "";
    }

    _getVerticalAlignment() {
      switch (this.verticalAlign) {
        case "top":
          return "flex-start";
        case "bottom":
          return "flex-end";
        default:
          return "center";
      }
    }

    _getHorizontalAlignment() {
      switch (this.contentAlign) {
        case "left":
          return "flex-start";
        case "right":
          return "flex-end";
        default:
          return "center";
      }
    }

    // Event handlers
    setupEventListeners() {
      const primaryBtn = this.shadowRoot?.querySelector(".primary-btn");
      const secondaryBtn = this.shadowRoot?.querySelector(".secondary-btn");

      if (primaryBtn && primaryBtn.tagName === "BUTTON") {
        primaryBtn.addEventListener("click", this.handlePrimaryClick);
      }

      if (secondaryBtn && secondaryBtn.tagName === "BUTTON") {
        secondaryBtn.addEventListener("click", this.handleSecondaryClick);
      }
    }

    removeEventListeners() {
      const primaryBtn = this.shadowRoot?.querySelector(".primary-btn");
      const secondaryBtn = this.shadowRoot?.querySelector(".secondary-btn");

      if (primaryBtn && primaryBtn.tagName === "BUTTON") {
        primaryBtn.removeEventListener("click", this.handlePrimaryClick);
      }

      if (secondaryBtn && secondaryBtn.tagName === "BUTTON") {
        secondaryBtn.removeEventListener("click", this.handleSecondaryClick);
      }
    }

    handlePrimaryClick(event) {
      this.dispatchEvent(
        new CustomEvent("lume-hero-primary-click", {
          bubbles: true,
          composed: true,
          detail: {
            hero: this,
            text: this.primaryButtonText,
            type: "primary",
            originalEvent: event,
          },
        })
      );
    }

    handleSecondaryClick(event) {
      this.dispatchEvent(
        new CustomEvent("lume-hero-secondary-click", {
          bubbles: true,
          composed: true,
          detail: {
            hero: this,
            text: this.secondaryButtonText,
            type: "secondary",
            originalEvent: event,
          },
        })
      );
    }

    /* ------------- Render ------------- */
    render() {
      const instanceId = this.getInstanceId();
      const background = this._generateBackground();
      const overlay = this._generateOverlay();
      const verticalAlign = this._getVerticalAlignment();
      const horizontalAlign = this._getHorizontalAlignment();

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          ${this._generateThemeVars()}
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          --lume-animation-duration: 0.3s;
          --lume-animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-container {
          position: relative;
          display: flex;
          align-items: ${verticalAlign};
          justify-content: ${horizontalAlign};
          min-height: ${this.height};
          width: ${this.width};
          padding: ${this.padding};
          margin: ${this.margin};
          background: ${background};
          background-position: ${this.backgroundPosition};
          background-size: ${this.backgroundSize};
          background-repeat: no-repeat;
          box-sizing: border-box;
          ${
            this.theme === "light"
              ? `
            border-bottom: ${this.getThemeBorder()};
            box-shadow: ${this.getThemeShadow()};
          `
              : ""
          }
        }
        
        ${overlay}
        
        .content-wrapper {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: ${this.maxWidth};
          text-align: ${this.textAlign};
          display: flex;
          flex-direction: column;
          ${verticalAlign === "center" ? "justify-content: center;" : ""}
          ${
            this.animate
              ? `
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp ${this.animationDuration} var(--lume-animation-easing) ${this.animationDelay} forwards;
          `
              : ""
          }
        }
        
        .heading {
          font-size: ${this.headingSize};
          font-weight: ${this.headingWeight};
          line-height: 1.1;
          margin: 0 0 1rem 0;
          color: ${this.headingColor || "var(--hero-text)"};
          ${
            this.theme === "light"
              ? `
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          `
              : ""
          }
        }
        
        .subheading {
          font-size: ${this.subheadingSize};
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 1.5rem 0;
          color: ${this.subheadingColor || "var(--hero-subtext)"};
          ${
            this.theme === "light"
              ? `
            color: var(--hero-brand);
          `
              : `
            background: var(--accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          `
          }
        }
        
        .description {
          font-size: ${this.descriptionSize};
          line-height: 1.6;
          margin: 0 0 2.5rem 0;
          color: ${this.descriptionColor || "var(--hero-description)"};
          max-width: 90%;
          ${
            this.textAlign === "center"
              ? "margin-left: auto; margin-right: auto;"
              : ""
          }
          ${this.textAlign === "right" ? "margin-left: auto;" : ""}
        }
        
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          ${this.textAlign === "center" ? "justify-content: center;" : ""}
          ${this.textAlign === "right" ? "justify-content: flex-end;" : ""}
          ${this.textAlign === "left" ? "justify-content: flex-start;" : ""}
        }
        
        .primary-btn,
        .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: inherit;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid transparent;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all var(--lume-animation-duration) var(--lume-animation-easing);
          white-space: nowrap;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }
        
        .primary-btn {
          padding: ${
            this.primaryButtonSize === "large" ? "1rem 2rem" : "0.75rem 1.5rem"
          };
          font-size: ${
            this.primaryButtonSize === "large" ? "1.125rem" : "1rem"
          };
          color: ${this.primaryButtonColor || "var(--primary-btn-color)"};
          background: ${this.primaryButtonBgColor || "var(--primary-btn-bg)"};
          box-shadow: var(--primary-btn-shadow);
        }
        
        .primary-btn:hover {
          color: ${this.primaryButtonHoverColor || "var(--primary-btn-color)"};
          background: ${
            this.primaryButtonHoverBgColor || "var(--primary-btn-hover-bg)"
          };
          transform: translateY(-2px);
          box-shadow: var(--primary-btn-hover-shadow);
        }
        
        .secondary-btn {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          color: ${this.secondaryButtonColor || "var(--secondary-btn-color)"};
          background: ${
            this.secondaryButtonBgColor || "var(--secondary-btn-bg)"
          };
          border-color: ${
            this.secondaryButtonColor || "var(--secondary-btn-border)"
          };
        }
        
        .secondary-btn:hover {
          color: ${
            this.secondaryButtonHoverColor || "var(--secondary-btn-hover-color)"
          };
          background: ${
            this.secondaryButtonHoverBgColor || "var(--secondary-btn-hover-bg)"
          };
          transform: translateY(-2px);
          ${
            this.theme === "light"
              ? `
            box-shadow: ${this.getThemeShadow()};
          `
              : ""
          }
        }
        
        /* Enhanced theme styling */
        ${
          this.theme === "light"
            ? `
          .hero-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(79, 70, 229, 0.06) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
          }
          
          .content-wrapper {
            z-index: 2;
          }
        `
            : `
          .hero-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.08) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
          }
          
          .content-wrapper {
            z-index: 2;
          }
        `
        }
        
        ${
          this.animate
            ? `
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .heading {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp ${this.animationDuration} var(--lume-animation-easing) calc(${this.animationDelay} + 0.2s) forwards;
          }
          
          .subheading {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp ${this.animationDuration} var(--lume-animation-easing) calc(${this.animationDelay} + 0.4s) forwards;
          }
          
          .description {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp ${this.animationDuration} var(--lume-animation-easing) calc(${this.animationDelay} + 0.6s) forwards;
          }
          
          .cta-buttons {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp ${this.animationDuration} var(--lume-animation-easing) calc(${this.animationDelay} + 0.8s) forwards;
          }
        `
            : ""
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
          .hero-container {
            min-height: auto;
            padding: 3rem 1rem;
          }
          
          .content-wrapper {
            text-align: center;
            max-width: 100%;
          }
          
          .description {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: stretch;
            justify-content: center;
          }
          
          .primary-btn,
          .secondary-btn {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
          }
        }
      </style>

      <div class="hero-container ${instanceId}">
        <div class="content-wrapper">
          ${
            this.headingText
              ? `<h1 class="heading">${this.headingText}</h1>`
              : ""
          }
          ${
            this.subheadingText
              ? `<h2 class="subheading">${this.subheadingText}</h2>`
              : ""
          }
          ${
            this.descriptionText
              ? `<p class="description">${this.descriptionText}</p>`
              : ""
          }
          
          <div class="cta-buttons">
            ${
              this.primaryButtonText
                ? this.primaryButtonHref
                  ? `<a href="${this.primaryButtonHref}" target="${this.primaryButtonTarget}" class="primary-btn">${this.primaryButtonText}</a>`
                  : `<button class="primary-btn">${this.primaryButtonText}</button>`
                : ""
            }
            ${
              this.secondaryButtonText
                ? this.secondaryButtonHref
                  ? `<a href="${this.secondaryButtonHref}" target="${this.secondaryButtonTarget}" class="secondary-btn">${this.secondaryButtonText}</a>`
                  : `<button class="secondary-btn">${this.secondaryButtonText}</button>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

      // Setup event listeners after render
      if (this._initialized) {
        this.removeEventListeners();
        this.setupEventListeners();
      }
    }
  }

  /* Register the custom element */
  if (!customElements.get("lume-hero")) {
    customElements.define("lume-hero", LumeHero);
  }

  class LumeArticle extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._initialized = false;
    }

    static get observedAttributes() {
      return [
        // Core layout & theme
        "layout",
        "theme",
        "width",
        "height",
        "padding",
        "margin",
        "gap",
        // Container alignment
        "align-items",
        "justify-content",
        "min-height",
        // Heading
        "heading-text",
        "heading-color",
        "heading-size",
        "heading-weight",
        // Description
        "description-text",
        "description-color",
        "description-size",
        "description-line-height",
        // Button
        "button-text",
        "button-color",
        "button-bg-color",
        "button-hover-color",
        "button-hover-bg-color",
        "button-radius",
        "button-padding",
        "button-width",
        "button-height",
        "button-href",
        "button-target",
        "button-font-size",
        // Image
        "image-src",
        "image-alt",
        "image-width",
        "image-height",
        "image-radius",
        "image-fit",
        "image-align",
        "image-max-width",
        // Advanced layout control
        "text-flex",
        "image-flex",
        "responsive-breakpoint",
      ];
    }

    connectedCallback() {
      this._upgradeProperties();
      this.render();
      this._initialized = true;
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (this._initialized && oldVal !== newVal) this.render();
    }

    // Helper methods
    _strAttr(key, def = "") {
      return this.getAttribute(key) ?? def;
    }

    // Layout & theme properties
    get layout() {
      return ["right"].includes(this._strAttr("layout")) ? "right" : "left";
    }
    set layout(v) {
      this.setAttribute("layout", v);
    }

    get theme() {
      return ["light"].includes(this._strAttr("theme")) ? "light" : "dark";
    }
    set theme(v) {
      this.setAttribute("theme", v);
    }

    // Container sizing and alignment
    get width() {
      return this._strAttr("width", "100%");
    }
    set width(v) {
      this.setAttribute("width", v);
    }

    get height() {
      return this._strAttr("height", "100vh");
    }
    set height(v) {
      this.setAttribute("height", v);
    }

    get minHeight() {
      return this._strAttr("min-height", "auto");
    }
    set minHeight(v) {
      this.setAttribute("min-height", v);
    }

    get padding() {
      return this._strAttr("padding", "2rem");
    }
    set padding(v) {
      this.setAttribute("padding", v);
    }

    get margin() {
      return this._strAttr("margin", "0");
    }
    set margin(v) {
      this.setAttribute("margin", v);
    }

    get gap() {
      return this._strAttr("gap", "3rem");
    }
    set gap(v) {
      this.setAttribute("gap", v);
    }

    get alignItems() {
      return this._strAttr("align-items", "center");
    }
    set alignItems(v) {
      this.setAttribute("align-items", v);
    }

    get justifyContent() {
      return this._strAttr("justify-content", "center");
    }
    set justifyContent(v) {
      this.setAttribute("justify-content", v);
    }

    // Flex control for text and image sections
    get textFlex() {
      return this._strAttr("text-flex", "1");
    }
    set textFlex(v) {
      this.setAttribute("text-flex", v);
    }

    get imageFlex() {
      return this._strAttr("image-flex", "1");
    }
    set imageFlex(v) {
      this.setAttribute("image-flex", v);
    }

    get responsiveBreakpoint() {
      return this._strAttr("responsive-breakpoint", "768px");
    }
    set responsiveBreakpoint(v) {
      this.setAttribute("responsive-breakpoint", v);
    }

    // Content properties
    get headingText() {
      return this._strAttr("heading-text", "Article Heading");
    }
    set headingText(v) {
      this.setAttribute("heading-text", v);
    }

    get headingColor() {
      return this._strAttr("heading-color");
    }
    set headingColor(v) {
      this.setAttribute("heading-color", v);
    }

    get headingSize() {
      return this._strAttr("heading-size", "clamp(2rem, 4vw, 3.5rem)");
    }
    set headingSize(v) {
      this.setAttribute("heading-size", v);
    }

    get headingWeight() {
      return this._strAttr("heading-weight", "700");
    }
    set headingWeight(v) {
      this.setAttribute("heading-weight", v);
    }

    get descriptionText() {
      return this._strAttr(
        "description-text",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas ullam porro? Ab sit soluta optio vero accusamus atque corporis doloremque architecto, incidunt odio libero molestiae a? Magnam cupiditate autem dolorem obcaecati laboriosam in ipsum dolores velit eos dolorum reiciendis."
      );
    }
    set descriptionText(v) {
      this.setAttribute("description-text", v);
    }

    get descriptionColor() {
      return this._strAttr("description-color");
    }
    set descriptionColor(v) {
      this.setAttribute("description-color", v);
    }

    get descriptionSize() {
      return this._strAttr("description-size", "clamp(1rem, 1.5vw, 1.25rem)");
    }
    set descriptionSize(v) {
      this.setAttribute("description-size", v);
    }

    get descriptionLineHeight() {
      return this._strAttr("description-line-height", "1.7");
    }
    set descriptionLineHeight(v) {
      this.setAttribute("description-line-height", v);
    }

    // Button properties
    get buttonText() {
      return this._strAttr("button-text", "Learn More");
    }
    set buttonText(v) {
      this.setAttribute("button-text", v);
    }

    get buttonColor() {
      return this._strAttr("button-color");
    }
    set buttonColor(v) {
      this.setAttribute("button-color", v);
    }

    get buttonBgColor() {
      return this._strAttr("button-bg-color");
    }
    set buttonBgColor(v) {
      this.setAttribute("button-bg-color", v);
    }

    get buttonHoverColor() {
      return this._strAttr("button-hover-color");
    }
    set buttonHoverColor(v) {
      this.setAttribute("button-hover-color", v);
    }

    get buttonHoverBgColor() {
      return this._strAttr("button-hover-bg-color");
    }
    set buttonHoverBgColor(v) {
      this.setAttribute("button-hover-bg-color", v);
    }

    get buttonRadius() {
      return this._strAttr("button-radius", "0.75rem");
    }
    set buttonRadius(v) {
      this.setAttribute("button-radius", v);
    }

    get buttonPadding() {
      return this._strAttr("button-padding", "1rem 2rem");
    }
    set buttonPadding(v) {
      this.setAttribute("button-padding", v);
    }

    get buttonWidth() {
      return this._strAttr("button-width");
    }
    set buttonWidth(v) {
      this.setAttribute("button-width", v);
    }

    get buttonHeight() {
      return this._strAttr("button-height");
    }
    set buttonHeight(v) {
      this.setAttribute("button-height", v);
    }

    get buttonFontSize() {
      return this._strAttr("button-font-size", "1rem");
    }
    set buttonFontSize(v) {
      this.setAttribute("button-font-size", v);
    }

    get buttonHref() {
      return this._strAttr("button-href");
    }
    set buttonHref(v) {
      this.setAttribute("button-href", v);
    }

    get buttonTarget() {
      return this._strAttr("button-target", "_self");
    }
    set buttonTarget(v) {
      this.setAttribute("button-target", v);
    }

    // Image properties
    get imageSrc() {
      return this._strAttr(
        "image-src",
        "https://images.unsplash.com/photo-1756312148347-611b60723c7a?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      );
    }
    set imageSrc(v) {
      this.setAttribute("image-src", v);
    }

    get imageAlt() {
      return this._strAttr("image-alt", "article image");
    }
    set imageAlt(v) {
      this.setAttribute("image-alt", v);
    }

    get imageWidth() {
      return this._strAttr("image-width", "100%");
    }
    set imageWidth(v) {
      this.setAttribute("image-width", v);
    }

    get imageHeight() {
      return this._strAttr("image-height", "400px");
    }
    set imageHeight(v) {
      this.setAttribute("image-height", v);
    }

    get imageMaxWidth() {
      return this._strAttr("image-max-width", "600px");
    }
    set imageMaxWidth(v) {
      this.setAttribute("image-max-width", v);
    }

    get imageRadius() {
      return this._strAttr("image-radius", "1rem");
    }
    set imageRadius(v) {
      this.setAttribute("image-radius", v);
    }

    get imageFit() {
      return this._strAttr("image-fit", "cover");
    }
    set imageFit(v) {
      this.setAttribute("image-fit", v);
    }

    get imageAlign() {
      return this._strAttr("image-align", "center");
    }
    set imageAlign(v) {
      this.setAttribute("image-align", v);
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

    _generateThemeVars() {
      if (this.theme === "light") {
        return `
        --article-bg: #ffffff;
        --article-text: #111827;
        --button-bg: #2563eb;
        --button-color: #ffffff;
        --button-hover-bg: #1d4ed8;
      `;
      }
      return `
      --article-bg: #111827;
      --article-text: #f9fafb;
      --button-bg: #2563eb;
      --button-color: #ffffff;
      --button-hover-bg: #1d4ed8;
    `;
    }

    render() {
      const instanceId =
        "lume-article-" + Math.random().toString(36).substr(2, 9);

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          ${this._generateThemeVars()}
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .container {
          display: flex;
          flex-direction: ${this.layout === "right" ? "row-reverse" : "row"};
          align-items: ${this.alignItems};
          justify-content: ${this.justifyContent};
          gap: ${this.gap};
          width: ${this.width};
          height: ${this.height};
          min-height: ${this.minHeight};
          padding: ${this.padding};
          margin: ${this.margin};
          background: var(--article-bg);
          color: var(--article-text);
          box-sizing: border-box;
        }
        
        .text-block {
          flex: ${this.textFlex};
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 600px;
        }
        
        .heading {
          font-size: ${this.headingSize};
          font-weight: ${this.headingWeight};
          line-height: 1.2;
          margin: 0 0 1.5rem 0;
          color: ${this.headingColor || "var(--article-text)"};
        }
        
        .description {
          font-size: ${this.descriptionSize};
          line-height: ${this.descriptionLineHeight};
          margin: 0 0 2.5rem 0;
          color: ${this.descriptionColor || "var(--article-text)"};
          opacity: 0.9;
        }
        
        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: flex-start;
          font-family: inherit;
          font-size: ${this.buttonFontSize};
          font-weight: 600;
          color: ${this.buttonColor || "var(--button-color)"};
          background: ${this.buttonBgColor || "var(--button-bg)"};
          border: none;
          border-radius: ${this.buttonRadius};
          padding: ${this.buttonPadding};
          width: ${this.buttonWidth || "auto"};
          height: ${this.buttonHeight || "auto"};
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .action-btn:hover {
          color: ${this.buttonHoverColor || "var(--button-color)"};
          background: ${this.buttonHoverBgColor || "var(--button-hover-bg)"};
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .action-btn:active {
          transform: translateY(0);
        }
        
        .image-wrapper {
          flex: ${this.imageFlex};
          display: flex;
          justify-content: ${this.imageAlign};
          align-items: center;
        }
        
        .image-wrapper img {
          width: ${this.imageWidth};
          height: ${this.imageHeight};
          max-width: ${this.imageMaxWidth};
          object-fit: ${this.imageFit};
          border-radius: ${this.imageRadius};
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        /* Responsive stacking */
        @media (max-width: ${this.responsiveBreakpoint}) {
          .container {
            flex-direction: column;
            text-align: center;
            height: auto;
            min-height: 100vh;
            justify-content: center;
          }
          
          .image-wrapper {
            order: -1;
            margin-bottom: 2rem;
          }
          
          .text-block {
            max-width: 100%;
          }
          
          .action-btn {
            align-self: center;
          }
        }
      </style>

      <article class="container ${instanceId}">
        <div class="image-wrapper">
          <img src="${this.imageSrc}" alt="${this.imageAlt}" loading="lazy">
        </div>
        <div class="text-block">
          <h2 class="heading">${this.headingText}</h2>
          <p class="description">${this.descriptionText}</p>
          ${
            this.buttonHref
              ? `<a href="${this.buttonHref}" target="${this.buttonTarget}" class="action-btn">${this.buttonText}</a>`
              : `<button class="action-btn">${this.buttonText}</button>`
          }
        </div>
      </article>
    `;
    }
  }

  if (!customElements.get("lume-article")) {
    customElements.define("lume-article", LumeArticle);
  }

  class LumeForm extends HTMLElement {
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
      return (
        this.getAttribute("button-hover-bg") || this.getThemeButtonHoverBg()
      );
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
      const inputs = this.shadowRoot.querySelectorAll(
        "input, textarea, select"
      );
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

  class LumeFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._initialized = false;
    }

    static get observedAttributes() {
      return [
        // Layout & Theme
        "layout",
        "theme",
        "width",
        "padding",
        "margin",
        "gap",
        "font-family",
        // Colors
        "bg-color",
        "text-color",
        "link-color",
        "link-hover-color",
        // Border
        "border-color",
        "border-width",
        "border-style",
        // Brand
        "brand-text",
        "brand-color",
        "brand-size",
        "logo-src",
        "logo-alt",
        "logo-width",
        "logo-height",
        // Navigation
        "links",
        "link-gap",
        "link-size",
        // Social
        "social-icons",
        "icon-size",
        "icon-color",
        "icon-hover-color",
        // Columns
        "columns",
        // Copyright
        "copyright-text",
        "copyright-color",
        "copyright-size",
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

    // Property getters with defaults
    get layout() {
      return this.getAttribute("layout") || "center";
    }
    get theme() {
      return this.getAttribute("theme") || "dark";
    }
    get width() {
      return this.getAttribute("width") || "100%";
    }
    get padding() {
      return this.getAttribute("padding") || "1.5rem";
    }
    get margin() {
      return this.getAttribute("margin") || "0";
    }
    get gap() {
      return this.getAttribute("gap") || "1rem";
    }
    get fontFamily() {
      return (
        this.getAttribute("font-family") ||
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
      );
    }

    // Color properties
    get bgColor() {
      return (
        this.getAttribute("bg-color") ||
        (this.theme === "dark" ? "#111827" : "#F9FAFB")
      );
    }
    get textColor() {
      return (
        this.getAttribute("text-color") ||
        (this.theme === "dark" ? "#F9FAFB" : "#111827")
      );
    }
    get linkColor() {
      return (
        this.getAttribute("link-color") ||
        (this.theme === "dark" ? "#D1D5DB" : "#374151")
      );
    }
    get linkHoverColor() {
      return (
        this.getAttribute("link-hover-color") ||
        (this.theme === "dark" ? "#F9FAFB" : "#111827")
      );
    }

    // Border properties
    get borderColor() {
      return (
        this.getAttribute("border-color") ||
        (this.theme === "dark" ? "#374151" : "#E5E7EB")
      );
    }
    get borderWidth() {
      return this.getAttribute("border-width") || "1px";
    }
    get borderStyle() {
      return this.getAttribute("border-style") || "solid";
    }

    // Brand properties
    get brandText() {
      return this.getAttribute("brand-text") || "LumeUI";
    }
    get brandColor() {
      return this.getAttribute("brand-color") || this.textColor;
    }
    get brandSize() {
      return this.getAttribute("brand-size") || "1.25rem";
    }
    get logoSrc() {
      return this.getAttribute("logo-src") || "";
    }
    get logoAlt() {
      return this.getAttribute("logo-alt") || this.brandText;
    }
    get logoWidth() {
      return this.getAttribute("logo-width") || "32px";
    }
    get logoHeight() {
      return this.getAttribute("logo-height") || "32px";
    }

    // Navigation properties
    get links() {
      return this.getAttribute("links") || "Home|#,About|#,Contact|#";
    }
    get linkGap() {
      return this.getAttribute("link-gap") || "1.5rem";
    }
    get linkSize() {
      return this.getAttribute("link-size") || "0.875rem";
    }

    // Social properties
    get socialIcons() {
      return this.getAttribute("social-icons") || "";
    }
    get iconSize() {
      return this.getAttribute("icon-size") || "20px";
    }
    get iconColor() {
      return this.getAttribute("icon-color") || this.linkColor;
    }
    get iconHoverColor() {
      return this.getAttribute("icon-hover-color") || this.linkHoverColor;
    }

    // Columns property
    get columns() {
      const attr = this.getAttribute("columns");
      if (!attr) return null;
      try {
        return JSON.parse(attr);
      } catch (e) {
        console.warn("Invalid columns JSON:", e);
        return null;
      }
    }

    // Copyright properties
    get copyrightText() {
      return (
        this.getAttribute("copyright-text") ||
        "© 2025 LumeUI. All rights reserved."
      );
    }
    get copyrightColor() {
      return this.getAttribute("copyright-color") || this.textColor;
    }
    get copyrightSize() {
      return this.getAttribute("copyright-size") || "0.75rem";
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

    // Parse links string into array
    parseLinks(linksStr) {
      if (!linksStr) return [];
      return linksStr
        .split(",")
        .map((link) => {
          const [label, href] = link.split("|");
          return { label: label?.trim(), href: href?.trim() || "#" };
        })
        .filter((link) => link.label);
    }

    // Parse social icons string into array
    parseSocialIcons(iconsStr) {
      if (!iconsStr) return [];
      return iconsStr
        .split(",")
        .map((icon) => {
          const [platform, href] = icon.split("|");
          return {
            platform: platform?.trim().toLowerCase(),
            href: href?.trim() || "#",
          };
        })
        .filter((icon) => icon.platform);
    }

    // Get SVG icon for social platform
    getSocialIcon(platform) {
      const icons = {
        facebook:
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
        twitter:
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
        linkedin:
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
        github:
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        instagram:
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
      };
      return (
        icons[platform] ||
        '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>'
      );
    }

    // Event handlers
    handleLinkClick(event) {
      event.preventDefault();
      const href = event.target.getAttribute("href");
      const text = event.target.textContent;

      this.dispatchEvent(
        new CustomEvent("footer-link-click", {
          bubbles: true,
          composed: true,
          detail: { href, text },
        })
      );

      // Navigate if href is not just #
      if (href && href !== "#") {
        window.location.href = href;
      }
    }

    setupEventListeners() {
      const links = this.shadowRoot.querySelectorAll("a[data-footer-link]");
      links.forEach((link) => {
        link.addEventListener("click", this.handleLinkClick.bind(this));
      });
    }

    removeEventListeners() {
      const links = this.shadowRoot.querySelectorAll("a[data-footer-link]");
      links.forEach((link) => {
        link.removeEventListener("click", this.handleLinkClick.bind(this));
      });
    }

    // Generate CSS based on layout
    getLayoutCSS() {
      const layouts = {
        center: `
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: var(--gap);
        }
        .brand-section { order: 1; }
        .links-section { order: 2; }
        .social-section { order: 3; }
        .copyright-section { order: 4; }
      `,
        split: `
        .footer-content {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-areas: "brand links social" "copyright copyright copyright";
          align-items: center;
          gap: var(--gap);
        }
        .brand-section { grid-area: brand; justify-self: start; }
        .links-section { grid-area: links; justify-self: center; }
        .social-section { grid-area: social; justify-self: end; }
        .copyright-section { grid-area: copyright; text-align: center; margin-top: var(--gap); }
      `,
        stacked: `
        .footer-content {
          display: flex;
          flex-direction: column;
          gap: calc(var(--gap) * 1.5);
        }
        .brand-section, .links-section, .social-section, .copyright-section {
          text-align: center;
        }
      `,
        columns: `
        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: calc(var(--gap) * 2);
          align-items: start;
        }
        .columns-container {
          display: contents;
        }
        .column {
          display: flex;
          flex-direction: column;
          gap: var(--gap);
        }
        .column-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }
        .copyright-section {
          grid-column: 1 / -1;
          text-align: center;
          margin-top: var(--gap);
          padding-top: var(--gap);
          border-top: 1px solid var(--border-color);
        }
      `,
      };

      return layouts[this.layout] || layouts.center;
    }

    // Generate responsive CSS
    getResponsiveCSS() {
      return `
      @media (max-width: 768px) {
        .footer-content {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          gap: calc(var(--gap) * 1.5) !important;
        }
        .brand-section, .links-section, .social-section, .copyright-section {
          justify-self: center !important;
          text-align: center !important;
        }
        .links-section {
          flex-wrap: wrap;
          justify-content: center;
        }
        .columns-container {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          gap: calc(var(--gap) * 1.5) !important;
        }
        .column {
          text-align: center !important;
        }
      }
    `;
    }

    render() {
      const links = this.parseLinks(this.links);
      const socialIcons = this.parseSocialIcons(this.socialIcons);
      const columns = this.columns;

      this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: var(--width);
          margin: var(--margin);
          font-family: var(--font-family);
          --width: ${this.width};
          --padding: ${this.padding};
          --margin: ${this.margin};
          --gap: ${this.gap};
          --font-family: ${this.fontFamily};
          --bg-color: ${this.bgColor};
          --text-color: ${this.textColor};
          --link-color: ${this.linkColor};
          --link-hover-color: ${this.linkHoverColor};
          --border-color: ${this.borderColor};
          --border-width: ${this.borderWidth};
          --border-style: ${this.borderStyle};
          --brand-color: ${this.brandColor};
          --brand-size: ${this.brandSize};
          --link-size: ${this.linkSize};
          --link-gap: ${this.linkGap};
          --icon-size: ${this.iconSize};
          --icon-color: ${this.iconColor};
          --icon-hover-color: ${this.iconHoverColor};
          --copyright-color: ${this.copyrightColor};
          --copyright-size: ${this.copyrightSize};
        }

        .footer {
          background-color: var(--bg-color);
          color: var(--text-color);
          padding: var(--padding);
          border-top: var(--border-width) var(--border-style) var(--border-color);
          transition: all 0.3s ease;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Layout-specific CSS */
        ${this.getLayoutCSS()}

        /* Brand Section */
        .brand-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-logo {
          width: var(--logo-width, ${this.logoWidth});
          height: var(--logo-height, ${this.logoHeight});
          object-fit: contain;
        }

        .brand-text {
          font-size: var(--brand-size);
          font-weight: 700;
          color: var(--brand-color);
          margin: 0;
        }

        /* Links Section */
        .links-section {
          display: flex;
          flex-wrap: wrap;
          gap: var(--link-gap);
          align-items: center;
        }

        .footer-link {
          color: var(--link-color);
          text-decoration: none;
          font-size: var(--link-size);
          font-weight: 500;
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .footer-link:hover {
          color: var(--link-hover-color);
        }

        /* Social Section */
        .social-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: calc(var(--icon-size) + 8px);
          height: calc(var(--icon-size) + 8px);
          color: var(--icon-color);
          transition: color 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }

        .social-icon:hover {
          color: var(--icon-hover-color);
          transform: scale(1.1);
        }

        .social-icon svg {
          width: var(--icon-size);
          height: var(--icon-size);
        }

        /* Column layout specific styles */
        .column {
          min-width: 0;
        }

        .column-title {
          font-weight: 600;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }

        .column-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .column-link {
          color: var(--link-color);
          text-decoration: none;
          font-size: var(--link-size);
          transition: color 0.2s ease;
          cursor: pointer;
        }

        .column-link:hover {
          color: var(--link-hover-color);
        }

        /* Copyright Section */
        .copyright-section {
          font-size: var(--copyright-size);
          color: var(--copyright-color);
          opacity: 0.8;
        }

        /* Responsive CSS */
        ${this.getResponsiveCSS()}
      </style>

      <footer class="footer">
        <div class="footer-content">
          ${
            this.layout === "columns" && columns
              ? `
            <div class="columns-container">
              ${columns
                .map(
                  (column, index) => `
                <div class="column">
                  <h4 class="column-title">${column.title}</h4>
                  <div class="column-links">
                    ${column.items
                      .map((item) => {
                        const [label, href] = item.split("|");
                        return `<a href="${
                          href || "#"
                        }" class="column-link" data-footer-link>${label}</a>`;
                      })
                      .join("")}
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : `
            ${
              this.logoSrc || this.brandText
                ? `
              <div class="brand-section">
                ${
                  this.logoSrc
                    ? `<img src="${this.logoSrc}" alt="${this.logoAlt}" class="brand-logo">`
                    : ""
                }
                ${
                  this.brandText
                    ? `<h2 class="brand-text">${this.brandText}</h2>`
                    : ""
                }
              </div>
            `
                : ""
            }

            ${
              links.length > 0
                ? `
              <nav class="links-section" role="navigation" aria-label="Footer navigation">
                ${links
                  .map(
                    (link) => `
                  <a href="${link.href}" class="footer-link" data-footer-link>${link.label}</a>
                `
                  )
                  .join("")}
              </nav>
            `
                : ""
            }

            ${
              socialIcons.length > 0
                ? `
              <div class="social-section">
                ${socialIcons
                  .map(
                    (icon) => `
                  <a href="${icon.href}" class="social-icon" aria-label="${
                      icon.platform
                    }" target="_blank" rel="noopener noreferrer">
                    ${this.getSocialIcon(icon.platform)}
                  </a>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          `
          }

          ${
            this.copyrightText
              ? `
            <div class="copyright-section">
              ${this.copyrightText}
            </div>
          `
              : ""
          }
        </div>
      </footer>
    `;

      // Re-setup event listeners after render
      if (this._initialized) {
        this.setupEventListeners();
      }
    }
  }

  // Register the component
  if (!customElements.get("lume-footer")) {
    customElements.define("lume-footer", LumeFooter);
  }
})();
