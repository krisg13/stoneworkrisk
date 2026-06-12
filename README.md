# Stonework Risk — launch page

A single-page Astro site. Editorial / architect aesthetic, off-white + navy + sand,
matched to the logo. Lead capture via Formspree.

---

## Preview it right now (no install)

Double-click **`preview.html`**. It's a static copy of the page that opens in any
browser so you can react to the design. The real site lives in `src/pages/index.astro`.

---

## 1. Set up the lead form (Formspree) — 3 minutes

1. Go to https://formspree.io and sign up (free tier = 50 submissions/month).
2. Create a new form. Set the notification email to **principals@stoneworkrisk.com**.
3. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
4. Open `src/pages/index.astro`, find the line near the top:
   ```js
   const formAction = "https://formspree.io/f/YOUR_FORM_ID";
   ```
   Replace `YOUR_FORM_ID` with your real ID. (Also update it in `preview.html` if you
   want the preview's form to work — line with `action="https://formspree.io/f/YOUR_FORM_ID"`.)
5. The first real submission triggers a one-time Formspree confirmation email — click it
   to activate the form.

That's it. Every submission then emails you name + email + optional note.

---

## 2. Run it locally (optional)

Requires Node 18+.

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
```

---

## 3. Deploy — recommended path: GitHub → Cloudflare Pages (free)

### a. Put the code on GitHub
1. Create a new repo at https://github.com/new — name it `stonework-risk`, keep it private.
2. In a terminal inside the `website` folder:
   ```bash
   git init
   git add .
   git commit -m "Stonework Risk launch page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/stonework-risk.git
   git push -u origin main
   ```

### b. Connect Cloudflare Pages
1. Go to https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Pick the `stonework-risk` repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.** In ~1 minute you get a live URL like
   `stonework-risk.pages.dev`.

### c. Point your domain (www.stoneworkrisk.com)
Easiest if your DNS is on Cloudflare:
1. In Cloudflare, add the site `stoneworkrisk.com` (free plan) and update your
   registrar's nameservers to the two Cloudflare gives you. (Skip if it's already on
   Cloudflare.)
2. In the Pages project → **Custom domains** → **Set up a domain** → enter
   `www.stoneworkrisk.com`. Cloudflare adds the DNS record automatically.
3. Add `stoneworkrisk.com` (apex) too and set it to redirect to `www`.
4. HTTPS is automatic.

> Prefer Vercel? Same idea: import the GitHub repo at vercel.com, it auto-detects Astro,
> deploy, then add the domain under Project → Settings → Domains. Cloudflare Pages is the
> recommendation for a static site this size — fastest edge network, generous free tier.

---

## Editing content later

Everything is in `src/pages/index.astro`:
- **Copy** — headline, the two paragraphs, the three service blurbs, footer text.
- **Contact** — `email` and `linkedin` constants at the top.
- **Colors / fonts** — the `:root` block in the `<style>` section.
- **Fonts** — currently Cormorant Garamond (display) + EB Garamond (body) +
  Montserrat (labels), loaded from Google Fonts. Swap the `<link>` and the
  `--display / --body / --label` variables to change them.

The "stonework / RISK" wordmark is recreated in live text (not an image) so it stays
crisp at any size. If you'd rather use the actual logo PNG/SVG, drop it in `public/` and
replace the `.mark` block with an `<img>`.
