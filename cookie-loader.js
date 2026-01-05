/**
 * Cookie Consent Loader for Webflow
 * A plug-and-play solution that integrates orestbida/cookieconsent with Google Consent Mode v2
 * 
 * Usage:
 * 1. Include this script and cookie-style.css
 * 2. Include orestbida/cookieconsent library (v2.7+)
 * 3. Define window.CookieConfig before this script loads
 * 4. Add data-cc="settings" to any element to open settings modal
 */

(function() {
    'use strict';

    // Check if CookieConfig is defined
    if (typeof window.CookieConfig === 'undefined') {
        console.warn('CookieConfig not found. Using defaults.');
        window.CookieConfig = {};
    }

    const config = window.CookieConfig;

    /* --- A. SET DEFAULT CONSENT (Before GTM loads) --- */
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }

    // Set default consent to 'denied' for all Google Consent Mode types
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'analytics_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'wait_for_update': config.waitForUpdate || 500
    });
    dataLayer.push({'event': 'default_consent'});

    /* --- B. HELPER FUNCTIONS --- */
    
    /**
     * Maps cookie categories to Google Consent Mode types
     * @param {Array} level - Array of accepted categories (e.g., ['necessary', 'analytics', 'marketing'])
     * @param {Boolean} onlyWhenChange - If true, only push event when consent changes
     */
    const updateGTMConsent = (level, onlyWhenChange = false) => {
        const gtm_levels = {
            'analytics_storage': level.indexOf('analytics') > -1 ? 'granted' : 'denied',
            'ad_storage': level.indexOf('marketing') > -1 ? 'granted' : 'denied',
            'ad_user_data': level.indexOf('marketing') > -1 ? 'granted' : 'denied',
            'ad_personalization': level.indexOf('marketing') > -1 ? 'granted' : 'denied',
        };
        
        // Update Google Consent Mode
        gtag('consent', 'update', gtm_levels);
        
        // Push event to DataLayer for GTM triggers
        if (onlyWhenChange) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'addConsent',
                consentType: level.filter((l) => l !== 'necessary').join(',')
            });
        }
    };

    /**
     * Clears cookies when user revokes consent
     * Removes all cookies except necessary ones
     */
    const deleteCookies = () => {
        const cookies = document.cookie.split(';');
        const domain = window.location.hostname;
        const domainParts = domain.split('.');
        
        // Get base domain (e.g., example.com from www.example.com)
        const baseDomain = domainParts.length > 1 
            ? '.' + domainParts.slice(-2).join('.')
            : domain;
        
        cookies.forEach(cookie => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            // Skip necessary cookies (you can customize this list)
            if (name && !name.startsWith('cc_')) {
                // Delete cookie for current domain
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
                // Delete cookie for base domain
                document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + baseDomain;
            }
        });
    };

    /**
     * Language detection from HTML lang attribute
     * Falls back to config default or 'en'
     */
    const detectLanguage = () => {
        const htmlLang = document.documentElement.lang;
        if (htmlLang) {
            return htmlLang.substring(0, 2).toLowerCase();
        }
        return config.defaultLanguage || 'en';
    };

    /**
     * Initialize cookie consent library
     */
    const initCookieConsent = () => {
        // Check if cookieconsent library is loaded
        if (typeof window.initCookieConsent === 'undefined') {
            console.error('cookieconsent library not found. Please include it before cookie-loader.js');
            return null;
        }

        const cc = window.initCookieConsent();
        const currentLang = detectLanguage();

        // Merge user config with defaults
        const ccConfig = {
            current_lang: currentLang,
            autorun: config.autorun !== false, // Default: true
            page_scripts: config.pageScripts !== false, // Default: true
            
            // GUI Options
            gui_options: {
                consent_modal: {
                    layout: config.consentModal?.layout || 'bar',
                    position: config.consentModal?.position || 'bottom center',
                    transition: config.consentModal?.transition || 'slide'
                },
                settings_modal: {
                    layout: config.settingsModal?.layout || 'box',
                    transition: config.settingsModal?.transition || 'slide'
                }
            },

            // Callbacks
            onAccept: (settings) => {
                updateGTMConsent(settings.level);
                if (typeof config.onAccept === 'function') {
                    config.onAccept(settings);
                }
            },
            
            onChange: (settings, changed) => {
                deleteCookies(); // Cleanup old cookies
                updateGTMConsent(settings.level, true); // Send updates
                
                // Reload page to ensure strictly denied scripts are removed
                if (config.reloadOnChange !== false) {
                    setTimeout(() => {
                        window.location.reload();
                    }, config.reloadDelay || 500);
                }
                
                if (typeof config.onChange === 'function') {
                    config.onChange(settings, changed);
                }
            },

            onFirstAction: (settings) => {
                updateGTMConsent(settings.accepted_categories, true);
                if (typeof config.onFirstAction === 'function') {
                    config.onFirstAction(settings);
                }
            },

            // Languages configuration
            languages: config.languages || {}
        };

        // Run the cookie consent
        cc.run(ccConfig);

        return cc;
    };

    /* --- C. INITIALIZE WHEN DOM IS READY --- */
    const init = () => {
        // Wait for cookieconsent library to load
        if (typeof window.initCookieConsent === 'undefined') {
            // Retry after a short delay
            setTimeout(() => {
                if (typeof window.initCookieConsent !== 'undefined') {
                    initCookieConsent();
                } else {
                    console.error('cookieconsent library failed to load');
                }
            }, 100);
            return;
        }

        const cc = initCookieConsent();
        
        if (!cc) return;

        /* --- D. SETTINGS MODAL HELPER --- */
        // Expose global function to open settings
        window.openCookieSettings = () => {
            cc.showSettings();
        };

        // Handle data-cc="settings" attribute clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-cc="settings"]');
            if (target) {
                e.preventDefault();
                cc.showSettings();
            }
        });

        // Store instance globally for advanced usage
        window.CookieConsentInstance = cc;
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

