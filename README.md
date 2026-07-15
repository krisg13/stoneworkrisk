# Stonework Risk — launch site

A single-page "launching soon" website for Stonework Risk, built with [Astro](https://astro.build).
Editorial / architect aesthetic matched to the logo. Lead capture runs through Formspree.

**Live:** https://stoneworkrisk.com
**Repo:** https://github.com/krisg13/stoneworkrisk
**Hosting:** Cloudflare Pages (auto-deploys on every push to `main`)

---

## How it's wired together

| Piece | Where it lives |
|-------|----------------|
| Source code | GitHub repo `krisg13/stoneworkrisk` |
| Build & hosting | Cloudflare Pages — builds `main` with `npm run build`, serves the `dist/` output |
| Domain & DNS | Cloudflare (nameservers `nico` / `simone.ns.cloudflare.com`) |
| Email | Google Workspace (MX/SPF/DKIM/DMARC records in Cloudflare DNS) |
| Form submissions | Formspree → principals@stoneworkrisk.com |

Push a change to `main` → Cloudflare rebuilds and redeploys automatically in about a minute.

---

## Editing the site

Everything is in **`src/pages/index.astro`** — one file. The top of it has the easy-to-change values:

```js
const email = "principals@stoneworkrisk.com";
const linkedin = "https://www.linkedin.com/in/kris-gardner";
const formAction = "https://formspree.io/f/mjgdanrd";   // Formspree endpoint
```

Below that:
- **Copy** — the headline, the two intro paragraphs, the three service blurbs, and the footer text are plain HTML you can edit directly.
- **Colors / fonts** — the `:root` block in the `<style>` section. Brand colors are
  navy `#0B1D33`, paper `#F8F7F4`, sand `#B7A894`. Fonts are Cormorant Garamond
  (display), EB Garamond (body), and Montserrat (labels), loaded from Google Fonts.
- **Wordmark** — "stonework / RISK" is recreated in live text (not an image), so it stays
  crisp at any size.

**`preview.html`** is a standalone copy of the page — double-click it to view the design in a
browser without building anything. If you change `index.astro`, mirror the change here too if
you want the preview to match (optional).

### How to push an edit (no command line needed)

You've been editing through GitHub's web interface, which is the simplest path:

1. Go to the file on GitHub, e.g.
   https://github.com/krisg13/stoneworkrisk/blob/main/src/pages/index.astro
2. Click the **pencil** (Edit) icon.
3. Make your change → **Commit changes** at the bottom.
4. Cloudflare detects the commit and redeploys automatically. Refresh the site in ~1 minute.

---

## The lead form (Formspree)

The form posts to `https://formspree.io/f/mjgdanrd`, which emails submissions to
principals@stoneworkrisk.com. It's already active and tested.

To change where submissions go, or to add an auto-reply, log in at
[formspree.io](https://formspree.io) and edit the form's settings. If you ever create a new
form, paste its new endpoint into the `formAction` line in `index.astro`.

Optional: to send visitors back to your own site after they submit (instead of Formspree's
default thank-you page), add a hidden field inside the `<form>`:

```html
<input type="hidden" name="_next" value="https://stoneworkrisk.com/?thanks=1" />
```

---

## Domain & DNS notes

- `stoneworkrisk.com` and `www.stoneworkrisk.com` are both attached as **Custom domains**
  on the Cloudflare Pages project. Both must stay attached for the site to resolve.
- A redirect rule forwards one to the other so there's a single canonical address.
- **Do not delete the email records** in Cloudflare DNS — the five `MX` records and the
  `SPF` / `DKIM` / `DMARC` / `google-site-verification` `TXT` records run Google Workspace
  mail. Removing them breaks email.
- If an old/cached page ever sticks around after a change, purge it via
  Cloudflare → **Caching** → **Configuration** → **Purge Everything**.

---

## Running locally (optional)

Requires [Node.js](https://nodejs.org) 18+.

```bash
cd website
npm install
npm run dev      # live preview at http://localhost:4321
npm run build    # produces the static site in dist/
```

You don't need to run any of this to deploy — Cloudflare builds it for you on every push.

---

## Project structure

```
website/
├── src/
│   ├── pages/
│   │   └── index.astro     # the entire page (markup + styles)
│   └── env.d.ts            # Astro type declarations (auto-generated)
├── public/
│   └── favicon.svg         # browser-tab icon
├── preview.html            # standalone preview, openable in a browser
├── astro.config.mjs        # Astro config (site URL)
├── package.json            # dependencies & scripts
└── README.md               # this file
```
