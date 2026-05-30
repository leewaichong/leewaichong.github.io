# Lee Wai Chong — Personal Site

A one-page profile / landing / resume site. Aesthetic: **retro-future 8-bit / synthwave arcade** —
pixel fonts, neon cyan/magenta/violet on deep indigo, a scrolling synthwave grid floor, CRT
scanlines, a starfield, pixel-bordered "window" cards with hard offset shadows, a pixel mascot bot,
a kinetic tech marquee, and a neon terminal contact. No build step, no framework — just three files.

```
index.html   — structure + content (+ inline pixel-mascot SVG symbol)
styles.css   — all styling, design tokens, animations
script.js    — scroll reveals, nav state, smooth scroll
```

## Run locally

Any static server works:

```bash
cd personal-site
python3 -m http.server 8080
# open http://localhost:8080
```

Or just double-click `index.html`.

## Deploy (free)

**Cloudflare Pages**
1. Push this folder to a GitHub repo.
2. Cloudflare Dashboard → Pages → Connect to Git → pick the repo.
3. Build command: *(none)* · Output directory: `/` · Deploy.

**Vercel**
```bash
npm i -g vercel
vercel        # follow prompts; framework = "Other", no build step
```

**GitHub Pages**
- Repo → Settings → Pages → deploy from branch `main` / root.

## Custom domain

Point an `A`/`CNAME` record at your host (Cloudflare Pages or Vercel both give
instructions per domain). Update the `og:` meta tags in `index.html` with the final URL.

## Editing content

All copy lives in `index.html`. Common edits:
- **Projects** → the `.card` articles in the `#work` section (bento layout; first card is featured).
- **Experience** → the `.xp-item` list in `#experience`.
- **Marquee keywords** → the `.marquee-track` spans (list is duplicated for a seamless loop).
- **Colors / fonts** → CSS variables at the top of `styles.css` (`--accent`, `--grad`, fonts).

## Notes
- Fonts: Press Start 2P + VT323 (Google Fonts).
- Mascot: inline SVG `<symbol id="bot">` near the top of `index.html`, reused via `<use>`.
- Photo: `assets/portrait.jpg` (swap to change it).
- Fully responsive; respects `prefers-reduced-motion` (aurora/marquee/reveals disabled).
- Work projects (VaaS, identity verification) are described at a deliberately high level —
  no sensitive specifics.
