# Artisan House LLC

Marketing website for **Artisan House LLC** — home remodeling and building
(whole-home remodels, kitchens, bathrooms, decks, basements and landscaping).

Built as a plain static site — **HTML, CSS and vanilla JavaScript** — with a small
Express backend that powers the contact form.

## Structure

```
index.html      # Page markup
styles.css      # All styling
script.js       # Sticky navbar, contact modal, form submission
assets/         # Images
server.js       # Express server: serves the site + POST /api/contact (email via Gmail)
```

## Running it

You can open `index.html` directly in a browser to view the site, but the contact
form needs the server running to send email.

```bash
npm install
npm start        # serves the site + API on http://localhost:5000
# or: npm run dev  (auto-reload via nodemon)
```

## Environment

Create a `.env` file for the contact form:

```
PORT=5000
GMAIL_USERNAME=your@gmail.com
GMAIL_PASS=your_app_password   # use a Gmail App Password, not your login password
```

The front end posts to `/api/contact` on the same origin. To point it at a
different backend, set `window.API_URL` before `script.js` loads.
