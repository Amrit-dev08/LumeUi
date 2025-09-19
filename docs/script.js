class DocumentationSite {
  constructor() {
    this.contentArea = document.getElementById("content-area");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.currentPage = "introduction";
    this.pages = new Map(); // Cache for loaded pages

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadPage("introduction"); // Load default page
  }

  bindEvents() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        this.loadPage(page);
        this.setActiveLink(link);

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 768) {
          document.getElementById("sidebar").classList.remove("open");
        }
      });
    });
  }

  async loadPage(pageName) {
    // Check cache first
    if (this.pages.has(pageName)) {
      this.contentArea.innerHTML = this.pages.get(pageName);
      this.currentPage = pageName;
      return;
    }

    this.showLoading();

    try {
      const content = await this.getPageContent(pageName);
      this.pages.set(pageName, content); // Cache the content
      this.contentArea.innerHTML = content;
      this.currentPage = pageName;
    } catch (error) {
      this.showError(`Failed to load ${pageName} page: ${error.message}`);
    }
  }

  async getPageContent(pageName) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const pages = {
      introduction: `
        <div class="page-content">
          <h1>Welcome to LumeUI Documentation</h1>
          <p class="lead">A modern, lightweight web component library for building beautiful and interactive user interfaces.</p>
          
          <h2>Features</h2>
          <ul class="feature-list">
            <li><span class="feature-icon">🎨</span><strong>Modern Design</strong> - Beautiful, responsive components with contemporary styling</li>
            <li><span class="feature-icon">🔧</span><strong>Highly Customizable</strong> - Extensive theming and styling options</li>
            <li><span class="feature-icon">📱</span><strong>Mobile First</strong> - Responsive design built for all screen sizes</li>
            <li><span class="feature-icon">⚡</span><strong>Lightweight</strong> - No dependencies, vanilla JavaScript implementation</li>
            <li><span class="feature-icon">🎯</span><strong>Framework Agnostic</strong> - Works with any framework or vanilla HTML</li>
            <li><span class="feature-icon">🌙</span><strong>Dark/Light Themes</strong> - Built-in theme support</li>
          </ul>
          
          <h2>Why LumeUI?</h2>
          <p>LumeUI provides a collection of customizable, framework-agnostic components that work seamlessly across all modern browsers. Built with Web Components technology, LumeUI ensures compatibility and future-proofing for your projects.</p>
          
          <h2>Getting Started</h2>
          <p>Ready to start building with LumeUI? Check out our <a href="#" data-page="getting-started">Getting Started</a> guide to learn how to add LumeUI to your project in minutes.</p>
        </div>
      `,

      "getting-started": `
        <div class="page-content">
          <h1>Getting Started</h1>
          <p class="lead">Get up and running with LumeUI in minutes.</p>
          
          <h2>Installation</h2>
          <h3>CDN (Recommended)</h3>
          <p>Add LumeUI to your project by including the CDN link in your HTML:</p>
          
          <div class="code-block">
            <pre><code>&lt;script
  src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"
  type="module"
&gt;&lt;/script&gt;</code></pre>
          </div>
          
          <p>That's it! All components are now available as custom HTML elements.</p>
          
          <h2>Quick Example</h2>
          <p>Here's a quick example to get you started:</p>
          
          <div class="code-block">
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;LumeUI Example&lt;/title&gt;
    &lt;script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;lume-button variant="primary" size="large"&gt;
      Get Started
    &lt;/lume-button&gt;

    &lt;lume-hero
      heading-text="Welcome to LumeUI"
      description-text="Build beautiful web interfaces with ease"
    &gt;
    &lt;/lume-hero&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
          </div>
          
          <h2>Browser Support</h2>
          <p>LumeUI supports all modern browsers with Web Components support:</p>
          <ul>
            <li><strong>Chrome:</strong> 63+ ✅</li>
            <li><strong>Firefox:</strong> 53+ ✅</li>
            <li><strong>Safari:</strong> 10+ ✅</li>
            <li><strong>Edge:</strong> 79+ ✅</li>
          </ul>
          
          <h2>Next Steps</h2>
          <p>Now that you have LumeUI installed, explore the available components:</p>
          <ul>
            <li><a href="#" data-page="button">Button Component</a> - Versatile button with multiple variants</li>
            <li><a href="#" data-page="navbar">Navbar Component</a> - Responsive navigation header</li>
            <li><a href="#" data-page="hero">Hero Component</a> - Powerful hero sections</li>
            <li><a href="#" data-page="form">Form Component</a> - Comprehensive form builder</li>
          </ul>
        </div>
      `,

      button: `
        <div class="page-content">
          <h1>Button Component</h1>
          <p class="lead">A versatile button component with multiple variants, sizes, and extensive customization options.</p>
          
          <h2>Basic Usage</h2>
          <div class="code-block">
            <pre><code>&lt;lume-button&gt;Click Me&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h2>Variants</h2>
          <p>The button component supports 7 different variants:</p>
          
          <h3>Primary Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-button variant="primary"&gt;Primary Button&lt;/lume-button&gt;</code></pre>
            </div>
            <p>Default brand-colored button used for main call-to-action elements.</p>
          </div>
          
          <h3>Secondary Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-button variant="secondary"&gt;Secondary Button&lt;/lume-button&gt;</code></pre>
            </div>
            <p>Muted gray styling used for secondary actions.</p>
          </div>
          
          <h3>Outlined Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-button variant="outlined"&gt;Outlined Button&lt;/lume-button&gt;</code></pre>
            </div>
            <p>Transparent background with colored border that fills with color on hover.</p>
          </div>
          
          <h3>Ghost Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-button variant="ghost"&gt;Ghost Button&lt;/lume-button&gt;</code></pre>
            </div>
            <p>Minimal styling with subtle hover effects and transparent background.</p>
          </div>
          
          <h3>Glow Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-button variant="glow" glow-color="rgba(37, 99, 235, 0.5)"&gt;
  Glow Button
&lt;/lume-button&gt;</code></pre>
            </div>
            <p>Features glowing shadow effect with customizable glow color.</p>
          </div>
          
          <h2>Sizes</h2>
          <p>Three size options available for all variants:</p>
          <div class="code-block">
            <pre><code>&lt;lume-button variant="primary" size="small"&gt;Small Button&lt;/lume-button&gt;
&lt;lume-button variant="primary" size="medium"&gt;Medium Button&lt;/lume-button&gt;
&lt;lume-button variant="primary" size="large"&gt;Large Button&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h2>States</h2>
          
          <h3>Disabled State</h3>
          <div class="code-block">
            <pre><code>&lt;lume-button variant="primary" disabled&gt;Disabled Button&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h3>Loading State</h3>
          <div class="code-block">
            <pre><code>&lt;lume-button variant="primary" loading&gt;Loading Button&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h2>Custom Styling</h2>
          <p>Extensive customization options for colors, dimensions, and appearance:</p>
          
          <div class="code-block">
            <pre><code>&lt;lume-button
  variant="primary"
  color="#ffffff"
  bg-color="#6366f1"
  hover-color="#ffffff"
  hover-bg-color="#4f46e5"
  radius="20px"
  padding="1rem 2rem"
&gt;
  Custom Button
&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>variant</code></td>
                <td>String</td>
                <td>"primary"</td>
                <td>Button style variant</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td>String</td>
                <td>"medium"</td>
                <td>Button size (small, medium, large)</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>Disable button interaction</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>Show loading state</td>
              </tr>
              <tr>
                <td><code>full-width</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>Make button full width</td>
              </tr>
              <tr>
                <td><code>href</code></td>
                <td>String</td>
                <td>-</td>
                <td>URL for link functionality</td>
              </tr>
              <tr>
                <td><code>color</code></td>
                <td>String</td>
                <td>-</td>
                <td>Text color</td>
              </tr>
              <tr>
                <td><code>bg-color</code></td>
                <td>String</td>
                <td>-</td>
                <td>Background color</td>
              </tr>
              <tr>
                <td><code>glow-color</code></td>
                <td>String</td>
                <td>-</td>
                <td>Glow effect color (for glow variant)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      navbar: `
        <div class="page-content">
          <h1>Navbar Component</h1>
          <p class="lead">A comprehensive navigation component with multiple variants, responsive behavior, and extensive customization options.</p>
          
          <h2>Default Usage</h2>
          <div class="code-block">
            <pre><code>&lt;lume-navbar&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h2>Customized Navbar</h2>
          <div class="code-block">
            <pre><code>&lt;lume-navbar logo-text="Brand Name" theme="dark"&gt;
  &lt;div slot="links"&gt;
    &lt;a href="#home" active&gt;Home&lt;/a&gt;
    &lt;a href="#about"&gt;About&lt;/a&gt;
    &lt;a href="#services"&gt;Services&lt;/a&gt;
    &lt;a href="#contact"&gt;Contact&lt;/a&gt;
  &lt;/div&gt;

  &lt;div slot="actions"&gt;
    &lt;button variant="primary"&gt;Get Started&lt;/button&gt;
    &lt;button variant="secondary"&gt;Login&lt;/button&gt;
  &lt;/div&gt;
&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h2>Navbar Variants</h2>
          <p>The navbar supports 8 distinct variants:</p>
          
          <h3>Default Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-navbar variant="default" theme="dark"&gt;&lt;/lume-navbar&gt;</code></pre>
            </div>
            <p>Standard navbar with solid background.</p>
          </div>
          
          <h3>Glassmorphism Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-navbar variant="glassmorphism" theme="dark"&gt;&lt;/lume-navbar&gt;</code></pre>
            </div>
            <p>Translucent background with blur effect and modern glass-like appearance.</p>
          </div>
          
          <h3>Floating Variant</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-navbar variant="floating" theme="dark"&gt;&lt;/lume-navbar&gt;</code></pre>
            </div>
            <p>Rounded corners with margin, enhanced glassmorphism effect, and animated hover effects.</p>
          </div>
          
          <h2>Logo Configuration</h2>
          
          <h3>Text Logo</h3>
          <div class="code-block">
            <pre><code>&lt;lume-navbar logo-text="Your Brand"&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h3>Image Logo</h3>
          <div class="code-block">
            <pre><code>&lt;lume-navbar
  logo-src="https://example.com/logo.png"
  logo-width="120px"
  logo-height="40px"
&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h2>Mobile Configuration</h2>
          <div class="code-block">
            <pre><code>&lt;lume-navbar 
  mobile-breakpoint="992px"
  mobile-menu-position="overlay"
  animation-duration="0.5s"
&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>variant</code></td>
                <td>String</td>
                <td>"default"</td>
                <td>Visual variant style</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td>String</td>
                <td>"dark"</td>
                <td>Color theme (dark, light)</td>
              </tr>
              <tr>
                <td><code>logo-text</code></td>
                <td>String</td>
                <td>"Brand"</td>
                <td>Text logo content</td>
              </tr>
              <tr>
                <td><code>logo-src</code></td>
                <td>String</td>
                <td>-</td>
                <td>Logo image URL</td>
              </tr>
              <tr>
                <td><code>sticky</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>Sticky positioning</td>
              </tr>
              <tr>
                <td><code>mobile-breakpoint</code></td>
                <td>String</td>
                <td>"768px"</td>
                <td>Mobile menu activation point</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      hero: `
        <div class="page-content">
          <h1>Hero Component</h1>
          <p class="lead">A powerful hero section component with extensive background options, content configuration, and animation capabilities.</p>
          
          <h2>Default Hero</h2>
          <div class="code-block">
            <pre><code>&lt;lume-hero&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>Customized Hero Section</h2>
          <div class="code-block">
            <pre><code>&lt;lume-hero
  heading-text="Build Amazing Websites"
  subheading-text="With Modern Web Components"
  description-text="Create beautiful, responsive interfaces using our powerful component library."
  primary-button-text="Get Started"
  secondary-button-text="Learn More"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>Hero Themes</h2>
          
          <h3>Dark Theme (Default)</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-hero theme="dark"&gt;&lt;/lume-hero&gt;</code></pre>
            </div>
            <p>Dark theme with gradient from #0f172a to #334155, light text, and blue brand colors.</p>
          </div>
          
          <h3>Light Theme</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-hero theme="light"&gt;&lt;/lume-hero&gt;</code></pre>
            </div>
            <p>Light theme with gradient from #ffffff to #f1f5f9 and gradient text effects.</p>
          </div>
          
          <h2>Background Options</h2>
          
          <h3>Image Background</h3>
          <div class="code-block">
            <pre><code>&lt;lume-hero
  background-type="image"
  background-image="https://example.com/hero-bg.jpg"
  background-position="center center"
  background-size="cover"
  background-overlay="rgba(0, 0, 0, 0.6)"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h3>Gradient Background</h3>
          <div class="code-block">
            <pre><code>&lt;lume-hero
  background-type="gradient"
  background-gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>Content Configuration</h2>
          
          <h3>Typography Customization</h3>
          <div class="code-block">
            <pre><code>&lt;lume-hero
  heading-text="Custom Heading"
  heading-color="#3b82f6"
  heading-size="clamp(3rem, 10vw, 6rem)"
  heading-weight="900"
  subheading-text="Custom Subheading"
  description-text="Custom description text"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>Animation Options</h2>
          <div class="code-block">
            <pre><code>&lt;lume-hero 
  animate 
  animation-delay="0.3s" 
  animation-duration="0.8s"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>theme</code></td>
                <td>String</td>
                <td>"dark"</td>
                <td>Color theme</td>
              </tr>
              <tr>
                <td><code>height</code></td>
                <td>String</td>
                <td>"100vh"</td>
                <td>Hero height</td>
              </tr>
              <tr>
                <td><code>background-type</code></td>
                <td>String</td>
                <td>"color"</td>
                <td>Background type</td>
              </tr>
              <tr>
                <td><code>heading-text</code></td>
                <td>String</td>
                <td>"Welcome to Our Platform"</td>
                <td>Main heading</td>
              </tr>
              <tr>
                <td><code>animate</code></td>
                <td>Boolean</td>
                <td>false</td>
                <td>Enable animations</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      article: `
        <div class="page-content">
          <h1>Article Component</h1>
          <p class="lead">A flexible article/content section component with image and text layouts.</p>
          
          <h2>Default Article</h2>
          <div class="code-block">
            <pre><code>&lt;lume-article&gt;&lt;/lume-article&gt;</code></pre>
          </div>
          
          <h2>Customized Article</h2>
          <div class="code-block">
            <pre><code>&lt;lume-article
  layout="left"
  heading-text="Amazing Features"
  description-text="Discover what makes our platform unique and powerful."
  button-text="Learn More"
  image-src="https://example.com/feature.jpg"
&gt;&lt;/lume-article&gt;</code></pre>
          </div>
          
          <h2>Article Layouts</h2>
          
          <h3>Left Layout (Image on Left)</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-article layout="left"&gt;&lt;/lume-article&gt;</code></pre>
            </div>
            <p>Image positioned on the left, text content on the right.</p>
          </div>
          
          <h3>Right Layout (Image on Right)</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-article layout="right"&gt;&lt;/lume-article&gt;</code></pre>
            </div>
            <p>Image positioned on the right, text content on the left.</p>
          </div>
          
          <h2>Image Configuration</h2>
          <div class="code-block">
            <pre><code>&lt;lume-article
  image-src="https://example.com/image.jpg"
  image-alt="Descriptive text"
  image-width="100%"
  image-height="400px"
  image-radius="1rem"
  image-fit="cover"
&gt;&lt;/lume-article&gt;</code></pre>
          </div>
          
          <h2>Typography</h2>
          <div class="code-block">
            <pre><code>&lt;lume-article
  heading-text="Custom Heading"
  heading-color="#2563eb"
  heading-size="clamp(2rem, 4vw, 3.5rem)"
  description-text="Custom description"
  description-color="#64748b"
&gt;&lt;/lume-article&gt;</code></pre>
          </div>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>layout</code></td>
                <td>String</td>
                <td>"left"</td>
                <td>Image position (left, right)</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td>String</td>
                <td>"dark"</td>
                <td>Color theme</td>
              </tr>
              <tr>
                <td><code>heading-text</code></td>
                <td>String</td>
                <td>"Article Heading"</td>
                <td>Main heading text</td>
              </tr>
              <tr>
                <td><code>image-src</code></td>
                <td>String</td>
                <td>Default image</td>
                <td>Image source URL</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      form: `
        <div class="page-content">
          <h1>Form Component</h1>
          <p class="lead">A comprehensive form component with multiple types, layouts, and extensive customization options.</p>
          
          <h2>Default Form (Contact Form)</h2>
          <div class="code-block">
            <pre><code>&lt;lume-form&gt;&lt;/lume-form&gt;</code></pre>
          </div>
          
          <h2>Form Types</h2>
          
          <h3>Contact Form</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-form type="contact"&gt;&lt;/lume-form&gt;</code></pre>
            </div>
            <p>Includes: Name, Email, Subject, Message fields</p>
          </div>
          
          <h3>Login Form</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-form type="login"&gt;&lt;/lume-form&gt;</code></pre>
            </div>
            <p>Includes: Email, Password fields</p>
          </div>
          
          <h3>Register Form</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-form type="register"&gt;&lt;/lume-form&gt;</code></pre>
            </div>
            <p>Includes: Full Name, Email, Password, Confirm Password fields</p>
          </div>
          
          <h2>Custom Fields</h2>
          <p>Create custom forms with specific field types:</p>
          <div class="code-block">
            <pre><code>&lt;lume-form
  type="custom"
  fields='[
    {
      "label": "Full Name",
      "type": "text",
      "name": "name",
      "required": true
    },
    {
      "label": "Industry",
      "type": "select",
      "name": "industry",
      "options": ["Technology", "Finance", "Healthcare"]
    },
    {
      "label": "Message",
      "type": "textarea",
      "name": "message",
      "rows": 4
    }
  ]'
&gt;&lt;/lume-form&gt;</code></pre>
          </div>
          
          <h2>Supported Field Types</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Field Type</th>
                <th>Description</th>
                <th>Additional Properties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>text</code></td>
                <td>Standard text input</td>
                <td>minlength, maxlength, pattern</td>
              </tr>
              <tr>
                <td><code>email</code></td>
                <td>Email input with validation</td>
                <td>-</td>
              </tr>
              <tr>
                <td><code>password</code></td>
                <td>Password input</td>
                <td>minlength, maxlength</td>
              </tr>
              <tr>
                <td><code>textarea</code></td>
                <td>Multi-line text area</td>
                <td>rows</td>
              </tr>
              <tr>
                <td><code>select</code></td>
                <td>Dropdown selection</td>
                <td>options array</td>
              </tr>
              <tr>
                <td><code>checkbox</code></td>
                <td>Checkbox input</td>
                <td>value</td>
              </tr>
            </tbody>
          </table>
          
          <h2>Form Layouts</h2>
          
          <h3>Split Layout (Default)</h3>
          <div class="code-block">
            <pre><code>&lt;lume-form layout="split"&gt;&lt;/lume-form&gt;</code></pre>
          </div>
          <p>Side-by-side info panel and form</p>
          
          <h3>Single Layout</h3>
          <div class="code-block">
            <pre><code>&lt;lume-form layout="single"&gt;&lt;/lume-form&gt;</code></pre>
          </div>
          <p>Form only, no info panel</p>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>type</code></td>
                <td>String</td>
                <td>"contact"</td>
                <td>Form type</td>
              </tr>
              <tr>
                <td><code>layout</code></td>
                <td>String</td>
                <td>"split"</td>
                <td>Form layout</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td>String</td>
                <td>"dark"</td>
                <td>Color theme</td>
              </tr>
              <tr>
                <td><code>fields</code></td>
                <td>JSON String</td>
                <td>-</td>
                <td>Custom fields array</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      footer: `
        <div class="page-content">
          <h1>Footer Component</h1>
          <p class="lead">A flexible footer component with multiple layouts and extensive customization options.</p>
          
          <h2>Default Footer</h2>
          <div class="code-block">
            <pre><code>&lt;lume-footer&gt;&lt;/lume-footer&gt;</code></pre>
          </div>
          
          <h2>Customized Footer</h2>
          <div class="code-block">
            <pre><code>&lt;lume-footer
  brand-text="LumeUI"
  links="Home|/,About|/about,Services|/services,Contact|/contact"
  social-icons="github|https://github.com,twitter|https://twitter.com"
  copyright-text="© 2025 LumeUI. All rights reserved."
&gt;&lt;/lume-footer&gt;</code></pre>
          </div>
          
          <h2>Footer Layouts</h2>
          
          <h3>Center Layout (Default)</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-footer layout="center"&gt;&lt;/lume-footer&gt;</code></pre>
            </div>
            <p>Centered vertical stack with brand, links, social, and copyright sections.</p>
          </div>
          
          <h3>Split Layout</h3>
          <div class="component-demo">
            <h5>Example:</h5>
            <div class="code-block">
              <pre><code>&lt;lume-footer layout="split"&gt;&lt;/lume-footer&gt;</code></pre>
            </div>
            <p>Three-column layout with brand, links, and social sections.</p>
          </div>
          
          <h3>Columns Layout</h3>
          <div class="code-block">
            <pre><code>&lt;lume-footer
  layout="columns"
  columns='[
    {
      "title": "Product",
      "items": [
        "Features|/features",
        "Pricing|/pricing",
        "Updates|/updates"
      ]
    },
    {
      "title": "Company", 
      "items": [
        "About Us|/about",
        "Careers|/careers",
        "Contact|/contact"
      ]
    }
  ]'
