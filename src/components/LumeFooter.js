export class LumeFooter extends HTMLElement {
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
