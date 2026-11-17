import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
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
  deliveries,
  heroCases,
  money,
  num,
  reviewCount,
  reviewer,
  savingRange,
  waLink,
  type Copy,
  type Delivery,
  type Lang,
} from "./content";

const ease = [0.22, 1, 0.36, 1] as const;
const photo = (id: number, n: number, thumb = false) => `/deliveries/${id}/${thumb ? "t" : ""}${n}.jpg`;
const byId = (id: number) => deliveries.find((d) => d.id === id)!;
const firstName = (s: string) => s.replace(/^(মো\.|Md\.)\s*/, "").split(" ")[0];

/** Section entrance: rise 32px and fade in once (landing-page-design B7). */
const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-64px" },
  transition: { duration: 0.7, ease },
};

type Open = { id: number; i: number } | null;

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "en" ? "en" : "bn";
    } catch {
      return "bn";
    }
  });
  const t = copy[lang];
  const [open, setOpen] = useState<Open>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", lang);
    } catch {
      /* storage blocked: the switch still works for this visit */
    }
  }, [lang]);

  const show = (id: number) => setOpen({ id, i: byId(id).cover });

  return (
    <LayoutGroup>
      <div className={`site lang-${lang}`}>
        <a className="skip button-sm" href="#main">
          {lang === "bn" ? "মূল অংশে যান" : "Skip to content"}
        </a>
        <div className="page">
          <Nav t={t} lang={lang} setLang={setLang} />
          <main id="main">
            <Hero t={t} lang={lang} show={show} />
            <Tagline text={t.tagline} />
            <Benefits t={t} />
            <How t={t} lang={lang} />
            <Sold t={t} lang={lang} show={show} />
            <Finder t={t} lang={lang} />
            <Faq t={t} />
          </main>
          <Close t={t} lang={lang} />
        </div>
        <AnimatePresence>{open && <Viewer t={t} lang={lang} open={open} setOpen={setOpen} />}</AnimatePresence>
      </div>
    </LayoutGroup>
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
    <div className="nav-bar">
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
    </div>
  );
}

/* ------------------------------------------------------------------ hero */

const CASE_MS = 7000;

function Hero({ t, lang, show }: { t: Copy; lang: Lang; show: (id: number) => void }) {
  const reduce = useReducedMotion();
  const [k, setK] = useState(0);
  const [paused, setPaused] = useState(false);
  const d = byId(heroCases[k]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setK((x) => (x + 1) % heroCases.length), CASE_MS);
    return () => clearTimeout(id);
  }, [k, paused, reduce]);

  const enter = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease, delay: 0.08 * i } };

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero-head">
          <motion.h1 className="heading-1" key={lang} {...enter(0)}>
            {t.hero.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </motion.h1>
          <motion.p className="lede title-2 muted" {...enter(1)}>
            {t.hero.body}
          </motion.p>
          <motion.div className="hero-cta" {...enter(2)}>
            <a className="btn btn-primary big button-lg" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsappLogo />
              {t.hero.cta}
            </a>
            <p className="proof caption-1">
              <SealCheck weight="fill" />
              {t.hero.proof(money(savingRange.min, lang), money(savingRange.max, lang), num(reviewCount, lang))}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="deal"
          {...enter(3)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="deal-tabs" role="tablist" aria-label={t.hero.found}>
            {heroCases.map((id, i) => {
              const c = byId(id);
              const on = i === k;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`case-${id}`}
                  aria-selected={on}
                  aria-controls="case-panel"
                  className="deal-tab"
                  onClick={() => setK(i)}
                >
                  {on && <motion.span layoutId="case-tab" className="tab-bg" transition={{ type: "spring", duration: 0.45, bounce: 0.12 }} />}
                  {on && !reduce && !paused && (
                    <motion.span key={`t${k}`} className="timer" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: CASE_MS / 1000, ease: "linear" }} />
                  )}
                  <span className="body-4 tab-name">
                    <span className="full">{c.buyer[lang]}</span>
                    <span className="short">{firstName(c.buyer[lang])}</span>
                  </span>
                  <span className="caption-4 muted tab-model">{c.model}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={d.id}
              id="case-panel"
              role="tabpanel"
              aria-labelledby={`case-${d.id}`}
              className="deal-body"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease }}
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
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ tagline reveal (B11) */

