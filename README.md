# LumeUI

A modern, lightweight web component library for building beautiful and interactive user interfaces.
LumeUI provides a collection of customizable, framework-agnostic components that work seamlessly across all modern browsers.

## Features

- 🎨 **Modern Design** - Beautiful, responsive components with contemporary styling
- 🔧 **Highly Customizable** - Extensive theming and styling options
- 📱 **Mobile First** - Responsive design built for all screen sizes
- ⚡ **Lightweight** - No dependencies, vanilla JavaScript implementation
- 🎯 **Framework Agnostic** - Works with any framework or vanilla HTML
- 🌙 **Dark/Light Themes** - Built-in theme support

## Installation

### CDN (Recommended)

Add LumeUI to your project by including the CDN link in your HTML:

```html
<script
  src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"
  type="module"
></script>
```

That's it! All components are now available as custom HTML elements.

## Getting Started

Here's a quick example to get you started:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LumeUI Example</title>
    <script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"></script>
  </head>
  <body>
    <lume-button variant="primary" size="large"> Get Started </lume-button>

    <lume-hero
      heading-text="Welcome to LumeUI"
      description-text="Build beautiful web interfaces with ease"
    >
    </lume-hero>
  </body>
</html>
```

## Components

### LumeButton

A versatile button component with multiple variants, sizes, and extensive customization options.

#### Default Usage

```html
<lume-button>Click Me</lume-button>
```

#### Variants

The button component supports 7 different variants, each with unique styling:

##### Primary Variant

```html
<lume-button variant="primary">Primary Button</lume-button>
```

- Default brand-colored button
- Used for main call-to-action elements
- Features hover animations and shadow effects

##### Secondary Variant

```html
<lume-button variant="secondary">Secondary Button</lume-button>
```

- Muted gray styling
- Used for secondary actions
- Complementary to primary buttons

##### Outlined Variant

```html
<lume-button variant="outlined">Outlined Button</lume-button>
```

- Transparent background with colored border
- Fills with color on hover
- Perfect for secondary actions

##### Ghost Variant

```html
<lume-button variant="ghost">Ghost Button</lume-button>
```

- Minimal styling with subtle hover effects
- Transparent background
- Ideal for tertiary actions

##### Glow Variant

```html
<lume-button variant="glow" glow-color="rgba(37, 99, 235, 0.5)"
  >Glow Button</lume-button
>
```

- Features glowing shadow effect
- Customizable glow color
- Perfect for highlighting special actions

##### Icon Button Variant

```html
<lume-button variant="icon-btn" size="medium">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12l-4-4h8l-4 4z" />
  </svg>
</lume-button>
```

- Circular button design
- Perfect for icons
- Maintains aspect ratio

##### Link Variant

```html
<lume-button variant="link" href="https://example.com">Link Button</lume-button>
```

- Styled as underlined text
- No background or border
- Functions as clickable link

#### Sizes

Three size options available for all variants:

```html
<lume-button variant="primary" size="small">Small Button</lume-button>
<lume-button variant="primary" size="medium">Medium Button</lume-button>
<lume-button variant="primary" size="large">Large Button</lume-button>
```

Size specifications:

- **Small**: `0.875rem` font, `0.375rem 0.75rem` padding, `2rem` min-height
- **Medium**: `1rem` font, `0.5rem 1rem` padding, `2.5rem` min-height
- **Large**: `1.125rem` font, `0.75rem 1.5rem` padding, `3rem` min-height

#### States

##### Disabled State

```html
<lume-button variant="primary" disabled>Disabled Button</lume-button>
```

##### Loading State

```html
<lume-button variant="primary" loading>Loading Button</lume-button>
```

- Shows spinning animation
- Prevents user interaction
- Maintains button dimensions

##### Full Width

```html
<lume-button variant="primary" full-width>Full Width Button</lume-button>
```

#### Custom Styling

Extensive customization options for colors, dimensions, and appearance:

##### Color Customization

```html
<lume-button
  variant="primary"
  color="#ffffff"
  bg-color="#6366f1"
  hover-color="#ffffff"
  hover-bg-color="#4f46e5"
  active-color="#ffffff"
  active-bg-color="#3730a3"
>
  Custom Colors
</lume-button>
```

##### Border and Shape

```html
<lume-button
  variant="outlined"
  border="2px solid #ef4444"
  radius="20px"
  padding="1rem 2rem"
>
  Custom Border
</lume-button>
```

##### Typography

```html
<lume-button font-size="1.25rem" font-weight="700">
  Custom Typography
</lume-button>
```

##### Dimensions

```html
<lume-button width="200px" height="60px"> Custom Size </lume-button>
```

##### Shadow Effects

```html
<lume-button variant="primary" shadow="0 10px 25px rgba(0, 0, 0, 0.3)">
  Custom Shadow
</lume-button>
```

#### Button Event Handling

##### Click Handler Attribute

```html
<lume-button
  variant="primary"
  onclick-handler="console.log('Button clicked!'); alert('Hello!');"
>
  Inline Handler
</lume-button>
```

##### Link Navigation

```html
<lume-button variant="primary" href="https://example.com" target="_blank">
  External Link
</lume-button>
```

##### Custom Events

```javascript
document.addEventListener("lume-click", (event) => {
  console.log("Button details:", event.detail);
  // event.detail contains: button, originalEvent, href, variant, size
});
```

#### Complete Attribute Reference

| Attribute         | Type    | Default     | Description                                    |
| ----------------- | ------- | ----------- | ---------------------------------------------- |
| `variant`         | String  | `"primary"` | Button style variant                           |
| `size`            | String  | `"medium"`  | Button size (small, medium, large)             |
| `disabled`        | Boolean | `false`     | Disable button interaction                     |
| `loading`         | Boolean | `false`     | Show loading state                             |
| `full-width`      | Boolean | `false`     | Make button full width                         |
| `href`            | String  | -           | URL for link functionality                     |
| `target`          | String  | `"_self"`   | Link target (\_self, \_blank, \_parent, \_top) |
| `color`           | String  | -           | Text color                                     |
| `bg-color`        | String  | -           | Background color                               |
| `hover-color`     | String  | -           | Hover text color                               |
| `hover-bg-color`  | String  | -           | Hover background color                         |
| `active-color`    | String  | -           | Active text color                              |
| `active-bg-color` | String  | -           | Active background color                        |
| `border`          | String  | -           | Border styling                                 |
| `radius`          | String  | -           | Border radius                                  |
| `padding`         | String  | -           | Internal padding                               |
| `font-size`       | String  | -           | Font size                                      |
| `font-weight`     | String  | -           | Font weight                                    |
| `width`           | String  | -           | Button width                                   |
| `height`          | String  | -           | Button height                                  |
| `glow-color`      | String  | -           | Glow effect color (for glow variant)           |
| `shadow`          | String  | -           | Box shadow                                     |
| `onclick-handler` | String  | -           | Inline JavaScript click handler                |

---

### LumeNavbar

A comprehensive navigation component with multiple variants, responsive behavior, and extensive customization options.

#### Default Navbar

```html
<lume-navbar></lume-navbar>
```

#### Customised Navbar

```html
<lume-navbar logo-text="Brand Name" theme="dark">
  <div slot="links">
    <a href="#home" active>Home</a>
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#contact">Contact</a>
  </div>

  <div slot="actions">
    <button variant="primary">Get Started</button>
    <button variant="secondary">Login</button>
  </div>
</lume-navbar>
```

#### Navbar Variants

The navbar supports 8 distinct variants, each with unique visual styling:

##### Default Variant

```html
<lume-navbar variant="default" theme="dark">
  <!-- Standard navbar with solid background -->
</lume-navbar>
```

##### Glassmorphism Variant

```html
<lume-navbar variant="glassmorphism" theme="dark">
  <!-- Translucent background with blur effect -->
