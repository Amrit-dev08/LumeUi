export class LumeHero extends HTMLElement {
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
      this._instanceId = "lume-hero-" + Math.random().toString(36).substr(2, 9);
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
    } else if (this.backgroundType === "gradient" && this.backgroundGradient) {
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
