# Cookie Consent for Webflow

A plug-and-play Cookie Consent solution for Webflow sites that integrates with Google Consent Mode v2 and Google Tag Manager. This solution wraps the [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) library (v2.7+) with automatic Google Consent Mode handling.

## Features

- ✅ **Google Consent Mode v2** integration
- ✅ **Automatic language detection** from `<html lang>` attribute
- ✅ **GTM DataLayer** events for consent tracking
- ✅ **CSS Variables** for easy customization in Webflow
- ✅ **Page reload** on consent changes to clear cookies
- ✅ **Settings modal helper** via `data-cc="settings"` attribute
- ✅ **CDN-ready** for easy integration

## Quick Start

### 1. Include Required Files

Add these to your Webflow site's **Custom Code** section (in Project Settings > Custom Code):

#### In the `<head>` section:

```html
<!-- Cookie Consent Library (v2.7+) -->
<script src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.7.0/dist/cookieconsent.js"></script>

<!-- Cookie Consent Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/marektucek/cookies@main/cookie-style.css">

<!-- Cookie Config & Loader -->
<script>
  window.CookieConfig = {
    // Your configuration here (see Configuration section)
    languages: {
      en: {
        consent_modal: {
          title: "We use cookies",
          description: "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
          primary_btn: {
            text: "Accept all",
            role: "accept_all"
          },
          secondary_btn: {
            text: "Reject all",
            role: "accept_necessary"
          }
        },
        settings_modal: {
          title: "Cookie preferences",
          save_settings_btn: "Save settings",
          accept_all_btn: "Accept all",
          reject_all_btn: "Reject all",
          close_btn_label: "Close",
          blocks: [
            {
              title: "Cookie usage",
              description: "We use cookies to ensure the basic functionalities of the website and to enhance your online experience."
            },
            {
              title: "Strictly necessary cookies",
              description: "These cookies are essential for the proper functioning of the website.",
              toggle: {
                value: "necessary",
                enabled: true,
                readonly: true
              }
            },
            {
              title: "Analytics cookies",
              description: "These cookies help us understand how visitors interact with our website.",
              toggle: {
                value: "analytics",
                enabled: false,
                readonly: false
              }
            },
            {
              title: "Marketing cookies",
              description: "These cookies are used to deliver personalized advertisements.",
              toggle: {
                value: "marketing",
                enabled: false,
                readonly: false
              }
            }
          ]
        }
      },
      cs: {
        // Czech translation...
      }
    }
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/marektucek/cookies@main/cookie-loader.js"></script>
```

#### In the `<body>` section (before closing `</body>`):

```html
<!-- Google Tag Manager -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
</script>
<!-- GTM Container -->
```

### 2. Customize Colors (Optional)

Add CSS variable overrides in Webflow's **Custom Code** section:

```html
<style>
  :root {
    --cc-primary: #237afc;
    --cc-primary-hover: #1e6ae8;
    --cc-text: #333;
    --cc-bg: #fff;
    --cc-link: #237afc;
    /* ... more variables */
  }
</style>
```

### 3. Add Settings Button (Optional)

Add a button to open cookie settings anywhere on your site:

```html
<button data-cc="settings">Cookie Settings</button>
```

Or use the JavaScript function:

```javascript
window.openCookieSettings();
```

## Configuration

The `window.CookieConfig` object accepts the following options:

```javascript
window.CookieConfig = {
  // Language settings
  defaultLanguage: 'en',  // Fallback if <html lang> is not set
  
  // Behavior settings
  autorun: true,          // Auto-initialize on page load
  pageScripts: true,      // Enable script tag management
  reloadOnChange: true,   // Reload page when consent changes
  reloadDelay: 500,       // Delay before reload (ms)
  waitForUpdate: 500,     // Google Consent Mode wait time (ms)
  
  // Modal layouts
  consentModal: {
    layout: 'bar',        // 'bar' | 'cloud' | 'box'
    position: 'bottom center',  // 'top' | 'bottom' + 'left' | 'center' | 'right'
    transition: 'slide'   // 'slide' | 'zoom' | 'fade'
  },
  settingsModal: {
    layout: 'box',        // 'bar' | 'cloud' | 'box'
    transition: 'slide'   // 'slide' | 'zoom' | 'fade'
  },
  
  // Language texts (see example above)
  languages: {
    en: { /* ... */ },
    cs: { /* ... */ }
  },
  
  // Callbacks
  onAccept: function(settings) {
    // Called when user accepts cookies
  },
  onChange: function(settings, changed) {
    // Called when user changes consent settings
  },
  onFirstAction: function(settings) {
    // Called on first user interaction
  }
};
```

## CSS Variables

All colors and styling can be customized via CSS variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `--cc-primary` | `#237afc` | Primary button color |
| `--cc-primary-hover` | `#1e6ae8` | Primary button hover |
| `--cc-text` | `#333` | Main text color |
| `--cc-text-light` | `#555` | Light text color |
| `--cc-bg` | `#fff` | Background color |
| `--cc-link` | `#237afc` | Link color |
| `--cc-overlay` | `rgba(0,0,0,0.6)` | Modal overlay |
| `--cc-toggle-active` | `#237afc` | Active toggle color |
| `--cc-font-family` | `Arial, Helvetica, sans-serif` | Font family |
| `--cc-font-size` | `14px` | Base font size |

See `cookie-style.css` for the complete list of variables.

## How It Works

1. **Default Consent**: Sets Google Consent Mode to `denied` for all types before GTM loads
2. **Language Detection**: Automatically detects language from `<html lang>` attribute
3. **Consent Updates**: Updates Google Consent Mode when user accepts/changes consent
4. **DataLayer Events**: Pushes `addConsent` events to GTM DataLayer
5. **Cookie Cleanup**: Clears cookies when consent is revoked
6. **Page Reload**: Reloads page after consent changes to ensure scripts are properly loaded/unloaded

## Google Consent Mode Mapping

| Cookie Category | Google Consent Types |
|----------------|---------------------|
| `analytics` | `analytics_storage` |
| `marketing` | `ad_storage`, `ad_user_data`, `ad_personalization` |

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)

## License

MIT License - feel free to use in your projects.

## Credits

Built on top of [orestbida/cookieconsent](https://github.com/orestbida/cookieconsent) library.