</lume-navbar>
```

- Semi-transparent background
- Backdrop blur effect
- Modern glass-like appearance

##### Gradient Variant

```html
<lume-navbar variant="gradient" theme="light">
  <!-- Gradient background styling -->
</lume-navbar>
```

- Beautiful gradient backgrounds
- Automatically adjusts text color to white
- Eye-catching header design

##### Split Variant

```html
<lume-navbar variant="split">
  <!-- Split layout design -->
</lume-navbar>
```

##### Sidebar Variant

```html
<lume-navbar variant="sidebar" theme="dark">
  <!-- Vertical sidebar navigation -->
</lume-navbar>
```

- Fixed position sidebar
- Full height navigation
- 280px width
- Vertical link layout

##### Floating Variant

```html
<lume-navbar variant="floating" theme="dark">
  <!-- Floating navbar with advanced styling -->
</lume-navbar>
```

- Rounded corners with margin
- Enhanced glassmorphism effect
- Multiple shadow layers
- Animated hover effects
- Shimmer effects on buttons

##### Mega Variant

```html
<lume-navbar variant="mega">
  <!-- Large navbar with extra padding -->
</lume-navbar>
```

- Increased padding and font sizes
- 80px minimum height
- Enhanced shadow effects

##### Transparent Variant

```html
<lume-navbar variant="transparent" theme="dark">
  <!-- Fully transparent background -->
</lume-navbar>
```

- No background color
- Subtle gradient borders
- Animated underlines on links
- Glowing hover effects

#### Navbar Themes

##### Dark Theme (Default)

```html
<lume-navbar theme="dark">
  <!-- Dark theme styling -->
</lume-navbar>
```

- Background: `#1e293b`
- Text: `#f1f5f9`
- Brand color: `#3b82f6`

##### Light Theme

```html
<lume-navbar theme="light">
  <!-- Light theme styling -->
</lume-navbar>
```

- Background: `#ffffff`
- Text: `#374151`
- Brand color: `#2563eb`

#### Logo Configuration

##### Text Logo

```html
<lume-navbar logo-text="Your Brand">
  <!-- Text-based logo -->
</lume-navbar>
```

##### Image Logo

```html
<lume-navbar
  logo-src="https://example.com/logo.png"
  logo-width="120px"
  logo-height="40px"
>
  <!-- Image-based logo -->
</lume-navbar>
```

##### Combined Logo

```html
<lume-navbar
  logo-text="Brand"
  logo-src="https://example.com/icon.png"
  logo-width="32px"
  logo-height="32px"
>
  <!-- Image + text logo -->
</lume-navbar>
```

#### Navigation Links

Links are defined using slots for maximum flexibility:

```html
<lume-navbar>
  <div slot="links">
    <a href="/" active>Home</a>
    <a href="/about">About</a>
    <a href="/services">Services</a>
    <a href="/portfolio">Portfolio</a>
    <a href="/contact">Contact</a>
  </div>
</lume-navbar>
```

#### Mobile Configuration

##### Breakpoint Control

```html
<lume-navbar mobile-breakpoint="992px">
  <!-- Mobile menu activates at 992px -->
</lume-navbar>
```

##### Mobile Menu Position

```html
<lume-navbar mobile-menu-position="overlay">
  <!-- Options: top, left, right, overlay -->
</lume-navbar>
```

##### Animation Duration

```html
<lume-navbar animation-duration="0.5s">
  <!-- Custom animation timing -->
</lume-navbar>
```

#### Navbar Custom Styling

##### Color Customization

```html
<lume-navbar
  brand-color="#ff6b6b"
  bg-color="#2c3e50"
  text-color="#ecf0f1"
  active-link-color="#3498db"
  hover-link-color="#e74c3c"
>
</lume-navbar>
```

##### Layout Options

```html
<lume-navbar
  max-width="1400px"
  container-padding="2rem"
  height="80px"
  sticky
  center-links
  reverse-layout
>
</lume-navbar>
```

##### Button Styling

```html
<lume-navbar
  button-bg="#e74c3c"
  button-color="#ffffff"
  button-hover-bg="#c0392b"
  button-radius="25px"
  button-padding="0.75rem 1.5rem"
>
</lume-navbar>
```

##### Mobile Customization

```html
<lume-navbar mobile-menu-bg="rgba(44, 62, 80, 0.95)" hamburger-color="#ecf0f1">
</lume-navbar>
```

#### Navbar Complete Attribute Reference

| Attribute              | Type    | Default         | Description                  |
| ---------------------- | ------- | --------------- | ---------------------------- |
| `variant`              | String  | `"default"`     | Visual variant style         |
| `theme`                | String  | `"dark"`        | Color theme (dark, light)    |
| `logo-text`            | String  | `"Brand"`       | Text logo content            |
| `logo-src`             | String  | -               | Logo image URL               |
| `logo-width`           | String  | `"auto"`        | Logo width                   |
| `logo-height`          | String  | `"40px"`        | Logo height                  |
| `brand-color`          | String  | Theme-based     | Brand/logo color             |
| `bg-color`             | String  | Theme-based     | Background color             |
| `text-color`           | String  | Theme-based     | Text color                   |
| `mobile-breakpoint`    | String  | `"768px"`       | Mobile menu activation point |
| `sticky`               | Boolean | `false`         | Sticky positioning           |
| `shadow`               | String  | Theme-based     | Box shadow                   |
| `blur-bg`              | Boolean | `false`         | Backdrop blur effect         |
| `border-bottom`        | String  | Theme-based     | Bottom border                |
| `height`               | String  | `"auto"`        | Navbar height                |
| `padding`              | String  | -               | Internal padding             |
| `max-width`            | String  | `"1200px"`      | Container max width          |
| `container-padding`    | String  | `"1rem"`        | Container padding            |
| `mobile-menu-bg`       | String  | Theme-based     | Mobile menu background       |
| `mobile-menu-position` | String  | `"top"`         | Mobile menu position         |
| `animation-duration`   | String  | `"0.3s"`        | Animation timing             |
| `hamburger-color`      | String  | Text color      | Hamburger menu color         |
| `active-link-color`    | String  | Brand color     | Active link color            |
| `hover-link-color`     | String  | Brand color     | Link hover color             |
| `button-bg`            | String  | Theme-based     | Action button background     |
| `button-color`         | String  | `"#ffffff"`     | Action button text color     |
| `button-hover-bg`      | String  | Theme-based     | Button hover background      |
| `button-hover-color`   | String  | `"#ffffff"`     | Button hover text color      |
| `button-radius`        | String  | `"8px"`         | Button border radius         |
| `button-padding`       | String  | `"0.5rem 1rem"` | Button padding               |
| `transparent`          | Boolean | `false`         | Transparent background       |
| `center-links`         | Boolean | `false`         | Center navigation links      |
| `reverse-layout`       | Boolean | `false`         | Reverse element order        |

---

### LumeHero

A powerful hero section component with extensive background options, content configuration, and animation capabilities.

#### Default Hero Section

```html
<lume-hero></lume-hero>
```

#### Customised Hero Section

```html
<lume-hero
  heading-text="Build Amazing Websites"
  subheading-text="With Modern Web Components"
  description-text="Create beautiful, responsive interfaces using our powerful component library."
  primary-button-text="Get Started"
  secondary-button-text="Learn More"
>
</lume-hero>
```

#### Hero Themes

##### Dark Theme (Default)

```html
<lume-hero theme="dark">
  <!-- Dark theme with gradient background -->
</lume-hero>
```

- Background: Gradient from `#0f172a` to `#334155`
- Text: `#f1f5f9`
- Brand colors: `#3b82f6` to `#6366f1`
- Enhanced with radial gradient overlays

