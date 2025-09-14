# Fresh Fruit Stall — Simple Website

## Files
- `index.html` — main page
- `styles.css` — styles
- `script.js` — client JS (loads JSON, builds PDF, WhatsApp)
- `data/fruits.json` — varieties + fruits
- `assets/images/variety1.jpg` and `variety2.jpg` — replace with your images

## Setup
1. Create the file structure (examples below).
2. Put your images in `assets/images/` and name them `variety1.jpg` and `variety2.jpg`.
3. Open `script.js` and replace `YOURNUMBERHERE` with your WhatsApp number (international, no `+`).
4. Open `index.html` in a modern browser.

## Notes
- PDF embedding of images may fail in some browsers due to local file restrictions — serve files via a local server (e.g. `npx http-server` or `python -m http.server`) for best results.
- To attach PDFs to WhatsApp programmatically you'd need a backend and WhatsApp Business API; current version opens WhatsApp with a pre-filled text message.
