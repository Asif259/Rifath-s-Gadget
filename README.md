# Rifath's Gadget

> Bilingual (Bangla/English) laptop sourcing showcase and verified delivery proof platform with a Supabase-backed administrative management dashboard.

---

## 1. Project Overview & Live Features

**Rifath's Gadget** is a modern, transparent laptop sourcing web platform designed for buyers in Bangladesh. It replaces blind risk with verified proof: clients request a machine suited to their budget and workload, the team sources and tests the laptop against hardware quality gates (motherboard, RAM, SSD health, battery cycles), and delivers with full documentation and photographic proof.

The web platform serves two primary functions:
1. **Public Storefront & Proof Hub (`/`)**: A fast, bilingual landing page featuring curated laptop delivery showcases, verified buyer reviews, tech specs, savings metrics, and direct WhatsApp/Facebook inquiry triggers.
2. **Administrative Control Center (`/admin/*`)**: A secure, lazy-loaded dashboard allowing operators to manage delivery records, toggle hero/featured states, configure bilingual specifications, and upload optimized hardware photography directly into Supabase Storage.

### Core Features

- **Bilingual Storefront (`bn` / `en`)**: Instant language toggling across all interface copy, hardware specifications, buyer stories, and customer reviews, with language state preserved in `localStorage`.
- **Kinetic Smooth Scroll & Animations**: Lenis smooth scrolling paired with GSAP and ScrollTrigger for hardware carousels, counters, and responsive reveal effects.
- **Dynamic Hero Deal Carousel & Social Proof Strip**: Highlights high-value deliveries, verified buyer savings (up to ৳36,000+), and buyer testimonials.
- **Full-Screen Hardware Lightbox**: Interactive gallery viewer with thumbnail strip and keyboard navigation for inspectable proof photos.
- **Zero-Latency Static Fallback Hydration**: The custom `useDeliveries` hook immediately renders pre-bundled static delivery showcases (legacy cases 1–8) on initial paint, followed by non-blocking live synchronization against Supabase PostgreSQL.
- **Lazy-Loaded Admin Dashboard**: Complete CRUD interface for deliveries behind authentication boundaries, ensuring administrative code is never downloaded by regular public visitors.
- **Client-Side Image Pipeline**: Automatic in-browser image optimization via HTML5 Canvas (downscaling to 1600px full / 480px thumb, quality encoding, and WebP conversion with JPEG fallback) before uploading to Supabase Storage.
- **Hardened Security Posture**: Row Level Security (RLS) policies on both database tables and storage objects, role validation against `public.admin_users`, and strict Content Security Policy (CSP) headers configured via `vercel.json`.

---

## 2. Tech Stack