##### Light Theme

```html
<lume-hero theme="light">
  <!-- Light theme with gradient background -->
</lume-hero>
```

- Background: Gradient from `#ffffff` to `#f1f5f9`
- Text: Gradient text effects
- Enhanced with subtle radial gradient overlays

#### Background Options

##### Solid Color Background

```html
<lume-hero background-type="color" background-color="#1e293b"> </lume-hero>
```

##### Gradient Background

```html
<lume-hero
  background-type="gradient"
  background-gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
>
</lume-hero>
```

##### Image Background

```html
<lume-hero
  background-type="image"
  background-image="https://example.com/hero-bg.jpg"
  background-position="center center"
  background-size="cover"
  background-overlay="rgba(0, 0, 0, 0.6)"
  background-overlay-opacity="0.6"
>
</lume-hero>
```

#### Content Configuration

##### Text Alignment

```html
<lume-hero content-align="center" text-align="center" vertical-align="center">
</lume-hero>
```

Options for `content-align` and `text-align`:

- `left` - Left aligned
- `center` - Center aligned (default)
- `right` - Right aligned

Options for `vertical-align`:

- `top` - Top aligned
- `center` - Center aligned (default)
- `bottom` - Bottom aligned

##### Typography Customization

```html
<lume-hero
  heading-text="Custom Heading"
  heading-color="#3b82f6"
  heading-size="clamp(3rem, 10vw, 6rem)"
  heading-weight="900"
  subheading-text="Custom Subheading"
  subheading-color="#6366f1"
  subheading-size="clamp(1.5rem, 4vw, 2rem)"
  description-text="Custom description text"
  description-color="#64748b"
  description-size="clamp(1.125rem, 2.5vw, 1.5rem)"
>
</lume-hero>
```

##### Dimensions and Layout

```html
<lume-hero
  height="100vh"
  width="100%"
  max-width="1200px"
  padding="4rem 2rem"
  margin="0 auto"
>
</lume-hero>
```

#### Button Configuration

##### Primary Button

```html
<lume-hero
  primary-button-text="Get Started Now"
  primary-button-color="#ffffff"
  primary-button-bg-color="#3b82f6"
  primary-button-hover-color="#ffffff"
  primary-button-hover-bg-color="#2563eb"
  primary-button-href="/signup"
  primary-button-target="_self"
  primary-button-size="large"
>
</lume-hero>
```

##### Secondary Button

```html
<lume-hero
  secondary-button-text="Learn More"
  secondary-button-color="#3b82f6"
  secondary-button-bg-color="transparent"
  secondary-button-hover-color="#ffffff"
  secondary-button-hover-bg-color="#3b82f6"
  secondary-button-href="/docs"
  secondary-button-variant="outlined"
>
</lume-hero>
```

#### Animation Options

```html
<lume-hero animate animation-delay="0.3s" animation-duration="0.8s">
</lume-hero>
```

When animations are enabled:

- Content wrapper fades in from bottom
- Heading animates with 0.2s delay
- Subheading animates with 0.4s delay
- Description animates with 0.6s delay
- Buttons animate with 0.8s delay

#### Hero Complete Attribute Reference

| Attribute                         | Type    | Default                          | Description                       |
| --------------------------------- | ------- | -------------------------------- | --------------------------------- |
| `theme`                           | String  | `"dark"`                         | Color theme                       |
| `layout`                          | String  | `"centered"`                     | Content layout                    |
| `height`                          | String  | `"100vh"`                        | Hero height                       |
| `width`                           | String  | `"100%"`                         | Hero width                        |
| `padding`                         | String  | `"2rem"`                         | Internal padding                  |
| `margin`                          | String  | `"0"`                            | External margin                   |
| `max-width`                       | String  | `"800px"`                        | Content max width                 |
| `background-type`                 | String  | `"color"`                        | Background type                   |
| `background-color`                | String  | Theme-based                      | Background color                  |
| `background-image`                | String  | -                                | Background image URL              |
| `background-position`             | String  | `"center center"`                | Background position               |
| `background-size`                 | String  | `"cover"`                        | Background size                   |
| `background-overlay`              | String  | `"rgba(0, 0, 0, 0.5)"`           | Overlay color                     |
| `background-overlay-opacity`      | String  | `"0.5"`                          | Overlay opacity                   |
| `background-gradient`             | String  | -                                | Gradient background               |
| `content-align`                   | String  | `"center"`                       | Content alignment                 |
| `text-align`                      | String  | `"center"`                       | Text alignment                    |
| `vertical-align`                  | String  | `"center"`                       | Vertical alignment                |
| `heading-text`                    | String  | `"Welcome to Our Platform"`      | Main heading                      |
| `heading-color`                   | String  | Theme-based                      | Heading color                     |
| `heading-size`                    | String  | `"clamp(2.5rem, 8vw, 5rem)"`     | Heading font size                 |
| `heading-weight`                  | String  | `"800"`                          | Heading font weight               |
| `subheading-text`                 | String  | `"Build amazing experiences"`    | Subheading text                   |
| `subheading-color`                | String  | Theme-based                      | Subheading color                  |
| `subheading-size`                 | String  | `"clamp(1.25rem, 3vw, 1.75rem)"` | Subheading size                   |
| `description-text`                | String  | Default text                     | Description content               |
| `description-color`               | String  | Theme-based                      | Description color                 |
| `description-size`                | String  | `"clamp(1rem, 2vw, 1.25rem)"`    | Description size                  |
| `primary-button-text`             | String  | `"Get Started"`                  | Primary button text               |
| `primary-button-color`            | String  | Theme-based                      | Primary button text color         |
| `primary-button-bg-color`         | String  | Theme-based                      | Primary button background         |
| `primary-button-hover-color`      | String  | Theme-based                      | Primary button hover text         |
| `primary-button-hover-bg-color`   | String  | Theme-based                      | Primary button hover background   |
| `primary-button-href`             | String  | -                                | Primary button link               |
| `primary-button-target`           | String  | `"_self"`                        | Primary button target             |
| `primary-button-size`             | String  | `"large"`                        | Primary button size               |
| `secondary-button-text`           | String  | `"Learn More"`                   | Secondary button text             |
| `secondary-button-color`          | String  | Theme-based                      | Secondary button text color       |
| `secondary-button-bg-color`       | String  | Theme-based                      | Secondary button background       |
| `secondary-button-hover-color`    | String  | Theme-based                      | Secondary button hover text       |
| `secondary-button-hover-bg-color` | String  | Theme-based                      | Secondary button hover background |
| `secondary-button-href`           | String  | -                                | Secondary button link             |
| `secondary-button-target`         | String  | `"_self"`                        | Secondary button target           |
| `secondary-button-variant`        | String  | `"outlined"`                     | Secondary button variant          |
| `animate`                         | Boolean | `false`                          | Enable animations                 |
| `animation-delay`                 | String  | `"0s"`                           | Animation start delay             |
| `animation-duration`              | String  | `"0.3s"`                         | Animation duration                |

---

### LumeArticle

A flexible article/content section component with image and text layouts.

#### Default Article

```html
<lume-article></lume-article>
```

#### Customise Article

```html
<lume-article
  layout="left"
  heading-text="Amazing Features"
  description-text="Discover what makes our platform unique and powerful."
  button-text="Learn More"
  image-src="https://example.com/feature.jpg"
>
</lume-article>
```

#### Article Layouts

##### Left Layout (Image on Left)

```html
<lume-article layout="left">
  <!-- Image on left, text on right -->
</lume-article>
```

##### Right Layout (Image on Right)

```html
<lume-article layout="right">
  <!-- Image on right, text on left -->
</lume-article>
```

#### Article Themes

##### Dark Theme (Default)

