⚽ Football Lovers — Modern Headless E-Commerce Platform A high-performance, visually stunning e-commerce 
    web application tailored for football enthusiasts. Built with Next.js App Router, Supabase, Tailwind CSS, 
    and custom Glassmorphism design principles.

🌟 Key Features
⚡ Ultra-Fast Performance:Powered by Next.js App Router (React 19) for optimal Server-Side Rendering (SSR) and seamless client hydration.
🎨 Modern Glassmorphism UI: High-contrast dark aesthetic paired with custom backdrop blurs, ambient glow effects, and vibrant neon accents.
🔐 Dynamic Authentication Flow: Flexible Auth handling via Supabase, supporting both interactive Header Modals (createPortal) 
    and deep-linked dedicated pages (/signup).
🛒 Dynamic Cart State: Real-time slide-out cart drawer using React Context with instant quantity sync and live badge counters.
🔎 Instant Product Search: Interactive modal search enabling real-time client-side filtering across kit catalogs, custom lab gear,
    and bundle packages.
🎯 Custom Kit Lab: Interactive section designed for personalized kit creation and custom jersey configurations.
🛠️ Tech Stack & Architecture
    Layer              Technology
    Framewor           kNext.js (App Router, React 19)
    Styling            Tailwind CSS + Custom Backdrop Blurs & Glassmorphism
    Backend & Auth     Supabase (PostgreSQL, Supabase Auth)
    Icons & UI         Lucide React 
    Deployment         Vercel
🚀 Getting Started1. 
1. Clone the repository
   Bash
   git clone https://github.com/jimmydhillon414-lgtm/football-Lover
2. Install dependencies
   Bash
   npm install
   # or
   yarn install
3. Configure Environment Variables
   Create a .env.local file in the root directory and add your Supabase credentials:
   Code snippet
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
5. Run the development server
   Bash
   npm run dev
Open http://localhost:3000 in your browser to view the application.

📁 Project Architecture

├── app/                  # Next.js App Router pages and layouts
│   ├── signup/           # Dedicated signup route page
│   └── page.tsx          # Main storefront homepage
├── components/           # UI and Feature Components
│   ├── ui/               # Reusable Glassmorphism UI components & SearchModal
│   ├── cart/             # Shopping cart drawer & context provider
│   ├── site-header.tsx   # Global header with dynamic Auth Modals
│   └── sign-up.tsx       # Interactive Auth form component
├── lib/                  # External clients & Supabase configuration
└── public/               # High-resolution media assets
