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

**📖 New to Webflow?** See **[WEBFLOW-SETUP.md](WEBFLOW-SETUP.md)** for step-by-step instructions.

### 1. Include Required Files

Add these to your Webflow site's **Custom Code** section (in Project Settings > Custom Code):

#### In the `<head>` section:

```html
<!-- Cookie Consent Library (v2.7+) -->
<script src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.7.0/dist/cookieconsent.js"></script>

<!-- Cookie Consent Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/COOKIES@main/cookie-style.css">

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
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/COOKIES@main/cookie-loader.js"></script>
```

#### In the `<head>` section (AFTER cookie-loader.js):

```html
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX'); // Replace GTM-XXXXXXX with your GTM ID
</script>
```

#### In the `<body>` section (right after opening `<body>` tag):

```html
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" // Replace GTM-XXXXXXX with your GTM ID
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

**Important:** Replace `GTM-XXXXXXX` with your actual Google Tag Manager Container ID (e.g., `GTM-ABC123`). You can find this in your GTM dashboard under Admin > Container Settings.

### 2. Add Google Tag Manager Container ID

**In Webflow:** Go to Project Settings > Custom Code

**In the `<head>` section**, add your GTM container code AFTER the cookie-loader.js script:

```html
<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

**In the `<body>` section**, add the noscript version right after the opening `<body>` tag:

```html
<!-- Google Tag Manager (noscript) -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

**Replace `GTM-XXXXXXX`** with your actual GTM Container ID (found in GTM dashboard: Admin > Container Settings).

### 3. Customize Styling

#### Option A: CSS Variables (Recommended - Easy in Webflow)

Add CSS variable overrides in Webflow's **Custom Code** section (`<head>`):

```html
<style>
  :root {
    /* Primary Colors */
    --cc-primary: #237afc;              /* Primary button background */
    --cc-primary-hover: #1e6ae8;        /* Primary button hover */
    
    /* Text Colors */
    --cc-text: #333;                     /* Main text color */
    --cc-text-light: #555;               /* Secondary text */
    --cc-text-lighter: #666;             /* Tertiary text */
    
    /* Background Colors */
    --cc-bg: #fff;                       /* Main background */
    --cc-bg-light: #f9f9f9;              /* Light background (modal footer) */
    --cc-bg-lighter: #f5f5f5;            /* Lighter background (category badges) */
    
    /* Border & UI Colors */
    --cc-border: #eee;                    /* Border color */
    --cc-border-light: #f1f1f1;           /* Light border (secondary button) */
    --cc-link: #237afc;                   /* Link color */
    --cc-overlay: rgba(0, 0, 0, 0.6);     /* Modal overlay */
    --cc-toggle-bg: #ccc;                 /* Toggle inactive state */
    --cc-toggle-active: #237afc;          /* Toggle active state */
    --cc-close: #999;                     /* Close button color */
    
    /* Typography */
    --cc-font-family: Arial, Helvetica, sans-serif;
    --cc-font-size: 14px;
    --cc-font-size-small: 13px;
    --cc-font-size-large: 16px;
    --cc-font-size-title: 18px;
    
    /* Spacing (optional) */
    --cc-spacing-lg: 20px;
    --cc-spacing-xl: 25px;
    
    /* Border Radius (optional) */
    --cc-radius-sm: 4px;
    --cc-radius-md: 8px;
  }
</style>
```

#### Option B: Direct CSS Overrides (Advanced)

If you need more control, you can override specific elements directly:

```html
<style>
  /* Customize the banner */
  #cm {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-top: none;
  }
  
  /* Customize primary button */
  #c-p-bn {
    background: #ff6b6b;
    border-radius: 25px;
    padding: 12px 30px;
  }
  
  /* Customize modal */
  #s-cnt {
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }
  
  /* Customize toggles */
  .c-tgl:checked + .c-tg {
    background-color: #ff6b6b;
  }
</style>
```

#### Option C: Webflow Designer (Visual Styling)

Since the cookie consent elements are dynamically injected, you can't style them directly in Webflow Designer. However, you can:

1. Add the CSS variable overrides in Custom Code (Option A above)
2. Use Webflow's Custom Code to add additional CSS targeting the cookie consent IDs
3. Test changes in the browser's developer tools, then copy the CSS to Custom Code

### 4. Add Settings Button (Optional)

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

All colors and styling can be customized via CSS variables. See **[STYLING-GUIDE.md](STYLING-GUIDE.md)** for a complete guide.

Quick example - add to Webflow Custom Code (`<head>`):

```html
<style>
  :root {
    --cc-primary: #237afc;        /* Primary button color */
    --cc-primary-hover: #1e6ae8;  /* Button hover */
    --cc-text: #333;              /* Text color */
    --cc-bg: #fff;                /* Background */
    --cc-link: #237afc;           /* Links */
  }
</style>
```

**See [STYLING-GUIDE.md](STYLING-GUIDE.md) for:**
- Complete list of all CSS variables
- Advanced styling examples
- Element ID reference
- Common customization patterns

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

