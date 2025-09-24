# Mountain Mixology Website

A premium marketing site for Mountain Mixology, a craft cocktail catering company serving the Canadian Rockies. Built with Next.js 14 and the App Router.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

3. Build for production:

   ```bash
   npm run build
   npm run start
   ```

## Features

- Hero section positioning Mountain Mixology as the go-to cocktail experience in the Canadian Rockies.
- Detailed service offerings and package tiers for weddings, corporate events, private parties, destination venues, and full bar service.
- Signature cocktail menu with pricing and enhancement options.
- Gallery, testimonials, and logistics details that reinforce credibility and reduce client risk.
- Contact form capturing event details, guest count, budget, and vision with an optional planning guide lead magnet.

## Project Structure

- `app/` – App Router pages and React components.
- `app/components/` – Reusable section components for the landing page.
- `app/globals.css` – Global styles and design tokens.
- `next.config.mjs` – Next.js configuration, including image remote patterns for Unsplash photography.

## Admin Dashboard

- Booking form submissions are stored on disk at `data/submissions.json` (ignored from Git). The file is created automatically the first time an inquiry is logged.
- Sign in at `/admin/login` using the credentials defined in the environment: set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `ADMIN_SECRET` for cookie signing. Defaults (`admin@example.com` / `admin123`) are provided for local development—override them before deploying.
- The protected `/admin/submissions` dashboard lets administrators filter the inbox, update lead status, record internal notes, and log response messages so the team can track outreach history.
- A global theme system powers light/dark mode. The visitor’s system preference is respected on first load, and a toggle appears in the top navigation (and the admin shell). Preferences persist per device via `localStorage`.

## Notes

- The project references photography hosted on Unsplash to visualize the Mountain Mixology experience. Update the image URLs with your own assets before going live.
