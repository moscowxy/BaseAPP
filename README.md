# BaseAPP

This project bootstraps a Base miniapp with Farcaster authentication support.

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy the environment template and provide the required credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   | --- | --- |
   | `FARCASTER_HUB_URL` | Fully qualified Hub URL used for frame message validation. |
   | `NEYNAR_API_KEY` | Neynar API key with signer validation permissions. |
   | `BASE_APP_URL` | Publicly accessible base URL for this miniapp (e.g. `https://your-app.example`). |

3. Start the development server:

   ```bash
   pnpm run dev
   ```

   Use the Warpcast frame testing tool to validate the flow. If you encounter `401` errors, confirm that the signer has the correct permissions and that the callback URL configured in Warpcast matches `BASE_APP_URL`.

## Endpoints

- `POST /api/farcaster/session` &mdash; Verifies Farcaster signer payloads using `@farcaster/auth-kit`.
- `GET /.well-known/base-miniapp.json` &mdash; Exposes the Base miniapp manifest used during registration.
- `GET /public/farcaster.json` &mdash; Static Farcaster manifest served from the `public` directory.

## Manifest updates

The manifest files (`public/farcaster.json` and `.well-known/base-miniapp.json`) reference `http://localhost:3000` by default. Update these URLs to match your production deployment before submitting to Base or Farcaster directories.
