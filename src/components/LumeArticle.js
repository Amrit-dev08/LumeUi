export class LumeArticle extends HTMLElement {
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