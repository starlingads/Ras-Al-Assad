# Deploying Ras Al Assad to Hostinger

This is a **Next.js 16 server application** — not a static site. It uses SSR +
Incremental Static Regeneration (`revalidate = 60`), server-side image
optimization, `redirects()`, and live Sanity CMS fetching. **It must run on a
Node.js process.** It cannot run on plain shared/static hosting without losing
the live-CMS feature (see "If you only have static hosting" at the bottom).

Target: **Hostinger VPS**, **Cloud Panel**, or any Hostinger plan with a
**Node.js application** (Passenger) — i.e. anything that can run `node`.

---

## 1. Required environment variables

Set these in the Hostinger Node app / VPS environment — **both at build time
and at runtime**. Without the first two, the build fails immediately with
"Missing environment variable" (they are validated at module load).

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `prqp92tt` | public project id |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | public dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2026-07-01` | optional; defaults to this |
| `SANITY_API_READ_TOKEN` | *(from sanity.io/manage)* | only needed if you enable draft preview; the public site does not require it |
| `SMTP_HOST` | `smtp.office365.com` | Microsoft 365 SMTP |
| `SMTP_PORT` | `587` | STARTTLS. Exchange Online offers no implicit-TLS 465 |
| `SMTP_USER` | `info@rasalassad.ae` | must be a licensed mailbox with SMTP AUTH enabled |
| `SMTP_PASSWORD` | *(App Password)* | **secret.** If MFA/Security Defaults are on, a normal password is always rejected — use an App Password |
| `MAIL_FROM` | `info@rasalassad.ae` | must equal SMTP_USER, or an address it has SendAs rights on |
| `MAIL_TO` | `info@rasalassad.ae` | where enquiries are delivered |

### Verifying SMTP from the server

Outbound SMTP is a per-network thing: passing on a laptop proves nothing about
production. Run this **on the Hostinger server**, after setting the variables:

```bash
node scripts/verify-smtp.mjs                      # TCP + STARTTLS + AUTH
node scripts/verify-smtp.mjs --send you@email.com # plus one real test message
```

It performs the real Exchange Online handshake and, on failure, prints the exact
Microsoft 365 or network change required (SMTP AUTH toggle, App Password,
SendAs rights, blocked port 587) rather than a workaround.

The exact non-secret values live in `.env.example`. `.env.local` is git-ignored
and never leaves your machine — you must re-enter these in Hostinger.

## 2. Node version

Node **22 LTS** (the repo pins `engines.node >= 22.12` and `.nvmrc = 22`).
In hPanel set the Node version to 22; on a VPS: `nvm install 22 && nvm use 22`.

## 3. Build

```bash
npm ci
npm run build
```

`next.config.mjs` sets `output: "standalone"`, so the build emits a
self-contained server at `.next/standalone/`.

## 4. Assemble the runnable bundle

The standalone output does not include static assets or `public/` — copy them in:

```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
```

## 5. Start command

```bash
PORT=3000 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

- **VPS:** keep it alive with PM2 — `pm2 start .next/standalone/server.js --name ras-al-assad`, then `pm2 save && pm2 startup`. Put nginx in front (proxy_pass to `127.0.0.1:3000`) and terminate TLS there.
- **hPanel Node app (Passenger):** set the **Application startup file** to `.next/standalone/server.js` and the app root to the project. Passenger sets `PORT` for you.

## 6. Verify

```
/            200
/projects    200        (project filters work)
/studio      200        (Sanity Studio)
/sitemap.xml 200
/robots.txt  200
/en/about → /about       (301 redirect)
```

Images are served/optimized from `cdn.sanity.io` at runtime; CMS edits go live
within ~60 s (ISR) with no rebuild.

---

## If you only have static shared hosting (no Node)

A Next SSR app cannot run there. Two options:

1. **Recommended:** move to a Hostinger plan that runs Node (VPS/Cloud/Node app)
   and follow the steps above. This keeps the CMS live.
2. **Static export** (last resort): switch to `output: "export"`, which requires
   giving up: ISR/live updates (CMS edits then need a rebuild + re-upload),
   `next/image` optimization (`images.unoptimized: true`), and `redirects()`
   (move the `/en` rules to `.htaccess`). The Studio would also need to be hosted
   separately. This is a real feature downgrade — only do it if Node hosting is
   truly unavailable. Ask before taking this path.