&gt;&lt;/lume-footer&gt;</code></pre>
          </div>
          
          <h2>Social Icons</h2>
          <p>The footer supports popular social platforms with built-in SVG icons:</p>
          <div class="code-block">
            <pre><code>&lt;lume-footer
  social-icons="github|https://github.com/user,twitter|https://twitter.com/user,linkedin|https://linkedin.com/in/user"
  icon-size="24px"
  icon-color="#9ca3af"
&gt;&lt;/lume-footer&gt;</code></pre>
          </div>
          
          <h3>Supported Platforms</h3>
          <ul>
            <li><code>github</code> - GitHub profile</li>
            <li><code>twitter</code> - Twitter/X profile</li>
            <li><code>linkedin</code> - LinkedIn profile</li>
            <li><code>facebook</code> - Facebook page</li>
            <li><code>instagram</code> - Instagram profile</li>
          </ul>
          
          <h2>Complete Attribute Reference</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Attribute</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>layout</code></td>
                <td>String</td>
                <td>"center"</td>
                <td>Footer layout</td>
              </tr>
              <tr>
                <td><code>theme</code></td>
                <td>String</td>
                <td>"dark"</td>
                <td>Color theme</td>
              </tr>
              <tr>
                <td><code>brand-text</code></td>
                <td>String</td>
                <td>"LumeUI"</td>
                <td>Brand text</td>
              </tr>
              <tr>
                <td><code>links</code></td>
                <td>String</td>
                <td>Default links</td>
                <td>Navigation links</td>
              </tr>
              <tr>
                <td><code>social-icons</code></td>
                <td>String</td>
                <td>""</td>
                <td>Social media links</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      theming: `
        <div class="page-content">
          <h1>Theming System</h1>
          <p class="lead">LumeUI provides a comprehensive theming system with built-in dark and light themes.</p>
          
          <h2>Global Theme Application</h2>
          <div class="code-block">
            <pre><code>&lt;!-- Apply dark theme to all components --&gt;
&lt;lume-navbar theme="dark"&gt;&lt;/lume-navbar&gt;
&lt;lume-hero theme="dark"&gt;&lt;/lume-hero&gt;
&lt;lume-form theme="dark"&gt;&lt;/lume-form&gt;
&lt;lume-footer theme="dark"&gt;&lt;/lume-footer&gt;

&lt;!-- Apply light theme to all components --&gt;
&lt;lume-navbar theme="light"&gt;&lt;/lume-navbar&gt;
&lt;lume-hero theme="light"&gt;&lt;/lume-hero&gt;
&lt;lume-form theme="light"&gt;&lt;/lume-form&gt;
&lt;lume-footer theme="light"&gt;&lt;/lume-footer&gt;</code></pre>
          </div>
          
          <h2>Custom Color Overrides</h2>
          <p>Override theme colors on individual components:</p>
          <div class="code-block">
            <pre><code>&lt;lume-hero
  theme="dark"
  heading-color="#ff6b6b"
  primary-button-bg-color="#4ecdc4"
  primary-button-hover-bg-color="#45b7b8"
&gt;&lt;/lume-hero&gt;</code></pre>
          </div>
          
          <h2>CSS Custom Properties</h2>
          <p>Components expose CSS custom properties for advanced theming:</p>
          <div class="code-block">
            <pre><code>&lt;style&gt;
  lume-button {
    --primary-bg: #8e44ad;
    --primary-hover-bg: #9b59b6;
    --animation-duration: 0.4s;
  }

  lume-navbar {
    --brand-color: #e74c3c;
    --text-color: #ecf0f1;
    --bg-color: #2c3e50;
  }
&lt;/style&gt;</code></pre>
          </div>
          
          <h2>Theme Color Values</h2>
          
          <h3>Dark Theme Colors</h3>
          <div class="code-block">
            <pre><code>--hero-bg: #111827
--hero-text: #f9fafb
--hero-brand: #3b82f6
--primary-btn-bg: #3b82f6
--primary-btn-hover-bg: #2563eb</code></pre>
          </div>
          
          <h3>Light Theme Colors</h3>
          <div class="code-block">
            <pre><code>--hero-bg: #ffffff
--hero-text: #111827
--hero-brand: #2563eb
--primary-btn-bg: #2563eb
--primary-btn-hover-bg: #1d4ed8</code></pre>
          </div>
          
          <h2>Custom Theming Examples</h2>
          
          <h3>Gaming Theme</h3>
          <div class="code-block">
            <pre><code>&lt;lume-navbar
  variant="glassmorphism"
  theme="dark"
  brand-color="#00ff88"
  bg-color="rgba(0, 0, 0, 0.8)"
  text-color="#00ff88"
&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
          
          <h3>Professional Theme</h3>
          <div class="code-block">
            <pre><code>&lt;lume-navbar
  variant="transparent"
  theme="light"
  brand-color="#2c3e50"
  text-color="#34495e"
  hover-link-color="#e74c3c"
&gt;&lt;/lume-navbar&gt;</code></pre>
          </div>
        </div>
      `,

      events: `
        <div class="page-content">
          <h1>Event System</h1>
          <p class="lead">LumeUI components emit comprehensive custom events that you can listen to.</p>
          
          <h2>Button Events</h2>
          <div class="code-block">
            <pre><code>// Basic button click
document.addEventListener("lume-click", (event) => {
  console.log("Button clicked:", event.detail);
  // event.detail: { button, originalEvent, href, variant, size }
});

// Example with button reference
const button = document.querySelector("lume-button");
button.addEventListener("lume-click", (event) => {
  console.log("Specific button clicked:", event.detail.variant);
});</code></pre>
          </div>
          
          <h2>Navbar Events</h2>
          <div class="code-block">
            <pre><code>// Navigation item clicks
document.addEventListener("lume-nav-click", (event) => {
  console.log("Navigation clicked:", event.detail);
  // event.detail: { navbar, link/button, href, text, type, originalEvent }

  if (event.detail.type === "link") {
    console.log("Link clicked:", event.detail.text);
  } else if (event.detail.type === "button") {
    console.log("Button clicked:", event.detail.text);
  }
});</code></pre>
          </div>
          
          <h2>Hero Events</h2>
          <div class="code-block">
            <pre><code>// Primary button clicks
document.addEventListener("lume-hero-primary-click", (event) => {
  console.log("Hero primary button:", event.detail);
  // event.detail: { hero, text, type, originalEvent }
});

// Secondary button clicks
document.addEventListener("lume-hero-secondary-click", (event) => {
  console.log("Hero secondary button:", event.detail);
});</code></pre>
          </div>
          
          <h2>Form Events</h2>
          <div class="code-block">
            <pre><code>// Form submission
document.addEventListener("form-submit", (event) => {
  console.log("Form submitted:", event.detail);
  // event.detail: { data, formData, type }

  // Access form data
  const formData = event.detail.data;
  console.log("Form fields:", formData);

  // Prevent default submission if needed
  event.preventDefault();

  // Handle custom submission
  handleCustomSubmission(formData);
});

async function handleCustomSubmission(data) {
  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Form submitted successfully");
    }
  } catch (error) {
    console.error("Submission error:", error);
  }
}</code></pre>
          </div>
          
          <h2>Footer Events</h2>
          <div class="code-block">
            <pre><code>// Footer link clicks
document.addEventListener("footer-link-click", (event) => {
  console.log("Footer link clicked:", event.detail);
  // event.detail: { href, text }

  // Custom navigation handling
  if (event.detail.href.startsWith("#")) {
    event.preventDefault();
    smoothScrollToSection(event.detail.href);
  }
});</code></pre>
          </div>
          
          <h2>Event Data Structure</h2>
          <table class="props-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Detail Properties</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>lume-click</code></td>
                <td>button, originalEvent, href, variant, size</td>
                <td>Button component clicks</td>
              </tr>
              <tr>
                <td><code>lume-nav-click</code></td>
                <td>navbar, link/button, href, text, type</td>
                <td>Navbar navigation clicks</td>
              </tr>
              <tr>
                <td><code>form-submit</code></td>
                <td>data, formData, type</td>
                <td>Form submissions</td>
              </tr>
              <tr>
                <td><code>footer-link-click</code></td>
                <td>href, text</td>
                <td>Footer link clicks</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,

      examples: `
        <div class="page-content">
          <h1>Complete Examples</h1>
          <p class="lead">Real-world examples showcasing LumeUI components in action.</p>
          
          <h2>Modern SaaS Landing Page</h2>
          <div class="code-block">
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;LumeUI SaaS Platform&lt;/title&gt;
    &lt;script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Navigation --&gt;
    &lt;lume-navbar
      variant="default"
      theme="dark"
      logo-text="SaaSPlatform"
      brand-color="#3b82f6"
      sticky
    &gt;
      &lt;div slot="links"&gt;
        &lt;a href="#home" active&gt;Home&lt;/a&gt;
        &lt;a href="#features"&gt;Features&lt;/a&gt;
        &lt;a href="#pricing"&gt;Pricing&lt;/a&gt;
        &lt;a href="#contact"&gt;Contact&lt;/a&gt;
      &lt;/div&gt;
      &lt;div slot="actions"&gt;
        &lt;button variant="secondary"&gt;Login&lt;/button&gt;
        &lt;button variant="primary"&gt;Start Free Trial&lt;/button&gt;
      &lt;/div&gt;
    &lt;/lume-navbar&gt;

    &lt;!-- Hero Section --&gt;
    &lt;lume-hero
      theme="dark"
      heading-text="Build Better Products Faster"
      subheading-text="The Ultimate SaaS Platform"
      description-text="Streamline your workflow and ship products faster."
      primary-button-text="Start Free Trial"
      secondary-button-text="Watch Demo"
      animate
    &gt;
    &lt;/lume-hero&gt;

    &lt;!-- Feature Articles --&gt;
    &lt;lume-article
      layout="left"
      theme="light"
      heading-text="Collaborate Seamlessly"
      description-text="Real-time collaboration tools that keep your team in sync."
      button-text="Learn More"
      image-src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
    &gt;&lt;/lume-article&gt;

    &lt;!-- Contact Form --&gt;
    &lt;lume-form
      type="contact"
      theme="dark"
      layout="split"
      panel-title="Ready to Get Started?"
      panel-description="Join thousands of teams using our platform."
    &gt;&lt;/lume-form&gt;

    &lt;!-- Footer --&gt;
    &lt;lume-footer
      theme="dark"
      layout="split"
      brand-text="SaaSPlatform"
      social-icons="github|https://github.com,twitter|https://twitter.com"
      copyright-text="© 2025 SaaSPlatform. Built for modern teams."
    &gt;&lt;/lume-footer&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
          </div>
          
          <h2>Portfolio Website</h2>
          <div class="code-block">
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0" /&gt;
    &lt;title&gt;Alex Johnson - UX Designer&lt;/title&gt;
    &lt;script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"&gt;&lt;/script&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;!-- Glassmorphism Navigation --&gt;
    &lt;lume-navbar
      variant="glassmorphism"
      theme="dark"
      logo-text="Alex Johnson"
      brand-color="#6366f1"
      sticky
    &gt;
      &lt;div slot="links"&gt;
        &lt;a href="#home" active&gt;Home&lt;/a&gt;
        &lt;a href="#work"&gt;Work&lt;/a&gt;
        &lt;a href="#about"&gt;About&lt;/a&gt;
        &lt;a href="#contact"&gt;Contact&lt;/a&gt;
      &lt;/div&gt;
      &lt;div slot="actions"&gt;
        &lt;button variant="outlined"&gt;Resume&lt;/button&gt;
      &lt;/div&gt;
    &lt;/lume-navbar&gt;

    &lt;!-- Designer Hero --&gt;
    &lt;lume-hero
      theme="dark"
      heading-text="UX Designer &amp; Creative Problem Solver"
      subheading-text="Alex Johnson"
      description-text="I help brands create meaningful digital experiences through user-centered design."
      primary-button-text="View My Work"
      secondary-button-text="Get In Touch"
      background-type="gradient"
      background-gradient="linear-gradient(135deg, #1e293b 0%, #334155 100%)"
      animate
    &gt;&lt;/lume-hero&gt;

    &lt;!-- Work Showcase --&gt;
    &lt;lume-article
      layout="left"
      theme="light"
      heading-text="Mobile Banking App"
      description-text="Complete redesign resulting in 40% increase in user engagement."
      button-text="View Case Study"
      image-src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f"
    &gt;&lt;/lume-article&gt;

    &lt;!-- Contact --&gt;
    &lt;lume-form
      type="contact"
      theme="dark"
      layout="split"
      panel-title="Let's Work Together"
      panel-description="I'm always interested in new projects and opportunities."
    &gt;&lt;/lume-form&gt;

    &lt;lume-footer
      theme="dark"
      layout="center"
      brand-text="Alex Johnson"
      social-icons="linkedin|https://linkedin.com/in/alexjohnson,dribbble|https://dribbble.com/alexj"
      copyright-text="© 2025 Alex Johnson. Designed with care."
    &gt;&lt;/lume-footer&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
          </div>
          
          <h2>Advanced Customization</h2>
          
          <h3>Custom Button Variants</h3>
          <div class="code-block">
            <pre><code>&lt;!-- Neon Glow Button --&gt;
