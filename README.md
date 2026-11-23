# Stonework Risk — launch site

A single-page website for Stonework Risk, built with [Astro](https://astro.build).
Editorial / architect aesthetic matched to the logo. Lead capture runs through Formspree.

Sections: hero, Coverage, Approach, About, Contact — with a sticky anchor nav and
`InsuranceAgency` structured data for search engines.

**Live:** https://stoneworkrisk.com
**Repo:** https://github.com/krisg13/stoneworkrisk
**Hosting:** Cloudflare Workers — Workers Builds auto-deploys on every push to `main`

---

## How it's wired together

| Piece | Where it lives |
|-------|----------------|
| Source code | GitHub repo `krisg13/stoneworkrisk` |
| Build & hosting | Cloudflare Workers (Worker `stoneworkrisk`) — Workers Builds runs `npm run build`, then `wrangler` uploads `dist/` as static assets per `wrangler.jsonc` |
| Domain & DNS | Cloudflare (nameservers `nico` / `simone.ns.cloudflare.com`) |
| Email | Google Workspace (MX/SPF/DKIM/DMARC records in Cloudflare DNS) |
| Form submissions | Formspree → principals@stoneworkrisk.com |

Push a change to `main` → Cloudflare rebuilds and redeploys automatically in about a minute.

**`wrangler.jsonc` is required.** The site has no server-side code, so the deploy step
is `wrangler` uploading `dist/` as static assets. Without that file the build succeeds
and the deploy fails with *"Missing entry-point to Worker script or to assets directory"* —
which is what happened to every build between July and September 2026.

---

## Editing the site

| What | File |
|------|------|
| Shared details — email, address, hours, TDI license, LinkedIn, form endpoint | `src/site.js` |
| Home page — Who we serve, Coverage, Approach, About + principal, Contact | `src/pages/index.astro` |
| Head, nav and footer (shared by every page) | `src/layouts/Base.astro` |
| Colors, fonts and layout | `src/styles/site.css` |
| Privacy policy | `src/pages/privacy.astro` |
| Licensing & disclosures | `src/pages/licensing.astro` |
| Thank-you page shown after the form is sent | `src/pages/thanks.astro` |

Anything in `src/site.js` left as `""` renders nothing (the phone number is intentionally
left blank).

In `index.astro`, the lists at the top drive each section: **`clients`** (Who we serve),
**`coverage`**, **`approach`**, and **`principal`**. To add a headshot, put the photo in
`public/` and set `photo: "/your-file.jpg"` on `principal`.

**Colors / fonts** live in the `:root` block of `src/styles/site.css`. Brand colors are navy
`#0B1D33`, paper `#F8F7F4`, sand `#B7A894`. Fonts are Cormorant Garamond (display),
EB Garamond (body), and Montserrat (labels), loaded from Google Fonts.

**Wordmark** — `public/stonework-wordmark.svg` (Logos 3.0 navy), so it stays crisp at any size.

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
principals@stoneworkrisk.com. A small script sends it in the background and then shows
our own `/thanks` page instead of Formspree's. A hidden `_gotcha` field traps spam bots.

To change where submissions go, or to add an auto-reply, log in at
[formspree.io](https://formspree.io) and edit the form's settings. If you ever create a new
form, paste its new endpoint into the `formAction` line in `index.astro`.

---

## Domain & DNS notes

- `stoneworkrisk.com` and `www.stoneworkrisk.com` are both attached as **Custom domains**
  on the Cloudflare Worker `stoneworkrisk`. Both must stay attached for the site to resolve.
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
├── wrangler.jsonc            # Cloudflare Worker config (static assets from dist/)
├── astro.config.mjs          # Astro config (site URL)
├── package.json              # dependencies & scripts
└── README.md                 # this file
```
