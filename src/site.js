// Stonework Risk — shared details used by every page.
// Anything left as an empty string simply does not render.

export const phone      = "";          // intentionally left off the site
export const tdiLicense = "3500649";   // TDI agency license number
export const founded    = "";          // e.g. "2026" → renders as "Established 2026"

export const legalName  = "Stonework Holdings, LLC";   // "Stonework Risk" is its assumed name
export const email      = "principals@stoneworkrisk.com";
export const linkedin   = "https://www.linkedin.com/company/stoneworkrisk";   // company page (footer, search data)
export const principalLinkedin = "https://www.linkedin.com/in/kris-gardner"; // Kris's profile (About card)
export const formAction = "https://formspree.io/f/mjgdanrd";
export const hours      = "Monday–Friday · 8:00am–5:00pm CT";
export const siteUrl    = "https://www.stoneworkrisk.com";

export const address = {
  street: "100 Crescent Court, Suite 700",
  city:   "Dallas",
  state:  "TX",
  zip:    "75201",
};

export const phoneHref = phone.replace(/[^0-9+]/g, "");
