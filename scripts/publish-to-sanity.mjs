import { readFileSync } from "node:fs";

const config = JSON.parse(readFileSync("/Users/ashrafulasif/.config/sanity/config.json", "utf8"));
const token = config.authToken;
const projectId = "pqf64k7z";
const dataset = "production";

const document = {
  _id: "project-9",
  _type: "project",
  name: "Rifath's Gadget: Laptop Sourcing & Verification Platform",
  legacyId: 9,
  slug: {
    _type: "slug",
    current: "rifaths-gadget-laptop-sourcing-platform",
  },
  category: "Full Stack Development",
  displayOrder: 8,
  isPublished: true,
  date: "2026-11-20",
  role: "Full Stack Developer",
  client: "Rifath's Gadget",
  githubUrl: ["https://github.com/Asif259/Rifath-s-Gadget.git"],
  description:
    "A bilingual laptop sourcing and verified delivery proof platform connecting Bangladeshi buyers with pre-vetted machines, backed by an authenticated Supabase management dashboard.",
  longDescription:
    "Rifath's Gadget is an on-demand laptop sourcing service operating in Bangladesh that eliminates the risk of purchasing used hardware. Rather than holding retail stock, the business vets individual machines against rigid quality gates—evaluating motherboard condition, RAM integrity, SSD health percentages, and battery charging cycles. The web platform delivers transparency by publishing full hardware diagnostic specs, verified buyer testimonials, documented savings metrics (৳20,000–৳36,000+), and uncompressed inspection photography.\n\nArchitecturally, the application pairs an animated storefront built with React 19, TypeScript, GSAP, and Lenis smooth scrolling with an administrative portal powered by Supabase. To guarantee an instantaneous First Contentful Paint without blank states, the application employs a hybrid hydration strategy: pre-bundled static cases render immediately, followed by background synchronization against Supabase PostgreSQL. Operators manage deliveries through a protected dashboard featuring client-side Canvas image optimization (WebP/JPEG conversion and automatic thumbnailing), bilingual content fields, and automated storage garbage collection governed by strict PostgreSQL Row Level Security (RLS).",
  technologies: [
    "React 19",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
    "Vite 7",
    "GSAP",
    "Lenis",
    "React Router 7",
    "HTML5 Canvas API",
    "Phosphor Icons",
    "Vercel",
  ],
  coverImage: {
    _type: "image",
    alt: "Rifath's Gadget desktop homepage showing hero laptop deal carousel, verified savings badge, and bilingual interface",
    asset: {
      _type: "reference",
      _ref: "image-89c13db565f3c6ab57d6dba38b96c57f89aaa21c-2880x1800-png",
    },
  },
  images: [
    {
      _key: "gallery-img-1",
      _type: "image",
      alt: "Verified laptop sourcing showcase grid featuring delivery details, technical specifications, and buyer savings",
      asset: {
        _type: "reference",
        _ref: "image-a9cdd1f5d7ebc89b531f410c44f01a99af60f614-2880x1800-png",
      },
    },
    {
      _key: "gallery-img-2",
      _type: "image",
      alt: "Interactive hardware inspection lightbox displaying detailed laptop photos and verified component diagnostic specs",
      asset: {
        _type: "reference",
        _ref: "image-0d3fa5ec863addef0f90da9a997782027e6c3a81-2880x1800-png",
      },
    },
    {
      _key: "gallery-img-3",
      _type: "image",
      alt: "Rifath's Gadget admin authentication portal with secure credentials form",
      asset: {
        _type: "reference",
        _ref: "image-28d7ac432a067c2e36f283ef3e6dd18439144b65-2880x1800-png",
      },
    },
    {
      _key: "gallery-img-4",
      _type: "image",
      alt: "Mobile viewport of Rifath's Gadget showcasing responsive layout, touch navigation, and deal highlight card",
      asset: {
        _type: "reference",
        _ref: "image-f7309a89a761679cfa4b1a5579e1b90f5dcf7ec7-780x1688-png",
      },
    },
  ],
  features: [
    {
      _key: "feature-section-1",
      _type: "featureSection",
      title: "Storefront & Verified Proof Hub",
      items: [
        {
          _key: "feat-1-1",
          _type: "featureItem",
          name: "Bilingual Interface (bn / en)",
          description:
            "Full contextual translation across UI copy, hardware specs, and customer reviews with state persistence in localStorage.",
        },
        {
          _key: "feat-1-2",
          _type: "featureItem",
          name: "Hero Deal Carousel & Social Proof",
          description:
            "Interactive hardware spotlight showing customer requests, benchmark savings, and buyer reviews with animated timeline counters.",
        },
        {
          _key: "feat-1-3",
          _type: "featureItem",
          name: "Hardware Lightbox Viewer",
          description:
            "Full-screen gallery modal featuring high-resolution component inspection photos, keyboard navigation, and spec sidebars.",
        },
        {
          _key: "feat-1-4",
          _type: "featureItem",
          name: "Zero-Latency Static Fallback",
          description:
            "Instant initial paint powered by pre-bundled static cases with non-blocking live synchronization against Supabase PostgreSQL.",
        },
      ],
    },
    {
      _key: "feature-section-2",
      _type: "featureSection",
      title: "Admin Dashboard & Media Pipeline",
      items: [
        {
          _key: "feat-2-1",
          _type: "featureItem",
          name: "Protected Administration Suite",
          description:
            "Lazy-loaded management portal (/admin/*) isolated from public visitor bundles with email-authenticated access gates.",
        },
        {
          _key: "feat-2-2",
          _type: "featureItem",
          name: "Client-Side Image Processing",
          description:
            "In-browser Canvas engine that validates, compresses, and generates dual assets (1600px full / 480px thumbnail in WebP/JPEG) before upload.",
        },
        {
          _key: "feat-2-3",
          _type: "featureItem",
          name: "Automated Storage Cleanup",
          description:
            "Automatic deletion of associated Supabase Storage objects on record removal, with rollback guards for abandoned drafts.",
        },
        {
          _key: "feat-2-4",
          _type: "featureItem",
          name: "Bilingual Specification Builder",
          description:
            "Dynamic key-value spec editor allowing operators to input hardware details in both Bengali and English.",
        },
      ],
    },
    {
      _key: "feature-section-3",
      _type: "featureSection",
      title: "Security & Systems Architecture",
      items: [
        {
          _key: "feat-3-1",
          _type: "featureItem",
          name: "Granular Database RLS",
          description:
            "Postgres policies enforcing public read-only access for published deliveries and authenticated writes restricted to registered administrators.",
        },
        {
          _key: "feat-3-2",
          _type: "featureItem",
          name: "Storage Object Protection",
          description:
            "Bucket-level access policies guaranteeing that only verified administrators can write, modify, or delete photo assets.",
        },
        {
          _key: "feat-3-3",
          _type: "featureItem",
          name: "Strict HTTP Security Posture",
          description:
            "Vercel edge configuration deploying Content Security Policy (CSP), X-Frame-Options (DENY), and HSTS protection.",
        },
      ],
    },
  ],
  challenges: [
    {
      _key: "challenge-1",
      _type: "challengeItem",
      title: "Zero-Latency First Paint vs. Dynamic Cloud Data",
      description:
        "Relying solely on remote database queries introduced network latency and risk of blank screens on mobile connections in Bangladesh.",
    },
    {
      _key: "challenge-2",
      _type: "challengeItem",
      title: "Bandwidth Optimization for High-Resolution Proof Photos",
      description:
        "High-resolution smartphone camera uploads (10–15MB each) would rapidly consume storage quotas and lead to slow mobile load times if uploaded uncompressed.",
    },
    {
      _key: "challenge-3",
      _type: "challengeItem",
      title: "Multi-Tier Authorization Without Exposing Admin Logic",
      description:
        "Ensuring administrative routes and upload utilities could never be downloaded, inspected, or triggered by public storefront visitors.",
    },
    {
      _key: "challenge-4",
      _type: "challengeItem",
      title: "Bilingual Data Synchronization & Font Harmonization",
      description:
        "Maintaining consistent typographic alignment, numeral formatting, and layout integrity across two writing systems with differing line-height characteristics.",
    },
  ],
  solution:
    "To overcome network unpredictability, I engineered a hybrid hydration architecture via a custom React hook (useDeliveries). The application instantly paints pre-bundled baseline delivery records from a local static bundle, eliminating loading skeletons, before asynchronously querying Supabase PostgreSQL to hydrate the feed with published records.\n\nTo resolve storage and bandwidth overhead, I built an in-browser image optimization pipeline using HTML5 Canvas. Uploaded photos are downsampled to a maximum width of 1600px (full) and 480px (thumbnail), dynamically encoded to WebP (with automatic JPEG fallback), and transmitted directly to Supabase Storage with unique UUID keys, slashing payload weights by over 80%.\n\nSecurity and bundle performance were achieved by splitting admin views behind React Suspense and dynamic imports, ensuring the administrative chunk is never delivered to public users. Backend security is fortified through PostgreSQL Row Level Security (RLS) policies on both public.deliveries and storage.objects, cross-referencing auth.uid() against an internal public.admin_users table. Finally, typography and language switching were unified via an ergonomic translation layer handling bilingual string arrays, dynamic currency formatting, and numeric transliteration without third-party i18n overhead.",
};

console.log("Submitting mutation to Sanity API...");
const res = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}?returnDocuments=true`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({
    mutations: [
      {
        createOrReplace: document,
      },
    ],
  }),
});

const result = await res.json();
if (!res.ok) {
  console.error("Mutation failed:", result);
  process.exit(1);
}

console.log("Successfully created and published project in Sanity!", JSON.stringify(result, null, 2));