&lt;lume-button
  variant="glow"
  bg-color="#ff00ff"
  hover-bg-color="#ff44ff"
  glow-color="rgba(255, 0, 255, 0.6)"
  color="#ffffff"
  font-weight="700"
  padding="1rem 2.5rem"
  radius="25px"
&gt;
  Neon Action
&lt;/lume-button&gt;

&lt;!-- Glass Morphism Button --&gt;
&lt;lume-button
  variant="outlined"
  bg-color="rgba(255, 255, 255, 0.1)"
  hover-bg-color="rgba(255, 255, 255, 0.2)"
  border="1px solid rgba(255, 255, 255, 0.3)"
  color="rgba(255, 255, 255, 0.9)"
  radius="12px"
  shadow="0 8px 32px rgba(0, 0, 0, 0.1)"
&gt;
  Glass Effect
&lt;/lume-button&gt;</code></pre>
          </div>
          
          <h3>JavaScript Integration</h3>
          <div class="code-block">
            <pre><code>// Dynamic component updates
const button = document.querySelector("lume-button");
button.variant = "glow";
button.setAttribute("bg-color", "#ff6b6b");

// Custom form submission handling
document.addEventListener("form-submit", async (event) => {
  event.preventDefault();
  
  const formData = event.detail.data;
  
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      console.log("Form submitted successfully!");
    }
  } catch (error) {
    console.error("Submission error:", error);
  }
});</code></pre>
          </div>
        </div>
      `,
    };

    if (!pages[pageName]) {
      throw new Error(`Page "${pageName}" not found`);
    }

    return pages[pageName];
  }

  showLoading() {
    this.contentArea.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        Loading...
      </div>
    `;
  }

  showError(message) {
    this.contentArea.innerHTML = `
      <div class="error">
        <strong>Error:</strong> ${message}
      </div>
    `;
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach((link) => link.classList.remove("active"));
    activeLink.classList.add("active");
  }
}

// Initialize the documentation site when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new DocumentationSite();
});

// Mobile sidebar toggle
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}
