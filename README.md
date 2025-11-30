# IncredibleIndiaGuide — Beach Paradise

A production-ready travel web app for foreign travelers visiting India. Features a multi-modal AI Chat Assistant, secure payments, and a "Beach Paradise" summer theme.

## Features

- **AI Trip Planner**: Chat with an AI assistant (Text, Voice, Image) to plan your trip.
- **Hotel Booking**: Browse and book luxury beach resorts.
- **Guide Hiring**: Find and hire verified local guides.
- **Secure Payments**: Integrated with Stripe (Global) and Razorpay (India).
- **Admin Dashboard**: Track revenue and bookings.
- **Responsive Design**: Mobile-first, beautiful "Beach Paradise" UI.

## Tech Stack

- **Framework**: Next.js 14 (Pages Router)
- **Styling**: Tailwind CSS
- **AI/ML**: OpenAI (GPT-4, Vision, Whisper), Cloudinary (Media)
- **Payments**: Stripe, Razorpay

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Copy `.env.example` to `.env.local` and fill in your API keys.
    ```bash
    cp .env.example .env.local
    ```

3.  **Run Locally**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Add Environment Variables in Vercel project settings.
4.  Deploy!

### Webhooks

- **Stripe**: Set up a webhook endpoint pointing to `https://your-domain.com/api/webhooks/stripe`.
- **Razorpay**: Set up a webhook endpoint pointing to `https://your-domain.com/api/webhooks/razorpay`.

## Project Structure

- `src/pages`: Application routes and API endpoints.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and API wrappers.
- `public/images`: Static assets.

## License

MIT
