# Webflow Setup Guide

Step-by-step instructions for setting up Cookie Consent in Webflow.

## Step 1: Get Your GTM Container ID

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Select your container (or create a new one)
3. Go to **Admin** → **Container Settings**
4. Copy your **Container ID** (format: `GTM-XXXXXXX`)

## Step 2: Add Code to Webflow

### In Webflow Project Settings:

1. Go to **Project Settings** → **Custom Code**
2. You'll see two sections: **Head Code** and **Footer Code**

### Head Code Section

Paste this code **in order** (important!):

```html
<!-- 1. Cookie Consent Library -->
<script src="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@v2.7.0/dist/cookieconsent.js"></script>

<!-- 2. Cookie Consent Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/COOKIES@main/cookie-style.css">

<!-- 3. Cookie Config -->
<script>
  window.CookieConfig = {
    defaultLanguage: 'en',
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
      }
      // Add more languages here (cs, de, fr, etc.)
    }
  };
</script>

<!-- 4. Cookie Loader -->
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/COOKIES@main/cookie-loader.js"></script>

<!-- 5. Google Tag Manager (REPLACE GTM-XXXXXXX with your Container ID) -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>

<!-- 6. Optional: Custom Styling -->
<style>
  :root {
    --cc-primary: #237afc;
    --cc-primary-hover: #1e6ae8;
    --cc-text: #333;
    --cc-bg: #fff;
    /* Add more variables as needed */
  }
</style>
```

### Footer Code Section

Paste this code:

```html
<!-- Google Tag Manager (noscript) - REPLACE GTM-XXXXXXX with your Container ID -->
<noscript>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>
</noscript>
```

## Step 3: Replace Placeholders

1. **Replace `YOUR_USERNAME`** with your GitHub username (in the CDN URLs)
2. **Replace `GTM-XXXXXXX`** with your actual GTM Container ID (in two places)

## Step 4: Customize (Optional)

### Change Colors

Add CSS variables in the `<style>` tag in Head Code:

```html
<style>
  :root {
    --cc-primary: #your-color;
    --cc-text: #your-text-color;
    /* See STYLING-GUIDE.md for all variables */
  }
</style>
```

### Add Settings Button

In Webflow Designer, add a button or link element, then:

1. Select the element
2. Go to **Settings** → **Custom Attributes**
3. Add attribute: `data-cc` = `settings`

Or add this HTML in a Rich Text element:

```html
<a href="#" data-cc="settings">Cookie Settings</a>
```

## Step 5: Publish & Test

1. **Publish** your site in Webflow
2. Visit your live site
3. You should see the cookie banner at the bottom
4. Test accepting/rejecting cookies
5. Check GTM Preview mode to verify consent events

## Troubleshooting

### Banner doesn't appear
- Check browser console for errors
- Verify all scripts are loading (check Network tab)
- Make sure `cookie-loader.js` loads AFTER `cookieconsent.js`

### GTM not working
- Verify GTM Container ID is correct (both in `<head>` and `<body>`)
- Check GTM Preview mode
- Verify consent events appear in DataLayer

### Styling not applying
- Make sure CSS variables are in `<style>` tag in Head Code
- Check for CSS conflicts (use browser DevTools)
- Verify `cookie-style.css` is loading

## Visual Checklist

✅ Cookie Consent Library loaded  
✅ Cookie Styles loaded  
✅ CookieConfig defined  
✅ Cookie Loader loaded  
✅ GTM code added (with correct Container ID)  
✅ GTM noscript added  
✅ Custom styling added (optional)  
✅ Settings button added (optional)  

## Need Help?

- See [README.md](README.md) for full documentation
- See [STYLING-GUIDE.md](STYLING-GUIDE.md) for styling options
- Check [example.html](example.html) for complete code example

