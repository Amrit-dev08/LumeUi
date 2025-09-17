// LumeNavbar.js - Modern Navbar Web Component

export class LumeNavbar extends HTMLElement {
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
    return this.getAttribute("button-hover-bg") || this.getThemeButtonHoverBg();
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
    const target = link.getAttribute("target");

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
      this._instanceId = "lume-nav-" + Math.random().toString(36).substr(2, 9);
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
