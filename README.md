# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/677c6d0a-63d2-47b4-8251-3bfb75e5a789

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/677c6d0a-63d2-47b4-8251-3bfb75e5a789) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Backend API & Admin Dashboard

- A lightweight Express + SQLite backend lives in `server/`.
- Copy `server/.env.example` to `server/.env` and adjust values (change the default admin password and JWT secret).
- Start the backend with `npm run server` (runs on port 4000 by default).
- The frontend uses `VITE_API_BASE_URL` (default `http://localhost:4000/api`) to talk to the API.
- Default seeded admin credentials: `admin@mountainmixology.com` / `changeme123` (update these in `.env`).
- Admin dashboard is available at `/admin` for managing booking submissions.

### Available endpoints

- `POST /api/bookings` – store a new booking enquiry.
- `POST /api/admin/login` – obtain an admin JWT.
- `GET /api/admin/me` – validate the current admin session.
- `GET /api/admin/bookings` – list bookings (supports `status` & `search` query params).
- `PATCH /api/admin/bookings/:id` – update status, notes, or response for a booking.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/677c6d0a-63d2-47b4-8251-3bfb75e5a789) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
