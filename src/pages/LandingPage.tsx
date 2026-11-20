import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CaretLeft,
  CaretRight,
  CheckCircle,
  FacebookLogo,
  HandCoins,
  Images,
  Plus,
  SealCheck,
  ShieldCheck,
  Tag,
  Wallet,
  WhatsappLogo,
} from "@phosphor-icons/react";
import {
  BUDGET,
  FACEBOOK,
  WHATSAPP_DISPLAY,
  copy,
  money,
  num,
  reviewer,
  waLink,
  type Copy,
  type Lang,
} from "../content";
import { useDeliveries } from "../hooks/useDeliveries";
import type { Delivery } from "../types/delivery";

gsap.registerPlugin(ScrollTrigger);

const firstName = (s: string) => s.replace(/^(মো\.|Md\.)\s*/, "").split(" ")[0];

type OpenViewer = { id: number; photoIndex: number } | null;

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "en" ? "en" : "bn";
    } catch {
      return "bn";
    }
  });
  const t = copy[lang];
  const [open, setOpen] = useState<OpenViewer>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Dynamic Supabase data with instant static fallback
  const {
    deliveries,
    heroCases,
    featuredReviews,
    savingRange,
    reviewCount,
    totalPhotos,
    isLive,
  } = useDeliveries();

  // Synchronize document language & storage
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* storage blocked: switch still works for this visit */
    }
  }, [lang]);

  // Initialize Lenis smooth scroll and connect to GSAP ticker
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Stop/resume Lenis when photo viewer modal is open
  useEffect(() => {
    if (open) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [open]);

  // Global GSAP ScrollTrigger reveals and staggered card entrances
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);

    const ctx = gsap.context(() => {
      // Single elements entrance
      const reveals = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // Staggered card groups
      const staggerGroups = gsap.utils.toArray<HTMLElement>(".gsap-stagger-group");
      staggerGroups.forEach((group) => {
        gsap.fromTo(
          group.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    });

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [lang]);

  // Sync GSAP ScrollTrigger whenever Supabase live data hydrates or changes DOM dimensions
  useEffect(() => {
    let raf1: number;
    let raf2: number;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isLive, deliveries.length]);

  const show = (id: number) => {
    const target = deliveries.find((d) => d.id === id);
    if (!target) return;
    const coverIdx = target.photos?.findIndex((p) => p.is_cover) ?? -1;
    setOpen({ id, photoIndex: coverIdx >= 0 ? coverIdx : 0 });
  };

  return (
    <div className={`site lang-${lang}`}>
      <a className="skip button-sm" href="#main">
        {lang === "bn" ? "মূল অংশে যান" : "Skip to content"}
      </a>
      <div className="page">
        <Nav t={t} lang={lang} setLang={setLang} />
        <main id="main">
          <Hero
            t={t}
            lang={lang}
            show={show}
            heroCases={heroCases}
            savingRange={savingRange}
            reviewCount={reviewCount}
          />
          <SocialProof
            t={t}
            lang={lang}
            show={show}
            featuredReviews={featuredReviews}
          />
          <Tagline text={t.tagline} />
          <Benefits t={t} />
          <How t={t} lang={lang} />
          <Sold
            t={t}
            lang={lang}
            show={show}
            deliveries={deliveries}
            savingRange={savingRange}
            totalPhotos={totalPhotos}
          />
          <Finder t={t} lang={lang} />
          <Faq t={t} />
        </main>
        <Close t={t} lang={lang} />
      </div>
      {open && (
        <Viewer
          t={t}
          lang={lang}
          open={open}
          setOpen={setOpen}
          deliveries={deliveries}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ nav */

function Nav({ t, lang, setLang }: { t: Copy; lang: Lang; setLang: (l: Lang) => void }) {
  const [current, setCurrent] = useState("");
  useEffect(() => {
    const ids = ["top", "how", "sold", "faq"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id === "top" ? "" : e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const links: [string, string][] = [
    ["how", t.nav.how],
    ["sold", t.nav.sold],
    ["faq", t.nav.faq],
  ];

  return (
    <header className="nav-bar">
      <nav className="nav" aria-label={lang === "bn" ? "মেনু" : "Menu"}>
        <a className="brand" href="#main" aria-label="Rifath's Gadget">
          <img src="/favicon.png" width="28" height="28" alt="" />
          <span className="body-1">Rifath’s Gadget</span>
        </a>
        <div className="nav-links caption-1">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </div>
        <div className="nav-end">
          <div className="lang caption-1" role="group" aria-label="Language">
            {(["bn", "en"] as const).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l === "bn" ? "বাংলা" : "EN"}
              </button>
            ))}
          </div>
          <a className="btn btn-primary button-sm" href={waLink()} target="_blank" rel="noreferrer" aria-label={t.nav.cta}>
            <WhatsappLogo />
            <span>{t.nav.cta}</span>
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

const CASE_MS = 7000;

function Hero({
  t,
  lang,
  show,
  heroCases,
  savingRange,
  reviewCount,
}: {
  t: Copy;
  lang: Lang;
  show: (id: number) => void;
  heroCases: Delivery[];
  savingRange: { min: number; max: number };
  reviewCount: number;
}) {
  const [k, setK] = useState(0);
  const [paused, setPaused] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const timerRef = useRef<HTMLSpanElement>(null);
  const dealBodyRef = useRef<HTMLDivElement>(null);

  // Reset/clamp active tab if heroCases change length after live hydration
  useEffect(() => {
    if (k >= heroCases.length && heroCases.length > 0) {
      setK(0);
    }
  }, [heroCases.length, k]);

  const d = heroCases[k] || heroCases[0];

  // Hero entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-anim",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [lang]);

  // Deal tab timer animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || paused || !timerRef.current || heroCases.length <= 1) return;

    const tween = gsap.fromTo(
      timerRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: CASE_MS / 1000,
        ease: "none",
        transformOrigin: "left center",
        onComplete: () => {
          setK((x) => (x + 1) % heroCases.length);
        },
      }
    );

    return () => {
      tween.kill();
    };
  }, [k, paused, heroCases.length]);

  // Case panel crossfade on switch
  useEffect(() => {
    if (!dealBodyRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      dealBodyRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [k]);

  if (!d) return null;

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="wrap">
        <div className="hero-head">
          <h1 className="h2 heading-1 hero-anim" key={lang}>
            {t.hero.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h1>
          <p className="lede title-2 muted hero-anim">
            {t.hero.body}
          </p>
          <div className="hero-cta hero-anim">
            <a className="btn btn-primary big button-lg" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsappLogo />
              {t.hero.cta}
            </a>
            <p className="proof caption-1">
              <SealCheck weight="fill" />
              {t.hero.proof(money(savingRange.min, lang), money(savingRange.max, lang), num(reviewCount, lang))}
            </p>
          </div>
        </div>

        <div
          className="deal hero-anim"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="deal-tabs" role="tablist" aria-label={t.hero.found}>
            {heroCases.map((c, i) => {
              const on = i === k;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  id={`case-${c.id}`}
                  aria-selected={on}
                  aria-controls="case-panel"
                  className="deal-tab"
                  onClick={() => setK(i)}
                >
                  {on && <span className="tab-bg" />}
                  {on && !paused && <span ref={timerRef} className="timer" />}
                  <span className="body-4 tab-name">
                    <span className="full">{c.buyer[lang]}</span>
                    <span className="short">{firstName(c.buyer[lang])}</span>
                  </span>
                  <span className="caption-4 muted tab-model">{c.model}</span>
                </button>
              );
            })}
          </div>

          <div
            key={d.id}
            ref={dealBodyRef}
            id="case-panel"
            role="tabpanel"
            aria-labelledby={`case-${d.id}`}
            className="deal-body"
          >
            <div className="deal-ask">
              <p className="heading-4">
                <span className="muted">{t.hero.asked} </span>
                {d.asked?.[lang]}
              </p>
              {d.review && (
                <figure className="deal-review">
                  <blockquote className="body-3">“{d.review.text[lang]}”</blockquote>
                  <figcaption className="deal-buyer">
                    <span className="avatar body-4" aria-hidden="true">
                      {d.buyer[lang].slice(0, 1)}
                    </span>
                    <div>
                      <p className="body-4">{reviewer(d, lang)}</p>
                      <p className="caption-2 muted">
                        {t.hero.buyer} · {d.model}
                        {lang === "en" && d.review.translated ? ` · ${t.sold.translated}` : ""}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              )}
            </div>
            <div className="deal-arrow" aria-hidden="true">
              <span>
                <ArrowRight />
              </span>
            </div>
            <div className="deal-found">
              <p className="heading-5">
                <span className="muted">{t.hero.found} </span>
                <span className="nowrap">{d.model}</span>
              </p>
              <ul className="spec-list body-6">
                {d.specs.slice(0, 6).map((s) => (
                  <li key={s.en}>
                    <CheckCircle />
                    <span>{s[lang]}</span>
                  </li>
                ))}
              </ul>
              <div className="deal-saving">
                <p className="saving">
                  <b className="heading-3">{money(d.saving, lang)}</b>
                  <span className="body-2 muted">{t.hero.below}</span>
                </p>
                <button type="button" className="link button-sm" onClick={() => show(d.id)}>
                  {t.sold.details}
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ social proof strip */

function SocialProof({
  t,
  lang,
  show,
  featuredReviews,
}: {
  t: Copy;
  lang: Lang;
  show: (id: number) => void;
  featuredReviews: Delivery[];
}) {
  return (
    <section className="section social-proof" id="reviews">
      <div className="wrap">
        <div className="section-head gsap-reveal">
          <span className="badge-saving caption-3">
            <SealCheck weight="fill" />
            {t.socialProof.badge}
          </span>
          <h2 className="heading-2">{t.socialProof.title}</h2>
          <p className="body-3 muted">{t.socialProof.sub}</p>
        </div>
        <div className="social-proof-grid gsap-stagger-group">
          {featuredReviews.map((d) => (
            <article key={d.id} className="social-card">
              <div className="social-card-head">
                <span className="avatar body-4" aria-hidden="true">
                  {d.buyer[lang].slice(0, 1)}
                </span>
                <div className="social-card-meta">
                  <h3 className="body-1">{reviewer(d, lang)}</h3>
                  <p className="caption-2 muted">{d.model}</p>
                </div>
                <span className="badge-saving caption-4">
                  <Tag />
                  {money(d.saving, lang)} {t.hero.below}
                </span>
              </div>
              {d.review && (
                <blockquote className="body-3 social-quote">
                  “{d.review.text[lang]}”
                </blockquote>
              )}
              <div className="social-card-foot">
                <button type="button" className="link button-sm" onClick={() => show(d.id)}>
                  {t.socialProof.viewDeal}
                  <ArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ tagline reveal */

function Tagline({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !ref.current) return;

    const wordEls = ref.current.querySelectorAll(".w");
    const tween = gsap.to(wordEls, {
      color: "var(--tone-strong)",
      stagger: 0.05,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "bottom 50%",
        scrub: 0.8,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [text]);

  return (
    <section className="tagline" aria-label="Brand statement">
      <div className="wrap">
        <p ref={ref} className="h0" data-words aria-label={text}>
          {words.map((w, i) => (
            <span key={`${text}-${i}`} className="w" aria-hidden="true">
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ benefits + how */

const benefitIcons = [Wallet, Tag, ShieldCheck, HandCoins];

function Benefits({ t }: { t: Copy }) {
  return (
    <section className="section" id="benefits">
      <div className="wrap">
        <div className="section-head gsap-reveal">
          <h2 className="heading-2">{t.benefits.title}</h2>
        </div>
        <div className="benefits gsap-stagger-group">
          {t.benefits.items.map((b, i) => {
            const Icon = benefitIcons[i];
            return (
              <article key={b.t} className="benefit">
                <span className="icon-box" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="heading-6">{b.t}</h3>
                <p className="body-3 muted">{b.d}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function How({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="section-head gsap-reveal">
          <h2 className="heading-2">{t.how.title}</h2>
        </div>
        <ol className="steps gsap-stagger-group">
          {t.how.steps.map((s, i) => (
            <li key={s.t} className="step">
              <span className="step-n body-4" aria-hidden="true">
                {num(i + 1, lang)}
              </span>
              <h3 className="heading-6">{s.t}</h3>
              <p className="body-3 muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ deliveries */

function Sold({
  t,
  lang,
  show,
  deliveries,
  savingRange,
  totalPhotos,
}: {
  t: Copy;
  lang: Lang;
  show: (id: number) => void;
  deliveries: Delivery[];
  savingRange: { min: number; max: number };
  totalPhotos: number;
}) {
  return (
    <section className="section" id="sold">
      <div className="wrap">
        <div className="section-head gsap-reveal">
          <h2 className="heading-2">{t.sold.title}</h2>
          <p className="body-3 muted">{t.sold.body}</p>
          <div className="proof-pills">
            <span className="proof-pill caption-3">
              <SealCheck weight="fill" />
              {t.sold.stats(
                num(deliveries.length, lang),
                money(savingRange.min, lang),
                money(savingRange.max, lang),
                num(totalPhotos, lang),
              )}
            </span>
          </div>
        </div>
        <div className="sold-grid gsap-stagger-group">
          {deliveries.map((d) => (
            <SoldCard key={d.id} d={d} t={t} lang={lang} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SoldCard({ d, t, lang, show }: { d: Delivery; t: Copy; lang: Lang; show: (id: number) => void }) {
  const photos = d.photos || [];
  const coverPhoto = photos.find((p) => p.is_cover) || photos[0];
  const coverThumbUrl = coverPhoto?.thumb_url || coverPhoto?.url || `/deliveries/${d.id}/t${d.cover}.jpg`;
  const photoCount = photos.length || d.count;

  return (
    <article className="card-case sold-card">
      <button
        type="button"
        className="sold-photo"
        onClick={() => show(d.id)}
        aria-label={`${d.model}, ${num(photoCount, lang)}${t.sold.photos}`}
      >
        <img src={coverThumbUrl} alt="" loading="lazy" width="480" height="640" />
        <span className="photo-count caption-4">
          <Images />
          {num(photoCount, lang)}
          {t.sold.photos}
        </span>
      </button>
      <div className="sold-body">
        <h3 className="heading-6">{d.model}</h3>
        <div className="chips">
          {d.highlights.map((h) => (
            <span key={h} className="chip caption-4">
              {h}
            </span>
          ))}
        </div>
        <span className="badge-saving caption-3">
          <Tag />
          {money(d.saving, lang)} {t.sold.below}
        </span>
        {d.review ? (
          <figure className="quote">
            <blockquote className="body-6">“{d.review.text[lang]}”</blockquote>
            <figcaption>
              <span className="body-4">{reviewer(d, lang)}</span>
              {lang === "en" && d.review.translated && <span className="caption-4 muted">{t.sold.translated}</span>}
            </figcaption>
          </figure>
        ) : (
          <p className="caption-2 muted">
            {t.sold.buyer}: {d.buyer[lang]}
          </p>
        )}
        <div className="sold-foot">
          <button type="button" className="link button-sm" onClick={() => show(d.id)}>
            {t.sold.details}
            <ArrowRight />
          </button>
        </div>
      </div>
    </article>
  );
}

function Viewer({
  t,
  lang,
  open,
  setOpen,
  deliveries,
}: {
  t: Copy;
  lang: Lang;
  open: NonNullable<OpenViewer>;
  setOpen: (o: OpenViewer) => void;
  deliveries: Delivery[];
}) {
  const d = deliveries.find((item) => item.id === open.id)!;
  if (!d) return null;

  const photos = d.photos && d.photos.length > 0
    ? d.photos
    : Array.from({ length: d.count }, (_, k) => ({
        url: `/deliveries/${d.id}/${k + 1}.jpg`,
        thumb_url: `/deliveries/${d.id}/t${k + 1}.jpg`,
        sort_order: k + 1,
        is_cover: k + 1 === d.cover,
      }));

  const photoCount = photos.length;
  const currentPhoto = photos[open.photoIndex] || photos[0];
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const go = (toIndex: number) => {
    const nextIndex = ((toIndex % photoCount) + photoCount) % photoCount;
    setDir(toIndex > open.photoIndex ? 1 : -1);
    setOpen({ id: d.id, photoIndex: nextIndex });
  };

  const handleClose = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !backdropRef.current || !boxRef.current) {
      setOpen(null);
      return;
    }
    gsap.to(boxRef.current, {
      opacity: 0,
      scale: 0.97,
      y: 8,
      duration: 0.18,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setOpen(null),
    });
  };

  // Entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (backdropRef.current && boxRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, scale: 0.95, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }
  }, []);

  // Photo slide animation on change
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !photoRef.current) return;

    gsap.fromTo(
      photoRef.current,
      { opacity: 0, x: dir * 36 },
      { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }
    );
  }, [open.photoIndex, dir]);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") go(open.photoIndex + 1);
      if (e.key === "ArrowLeft") go(open.photoIndex - 1);
      if (e.key === "Tab" && boxRef.current) {
        const items = Array.from(boxRef.current.querySelectorAll<HTMLElement>("button, a[href]")).filter((el) => el.offsetParent !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  });

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, []);

  return (
    <div
      ref={backdropRef}
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={d.model}
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        className="viewer-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="viewer-photo">
          <img
            ref={photoRef}
            src={currentPhoto.url}
            alt={`${d.model} · ${num(open.photoIndex + 1, lang)}`}
          />
          <button type="button" className="viewer-nav prev" onClick={() => go(open.photoIndex - 1)} aria-label={t.sold.prev}>
            <CaretLeft />
          </button>
          <button type="button" className="viewer-nav next" onClick={() => go(open.photoIndex + 1)} aria-label={t.sold.next}>
            <CaretRight />
          </button>
        </div>
        <aside className="viewer-side">
          <div className="stack-12">
            <h3 className="heading-5">{d.model}</h3>
            <span className="badge-saving caption-3">
              <Tag />
              {money(d.saving, lang)} {t.hero.below}
            </span>
          </div>
          <ul className="viewer-specs body-6">
            {d.specs.map((s) => (
              <li key={s.en}>
                <CheckCircle />
                <span>{s[lang]}</span>
              </li>
            ))}
          </ul>
          {d.review && (
            <figure className="quote full">
              <blockquote className="body-6">“{d.review.text[lang]}”</blockquote>
              <figcaption>
                <span className="body-4">{reviewer(d, lang)}</span>
                {lang === "en" && d.review.translated && <span className="caption-4 muted">{t.sold.translated}</span>}
              </figcaption>
            </figure>
          )}
          <div className="thumbs">
            {photos.map((p, idx) => (
              <button
                key={`${p.url}-${idx}`}
                type="button"
                aria-pressed={idx === open.photoIndex}
                aria-label={`${num(idx + 1, lang)} / ${num(photoCount, lang)}`}
                onClick={() => go(idx)}
              >
                <img src={p.thumb_url || p.url} alt="" />
              </button>
            ))}
          </div>
          <div className="viewer-foot">
            <span className="caption-2 muted" aria-live="polite">
              {num(open.photoIndex + 1, lang)} / {num(photoCount, lang)}
            </span>
            <button type="button" ref={closeRef} className="btn btn-line button-sm" onClick={handleClose}>
              {t.sold.close}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ finder */

function Finder({ t, lang }: { t: Copy; lang: Lang }) {
  const [budget, setBudget] = useState(BUDGET.start);
  const [use, setUse] = useState(0);
  const [size, setSize] = useState(2);
  const f = t.finder;
  const pct = ((budget - BUDGET.min) / (BUDGET.max - BUDGET.min)) * 100;
  const href = waLink(f.msg(money(budget, lang), f.uses[use], f.sizes[size]));

  return (
    <section className="section" id="finder">
      <div className="wrap finder">
        <div className="gsap-reveal">
          <div className="section-head">
            <h2 className="heading-2">{f.title}</h2>
            <p className="body-3 muted">{f.body}</p>
          </div>
          <div className="risk-wrap">
            <h3 className="heading-6 risk-title">{t.risk.title}</h3>
            <ul className="risk-list body-2" aria-label={t.risk.title}>
              {t.risk.items.map((r) => (
                <li key={r}>
                  <CheckCircle weight="fill" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form className="form-card gsap-reveal" onSubmit={(e) => e.preventDefault()}>
          <div>
            <div className="budget-row">
              <label className="title-3" htmlFor="budget">
                {f.budget}
              </label>
              <output className="heading-4" htmlFor="budget">
                {money(budget, lang)}
              </output>
            </div>
            <input
              id="budget"
              type="range"
              min={BUDGET.min}
              max={BUDGET.max}
              step={BUDGET.step}
              value={budget}
              style={{ "--pct": `${pct}%` } as React.CSSProperties}
              onChange={(e) => setBudget(Number(e.target.value))}
              aria-valuetext={money(budget, lang)}
            />
            <div className="range-ends caption-2 muted" aria-hidden="true">
              <span>{money(BUDGET.min, lang)}</span>
              <span>{money(BUDGET.max, lang)}</span>
            </div>
          </div>
          <Choice id="use" label={f.use} options={f.uses} value={use} onChange={setUse} />
          <Choice id="size" label={f.size} options={f.sizes} value={size} onChange={setSize} />
          <a className="btn btn-primary big button-md" href={href} target="_blank" rel="noreferrer">
            <WhatsappLogo />
            {f.send}
          </a>
          <p className="caption-2 muted center-text">{f.note}</p>
        </form>
      </div>
    </section>
  );
}

function Choice({ id: _id, label, options, value, onChange }: { id: string; label: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <fieldset className="choice">
      <legend className="title-3">{label}</legend>
      <div className="choice-row">
        {options.map((o, i) => (
          <button type="button" key={o} className="caption-1" aria-pressed={value === i} onClick={() => onChange(i)}>
            <span className="lbl">{o}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/* ------------------------------------------------------------------ faq + close */

function Faq({ t }: { t: Copy }) {
  const [open, setOpen] = useState<number | null>(0);
  const ansRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (i: number) => {
    setOpen((prev) => (prev === i ? null : i));
  };

  useEffect(() => {
    ansRefs.current.forEach((el, idx) => {
      if (!el) return;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (open === idx) {
        if (prefersReduced) {
          gsap.set(el, { height: "auto", opacity: 1 });
        } else {
          gsap.fromTo(
            el,
            { height: 0, opacity: 0 },
            { height: "auto", opacity: 1, duration: 0.28, ease: "power2.out" }
          );
        }
      } else {
        if (prefersReduced) {
          gsap.set(el, { height: 0, opacity: 0 });
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.2, ease: "power2.inOut" });
        }
      }
    });
  }, [open]);

  return (
    <section className="section" id="faq">
      <div className="wrap faq">
        <div className="section-head gsap-reveal">
          <h2 className="heading-2">{t.faq.title}</h2>
        </div>
        <div className="qa gsap-reveal">
          {t.faq.items.map((x, i) => (
            <div key={x.q} className={open === i ? "q open" : "q"}>
              <h3>
                <button
                  type="button"
                  className="title-2"
                  aria-expanded={open === i}
                  aria-controls={`a${i}`}
                  onClick={() => toggle(i)}
                >
                  <span>{x.q}</span>
                  <Plus />
                </button>
              </h3>
              <div
                id={`a${i}`}
                ref={(el) => {
                  ansRefs.current[i] = el;
                }}
                className="a"
                style={{
                  height: open === i ? "auto" : 0,
                  opacity: open === i ? 1 : 0,
                  overflow: "hidden",
                }}
              >
                <p className="body-3 muted">{x.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Close({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <>
      <section className="close">
        <div className="wrap">
          <div className="section-head gsap-reveal">
            <h2 className="heading-2">
              {t.close.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="title-2 muted">{t.close.body}</p>
          </div>
          <div className="actions gsap-reveal">
            <a className="btn btn-primary big button-lg" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsappLogo />
              {t.hero.cta}
            </a>
            <a className="btn btn-line big button-lg" href={FACEBOOK} target="_blank" rel="noreferrer">
              <FacebookLogo />
              {t.close.facebook}
            </a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap footer-wrap">
          <div className="footer-brand-side">
            <span className="brand">
              <img src="/favicon.png" width="28" height="28" alt="" />
              <span className="body-1">Rifath’s Gadget</span>
            </span>
            <span className="footer-copy caption-2 muted">
              © {new Date().getFullYear()} Rifath’s Gadget
            </span>
          </div>
          <div className="footer-meta caption-2 muted">
            <a href={waLink()} target="_blank" rel="noreferrer" dir="ltr">
              {WHATSAPP_DISPLAY}
            </a>
            <span>{t.close.area}</span>
            <span>{t.close.tagline}</span>
          </div>
          <div className="footer-credit caption-2 muted">
            <span>Designed &amp; built by </span>
            <a
              href="https://ashrafulasif.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
            >
              Asif
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