| Layer | Technology | Version | Purpose / Key Features |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.0` | UI rendering with hooks, Context API, and Suspense |
| **DOM Renderer** | React DOM | `^19.0.0` | React web application rendering |
| **Language** | TypeScript | `^5.6.0` | Type safety across database rows, UI models, and components |
| **Build Tool & Bundler** | Vite | `^7.0.0` | Fast HMR dev server and optimized production rollup builds |
| **Routing** | React Router DOM | `^7.18.6` | Client-side routing with lazy-loaded admin routes |
| **Motion & Scroll** | GSAP | `^3.15.1` | ScrollTrigger animations and timeline control |
| **Smooth Scrolling** | Lenis | `^1.3.27` | Lightweight smooth scrolling engine |
| **Iconography** | Phosphor Icons React | `^2.1.10` | High-fidelity UI icons (`@phosphor-icons/core` `^2.1.1`) |
| **Backend & Database** | Supabase JS Client | `^2.119.2` | PostgreSQL query engine, Auth client, and Storage API |
| **Database Engine** | PostgreSQL (Supabase) | *Managed* | Relational schema, RLS policies, automated triggers, JSONB |
| **Storage** | Supabase Storage | *Managed* | `delivery-photos` bucket for processed hardware photos |
| **Hosting & Edge** | Vercel | *Platform* | Global CDN, SPA rewrites, and HTTP security headers |

---

## 3. Architecture & Project Structure

### Directory Tree

```
Rifath's-Gadget/
├── public/
│   ├── deliveries/              # Legacy static delivery assets (IDs 1–8)
│   │   └── {1..8}/              # Full photos (e.g., 1.jpg) & thumbnails (e.g., t1.jpg)
│   ├── favicon.png              # Site favicon
│   ├── humans.txt               # Team and author attribution
│   └── logo.webp                # Brand mark
├── src/
│   ├── components/
│   │   └── admin/
│   │       ├── AdminLayout.tsx  # Admin navigation bar, session indicators, and outlet shell
│   │       └── RequireAdmin.tsx # Auth boundary guarding /admin routes against non-admin users
│   ├── context/
│   │   └── AuthContext.tsx      # Supabase auth session listener & admin verification
│   ├── hooks/
│   │   └── useDeliveries.ts     # Hybrid hydration hook (static fallback + Supabase sync)
│   ├── lib/
│   │   ├── imageProcessor.ts    # In-browser Canvas image compression & thumbnail generator
│   │   ├── storage.ts           # Supabase Storage upload, URL resolution & batch deletion
│   │   └── supabase.ts          # Configured Supabase JavaScript client instance
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminLogin.tsx   # Admin credentials login screen
│   │   │   ├── DeliveriesList.tsx # Filterable delivery ledger with live publish/delete controls
│   │   │   └── DeliveryForm.tsx # Delivery creator and editor with photo drag-and-drop
│   │   └── LandingPage.tsx      # Public bilingual landing page with GSAP + Lenis integration
│   ├── styles/
│   │   └── admin.css            # Scoped design tokens and UI styles for admin dashboard
│   ├── types/
│   │   └── delivery.ts          # Database schema types, UI models, and row transformation mappers
│   ├── App.tsx                  # Root route configurations and dynamic code-splitting boundaries
│   ├── content.ts               # Static copy, translations, contact links, and fallback data
│   ├── main.tsx                 # React application mounting entry point
│   └── styles.css               # Global theme tokens, typography, and landing page styles
├── supabase/
│   ├── schema.sql               # PostgreSQL tables, triggers, indexes, RLS, and storage policies
│   └── seed.sql                 # Baseline seed data for initial 8 legacy laptop deliveries
├── .env.example                 # Template for required environment variables
├── package.json                 # Project scripts and pinned dependencies
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # Production headers, CSP, and SPA rewrite rules
└── vite.config.ts               # Vite configuration with React plugin and env prefixes
```

### Hybrid Image Strategy

Rifath's Gadget employs a dual image serving model:

1. **Legacy Deliveries (IDs 1–8)**: Pre-existing deliveries are hosted locally in `public/deliveries/{id}/` as static files (`1.jpg`, `t1.jpg`, etc.). They load instantly with zero dependency on external storage quotas and require no network roundtrips to Supabase Storage.
2. **Dynamic Deliveries (IDs 9+)**: When added via `/admin/deliveries/new`, images are processed directly in the admin's browser via `imageProcessor.ts` (downsampled to 1600px width for viewing, 480px width for thumbnails, encoded to WebP/JPEG) and uploaded to the `delivery-photos` Supabase Storage bucket. When a delivery is deleted, all referenced Supabase Storage objects are automatically purged via `deleteStoragePaths` in `storage.ts`.

---

## 4. Local Development Setup

### Prerequisites

- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **Package Manager**: `npm` (`v9+` or `v10+`)
- **Supabase Account**: A Supabase project for Auth, Database, and Storage (optional for static frontend development, required for Admin features)

### Step-by-Step Installation

1. **Clone the repository and enter the directory**:
   ```bash
   git clone https://github.com/Asif259/Rifath-s-Gadget
   cd rifaths-gadget
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file by copying the example template:
   ```bash
   cp .env.example .env.local
   ```
   Open `.env.local` and add your Supabase credentials:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   > **Note**: Even if `.env.local` is missing or keys are blank, the public storefront will still render normally in offline/static mode using `src/content.ts`.

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5273`.

### Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite --port 5273` | Launches Vite local development server on port 5273 |
| `npm run build` | `tsc --noEmit && vite build` | Type-checks codebase and generates production bundle into `dist/` |
| `npm run preview` | `vite preview --port 5273` | Serves the production build locally for smoke testing |

