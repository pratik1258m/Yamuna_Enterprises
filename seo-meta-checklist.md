# Yamuna Enterprises — Technical SEO & Performance Checklist

## 1. Speed & Core Web Vitals
- [ ] **LCP (Largest Contentful Paint):** Must be < 2.5s. (Optimization: The hero image is already preloaded).
- [ ] **FID (First Input Delay):** Must be < 100ms. (Optimization: Minimal JS usage ensures this).
- [ ] **CLS (Cumulative Layout Shift):** Must be < 0.1. (Optimization: Explicit width/height on images).
- [ ] **Images:** Convert all product photos in `assets/` to .webp format.
- [ ] **Compression:** Verify Brotli/Gzip is active on your server (Netlify does this automatically).

## 2. On-Page & Content
- [ ] **Title Tags:** Ensure every page (including blogs) has a unique title < 60 characters.
- [ ] **Meta Descriptions:** Keep between 120-155 characters.
- [ ] **Internal Links:** The new blog posts must link to the `#products` and `#contact` sections.
- [ ] **Alt Text:** Every image must have descriptive alt text (e.g., `alt="3HP Cold Press Oil Machine - Front View"`).

## 3. Mobile Usability
- [ ] **Tap Targets:** All buttons and links must be at least 48x48px.
- [ ] **Viewport:** Ensure `user-scalable=yes` for accessibility.
- [ ] **Horizontal Scroll:** Zero horizontal scroll on mobile viewports.

## 4. Structured Data (Schema)
- [ ] **Test Rich Results:** Run https://yamunaenterprises.in through https://search.google.com/test/rich-results.
- [ ] **Review Schema:** Ensure AggregateRating (5.0, 150 reviews) is consistent with your GBP profile.

## 5. Indexing & Monitoring
- [ ] **Google Search Console:** Submit `sitemap.xml`.
- [ ] **Bing Webmaster Tools:** Submit `sitemap.xml`.
- [ ] **Keyword Tracking:** Monitor these 20 primary keywords monthly:
    1. oil press machine price India
    2. best oil press machine for business
    3. kachi ghani machine manufacturer
    4. oil maker machine Vasai
    5. cold press oil machine price Maharashtra
    6. groundnut oil expeller machine
    7. mustard oil press machine
    8. commercial oil extraction machine
    9. domestic oil maker price
    10. oil mill machinery manufacturer
    11. automatic oil press machine
    12. oil press machine spare parts
    13. 3hp oil press machine price
    14. 5hp oil press machine price
    15. edible oil making machine
    16. mini oil press machine India
    17. oil ghani machine
    18. wood press oil machine
    19. Yamuna Enterprises oil machine
    20. oil machine manufacturer near me

## 6. Maintenance
- [ ] **Broken Links:** Run a monthly scan using a tool like Screaming Frog.
- [ ] **Security:** Verify SSL certificate is valid and auto-renewing.
