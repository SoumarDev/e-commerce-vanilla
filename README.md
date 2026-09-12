# Kamera Shop

A little e-commerce frontend for a (fictional) camera & lens shop. Built as a learning project — just plain HTML, CSS and vanilla JS, no frameworks, no build tools, nothing fancy.

## What's in here

- `index.html` – the landing page, with a hero carousel, category grid and a recommended-products carousel
- `category.html` – generic category listing page, used for all 12 categories (lenses, cameras, binoculars, accessories, ...) via a `?cat=...` URL param, was `objektive.html` before it got generalized
- `product.html` – single product page, loads the right product based on the URL (`?id=...`), shows a gallery and calculates the discounted price
- `shopping-cart.html` – the cart, saved in `localStorage` so it survives reloads
- `login.html` – login page, form and styling done, no submit logic yet

## Cart

Probably the most "real" part of this project. Cart data lives in `localStorage`, no backend involved:

- add items from the product page
- change quantity or remove an item
- subtotal updates automatically
- optional premium shipping you can add/remove
- cart count shows up as a little badge in the header, on every page

## Stack

HTML, CSS (custom properties, flexbox, some grid), vanilla JS. Font Awesome for icons. That's it, on purpose — the point of the project was learning the fundamentals without a framework doing the work for me.

`css/style.css` is one big file, mobile-first, with breakpoints at 768px / 990px / 1200px.

`js/` is split by responsibility: `main.js` for stuff shared across pages (header, carousels, gallery, nav dropdowns), `products.js` for the single-product page, `category.js` for the category listing, `product-detail.js` for all the product data (144 products across 12 categories at this point), `cart.js` for everything cart-related.

Nav has a mega-menu now too — every top-level item gets its own dropdown with sub-links, not just "Kameras" like at the start.

## Running it

No build step, just open `index.html` in a browser. If something looks off with images/paths, serve the folder instead (e.g. VS Code's Live Server) rather than opening the file directly.

## Status

Still in progress. Cart, category pages and the mega-menu nav work end to end. Still missing: login form doesn't actually log in anywhere yet, and most of the 144 products are placeholder variants of the same handful of real ones (same images, made-up prices) — good enough to test the filtering logic, not meant to look like a real catalog.