---

## 5. Supabase Setup (Database, Auth & Storage)

To activate live database synchronisation and the administrative portal, follow these setup steps in your Supabase project:

### Step 1: Run Database Migrations

Open the **SQL Editor** in your Supabase Dashboard and run the files in the following exact order:

1. **`supabase/schema.sql`**:
   - Enables `uuid-ossp` extension.
   - Creates `public.admin_users` and `public.deliveries` tables.
   - Configures the `set_deliveries_updated_at` timestamp trigger.
   - Establishes performance indexes (`idx_deliveries_published_sort`, `idx_deliveries_hero`, `idx_deliveries_featured`).
   - Enables Row Level Security (RLS) on `admin_users` and `deliveries`.
   - Provisions the `delivery-photos` storage bucket with associated read/write/delete storage policies.

2. **`supabase/seed.sql`**:
   - Seeds legacy deliveries (records 1 through 8) with bilingual specifications and static photo URLs.
   - Automatically synchronizes the primary key identity sequence to prevent ID collisions on subsequent inserts:
     ```sql
     SELECT setval(pg_get_serial_sequence('public.deliveries', 'id'), COALESCE((SELECT MAX(id) FROM public.deliveries), 1));
     ```

### Step 2: Storage Bucket Verification

`supabase/schema.sql` automatically registers the public `delivery-photos` bucket:
```sql
insert into storage.buckets (id, name, public)
values ('delivery-photos', 'delivery-photos', true)
on conflict (id) do update set public = true;
```
Navigate to **Storage** > **Buckets** in your Supabase dashboard and confirm that `delivery-photos` exists and is set to **Public**.

### Step 3: Configure Authentication & Admin Access

1. **Disable Public Signups**:
   - In Supabase Dashboard, go to **Authentication** > **Providers** > **Email**.
   - Ensure **Enable Signups** is turned **OFF** to prevent unauthorized registration.