```html
<lume-article theme="dark">
  <!-- Dark background with light text -->
</lume-article>
```

##### Light Theme

```html
<lume-article theme="light">
  <!-- Light background with dark text -->
</lume-article>
```

#### Image Configuration

```html
<lume-article
  image-src="https://example.com/image.jpg"
  image-alt="Descriptive text"
  image-width="100%"
  image-height="400px"
  image-max-width="600px"
  image-radius="1rem"
  image-fit="cover"
  image-align="center"
>
</lume-article>
```

#### Typography

```html
<lume-article
  heading-text="Custom Heading"
  heading-color="#2563eb"
  heading-size="clamp(2rem, 4vw, 3.5rem)"
  heading-weight="700"
  description-text="Custom description"
  description-color="#64748b"
  description-size="clamp(1rem, 1.5vw, 1.25rem)"
  description-line-height="1.7"
>
</lume-article>
```

#### Article Complete Attribute Reference

| Attribute                 | Type   | Default                         | Description                  |
| ------------------------- | ------ | ------------------------------- | ---------------------------- |
| `layout`                  | String | `"left"`                        | Image position (left, right) |
| `theme`                   | String | `"dark"`                        | Color theme                  |
| `width`                   | String | `"100%"`                        | Component width              |
| `height`                  | String | `"100vh"`                       | Component height             |
| `min-height`              | String | `"auto"`                        | Minimum height               |
| `padding`                 | String | `"2rem"`                        | Internal padding             |
| `margin`                  | String | `"0"`                           | External margin              |
| `gap`                     | String | `"3rem"`                        | Gap between image and text   |
| `align-items`             | String | `"center"`                      | Vertical alignment           |
| `justify-content`         | String | `"center"`                      | Horizontal alignment         |
| `text-flex`               | String | `"1"`                           | Text section flex value      |
| `image-flex`              | String | `"1"`                           | Image section flex value     |
| `responsive-breakpoint`   | String | `"768px"`                       | Mobile stacking breakpoint   |
| `heading-text`            | String | `"Article Heading"`             | Main heading text            |
| `heading-color`           | String | Theme-based                     | Heading color                |
| `heading-size`            | String | `"clamp(2rem, 4vw, 3.5rem)"`    | Heading font size            |
| `heading-weight`          | String | `"700"`                         | Heading font weight          |
| `description-text`        | String | Default lorem text              | Description content          |
| `description-color`       | String | Theme-based                     | Description color            |
| `description-size`        | String | `"clamp(1rem, 1.5vw, 1.25rem)"` | Description font size        |
| `description-line-height` | String | `"1.7"`                         | Description line height      |
| `button-text`             | String | `"Learn More"`                  | Button text                  |
| `button-color`            | String | Theme-based                     | Button text color            |
| `button-bg-color`         | String | Theme-based                     | Button background            |
| `button-hover-color`      | String | Theme-based                     | Button hover text color      |
| `button-hover-bg-color`   | String | Theme-based                     | Button hover background      |
| `button-radius`           | String | `"0.75rem"`                     | Button border radius         |
| `button-padding`          | String | `"1rem 2rem"`                   | Button padding               |
| `button-width`            | String | `"auto"`                        | Button width                 |
| `button-height`           | String | `"auto"`                        | Button height                |
| `button-font-size`        | String | `"1rem"`                        | Button font size             |
| `button-href`             | String | -                               | Button link URL              |
| `button-target`           | String | `"_self"`                       | Button link target           |
| `image-src`               | String | Default unsplash image          | Image source URL             |
| `image-alt`               | String | `"article image"`               | Image alt text               |
| `image-width`             | String | `"100%"`                        | Image width                  |
| `image-height`            | String | `"400px"`                       | Image height                 |
| `image-max-width`         | String | `"600px"`                       | Image maximum width          |
| `image-radius`            | String | `"1rem"`                        | Image border radius          |
| `image-fit`               | String | `"cover"`                       | Image object-fit             |
| `image-align`             | String | `"center"`                      | Image alignment              |

---

### LumeForm

A comprehensive form component with multiple types, layouts, and extensive customization options.

#### Default Form (Contact Form)

```html
<lume-form></lume-form>
```

#### Customised Form

```html
<lume-form type="contact" theme="dark" layout="split"> </lume-form>
```

#### Form Types

The form component supports multiple pre-configured types:

##### Contact Form

```html
<lume-form type="contact">
  <!-- Includes: Name, Email, Subject, Message fields -->
</lume-form>
```

##### Login Form

```html
<lume-form type="login">
  <!-- Includes: Email, Password fields -->
</lume-form>
```

##### Register Form

```html
<lume-form type="register">
  <!-- Includes: Full Name, Email, Password, Confirm Password fields -->
</lume-form>
```

#### Form Layouts

##### Split Layout (Default)

```html
<lume-form layout="split">
  <!-- Side-by-side info panel and form -->
</lume-form>
```

##### Stacked Layout

```html
<lume-form layout="stacked">
  <!-- Vertically stacked info panel and form -->
</lume-form>
```

##### Single Layout

```html
<lume-form layout="single">
  <!-- Form only, no info panel -->
</lume-form>
```

#### Custom Fields

For maximum flexibility, create custom forms with specific field types:

```html
<lume-form
  type="custom"
  fields='[
        {
            "label": "Full Name",
            "type": "text",
            "name": "name",
            "placeholder": "Enter your full name",
            "required": true
        },
        {
            "label": "Company",
            "type": "text",
            "name": "company",
            "placeholder": "Your company name"
        },
        {
            "label": "Industry",
            "type": "select",
            "name": "industry",
            "placeholder": "Select your industry",
            "required": true,
            "options": [
                {"value": "tech", "label": "Technology"},
                {"value": "finance", "label": "Finance"},
                {"value": "healthcare", "label": "Healthcare"},
                {"value": "education", "label": "Education"}
            ]
        },
        {
            "label": "Budget Range",
            "type": "select",
            "name": "budget",
            "options": ["$1,000-$5,000", "$5,000-$10,000", "$10,000+"]
        },
        {
            "label": "Project Description",
            "type": "textarea",
            "name": "description",
            "placeholder": "Tell us about your project...",
            "rows": 4,
            "required": true
        },
        {
            "label": "Subscribe to newsletter",
            "type": "checkbox",
            "name": "newsletter",
            "value": "true"
        }
    ]'
>
</lume-form>
```

##### Supported Field Types

| Field Type | Description                 | Additional Properties               |
| ---------- | --------------------------- | ----------------------------------- |
| `text`     | Standard text input         | `minlength`, `maxlength`, `pattern` |
| `email`    | Email input with validation | -                                   |
| `password` | Password input              | `minlength`, `maxlength`            |
| `number`   | Numeric input               | `min`, `max`                        |
| `textarea` | Multi-line text area        | `rows`                              |
| `select`   | Dropdown selection          | `options` array                     |
| `checkbox` | Checkbox input              | `value`                             |

#### Styling Options

##### Theme Customization

```html
<lume-form
  theme="dark"
  container-bg="linear-gradient(135deg, #1e293b 0%, #334155 100%)"
  panel-bg="linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)"
  form-bg="rgba(30, 41, 59, 0.8)"
>
</lume-form>
```

##### Panel Customization

```html
<lume-form
  panel-title="Get In Touch"
  panel-description="We'd love to hear about your project"
  panel-text-color="#ffffff"
  panel-padding="3rem"
  panel-radius="16px"
>
</lume-form>
```

##### Form Styling

```html
<lume-form
  form-text-color="#f1f5f9"
  form-padding="3rem"
  form-radius="16px"
  input-bg="rgba(15, 23, 42, 0.6)"
  input-color="#f1f5f9"
  input-border="rgba(51, 65, 85, 0.6)"
  input-radius="12px"
  input-padding="1rem 1.25rem"
>
</lume-form>
```

