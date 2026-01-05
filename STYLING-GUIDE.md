# Styling Guide for Cookie Consent

This guide explains how to customize the appearance of the cookie consent banner and modal in Webflow.

## Quick Start: CSS Variables

The easiest way to customize colors is using CSS Variables. Add this to your Webflow **Custom Code** (`<head>` section):

```html
<style>
  :root {
    --cc-primary: #237afc;           /* Change primary button color */
    --cc-primary-hover: #1e6ae8;    /* Change hover color */
    --cc-text: #333;                 /* Change text color */
    --cc-bg: #fff;                   /* Change background */
  }
</style>
```

## All Available CSS Variables

### Colors

| Variable | Default | What It Styles |
|----------|---------|----------------|
| `--cc-primary` | `#237afc` | Primary button background, active toggle |
| `--cc-primary-hover` | `#1e6ae8` | Primary button hover state |
| `--cc-text` | `#333` | Main text color |
| `--cc-text-light` | `#555` | Secondary text (descriptions) |
| `--cc-text-lighter` | `#666` | Tertiary text |
| `--cc-bg` | `#fff` | Main background (banner, modal) |
| `--cc-bg-light` | `#f9f9f9` | Light background (modal footer) |
| `--cc-bg-lighter` | `#f5f5f5` | Lighter background (category badges) |
| `--cc-border` | `#eee` | Border color |
| `--cc-border-light` | `#f1f1f1` | Light border (secondary button) |
| `--cc-link` | `#237afc` | Link color |
| `--cc-overlay` | `rgba(0,0,0,0.6)` | Modal overlay background |
| `--cc-toggle-bg` | `#ccc` | Toggle inactive state |
| `--cc-toggle-active` | `#237afc` | Toggle active state |
| `--cc-close` | `#999` | Close button (×) color |

### Typography

| Variable | Default | What It Styles |
|----------|---------|----------------|
| `--cc-font-family` | `Arial, Helvetica, sans-serif` | All text |
| `--cc-font-size` | `14px` | Base font size |
| `--cc-font-size-small` | `13px` | Small text (descriptions) |
| `--cc-font-size-large` | `16px` | Large text (banner title) |
| `--cc-font-size-title` | `18px` | Modal title |
| `--cc-line-height` | `1.5` | Line height |
| `--cc-font-weight-normal` | `400` | Normal weight |
| `--cc-font-weight-bold` | `600` | Bold weight |

### Spacing & Layout

| Variable | Default | What It Styles |
|----------|---------|----------------|
| `--cc-spacing-xs` | `5px` | Extra small spacing |
| `--cc-spacing-sm` | `10px` | Small spacing (button gaps) |
| `--cc-spacing-md` | `15px` | Medium spacing |
| `--cc-spacing-lg` | `20px` | Large spacing (padding) |
| `--cc-spacing-xl` | `25px` | Extra large spacing |
| `--cc-spacing-xxl` | `30px` | Extra extra large spacing |

### Border Radius

| Variable | Default | What It Styles |
|----------|---------|----------------|
| `--cc-radius-sm` | `4px` | Small radius (buttons, badges) |
| `--cc-radius-md` | `8px` | Medium radius (modal) |
| `--cc-radius-lg` | `34px` | Large radius (toggles) |

## Example: Complete Brand Customization

Here's a complete example matching a brand with purple colors:

```html
<style>
  :root {
    /* Brand Colors */
    --cc-primary: #8b5cf6;
    --cc-primary-hover: #7c3aed;
    --cc-text: #1f2937;
    --cc-text-light: #6b7280;
    --cc-text-lighter: #9ca3af;
    --cc-bg: #ffffff;
    --cc-bg-light: #f9fafb;
    --cc-bg-lighter: #f3f4f6;
    --cc-border: #e5e7eb;
    --cc-border-light: #f3f4f6;
    --cc-link: #8b5cf6;
    --cc-overlay: rgba(0, 0, 0, 0.5);
    --cc-toggle-bg: #d1d5db;
    --cc-toggle-active: #8b5cf6;
    --cc-close: #6b7280;
    
    /* Typography */
    --cc-font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    --cc-font-size: 15px;
    --cc-font-size-small: 14px;
    --cc-font-size-large: 17px;
    --cc-font-size-title: 20px;
    
    /* Spacing */
    --cc-spacing-lg: 24px;
    --cc-spacing-xl: 28px;
    
    /* Border Radius */
    --cc-radius-sm: 6px;
    --cc-radius-md: 12px;
  }
</style>
```

## Advanced: Direct Element Styling

If you need more control, you can target specific elements directly:

```html
<style>
  /* Custom banner background with gradient */
  #cm {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-top: none;
  }
  
  /* Custom banner text colors */
  #c-ttl {
    color: white;
  }
  #c-txt {
    color: rgba(255, 255, 255, 0.9);
  }
  
  /* Rounded primary button */
  #c-p-bn {
    background: #ff6b6b;
    border-radius: 25px;
    padding: 12px 30px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  /* Custom modal styling */
  #s-cnt {
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    border: 1px solid rgba(0,0,0,0.1);
  }
  
  /* Custom toggle colors */
  .c-tgl:checked + .c-tg {
    background-color: #ff6b6b;
  }
  
  /* Custom category badge */
  .b-tl {
    background: #f0f0f0;
    color: #333;
    font-size: 12px;
    padding: 6px 12px;
    border-radius: 20px;
  }
</style>
```

## Element IDs Reference

Use these IDs to target specific elements:

| ID | Element |
|----|---------|
| `#cm` | Consent banner (bottom bar) |
| `#c-inr` | Banner inner container |
| `#c-ttl` | Banner title |
| `#c-txt` | Banner description |
| `#c-p-bn` | Primary button (Accept all) |
| `#c-s-bn` | Secondary button (Reject all) |
| `#cs-ov` | Settings modal overlay |
| `#s-cnt` | Settings modal container |
| `#s-ttl` | Settings modal title |
| `#s-c-bn` | Close button |
| `#s-all-bn` | Accept all button (in modal) |
| `#s-sv-bn` | Save settings button |
| `.c-bl` | Category block |
| `.b-tl` | Category title/badge |
| `.c-tg` | Toggle switch |

## Testing Your Styles

1. **In Browser DevTools:**
   - Right-click the cookie banner → Inspect
   - Modify CSS variables in the `:root` selector
   - Copy working styles to Webflow Custom Code

2. **In Webflow:**
   - Add CSS to Custom Code (`<head>` section)
   - Publish and test on live site
   - Use Webflow's preview mode to see changes

## Common Customization Examples

### Dark Mode Banner

```css
#cm {
  background: #1f2937;
  border-top: 1px solid #374151;
}
#c-ttl, #c-txt {
  color: #f9fafb;
}
#c-s-bn {
  background: #374151;
  color: #f9fafb;
}
```

### Minimalist Style

```css
:root {
  --cc-primary: #000;
  --cc-bg: #fff;
  --cc-border: #e5e7eb;
  --cc-radius-sm: 0;
  --cc-radius-md: 0;
}
#cm {
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}
```

### Rounded Buttons

```css
.c-bn {
  border-radius: 25px;
  padding: 12px 28px;
}
```

### Custom Font

```css
:root {
  --cc-font-family: 'Your Font', sans-serif;
}
```