2. **Create the Admin Account**:
   - Go to **Authentication** > **Users**.
   - Click **Add User** > **Create user**.
   - Enter your admin email and a secure password.
   - Copy the newly generated **User UID** (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`).
3. **Register the Admin in `public.admin_users`**:
   - Return to the **SQL Editor** and run:
     ```sql
     INSERT INTO public.admin_users (id, email)
     VALUES ('YOUR-COPIED-USER-UUID', 'your-admin-email@example.com')
     ON CONFLICT (id) DO NOTHING;
     ```

---

## 6. Admin Dashboard Guide

### Route Map

All administrative routes are grouped under `/admin` and lazy-loaded via React Suspense:

| Route | Access | Component | Purpose |
| :--- | :--- | :--- | :--- |
| `/` | Public | `LandingPage.tsx` | Main showcase, hero carousel, review strip, specs, and WhatsApp links |
| `/admin/login` | Public / Guest | `AdminLogin.tsx` | Secure admin authentication entry point |
| `/admin/deliveries` | Protected | `DeliveriesList.tsx` | Delivery inventory table with status filter tabs, search, and delete actions |
| `/admin/deliveries/new` | Protected | `DeliveryForm.tsx` | Creation screen for new laptop deliveries with image upload & bilingual specs |
| `/admin/deliveries/:id` | Protected | `DeliveryForm.tsx` | Edit screen for existing delivery records and photo curation |

### Photo Uploads & Storage Lifecycle

- **Format & Size Limits**: Supports `JPEG`, `PNG`, and `WebP` files up to **15 MB** per image.
- **Client-Side Processing**: Before transmission to Supabase, images are downscaled using HTML5 Canvas:
  - **Full photo**: Max width `1600px` at `0.82` quality.
  - **Thumbnail**: Max width `480px` at `0.78` quality.
  - Converted to `.webp` (or `.jpg` on browsers lacking canvas WebP encoding).
- **Storage Cleanup on Delete**: When a delivery is deleted from `DeliveriesList.tsx` or when photos are removed in `DeliveryForm.tsx`, their Supabase Storage files (`full` and `thumb`) are automatically deleted. Legacy static paths (`/deliveries/*`) are safely skipped.
- **Abandoned Upload Protection**: Uploads in unsubmitted forms are tracked and purged if the operator navigates away before saving.

---

## 7. Security Posture

Rifath's Gadget implements defense-in-depth security across database, storage, and HTTP presentation layers:

### 1. Database Row Level Security (Postgres RLS)
- **`public.deliveries`**:
  - `anon` and `authenticated` can `SELECT` rows where `is_published = true`.
  - Only authenticated users present in `public.admin_users` can view unpublished drafts, `INSERT`, `UPDATE`, or `DELETE` records.
- **`public.admin_users`**:
  - Authenticated users can only read their own record (`id = (select auth.uid())`).
  - Public registration is blocked; direct database privileges are locked to the application service role and explicit admin checks.

### 2. Supabase Storage Policies
- Objects in `delivery-photos` are publicly readable via CDN.
- `INSERT`, `UPDATE`, and `DELETE` operations on `storage.objects` strictly require `exists (select 1 from public.admin_users where admin_users.id = (select auth.uid()))`.

### 3. Client Isolation & Bundle Splitting
- Admin views (`AdminLogin`, `AdminLayout`, `DeliveriesList`, `DeliveryForm`) are lazy-loaded via dynamic imports (`React.lazy`). Regular landing page visitors never download administrative JavaScript bundles or admin-specific logic.
- Route-level security is enforced on the frontend by `RequireAdmin.tsx`, verifying both Supabase session validity and active membership in `public.admin_users`.

### 4. HTTP Security Headers (`vercel.json`)
The production build serves strict HTTP security headers:
- **`Content-Security-Policy`**: Restricts scripts to `'self'`, styles to `'self' 'unsafe-inline' https://fonts.googleapis.com`, fonts to `'self' https://fonts.gstatic.com`, images to `'self' data: blob: https://*.supabase.co`, and network connections to `'self' https://*.supabase.co`. Frame ancestors are strictly disabled (`'none'`).
- **`X-Frame-Options`**: Set to `DENY` to prevent clickjacking attacks.
- **`X-Content-Type-Options`**: Set to `nosniff` to protect against MIME-confusion vulnerabilities.
- **`Strict-Transport-Security`**: `max-age=31536000; includeSubDomains` enforces HTTPS.
- **`Referrer-Policy`**: `strict-origin-when-cross-origin`.
- **`Permissions-Policy`**: Denies camera, microphone, and geolocation access (`camera=(), microphone=(), geolocation=()`).

---

## 8. Deployment (Vercel)

The project is pre-configured for one-click deployment on [Vercel](https://vercel.com).

### Deployment Steps

1. Push your code to your GitHub/GitLab repository.
2. In the Vercel Dashboard, click **Add New Project** and import the repository.
3. Configure the **Build & Development Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Configure **Environment Variables** in the Vercel project settings:
   - `VITE_SUPABASE_URL`: `https://your-project-id.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `your-supabase-anon-key`
5. Click **Deploy**.

### Supabase URL Configuration

After deploying to Vercel (or attaching a custom domain):
1. In Supabase Dashboard, go to **Authentication** > **URL Configuration**.
2. Set **Site URL** to your production domain (e.g. `https://rifathsgadget.com` or `https://your-app.vercel.app`).
3. Under **Redirect URLs**, add your production domain and callback paths:
   - `https://your-domain.com/**`
   - `http://localhost:5273/**` (for local development)

---

## License

Private and proprietary. All rights reserved by **Rifath's Gadget**.