##### Button Customization

```html
<lume-form
  button-text="Send Message"
  button-bg="#3b82f6"
  button-color="#ffffff"
  button-hover-bg="#2563eb"
  button-radius="12px"
  button-padding="1rem 2rem"
  button-width="100%"
>
</lume-form>
```

##### Dimensions

```html
<lume-form
  width="100%"
  max-width="1200px"
  height="auto"
  gap="2rem"
  padding="2rem"
  margin="0 auto"
>
</lume-form>
```

##### Label Styling

```html
<lume-form label-color="#cbd5e1" label-size="0.875rem" label-weight="500">
</lume-form>
```

#### Form Submission

```html
<lume-form
  action="/api/contact"
  method="POST"
  success-message="Thank you! We'll get back to you soon."
  error-message="Please check your input and try again."
>
</lume-form>
```

#### Form Complete Attribute Reference

| Attribute            | Type        | Default                                  | Description                                  |
| -------------------- | ----------- | ---------------------------------------- | -------------------------------------------- |
| `type`               | String      | `"contact"`                              | Form type (contact, login, register, custom) |
| `layout`             | String      | `"split"`                                | Form layout (split, stacked, single)         |
| `theme`              | String      | `"dark"`                                 | Color theme                                  |
| `fields`             | JSON String | -                                        | Custom fields array (for custom type)        |
| `width`              | String      | `"100%"`                                 | Form width                                   |
| `max-width`          | String      | `"1000px"`                               | Maximum width                                |
| `height`             | String      | `"auto"`                                 | Form height                                  |
| `gap`                | String      | `"0"`                                    | Gap between sections                         |
| `radius`             | String      | `"16px"`                                 | Border radius                                |
| `padding`            | String      | `"1.5rem"`                               | Container padding                            |
| `margin`             | String      | `"0"`                                    | Container margin                             |
| `container-bg`       | String      | Theme-based                              | Background wrapper color                     |
| `body-bg`            | String      | Theme-based                              | Body background                              |
| `panel-title`        | String      | Type-based                               | Info panel title                             |
| `panel-description`  | String      | Type-based                               | Info panel description                       |
| `panel-bg`           | String      | Theme-based                              | Panel background                             |
| `panel-text-color`   | String      | `"#ffffff"`                              | Panel text color                             |
| `panel-padding`      | String      | `"2rem"`                                 | Panel padding                                |
| `panel-radius`       | String      | -                                        | Panel border radius                          |
| `form-bg`            | String      | Theme-based                              | Form background                              |
| `form-text-color`    | String      | Theme-based                              | Form text color                              |
| `form-padding`       | String      | `"2rem"`                                 | Form padding                                 |
| `form-radius`        | String      | -                                        | Form border radius                           |
| `input-bg`           | String      | Theme-based                              | Input background                             |
| `input-color`        | String      | Theme-based                              | Input text color                             |
| `input-border`       | String      | Theme-based                              | Input border                                 |
| `input-radius`       | String      | `"12px"`                                 | Input border radius                          |
| `input-padding`      | String      | `"0.75rem 1rem"`                         | Input padding                                |
| `label-color`        | String      | Theme-based                              | Label color                                  |
| `label-size`         | String      | `"0.875rem"`                             | Label font size                              |
| `label-weight`       | String      | `"500"`                                  | Label font weight                            |
| `button-text`        | String      | Type-based                               | Button text                                  |
| `button-bg`          | String      | Theme-based                              | Button background                            |
| `button-color`       | String      | `"#ffffff"`                              | Button text color                            |
| `button-hover-bg`    | String      | Theme-based                              | Button hover background                      |
| `button-hover-color` | String      | `"#ffffff"`                              | Button hover text color                      |
| `button-radius`      | String      | `"12px"`                                 | Button border radius                         |
| `button-padding`     | String      | `"0.75rem 1.5rem"`                       | Button padding                               |
| `button-width`       | String      | `"100%"`                                 | Button width                                 |
| `action`             | String      | `""`                                     | Form submission URL                          |
| `method`             | String      | `"POST"`                                 | HTTP method                                  |
| `success-message`    | String      | `"Form submitted successfully!"`         | Success message                              |
| `error-message`      | String      | `"Please fill out all required fields."` | Error message                                |

---

### LumeFooter

A flexible footer component with multiple layouts and extensive customization options.

#### Default Footer

```html
<lume-footer></lume-footer>
```

#### Customised Footer

```html
<lume-footer
  brand-text="LumeUI"
  links="Home|/,About|/about,Services|/services,Contact|/contact"
  social-icons="github|https://github.com,twitter|https://twitter.com"
  copyright-text="© 2025 LumeUI. All rights reserved."
>
</lume-footer>
```

#### Footer Layouts

##### Center Layout (Default)

```html
<lume-footer layout="center">
  <!-- Centered vertical stack -->
</lume-footer>
```

- Brand section at top
- Links section in middle
- Social section below
- Copyright at bottom

##### Split Layout

```html
<lume-footer layout="split">
  <!-- Three-column layout -->
</lume-footer>
```

- Brand on left
- Links in center
- Social on right
- Copyright spans full width

##### Stacked Layout

```html
<lume-footer layout="stacked">
  <!-- Vertical sections with spacing -->
</lume-footer>
```

##### Columns Layout

```html
<lume-footer
  layout="columns"
  columns='[
        {
            "title": "Product",
            "items": [
                "Features|/features",
                "Pricing|/pricing",
                "Updates|/updates",
                "Beta|/beta"
            ]
        },
        {
            "title": "Company", 
            "items": [
                "About Us|/about",
                "Careers|/careers",
                "Contact|/contact",
                "Blog|/blog"
            ]
        },
        {
            "title": "Resources",
            "items": [
                "Documentation|/docs",
                "Support|/support",
                "Community|/community",
                "Status|/status"
            ]
        },
        {
            "title": "Legal",
            "items": [
                "Privacy Policy|/privacy",
                "Terms of Service|/terms",
                "Cookie Policy|/cookies"
            ]
        }
    ]'
>
</lume-footer>
```

#### Content Configuration

##### Brand Configuration

```html
<lume-footer brand-text="Your Brand" brand-color="#3b82f6" brand-size="1.5rem">
</lume-footer>
```

##### Logo Configuration

```html
<lume-footer
  logo-src="https://example.com/logo.png"
  logo-alt="Company Logo"
  logo-width="40px"
  logo-height="40px"
  brand-text="Company Name"
>
</lume-footer>
```

##### Links Configuration

```html
<lume-footer
  links="Home|/,About|/about,Services|/services,Portfolio|/portfolio,Contact|/contact"
  link-gap="2rem"
  link-size="1rem"
>
</lume-footer>
```

##### Copyright Configuration

```html
<lume-footer
  copyright-text="© 2025 Your Company. All rights reserved."
  copyright-color="#9ca3af"
  copyright-size="0.875rem"
>
</lume-footer>
```

#### Social Icons

The footer supports popular social platforms with built-in SVG icons:

```html
<lume-footer
  social-icons="github|https://github.com/user,twitter|https://twitter.com/user,linkedin|https://linkedin.com/in/user,facebook|https://facebook.com/user,instagram|https://instagram.com/user"
  icon-size="24px"
  icon-color="#9ca3af"
  icon-hover-color="#ffffff"
>
</lume-footer>
```

##### Supported Social Platforms

- `github` - GitHub profile
- `twitter` - Twitter/X profile
- `linkedin` - LinkedIn profile
- `facebook` - Facebook page
- `instagram` - Instagram profile

#### Color Customization

##### Theme-based Colors

