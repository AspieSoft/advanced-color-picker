# Advanced Color Picker

![npm weekly downloads](https://img.shields.io/npm/dw/installName)
![npm monthly downloads](https://img.shields.io/npm/dm/installName)

[![donation link](https://img.shields.io/badge/buy%20me%20a%20coffee-paypal-blue)](https://paypal.me/shaynejrtaylor?country.x=US&locale.x=en_US)

A replacement for the browser default html color picker, that also supports alpha and gradient options.

## Installation

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/AspieSoft/advanced-color-picker@1.0.1/style.min.css"/>
<script src="https://cdn.jsdelivr.net/gh/AspieSoft/advanced-color-picker@1.0.1/script.min.js" defer></script>
```

## Usage

```html

<input type="color" value="my default value"/>

<!-- disable gradient picker -->
<input type="color" no-gradient/>

<!-- disable alpha picker -->
<input type="color" no-alpha/>

```

## Styling

```css

#advanced-color-picker {
  --text-dark: #0f0f0f;
  --text-light: #ffffff;
  --text-fb: #9b9b9b;

  --bg: #ffffff;
  --bg-text: #0f0f0f;
  --bg-shadow: #ffffff;

  --shadow: 0 0 5px;
  --text-shadow: 2px 2px 5px;
  --no-color: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;

  --scrollbar: rgba(135, 135, 135, 0.75);
  --scrollbar-hover: rgba(155, 155, 155, 0.75);
  --scrollbar-track: rgba(75, 75, 75, 0.25);
}

input[type="color"] {
  --bg-text: #0f0f0f;
  --text-dark: #0f0f0f;
  --text-light: #ffffff;

  --shadow: 0 0 5px;
  --text-shadow: 2px 2px 5px;
  --no-color: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;
}

```
