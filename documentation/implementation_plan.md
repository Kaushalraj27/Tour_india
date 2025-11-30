# Implementation Plan - IncredibleIndiaGuide

## Goal Description
Build a production-ready, deployable travel web app "IncredibleIndiaGuide" with a "Beach Paradise" theme. The app targets foreign travelers and features a multi-modal AI Chat Assistant (Text, Voice, Image, Video), secure payments (Stripe, Razorpay), and a comprehensive booking system for hotels and guides.

## User Review Required
> [!IMPORTANT]
> **Assets**: The user provided paths like `/mnt/data/...` which might not be directly accessible in this Windows environment. I will attempt to use them, but if they fail, I will generate placeholder images using the `generate_image` tool to ensure the UI looks correct.
> **API Keys**: The system relies on many external services (OpenAI, Cloudinary, Stripe, etc.). The code will use Mock implementations when keys are missing to ensure the UI and flow can be tested without active subscriptions.

## Proposed Changes

### Project Structure
- **Framework**: Next.js (Pages Router as requested by structure `src/pages`).
- **Styling**: Tailwind CSS with custom configuration for the "Beach Paradise" theme.
- **State Management**: React Context or local state for Chat/Booking flows.

### Component Architecture
#### [NEW] `src/components`
- `Layout.jsx`: Main wrapper with Sidebar.
- `Sidebar.jsx`: Navigation and branding.
- `Hero.jsx`: Full-bleed banner with video/image.
- `ChatWidget/`:
    - `ChatWidget.jsx`: Main chat container (expandable).
    - `VoiceRecorder.jsx`: Audio recording interface.
    - `MessageBubble.jsx`: Renders text, images, video, receipts.
- `HotelCard.jsx`, `GuideCard.jsx`, `BookingCard.jsx`: Display components.

### Pages
#### [NEW] `src/pages`
- `index.jsx`: Landing page with Hero and CTA tiles.
- `hotels.jsx`: Hotel search and listing.
- `guides.jsx`: Guide search and listing.
- `bookings.jsx`: User bookings management.
- `admin.jsx`: Internal dashboard.
- `planner.jsx`: Dedicated AI Trip Planner page (optional, or integrated into Chat).

### API Routes (Serverless)
#### [NEW] `src/pages/api`
- `chatbot.js`: Handles LLM requests (Text/Vision).
- `stt.js`: Speech-to-Text proxy.
- `tts.js`: Text-to-Speech proxy.
- `upload.js`: Media upload handler (Cloudinary/S3).
- `stripe.js`, `razorpay.js`: Payment intent creation.
- `webhooks/`: Payment confirmation handlers.

### Libraries & Utilities
#### [NEW] `src/lib`
- `models.js`: LLM client wrappers.
- `cloudinary.js`: Upload helpers.
- `payments.js`: Payment SDK wrappers.
- `utils.js`: Formatting and helpers.

## Verification Plan
### Automated Tests
- Build verification: `npm run build`
- Lint check: `npm run lint`

### Manual Verification
- **UI/UX**: Verify "Beach Paradise" theme, responsiveness, and animations.
- **Chat**: Test text, mock voice input, and mock image upload flows.
- **Booking**: Test the "Book Now" flow up to the payment mock.
- **Admin**: Verify admin dashboard loads and shows mock data.