```html
<lume-footer theme="dark">
  <!-- Dark theme colors -->
</lume-footer>

<lume-footer theme="light">
  <!-- Light theme colors -->
</lume-footer>
```

##### Custom Colors

```html
<lume-footer
  bg-color="#1f2937"
  text-color="#f9fafb"
  link-color="#d1d5db"
  link-hover-color="#ffffff"
  border-color="#374151"
>
</lume-footer>
```

#### Layout Customization

```html
<lume-footer
  width="100%"
  padding="3rem 2rem"
  margin="0"
  gap="2rem"
  font-family="'Inter', system-ui, sans-serif"
>
</lume-footer>
```

#### Border Customization

```html
<lume-footer border-color="#e5e7eb" border-width="2px" border-style="solid">
</lume-footer>
```

#### Footer Complete Attribute Reference

| Attribute          | Type        | Default                                 | Description                                     |
| ------------------ | ----------- | --------------------------------------- | ----------------------------------------------- |
| `layout`           | String      | `"center"`                              | Footer layout (center, split, stacked, columns) |
| `theme`            | String      | `"dark"`                                | Color theme (dark, light)                       |
| `width`            | String      | `"100%"`                                | Footer width                                    |
| `padding`          | String      | `"1.5rem"`                              | Internal padding                                |
| `margin`           | String      | `"0"`                                   | External margin                                 |
| `gap`              | String      | `"1rem"`                                | Gap between sections                            |
| `font-family`      | String      | `"system-ui, -apple-system..."`         | Font family                                     |
| `bg-color`         | String      | Theme-based                             | Background color                                |
| `text-color`       | String      | Theme-based                             | Text color                                      |
| `link-color`       | String      | Theme-based                             | Link color                                      |
| `link-hover-color` | String      | Theme-based                             | Link hover color                                |
| `border-color`     | String      | Theme-based                             | Border color                                    |
| `border-width`     | String      | `"1px"`                                 | Border width                                    |
| `border-style`     | String      | `"solid"`                               | Border style                                    |
| `brand-text`       | String      | `"LumeUI"`                              | Brand text                                      |
| `brand-color`      | String      | Text color                              | Brand text color                                |
| `brand-size`       | String      | `"1.25rem"`                             | Brand font size                                 |
| `logo-src`         | String      | `""`                                    | Logo image URL                                  |
| `logo-alt`         | String      | Brand text                              | Logo alt text                                   |
| `logo-width`       | String      | `"32px"`                                | Logo width                                      |
| `logo-height`      | String      | `"32px"`                                | Logo height                                     |
| `links`            | String      | `"Home\|#,About\|#,Contact\|#"`         | Navigation links                                |
| `link-gap`         | String      | `"1.5rem"`                              | Gap between links                               |
| `link-size`        | String      | `"0.875rem"`                            | Link font size                                  |
| `social-icons`     | String      | `""`                                    | Social media links                              |
| `icon-size`        | String      | `"20px"`                                | Social icon size                                |
| `icon-color`       | String      | Link color                              | Social icon color                               |
| `icon-hover-color` | String      | Link hover color                        | Social icon hover color                         |
| `columns`          | JSON String | -                                       | Column layout configuration                     |
| `copyright-text`   | String      | `"© 2025 LumeUI. All rights reserved."` | Copyright text                                  |
| `copyright-color`  | String      | Text color                              | Copyright text color                            |
| `copyright-size`   | String      | `"0.75rem"`                             | Copyright font size                             |

## Event System

LumeUI components emit comprehensive custom events that you can listen to:

### Button Events

```javascript
// Basic button click
document.addEventListener("lume-click", (event) => {
  console.log("Button clicked:", event.detail);
  // event.detail: { button, originalEvent, href, variant, size }
});

// Example with button reference
const button = document.querySelector("lume-button");
button.addEventListener("lume-click", (event) => {
  console.log("Specific button clicked:", event.detail.variant);
});
```

### Navbar Events

```javascript
// Navigation item clicks
document.addEventListener("lume-nav-click", (event) => {
  console.log("Navigation clicked:", event.detail);
  // event.detail: { navbar, link/button, href, text, type, originalEvent }

  if (event.detail.type === "link") {
    console.log("Link clicked:", event.detail.text);
  } else if (event.detail.type === "button") {
    console.log("Button clicked:", event.detail.text);
  }
});
```

### Hero Events

```javascript
// Primary button clicks
document.addEventListener("lume-hero-primary-click", (event) => {
  console.log("Hero primary button:", event.detail);
  // event.detail: { hero, text, type, originalEvent }
});

// Secondary button clicks
document.addEventListener("lume-hero-secondary-click", (event) => {
  console.log("Hero secondary button:", event.detail);
});
```

### Form Events

```javascript
// Form submission
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
}
```

### Footer Events

```javascript
// Footer link clicks
document.addEventListener("footer-link-click", (event) => {
  console.log("Footer link clicked:", event.detail);
  // event.detail: { href, text }

  // Custom navigation handling
  if (event.detail.href.startsWith("#")) {
    event.preventDefault();
    smoothScrollToSection(event.detail.href);
  }
});
```

## Theming System

LumeUI provides a comprehensive theming system with built-in dark and light themes.

### Global Theme Application

```html
<!-- Apply dark theme to all components -->
<lume-navbar theme="dark"></lume-navbar>
<lume-hero theme="dark"></lume-hero>
<lume-article theme="dark"></lume-article>
<lume-form theme="dark"></lume-form>
<lume-footer theme="dark"></lume-footer>

<!-- Apply light theme to all components -->
<lume-navbar theme="light"></lume-navbar>
<lume-hero theme="light"></lume-hero>
<lume-article theme="light"></lume-article>
<lume-form theme="light"></lume-form>
<lume-footer theme="light"></lume-footer>
```

### Theme Color Values

#### Dark Theme Colors

```css
--hero-bg: #111827
--hero-text: #f9fafb
--hero-brand: #3b82f6
--primary-btn-bg: #3b82f6
--primary-btn-hover-bg: #2563eb
```

#### Light Theme Colors

```css
--hero-bg: #ffffff
--hero-text: #111827
--hero-brand: #2563eb
--primary-btn-bg: #2563eb
--primary-btn-hover-bg: #1d4ed8
```

### Custom Color Overrides

You can override theme colors on individual components:

```html
<lume-hero
  theme="dark"
  heading-color="#ff6b6b"
  primary-button-bg-color="#4ecdc4"
  primary-button-hover-bg-color="#45b7b8"
>
</lume-hero>
```

### CSS Custom Properties

Components expose CSS custom properties for advanced theming:

```html
<style>
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
</style>
```

## Browser Support

LumeUI supports all modern browsers with Web Components support:

- **Chrome**: 63+ ✅
- **Firefox**: 53+ ✅
- **Safari**: 10+ ✅
- **Edge**: 79+ ✅
- **Opera**: 50+ ✅
- **Samsung Internet**: 7.2+ ✅

### Polyfill for Older Browsers

