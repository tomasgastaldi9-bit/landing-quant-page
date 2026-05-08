# QuantBot Website

QuantBot is a premium institutional-style frontend for a quantitative crypto research product. The current build includes a public landing page, a demo execution/risk monitoring dashboard, and a private beta access request flow.

This repository is frontend-only. The dashboard and access request flow use mock/demo behavior and are not connected to live trading, authentication, payments, databases, or backend services.

## Stack

- Next.js App Router
- TypeScript
- React
- TailwindCSS
- `next/font` with Geist and Geist Mono

## Routes

- `/` - Landing page for QuantBot, including hero, platform capabilities, CTA, compliance-oriented copy, and links into the demo terminal and private beta request flow.
- `/dashboard` - Mock institutional quant terminal for execution/risk monitoring. Uses static demo/testnet data only.
- `/request-access` - Client-side mock private beta waitlist/onboarding form. Submits locally in the browser and shows a success state without sending data to a server.

## Navigation Flow

- Landing navbar:
  - `Terminal Demo` links to `/dashboard`.
  - `Request Access` links to `/request-access`.
  - `Launch Terminal` links to `/dashboard`.
- Landing hero:
  - `Open Terminal Demo` links to `/dashboard`.
  - `Request Access` links to `/request-access`.
  - Terminal card includes a visible `Terminal Demo` link to `/dashboard`.
- Landing CTA:
  - `Open Terminal Demo` links to `/dashboard`.
  - `Request Access` links to `/request-access`.
- Dashboard:
  - Header includes `Request Access` linking to `/request-access`.
- Request access:
  - Logo links back to `/`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

- `npm run dev` starts the local Next.js development server.
- `npm run build` creates a production build.
- `npm run start` starts the production server after a build.
- `npm run lint` runs ESLint.

## Folder Structure

```text
app/
  page.tsx                    # Landing route (/)
  layout.tsx                  # Root layout, metadata, fonts
  globals.css                 # Tailwind import and global theme tokens
  dashboard/page.tsx          # Dashboard route (/dashboard)
  request-access/page.tsx     # Waitlist route (/request-access)

components/
  brand-mark.tsx              # Shared QuantBot mark
  navbar.tsx                  # Landing navigation
  hero-section.tsx            # Landing hero and demo terminal preview
  metrics-section.tsx         # Landing capability cards and architecture copy
  cta-section.tsx             # Landing CTA and disclaimer copy
  footer.tsx                  # Landing footer and disclaimer
  dashboard/
    dashboard-shell.tsx       # Mock quant terminal UI
  waitlist/
    access-request-shell.tsx  # Request access page shell
    access-request-form.tsx   # Client-side mock form behavior

public/
  quantbot-logo.png
  quantbot-symbol-light.png
  quantbot-symbol-light-eyes.png
  quantbot-symbol-light-eyes-v2.png
```

## Demo Data Policy

The `/dashboard` route is a mock institutional quant terminal. All positions, exposure metrics, equity curves, execution logs, system health indicators, risk states, and alpha engine states are static demo/testnet data.

The `/request-access` route is a frontend-only mock waitlist. Submitting the form validates inputs locally, shows a loading state, then displays a success state. It does not call an API route, store data, create accounts, or send email.

## Compliance Disclaimer

For research and informational purposes only. Not financial advice. Performance is not guaranteed. No live trading access is provided. No real capital is used in the demo dashboard or request access flow.

## Development Notes

- Keep new UI components reusable and colocated under `components/`.
- Use Tailwind classes only for styling.
- Keep App Router pages thin and delegate UI to components.
- Do not add backend, auth, payments, database, or API routes until intentionally scoped.
- Before committing, run:

```bash
npm run lint
npm run build
```

## Deploying to Vercel

This app is ready for a standard Vercel deployment as a frontend-only Next.js project. No environment variables or secrets are required for the current mock/demo build.

### Option 1: GitHub Import

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Keep the framework preset as **Next.js**.
5. Use the default commands:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Deploy.

Vercel will create preview deployments for branches and production deployments from the configured production branch.

### Option 2: Vercel CLI

Install and deploy with the Vercel CLI only when you are ready to authenticate interactively:

```bash
npm install -g vercel
vercel
```

For production:

```bash
vercel --prod
```

Do not commit `.vercel/`, tokens, or environment-specific secrets. The current project does not need environment variables.
