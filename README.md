# Stonework Risk — launch site

A single-page website for Stonework Risk, built with [Astro](https://astro.build).
Editorial / architect aesthetic matched to the logo. Lead capture runs through Formspree.

Sections: hero, Coverage, Approach, About, Contact — with a sticky anchor nav and
`InsuranceAgency` structured data for search engines.

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

Everything is in **`src/pages/index.astro`** — one file.

### Details you must fill in

The top of the file has three blanks. **Anything left as `""` renders nothing** — the
phone link, the license line and the founding year each disappear rather than showing a
placeholder, so a half-filled file never ships something fake:

```js
const phone      = "";   // e.g. "(214) 555-0142"
const tdiLicense = "";   // Texas Dept. of Insurance agency license number
const founded    = "";   // e.g. "2025"  -> renders as "Established 2025"
```

Filling in `phone` lights up four things at once: the nav, a "or call…" link under the
hero button, a Telephone row in Contact, the footer, and `telephone` in the structured data.

### Everything else

Below that, still in the frontmatter:

- **`coverage`** — the three columns of the Coverage section. Add or remove lines freely.
- **`approach`** — the three numbered steps.
- **`address`**, **`hours`**, `email`, `linkedin`, `formAction`.
- **`schema`** — the `InsuranceAgency` JSON-LD. It reads from the values above, so it
  stays correct on its own; you shouldn't need to touch it.

In the markup below: the headline, the two intro paragraphs, and the About copy are
plain HTML you can edit directly.

**Colors / fonts** live in the `:root` block in `<style>`. Brand colors are navy
`#0B1D33`, paper `#F8F7F4`, sand `#B7A894`. Fonts are Cormorant Garamond (display),
EB Garamond (body), and Montserrat (labels), loaded from Google Fonts.

**Wordmark** — `public/stonework-wordmark.svg`, so it stays crisp at any size.

### preview.html

`preview.html` is a standalone copy of the page you can double-click to view without
building. It is **generated** — don't edit it by hand. Regenerate after a change:

```bash
npm run build && npm run preview:html
```

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
cd ~/Projects/stoneworkrisk
npm install
npm run dev      # live preview at http://localhost:4321
npm run build    # produces the static site in dist/
```

You don't need to run any of this to deploy — Cloudflare builds it for you on every push.

---

## Project structure

```
stoneworkrisk/
├── src/
│   ├── pages/
│   │   └── index.astro       # the entire page (data + markup + styles)
│   └── env.d.ts              # Astro type declarations
├── public/                   # favicons, wordmarks, OG image, email assets
├── scripts/
│   └── build-preview.mjs     # regenerates preview.html from dist/
├── preview.html              # GENERATED standalone preview
├── astro.config.mjs          # Astro config (site URL)
├── package.json              # dependencies & scripts
└── README.md                 # this file
```