For older browser support, include the Web Components polyfill:

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-loader.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"></script>
```

## Complete Examples

### Modern SaaS Landing Page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LumeUI SaaS Platform</title>
    <script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"></script>
    <style>
      body {
        margin: 0;
        font-family: system-ui;
      }
    </style>
  </head>
  <body>
    <!-- Default Navigation -->
    <lume-navbar
      variant="default"
      theme="dark"
      logo-text="SaaSPlatform"
      brand-color="#3b82f6"
      sticky
    >
      <div slot="links">
        <a href="#home" active>Home</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div slot="actions">
        <button variant="secondary">Login</button>
        <button variant="primary">Start Free Trial</button>
      </div>
    </lume-navbar>

    <!-- Hero Section with Animation -->
    <lume-hero
      theme="dark"
      heading-text="Build Better Products Faster"
      subheading-text="The Ultimate SaaS Platform"
      description-text="Streamline your workflow, collaborate with your team, and ship products faster than ever before with our comprehensive platform."
      primary-button-text="Start Free Trial"
      primary-button-href="/signup"
      secondary-button-text="Watch Demo"
      secondary-button-href="#demo"
      background-type="solid"
      background-gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      animate
      animation-duration="1s"
    >
    </lume-hero>

    <!-- Feature Articles -->
    <lume-article
      layout="left"
      theme="light"
      heading-text="Collaborate Seamlessly"
      description-text="Real-time collaboration tools that keep your team in sync. Share ideas, track progress, and deliver results together."
      button-text="Learn More"
      button-href="/collaboration"
      image-src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      gap="4rem"
      padding="4rem 2rem"
    >
    </lume-article>

    <lume-article
      layout="right"
      theme="light"
      heading-text="Advanced Analytics"
      description-text="Get deep insights into your product performance with our comprehensive analytics suite. Make data-driven decisions."
      button-text="View Analytics"
      button-href="/analytics"
      image-src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
      gap="4rem"
      padding="4rem 2rem"
    >
    </lume-article>

    <lume-article
      layout="left"
      theme="light"
      heading-text="Enterprise Security"
      description-text="Bank-level security with end-to-end encryption, SSO integration, and compliance with industry standards."
      button-text="Security Details"
      button-href="/security"
      image-src="https://images.unsplash.com/photo-1563986768609-322da13575f3"
      gap="4rem"
      padding="4rem 2rem"
    >
    </lume-article>

    <!-- Contact Form -->
    <lume-form
      type="custom"
      theme="dark"
      layout="split"
      panel-title="Ready to Get Started?"
      panel-description="Join thousands of teams already using our platform to build better products."
      button-text="Get Started"
      fields='[
            {"label": "Full Name", "type": "text", "name": "name", "required": true},
            {"label": "Work Email", "type": "email", "name": "email", "required": true},
            {"label": "Company", "type": "text", "name": "company"},
            {"label": "Team Size", "type": "select", "name": "team_size", "options": ["1-10", "11-50", "51-200", "200+"]},
            {"label": "Tell us about your needs", "type": "textarea", "name": "message", "rows": 3}
        ]'
    >
    </lume-form>

    <!-- Footer -->
    <lume-footer
      theme="dark"
      layout="columns"
      brand-text="SaaSPlatform"
      social-icons="github|https://github.com,twitter|https://twitter.com,linkedin|https://linkedin.com"
      copyright-text="© 2025 SaaSPlatform. Built for modern teams."
      columns='[
            {
                "title": "Product",
                "items": [
                    "Features|/features",
                    "Pricing|/pricing",
                    "API|/api",
                    "Integrations|/integrations"
                ]
            },
            {
                "title": "Company", 
                "items": [
                    "About|/about",
                    "Careers|/careers",
                    "Blog|/blog",
                    "Press|/press"
                ]
            },
            {
                "title": "Resources",
                "items": [
                    "Documentation|/docs",
                    "Help Center|/help",
                    "Community|/community",
                    "Status|/status"
                ]
            }
        ]'
    >
    </lume-footer>
  </body>
</html>
```

### E-commerce Product Page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Premium Headphones - Store</title>
    <script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"></script>
  </head>
  <body style="margin: 0;">
    <!-- E-commerce Navigation -->
    <lume-navbar
      variant="default"
      theme="light"
      logo-text="AudioStore"
      brand-color="#2563eb"
    >
      <div slot="links">
        <a href="/" active>Home</a>
        <a href="/products">Products</a>
        <a href="/deals">Deals</a>
        <a href="/support">Support</a>
      </div>
      <div slot="actions">
        <button variant="ghost">Cart (0)</button>
        <button variant="primary">Account</button>
      </div>
    </lume-navbar>

    <!-- Product Hero -->
    <lume-hero
      theme="light"
      heading-text="Premium Wireless Headphones"
      subheading-text="Studio Quality Sound"
      description-text="Experience music like never before with our flagship wireless headphones featuring active noise cancellation and 30-hour battery life."
      primary-button-text="Add to Cart - $299"
      secondary-button-text="Try Before You Buy"
      background-type="color"
      background-color="#f8fafc"
      height="80vh"
    >
    </lume-hero>

    <!-- Product Features -->
    <lume-article
      layout="left"
      theme="light"
      heading-text="Active Noise Cancellation"
      description-text="Advanced ANC technology blocks out distractions so you can focus on what matters most - your music."
      button-text="Learn More"
      image-src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    >
    </lume-article>

    <lume-article
      layout="right"
      theme="light"
      heading-text="30-Hour Battery Life"
      description-text="All-day listening with quick charge technology. Get 3 hours of playback from just 10 minutes of charging."
      button-text="See Specs"
      image-src="https://images.unsplash.com/photo-1484704849700-f032a568e944"
    >
    </lume-article>

    <!-- Contact Form for Support -->
    <lume-form
      type="custom"
      theme="light"
      layout="split"
      panel-title="Need Help?"
      panel-description="Our product experts are here to answer any questions about our headphones."
      fields='[
            {"label": "Name", "type": "text", "name": "name", "required": true},
            {"label": "Email", "type": "email", "name": "email", "required": true},
            {"label": "Product Interest", "type": "select", "name": "product", "options": ["Wireless Headphones", "Earbuds", "Speakers", "Accessories"]},
            {"label": "Question", "type": "textarea", "name": "question", "rows": 3}
        ]'
    >
    </lume-form>

    <lume-footer
      theme="light"
      layout="split"
      brand-text="AudioStore"
      links="Products|/products,Support|/support,Returns|/returns,Warranty|/warranty"
      social-icons="instagram|https://instagram.com,youtube|https://youtube.com"
      copyright-text="© 2025 AudioStore. Premium audio equipment."
    >
    </lume-footer>
  </body>
</html>
```

### Portfolio Website

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alex Johnson - UX Designer</title>
    <script src="https://cdn.jsdelivr.net/gh/Amrit-dev08/LumeUi/dist/lume.js"></script>
  </head>
  <body style="margin: 0;">
    <!-- Glassmorphism Navigation -->
    <lume-navbar
      variant="glassmorphism"
      theme="dark"
      logo-text="Alex Johnson"
      brand-color="#6366f1"
      sticky
    >
      <div slot="links">
        <a href="#home" active>Home</a>
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div slot="actions">
        <button variant="outlined">Resume</button>
      </div>
    </lume-navbar>

    <!-- Designer Hero -->
    <lume-hero
      theme="dark"
      heading-text="UX Designer & Creative Problem Solver"
      subheading-text="Alex Johnson"
      description-text="I help brands create meaningful digital experiences through user-centered design and strategic thinking."
      primary-button-text="View My Work"
      secondary-button-text="Get In Touch"
      background-type="gradient"
      background-gradient="linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)"
      animate
    >
    </lume-hero>

    <!-- Work Showcase -->
    <lume-article
      layout="left"
      theme="light"
      heading-text="Mobile Banking App"
      description-text="Complete redesign of a mobile banking experience, resulting in 40% increase in user engagement and 25% reduction in support tickets."
      button-text="View Case Study"
      image-src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f"
    >
    </lume-article>

    <lume-article
      layout="right"
      theme="light"
      heading-text="E-commerce Platform"
      description-text="End-to-end UX design for a sustainable fashion marketplace, focusing on discovery and social shopping features."
      button-text="See Project"
      image-src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
    >
    </lume-article>

    <!-- Contact -->
    <lume-form
      type="contact"
      theme="dark"
      layout="split"
      panel-title="Let's Work Together"
      panel-description="I'm always interested in hearing about new projects and opportunities."
    >
    </lume-form>

    <lume-footer
      theme="dark"
      layout="center"
      brand-text="Alex Johnson"
      social-icons="linkedin|https://linkedin.com/in/alexjohnson,dribbble|https://dribbble.com/alexj,twitter|https://twitter.com/alexjohnsonux"
      copyright-text="© 2025 Alex Johnson. Designed with care."
    >
    </lume-footer>
  </body>
</html>
```

