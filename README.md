# fbirds5230.github.io

My personal website: focused open-source fixes, thoughtful tests, and a curious purple bird.

**[Visit the website](https://fbirds5230.github.io/)** · **[GitHub profile](https://github.com/fbirds5230)**

## What's inside

- A responsive portfolio with dark and light themes.
- Selected contributions to go-pretty, tinyexec, and ConfigUpdater, with links to the original pull requests.
- An interactive illustration of preserving empty records in a CSV export.
- Original SVG bird artwork, a social preview image, and a custom 404 page.
- Keyboard navigation, visible focus states, reduced-motion support, and a layout that works without JavaScript.

The featured libraries belong to their respective maintainers. This website highlights my contributions to them. The CSV example illustrates the patch; it does not run the Go library in the browser.

## Edit the site

| File | Purpose |
| --- | --- |
| `index.html` | Page copy, contribution links, and sections |
| `style.css` | Layout, colors, responsive styles, and themes |
| `script.js` | Theme switch, navigation, CSV demo, and small interactions |
| `assets/` | Bird artwork, favicon, and social preview |
| `404.html` | Page for missing URLs |

This is a static website with no package dependencies, analytics, or build step. Theme preference is saved in the visitor's browser when local storage is available.

For local development, run a static server from this folder, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

## Publishing

GitHub Pages publishes the root of the `main` branch. Commit updates to this repository to publish changes. `.nojekyll` keeps the files served as a plain static site.

Update the contribution statuses in `index.html` when upstream pull requests change. The social preview is stored as both editable SVG and PNG.