function Tagline({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const [lit, setLit] = useState(reduce ? words.length : 0);

  useEffect(() => {
    if (reduce) {
      setLit(words.length);
      return;
    }
    setLit(0);
    const els = ref.current ? Array.from(ref.current.querySelectorAll<HTMLElement>(".w")) : [];
    // Each word lights up once it crosses a line 40% up from the bottom of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.i);
          setLit((n) => Math.max(n, i + 1));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -40% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [text, reduce, words.length]);

  return (
    <section className="tagline">
      <div className="wrap">
        <p ref={ref} className="heading-2" aria-label={text}>
          {words.map((w, i) => (
            <span key={`${text}-${i}`} data-i={i} className={i < lit ? "w on" : "w"} aria-hidden="true">
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
        <motion.div className="section-head" {...reveal}>
          <h2 className="heading-2">{t.benefits.title}</h2>
        </motion.div>
        <motion.div className="benefits" {...reveal}>
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
        </motion.div>
      </div>
    </section>
  );
}

function How({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <section className="section" id="how">
      <div className="wrap">
        <motion.div className="section-head" {...reveal}>
          <h2 className="heading-2">{t.how.title}</h2>
        </motion.div>
        <motion.ol className="steps" {...reveal}>
          {t.how.steps.map((s, i) => (
            <li key={s.t} className="step">
              <span className="step-n body-4" aria-hidden="true">
                {num(i + 1, lang)}
              </span>
              <h3 className="heading-6">{s.t}</h3>
              <p className="body-3 muted">{s.d}</p>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ deliveries */

function Sold({ t, lang, show }: { t: Copy; lang: Lang; show: (id: number) => void }) {
  return (
    <section className="section" id="sold">
      <div className="wrap">
        <motion.div className="section-head" {...reveal}>
          <h2 className="heading-2">{t.sold.title}</h2>
          <p className="body-3 muted">{t.sold.body}</p>
        </motion.div>
        <div className="sold-grid">
          {deliveries.map((d) => (
            <SoldCard key={d.id} d={d} t={t} lang={lang} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SoldCard({ d, t, lang, show }: { d: Delivery; t: Copy; lang: Lang; show: (id: number) => void }) {
  return (
    <motion.article className="sold-card" {...reveal}>
      <button type="button" className="sold-photo" onClick={() => show(d.id)} aria-label={`${d.model}, ${num(d.count, lang)}${t.sold.photos}`}>
        <img src={photo(d.id, d.cover, true)} alt="" loading="lazy" width="480" height="640" />
        <span className="photo-count caption-4">
          <Images />
          {num(d.count, lang)}
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
    </motion.article>
  );
}

function Viewer({ t, lang, open, setOpen }: { t: Copy; lang: Lang; open: NonNullable<Open>; setOpen: (o: Open) => void }) {
  const d = byId(open.id);
  const reduce = useReducedMotion();
  const [dir, setDir] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const go = (to: number) => {
    const n = ((to - 1 + d.count) % d.count) + 1;
    setDir(to > open.i ? 1 : -1);
    setOpen({ ...open, i: n });
  };

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") go(open.i + 1);
      if (e.key === "ArrowLeft") go(open.i - 1);
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
    <motion.div
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-label={d.model}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      onClick={() => setOpen(null)}
    >
      <motion.div
        ref={boxRef}
        className="viewer-inner"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="viewer-photo">
          <AnimatePresence initial={false} mode="popLayout" custom={dir}>
            <motion.img
              key={open.i}
              src={photo(d.id, open.i)}
              alt={`${d.model} · ${num(open.i, lang)}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease }}
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60 || info.velocity.x < -400) go(open.i + 1);
                else if (info.offset.x > 60 || info.velocity.x > 400) go(open.i - 1);
              }}
            />
          </AnimatePresence>
          <button type="button" className="viewer-nav prev" onClick={() => go(open.i - 1)} aria-label={t.sold.prev}>
            <CaretLeft />
          </button>
          <button type="button" className="viewer-nav next" onClick={() => go(open.i + 1)} aria-label={t.sold.next}>
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
            {Array.from({ length: d.count }, (_, k) => k + 1).map((n) => (
              <button key={n} type="button" aria-pressed={n === open.i} aria-label={`${num(n, lang)} / ${num(d.count, lang)}`} onClick={() => go(n)}>
                <img src={photo(d.id, n, true)} alt="" />
              </button>
            ))}
          </div>
          <div className="viewer-foot">
            <span className="caption-2 muted" aria-live="polite">
              {num(open.i, lang)} / {num(d.count, lang)}
            </span>
            <button type="button" ref={closeRef} className="btn btn-line button-sm" onClick={() => setOpen(null)}>
              {t.sold.close}
            </button>
          </div>
        </aside>
      </motion.div>
    </motion.div>
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
        <motion.div {...reveal}>
          <div className="section-head">
            <h2 className="heading-2">{f.title}</h2>
            <p className="body-3 muted">{f.body}</p>
          </div>
          <ul className="risk-list body-2" aria-label={t.risk.title}>
            {t.risk.items.map((r) => (
              <li key={r}>
                <CheckCircle weight="fill" />
                {r}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.form className="form-card" onSubmit={(e) => e.preventDefault()} {...reveal}>
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
        </motion.form>
      </div>
    </section>
  );
}

function Choice({ id, label, options, value, onChange }: { id: string; label: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <fieldset className="choice">
      <legend className="title-3">{label}</legend>
      <div className="choice-row animated">
        {options.map((o, i) => (
          <button type="button" key={o} className="caption-1" aria-pressed={value === i} onClick={() => onChange(i)}>
            {value === i && <motion.span layoutId={`choice-${id}`} className="pill" transition={{ type: "spring", duration: 0.45, bounce: 0.12 }} />}
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
  return (
    <section className="section" id="faq">
      <div className="wrap faq">
        <motion.div className="section-head" {...reveal}>
          <h2 className="heading-2">{t.faq.title}</h2>
        </motion.div>
        <motion.div className="qa" {...reveal}>
          {t.faq.items.map((x, i) => (
            <div key={x.q} className={open === i ? "q open" : "q"}>
              <h3>
                <button type="button" className="title-2" aria-expanded={open === i} aria-controls={`a${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{x.q}</span>
                  <Plus />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div id={`a${i}`} className="a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }}>
                    <p className="body-3 muted">{x.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Close({ t, lang }: { t: Copy; lang: Lang }) {
  return (
    <>
      <section className="close">
        <div className="wrap">
          <motion.div className="section-head" {...reveal}>
            <h2 className="heading-2">
              {t.close.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <p className="title-2 muted">{t.close.body}</p>
          </motion.div>
          <motion.div className="actions" {...reveal}>
            <a className="btn btn-primary big button-lg" href={waLink()} target="_blank" rel="noreferrer">
              <WhatsappLogo />
              {t.hero.cta}
            </a>
            <a className="btn btn-line big button-lg" href={FACEBOOK} target="_blank" rel="noreferrer">
              <FacebookLogo />
              {t.close.facebook}
            </a>
          </motion.div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <span className="brand">
            <img src="/favicon.png" width="28" height="28" alt="" />
            <span className="body-1">Rifath’s Gadget</span>
          </span>
          <div className="footer-meta caption-2 muted">
            <a href={waLink()} target="_blank" rel="noreferrer" dir="ltr">
              {WHATSAPP_DISPLAY}
            </a>
            <span>{t.close.area}</span>
            <span>{t.close.tagline}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