### Advanced Customization Examples

#### Custom Button Variants

```html
<!-- Neon Glow Button -->
<lume-button
  variant="glow"
  bg-color="#ff00ff"
  hover-bg-color="#ff44ff"
  glow-color="rgba(255, 0, 255, 0.6)"
  color="#ffffff"
  font-weight="700"
  padding="1rem 2.5rem"
  radius="25px"
>
  Neon Action
</lume-button>

<!-- Glass Morphism Button -->
<lume-button
  variant="outlined"
  bg-color="rgba(255, 255, 255, 0.1)"
  hover-bg-color="rgba(255, 255, 255, 0.2)"
  border="1px solid rgba(255, 255, 255, 0.3)"
  color="rgba(255, 255, 255, 0.9)"
  hover-color="#ffffff"
  radius="12px"
  shadow="0 8px 32px rgba(0, 0, 0, 0.1)"
>
  Glass Effect
</lume-button>

<!-- Gradient Button -->
<lume-button
  variant="primary"
  bg-color="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
  hover-bg-color="linear-gradient(45deg, #ff5252, #26c6da)"
  border="none"
  color="#ffffff"
  font-size="1.1rem"
  padding="1.25rem 2rem"
>
  Gradient Style
</lume-button>
```

#### Custom Navbar Configurations

```html
<!-- Gaming Theme Navbar -->
<lume-navbar
  variant="glassmorphism"
  theme="dark"
  logo-text="GameHub"
  brand-color="#00ff88"
  bg-color="rgba(0, 0, 0, 0.8)"
  text-color="#00ff88"
  hover-link-color="#ffffff"
  button-bg="#00ff88"
  button-hover-bg="#00cc66"
>
</lume-navbar>

<!-- Minimal Professional Navbar -->
<lume-navbar
  variant="transparent"
  theme="light"
  logo-text="Studio"
  brand-color="#2c3e50"
  text-color="#34495e"
  hover-link-color="#e74c3c"
  max-width="1400px"
  container-padding="1rem 2rem"
>
</lume-navbar>
```

#### Advanced Form Examples

```html
<!-- Multi-step Registration Form -->
<lume-form
  type="custom"
  theme="dark"
  layout="single"
  max-width="600px"
  panel-title="Create Your Account"
  fields='[
        {"label": "First Name", "type": "text", "name": "first_name", "required": true},
        {"label": "Last Name", "type": "text", "name": "last_name", "required": true},
        {"label": "Email Address", "type": "email", "name": "email", "required": true},
        {"label": "Phone Number", "type": "text", "name": "phone"},
        {"label": "Password", "type": "password", "name": "password", "minlength": "8", "required": true},
        {"label": "Confirm Password", "type": "password", "name": "confirm_password", "required": true},
        {"label": "Company", "type": "text", "name": "company"},
        {"label": "Role", "type": "select", "name": "role", "options": ["Developer", "Designer", "Manager", "Other"]},
        {"label": "How did you hear about us?", "type": "select", "name": "referral", "options": ["Google", "Social Media", "Friend", "Advertisement", "Other"]},
        {"label": "Subscribe to newsletter", "type": "checkbox", "name": "newsletter"},
        {"label": "Accept Terms of Service", "type": "checkbox", "name": "terms", "required": true}
    ]'
>
</lume-form>

<!-- Survey Form -->
<lume-form
  type="custom"
  theme="light"
  layout="stacked"
  panel-title="Customer Feedback"
  panel-description="Help us improve our service"
  fields='[
        {"label": "Overall Satisfaction", "type": "select", "name": "satisfaction", "required": true, "options": ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"]},
        {"label": "What features do you use most?", "type": "textarea", "name": "features", "rows": 2},
        {"label": "What could we improve?", "type": "textarea", "name": "improvements", "rows": 3},
        {"label": "Would you recommend us?", "type": "select", "name": "recommend", "options": ["Definitely", "Probably", "Maybe", "Probably Not", "Definitely Not"]},
        {"label": "Email for follow-up", "type": "email", "name": "email"}
    ]'
>
</lume-form>
```

## JavaScript Integration

### Dynamic Component Updates

```javascript
// Update button properties dynamically
const button = document.querySelector("lume-button");
button.variant = "glow";
button.setAttribute("bg-color", "#ff6b6b");

// Update navbar links
const navbar = document.querySelector("lume-navbar");
navbar.updateNavigation(
  [
    { href: "/", text: "Home", active: true },
    { href: "/products", text: "Products" },
    { href: "/about", text: "About" },
  ],
  [
    { text: "Login", variant: "ghost" },
    { text: "Sign Up", variant: "primary" },
  ]
);

// Toggle navbar mobile menu
navbar.toggle();
navbar.close();
navbar.open();
```

### Form Data Handling

```javascript
// Custom form submission handling
document.addEventListener("form-submit", async (event) => {
  event.preventDefault();

  const formData = event.detail.data;
  const formType = event.detail.type;

  try {
    // Show loading state
    const form = event.target;
    const submitBtn = form.shadowRoot.querySelector(".submit-button");
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;

    // Custom API submission
    const response = await fetch("/api/forms/" + formType, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Form submitted successfully:", result);

      // Show custom success message
      showCustomNotification("Form submitted successfully!", "success");

      // Reset form
      form.reset();
    } else {
      throw new Error("Submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    showCustomNotification("Error submitting form. Please try again.", "error");
  } finally {
    // Reset button state
    const submitBtn = form.shadowRoot.querySelector(".submit-button");
    submitBtn.textContent = "Submit";
    submitBtn.disabled = false;
  }
});

function showCustomNotification(message, type) {
  // Your custom notification implementation
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}
```

### Component Validation

```javascript
// Validate components before submission
function validateAllComponents() {
  const buttons = document.querySelectorAll("lume-button");
  const forms = document.querySelectorAll("lume-form");

  buttons.forEach((button) => {
    const issues = button.validate();
    if (issues.length > 0) {
      console.warn("Button validation issues:", issues);
    }
  });

  forms.forEach((form) => {
    if (!form.validateForm()) {
      console.warn("Form validation failed");
    }
  });
}
```

## Performance Optimization

### Lazy Loading Components

```javascript
// Lazy load components when they come into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const component = entry.target;

      // Trigger component initialization
      if (component.tagName.startsWith("LUME-")) {
        component.style.opacity = "1";
        component.style.transform = "translateY(0)";
      }

      observer.unobserve(component);
    }
  });
});

// Observe all LumeUI components
document.querySelectorAll('[class*="lume-"]').forEach((component) => {
  component.style.opacity = "0";
  component.style.transform = "translateY(20px)";
  component.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(component);
});
```

### Component Caching

```javascript
// Cache component instances for better performance
class LumeComponentManager {
  constructor() {
    this.cache = new Map();
  }

  getComponent(selector) {
    if (!this.cache.has(selector)) {
      this.cache.set(selector, document.querySelector(selector));
    }
    return this.cache.get(selector);
  }

  updateComponent(selector, properties) {
    const component = this.getComponent(selector);
    if (component) {
      Object.keys(properties).forEach((key) => {
        component.setAttribute(key, properties[key]);
      });
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

const lumeManager = new LumeComponentManager();

// Usage
lumeManager.updateComponent("lume-button", {
  variant: "primary",
  "bg-color": "#3b82f6",
});
```

**Made with ❤️ for the web development community**
