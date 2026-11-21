export type Lang = "bn" | "en";

export const WHATSAPP = "8801887502002";
export const WHATSAPP_DISPLAY = "+880 1887-502002";
export const FACEBOOK = "https://www.facebook.com/share/19o7DbSKTY/";

export const BUDGET = { min: 40000, max: 120000, step: 5000, start: 60000 };

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const money = (n: number, lang: Lang) =>
  `৳${n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}`;

export const num = (n: number, lang: Lang, pad = 0) =>
  n.toLocaleString(lang === "bn" ? "bn-BD" : "en-US", pad ? { minimumIntegerDigits: pad } : undefined);

export type L = { bn: string; en: string };

export type Delivery = {
  id: number; // folder in /public/deliveries/<id>/ (photos n.jpg, thumbs tn.jpg)
  count: number; // number of photos
  cover: number; // photo used on the card
  buyer: L;
  model: string;
  /** Three short specs shown on the card. */
  highlights: string[];
  /** Full spec list, as written in the delivery post. */
  specs: L[];
  /** How much below the market price, in taka, as stated in the delivery post. */
  saving: number;
  /** The customer's first request, when the post states it. */
  asked?: L;
  /** The buyer's own words. `name` is the name on their comment. */
  review?: { name: string; text: L; translated?: boolean };
};

// Source: public/deliveries/<id>/description.md (written by Rifath's Gadget).
export const deliveries: Delivery[] = [
  {
    id: 4, count: 5, cover: 5,
    buyer: { bn: "লিমন ইসলাম স্বাধীন", en: "Limon Islam Shadhin" },
    model: "HP 15 fd0154wm",
    highlights: ["Core Ultra 5 125H", "16GB DDR5 · 512GB", "Touch screen"],
    specs: [
      { bn: "Intel Core Ultra 5 125H", en: "Intel Core Ultra 5 125H" },
      { bn: "16GB DDR5 5600MHz র‍্যাম (Samsung)", en: "16GB DDR5 5600MHz RAM (Samsung)" },
      { bn: "512GB SSD, ১০০% হেলথ", en: "512GB SSD, 100% health" },
      { bn: "41Wh ব্যাটারি, ১০০% হেলথ, ১৯ চার্জিং সাইকেল", en: "41Wh battery, 100% health, 19 charging cycles" },
      { bn: "FHD IPS 300 nits টাচ স্ক্রিন", en: "FHD IPS 300 nits touch screen" },
      { bn: "মাত্র ৩ মাস হালকা ব্যবহার, ৯ মাস ওয়ারেন্টি বাকি", en: "Only 3 months of light use, 9 months warranty left" },
      { bn: "জেনুইন Windows লাইসেন্স", en: "Genuine Windows licence" },
      { bn: "ল্যাপটপ, অরিজিনাল চার্জার, বক্স", en: "Laptop, original charger, box" },
      { bn: "বাংলাদেশে নতুন কেনা", en: "Bought new in Bangladesh" },
    ],
    saving: 36000,
    asked: { bn: "টাচ স্ক্রিন, ভালো ডিসপ্লে আর পারফরম্যান্স", en: "Touch screen, a good display and performance" },
    review: {
      name: "লিমন ইসলাম স্বাধীন",
      text: {
        bn: "ধন্যবাদ Rifath's Gadget কে এত সুন্দর একটি ডিল ম্যানেজ করে দেওয়ার জন্য। ল্যাপটপটির ডিস্পলে কোয়ালিটি, সাউন্ড সিস্টেম, পারফরমেন্স, সবকিছুই টপ নচ। সবমিলিয়ে আমি সন্তুষ্ট, আলহামদুলিল্লাহ।",
        en: "Thanks to Rifath's Gadget for arranging such a good deal. The display quality, sound and performance are all top notch. Overall I'm satisfied, Alhamdulillah.",
      },
      translated: true,
    },
  },
  {
    id: 7, count: 7, cover: 5,
    buyer: { bn: "জাহিদুল ইসলাম", en: "Jahidul Islam" },
    model: "ASUS Vivobook 15",
    highlights: ["Core 5 120U", "16GB · 512GB", "21 cycles"],
    specs: [
      { bn: "14th gen Intel Core 5 120U", en: "14th gen Intel Core 5 120U" },
      { bn: "16GB DDR4 3200MHz র‍্যাম", en: "16GB DDR4 3200MHz RAM" },
      { bn: "512GB SSD, ১০০% হেলথ", en: "512GB SSD, 100% health" },
      { bn: "42Wh ব্যাটারি, ৯৯.৯% হেলথ, ২১ চার্জিং সাইকেল", en: "42Wh battery, 99.9% health, 21 charging cycles" },
      { bn: "45W Type C চার্জার", en: "45W Type C charger" },
      { bn: "FHD IPS 250 nits ডিসপ্লে", en: "FHD IPS 250 nits display" },
      { bn: "কোনো দাগ বা স্ক্র্যাচ নেই, কখনো খোলা হয়নি", en: "No dents or scratches, never opened" },
      { bn: "মাত্র ৩ মাস হালকা ব্যবহার", en: "Only 3 months of light use" },
      { bn: "সৌদি আরবে নতুন কেনা", en: "Bought new in Saudi Arabia" },
    ],
    saving: 35000,
    asked: { bn: "অনেক দিন টিকে থাকার মতো পারফরম্যান্স", en: "Performance that lasts for years" },
    review: {
      name: "Jahid Khan",
      text: {
        bn: "আলহামদুলিল্লাহ, ভাইয়ের কাছ থেকে আমি বেস্ট একটা ল্যাপটপ নিতে পেরেছি। এজন্য আপনাকে আবারো ধন্যবাদ জানাচ্ছি 🥰",
        en: "Alhamdulillah, I got the best laptop from bhai. Thank you again for this.",
      },
      translated: true,
    },
  },
  {
    id: 5, count: 5, cover: 2,
    buyer: { bn: "শাহাদাত হোসেন", en: "Shahadat Hossen" },
    model: "HP 15 fd1191tu",
    highlights: ["Core 5 120U", "16GB · 512GB", "7 months warranty"],
    specs: [
      { bn: "Intel Core 5 120U", en: "Intel Core 5 120U" },
      { bn: "16GB DDR4 3200MHz র‍্যাম", en: "16GB DDR4 3200MHz RAM" },
      { bn: "512GB SSD, ৯৯% হেলথ", en: "512GB SSD, 99% health" },
      { bn: "41Wh ব্যাটারি, ৯৬% হেলথ, ৯০ চার্জিং সাইকেল", en: "41Wh battery, 96% health, 90 charging cycles" },
      { bn: "FHD 250 nits ডিসপ্লে", en: "FHD 250 nits display" },
      { bn: "Ryans থেকে ৭ মাস ওয়ারেন্টি বাকি", en: "7 months warranty left from Ryans" },
      { bn: "কোনো দাগ বা স্ক্র্যাচ নেই, ওপেন বক্স", en: "No dents or scratches, open box" },
      { bn: "ল্যাপটপ, অরিজিনাল চার্জার, বক্স", en: "Laptop, original charger, box" },
      { bn: "উপহার: HP ব্যাগ আর A4tech KRS 82 কিবোর্ড", en: "Gifts: HP bag and A4tech KRS 82 keyboard" },
    ],
    saving: 32000,
    asked: { bn: "অনেক দিন টিকে থাকার মতো পারফরম্যান্স", en: "Performance that lasts for years" },
    review: {
      name: "Shahadat Hossen",
      text: {
        bn: "আলহামদুলিল্লাহ, ল্যাপটপটি পেয়ে আমি সন্তুষ্ট। ল্যাপটপের কন্ডিশনসহ সবকিছু ভালো লেগেছে। ধন্যবাদ আপনাকে এত সুন্দর একটা ডিল সম্পন্ন করার জন্য। আপনার জন্য শুভ কামনা রইল।",
        en: "Alhamdulillah, I'm satisfied with the laptop. I liked everything, including its condition. Thank you for completing such a good deal. Best wishes to you.",
      },
      translated: true,
    },
  },
  {
    id: 6, count: 10, cover: 5,
    buyer: { bn: "শহিদ ইনাম", en: "Shahid Inam" },
    model: "Lenovo IdeaPad Slim 3 15ARP10",
    highlights: ["Ryzen 7 170", "16GB · 512GB", "Brand new"],
    specs: [
      { bn: "AMD Ryzen 7 170", en: "AMD Ryzen 7 170" },
      { bn: "Radeon 680 গ্রাফিক্স (2GB)", en: "Radeon 680 graphics (2GB)" },
      { bn: "16GB DDR5 4800MHz র‍্যাম", en: "16GB DDR5 4800MHz RAM" },
      { bn: "512GB SSD", en: "512GB SSD" },
      { bn: "50Wh ব্যাটারি, ১ চার্জিং সাইকেল", en: "50Wh battery, 1 charging cycle" },
      { bn: "FHD IPS WUXGA 300 nits টাচ স্ক্রিন", en: "FHD IPS WUXGA 300 nits touch screen" },
      { bn: "ব্র্যান্ড নিউ, কখনো ব্যবহার হয়নি", en: "Brand new, never used" },
      { bn: "ল্যাপটপ আর অরিজিনাল চার্জার", en: "Laptop and original charger" },
      { bn: "দেশের বাইরে থেকে নতুন এসেছে", en: "Came new from abroad" },
    ],
    saving: 20000,
    asked: { bn: "ভালো ডিসপ্লে আর পারফরম্যান্স", en: "A good display and performance" },
    review: {
      name: "Shahid Inam",
      text: {
        bn: "Thank you bhai, mon er moto ekta laptop khuje disen 💯",
        en: "Thank you bhai, you found exactly the laptop I wanted.",
      },
      translated: true,
    },
  },
  {
    id: 8, count: 9, cover: 1,
    buyer: { bn: "জুলেখা আক্তার", en: "Julekha Akter" },
    model: "Lenovo IdeaPad Slim 3 15IRH10",
    highlights: ["Core i5 13420H", "16GB DDR5 · 512GB", "Backlit keyboard"],
    specs: [
      { bn: "Intel Core i5 13420H", en: "Intel Core i5 13420H" },
      { bn: "16GB DDR5 4800MHz র‍্যাম", en: "16GB DDR5 4800MHz RAM" },
      { bn: "512GB SSD, ১০০% হেলথ", en: "512GB SSD, 100% health" },
      { bn: "50Wh ব্যাটারি, ১০০% হেলথ, ২১ চার্জিং সাইকেল", en: "50Wh battery, 100% health, 21 charging cycles" },
      { bn: "FHD IPS WUXGA 300 nits ডিসপ্লে", en: "FHD IPS WUXGA 300 nits display" },
      { bn: "ব্যাকলিট কিবোর্ড", en: "Backlit keyboard" },
      { bn: "ওপেন বক্স, কোনো দাগ বা স্ক্র্যাচ নেই", en: "Open box, no dents or scratches" },
      { bn: "৪ মাস হালকা ব্যবহার, ৮ মাস ওয়ারেন্টি বাকি", en: "4 months of light use, 8 months warranty left" },
      { bn: "পুরো বক্স আর এক্সেসরিজ, উপহার ল্যাপটপ ব্যাগ", en: "Full box and accessories, laptop bag as a gift" },
    ],
    saving: 25000,
  },
  {
    id: 3, count: 7, cover: 1,
    buyer: { bn: "মো. আবুল কালাম", en: "Md. Abul Kalam" },
    model: "Lenovo IdeaPad Slim 3i 14IAN8",
    highlights: ["Core i3 N305", "8GB DDR5 · 256GB", "15 months warranty"],
    specs: [
      { bn: "Intel Core i3 N305", en: "Intel Core i3 N305" },
      { bn: "8GB DDR5 4800MHz র‍্যাম", en: "8GB DDR5 4800MHz RAM" },
      { bn: "256GB SSD, ৯৯% হেলথ", en: "256GB SSD, 99% health" },
      { bn: "47Wh ব্যাটারি, ১০০% হেলথ, ৩০ চার্জিং সাইকেল", en: "47Wh battery, 100% health, 30 charging cycles" },
      { bn: "ফিঙ্গারপ্রিন্ট আনলক", en: "Fingerprint unlock" },
      { bn: "১৫ মাস ইন্টারন্যাশনাল ওয়ারেন্টি", en: "15 months international warranty" },
      { bn: "ওপরে আর বাঁ পাশে হালকা স্ক্র্যাচ", en: "Minor scratches on the top and left side" },
      { bn: "ল্যাপটপ আর অরিজিনাল চার্জার", en: "Laptop and original charger" },
      { bn: "সৌদি আরবে নতুন কেনা", en: "Bought new in Saudi Arabia" },
    ],
    saving: 20000,
    review: {
      name: "Md. Abul Kalam",
      text: {
        bn: "Alhamdulillah... Joto ta expectation cilo, tar ceye valo output pacci.",
        en: "Alhamdulillah... it's performing even better than I expected.",
      },
      translated: true,
    },
  },
  {
    id: 2, count: 7, cover: 7,
    buyer: { bn: "মো. আবু তাহের", en: "Md. Abu Taher" },
    model: "ASUS Vivobook Go 15 E1504GA",
    highlights: ["Core i3 N305", "8GB · 256GB", "Battery 93%"],
    specs: [
      { bn: "Intel Core i3 N305", en: "Intel Core i3 N305" },
      { bn: "8GB DDR4 3200MHz র‍্যাম", en: "8GB DDR4 3200MHz RAM" },
      { bn: "256GB SSD (Samsung), ৯৮% হেলথ", en: "256GB SSD (Samsung), 98% health" },
      { bn: "42Wh ব্যাটারি, ৯৩% হেলথ", en: "42Wh battery, 93% health" },
      { bn: "জেনুইন Windows লাইসেন্স", en: "Genuine Windows licence" },
      { bn: "কোনো দাগ বা স্ক্র্যাচ নেই", en: "No dents or scratches" },
      { bn: "ল্যাপটপ, অরিজিনাল চার্জার, ক্যারিং ব্যাগ", en: "Laptop, original charger, carrying bag" },
      { bn: "সৌদি আরবে নতুন কেনা", en: "Bought new in Saudi Arabia" },
    ],
    saving: 25000,
    review: {
      name: "Md. Abu Taher",
      text: {
        bn: "আলহামদুলিল্লাহ, ল্যাপটপটি পেয়ে আমি সন্তুষ্ট। ল্যাপটপের কন্ডিশন ভালো এবং আপনাদের ব্যবহার ও সহযোগিতা খুবই ভালো লেগেছে। সুন্দরভাবে পুরো বিষয়টি সম্পন্ন করার জন্য ধন্যবাদ। আপনাদের জন্য শুভকামনা রইল। ❤️",
        en: "Alhamdulillah, I'm satisfied with the laptop. Its condition is good, and I really liked how you treated me and helped. Thanks for handling everything so well. Best wishes.",
      },
      translated: true,
    },
  },
  {
    id: 1, count: 6, cover: 3,
    buyer: { bn: "জি এম রাব্বানী", en: "Gm Rabbani" },
    model: "Lenovo IdeaPad Slim 3i 15IRU10",
    highlights: ["Core 3 100U", "8GB DDR5 · 512GB", "14 months warranty"],
    specs: [
      { bn: "14th gen Intel Core 3 100U", en: "14th gen Intel Core 3 100U" },
      { bn: "8GB DDR5 4800MHz র‍্যাম", en: "8GB DDR5 4800MHz RAM" },
      { bn: "512GB Gen 4 SSD, ১০০% হেলথ", en: "512GB Gen 4 SSD, 100% health" },
      { bn: "50Wh ব্যাটারি, ১০০% হেলথ, ৩৬ সাইকেল", en: "50Wh battery, 100% health, 36 cycles" },
      { bn: "কোনো দাগ বা স্ক্র্যাচ নেই", en: "No dents or scratches" },
      { bn: "Star Tech থেকে ১৪ মাস ওয়ারেন্টি বাকি", en: "14 months warranty left from Star Tech" },
      { bn: "অফিসিয়াল ব্যাগ, বক্স, চার্জার", en: "Official bag, box and charger" },
    ],
    saving: 20000,
    review: {
      name: "Gm Rabbani",
      text: {
        bn: "আলহামদুলিল্লাহ, আমার মন মত একটি বাজেট ফ্রেন্ডলি ল্যাপটপ আপনাদের মাধ্যমে আমি পেয়েছি। আর ল্যাপটপের গুণগত মান মাশাআল্লাহ অনেক ভালো। আপনারা না থাকলে হয়তোবা আমি এত সুন্দর একটি প্রোডাক্ট এত বাজেট ফ্রেন্ডলি ভাবে পেতাম না। আমাকে এতো সুন্দর ডিল করে দেওয়ার জন্য ধন্যবাদ 🤍",
        en: "Alhamdulillah, through you I got a budget friendly laptop that's just what I wanted, and its quality is very good, MashaAllah. Without you I might not have got such a good product on such a budget. Thank you for such a good deal.",
      },
      translated: true,
    },
  },
];

/** Deliveries shown in the hero card: each has a stated request. */
export const heroCases = deliveries.filter((d) => d.asked).map((d) => d.id);
export const savingRange = {
  min: Math.min(...deliveries.map((d) => d.saving)),
  max: Math.max(...deliveries.map((d) => d.saving)),
};
/** Buyer name shown with a review: always the "Sold to" name, in the page language. */
export const reviewer = (d: Delivery, lang: Lang) => d.buyer[lang];
export const reviewCount = deliveries.filter((d) => d.review).length;
export const totalPhotos = deliveries.reduce((sum, d) => sum + d.count, 0);

/** Featured 3 deliveries for the social proof strip */
export const featuredReviews = [1, 4, 2];

const bn = {
  nav: { how: "কিভাবে কাজ করি", sold: "ডেলিভারি", faq: "প্রশ্ন", cta: "বাজেট পাঠান" },
  hero: {
    title: ["ল্যাপটপ স্টক করি না,", "আপনার বাজেটে খুঁজে আনি"],
    body: "বাজেট আর কাজ জানান। স্পেক সাজেশন থেকে শুরু করে, খুঁজে এনে ৫টি চেক করে হাতে দিই। টাকা দেন হাতে পেয়ে।",
    cta: "হোয়াটসঅ্যাপে বাজেট পাঠান",
    proof: (min: string, max: string, n: string) => `শেষ ৮টি ডেলিভারিতে মার্কেট প্রাইস থেকে ${min} থেকে ${max} কম · ${n} জন ক্রেতার রিভিউ`,
    asked: "চেয়েছিলেন",
    found: "খুঁজে এনেছি",
    below: "মার্কেট প্রাইস থেকে কম",
    buyer: "ক্রেতা",
  },
  tagline: "একটাই ল্যাপটপ, আপনার জন্য খোঁজা। কেনার আগে চেক। হাতে পেয়ে টাকা।",
  socialProof: {
    badge: "যাচাইকৃত ক্রেতা রিভিউ",
    title: (n: string) => `${n} জন ক্রেতা আমাদের মাধ্যমে ল্যাপটপ পেয়েছেন`,
    sub: "প্রতিটি পোস্টে আমরা ক্রেতাকে মেনশন করি — যাতে যে কেউ সরাসরি তাঁদের অভিজ্ঞতা জানতে পারেন।",
    viewDeal: "ল্যাপটপ ও ছবি দেখুন",
  },
  benefits: {
    title: "আমাদের দিয়ে খোঁজালে কী পান",
    items: [
      { t: "বাজেট থেকে শুরু", d: "৳৬০,০০০ আর 'কোডিং' বলুন। স্পেক সাজেশন দেব, তারপর পছন্দ না হওয়া পর্যন্ত দেখাব — স্টক শেষ না হওয়া পর্যন্ত না।" },
      { t: "মার্কেট প্রাইসের চেয়ে কম", d: "শেষ ৮টি ডেলিভারিতে ক্রেতারা মার্কেট প্রাইস থেকে ৳২০,০০০ থেকে ৳৩৬,০০০ কমে পেয়েছেন।" },
      { t: "কেনার আগে ৫টি চেক", d: "ক্যাশ মেমো, মাদারবোর্ড, র‍্যাম, এসএসডি হেলথ আর ব্যাটারি সাইকেল। চেকিং রিস্ক আমাদের।" },
      { t: "হাতে পেয়ে টাকা", d: "হ্যান্ডওভারের সময় ব্যাটারি হেলথ ও এসএসডি স্ক্রিনসহ সব দেখে নিন। পছন্দ হলে টাকা দিন। ঢাকায় হাতে হাতে, অন্য জেলায় কুরিয়ারে।" },
    ],
  },
  how: {
    title: "তিন ধাপে আপনার ল্যাপটপ",
    steps: [
      { t: "বাজেট আর কাজ জানান", d: "হোয়াটসঅ্যাপে লিখুন বাজেট কত আর কী কাজে লাগবে। আমরা স্পেক সাজেস্ট করি।" },
      { t: "আমরা খুঁজি আর চেক করি", d: "আপনি কনফার্ম করলে ২ থেকে ৩ দিন, কখনো বেশি সময় নিয়ে খুঁজি। পছন্দ হলে ৫টি চেক — ক্যাশ মেমো, মাদারবোর্ড, র‍্যাম, এসএসডি হেলথ, ব্যাটারি সাইকেল করে কেবল পাস করলেই কিনি।" },
      { t: "দেখে নিয়ে টাকা দিন", d: "হ্যান্ডওভারের সময় নিজে সব দেখে নিন — ল্যাপটপ অন করে ব্যাটারি হেলথ স্ক্রিন আর চার্জার চেক করুন। তারপর টাকা দিয়ে ল্যাপটপ নিয়ে যান।" },
    ],
  },
  sold: {
    title: "যাদের জন্য খুঁজে এনেছি",
    body: "প্রতিটি ডেলিভারির আসল ছবি, স্পেক আর ক্রেতার নিজের কথা। প্রতিটি পোস্টে আমরা ক্রেতাকে মেনশন করি, যাতে যে কেউ তাঁর কাছে অভিজ্ঞতা জানতে পারেন।",
    stats: (n: string, min: string, max: string, p: string) => `${n}টি ডেলিভারি · প্রতিটিতে ${min} থেকে ${max} বাঁচানো · ${p}টি আসল ছবি`,
    below: "কম",
    photos: "টি ছবি",
    details: "সব স্পেক আর ছবি",
    close: "বন্ধ করুন",
    prev: "আগের ছবি",
    next: "পরের ছবি",
    buyer: "ক্রেতা",
    translated: "",
    noReview: "রিভিউ এখনো দেননি",
    seeMore: (count: string) => `আরো ${count}টি ডেলিভারি দেখুন`,
    seeLess: "কম দেখুন",
    moreNote: (shown: string, total: string) => `${total}টির মধ্যে শীর্ষ ${shown}টি দেখানো হচ্ছে`,
    moreHeading: (count: string) => `পূর্বের আরো ${count}টি ডেলিভারি`,
  },
  finder: {
    title: "আপনার বাজেট কত?",
    body: "তিনটি তথ্য দিন, হোয়াটসঅ্যাপ মেসেজ লেখা হয়ে যাবে।",
    budget: "বাজেট",
    use: "কী কাজে",
    size: "স্ক্রিন",
    uses: ["পড়াশোনা", "অফিস", "কোডিং", "ডিজাইন", "গেমিং"],
    sizes: ["১৪″", "১৫.৬″", "যেকোনো"],
    send: "হোয়াটসঅ্যাপে বাজেট পাঠান",
    note: "না কিনে শুধু সাজেশন চাইলেও মেসেজ দিন।",
    msg: (b: string, u: string, s: string) =>
      `আসসালামু আলাইকুম। আমি একটি ল্যাপটপ খুঁজছি।\nবাজেট: ${b}\nকাজ: ${u}\nস্ক্রিন: ${s}`,
  },
  faq: {
    title: "যা জানতে চান",
    items: [
      { q: "টাকা কখন দিতে হয়?", a: "হ্যান্ডওভারের সময়, সবকিছু নিজে দেখে নেওয়ার পর।" },
      { q: "কেনার আগে কী কী চেক করেন?", a: "ক্যাশ মেমো, মাদারবোর্ড, র‍্যাম, এসএসডি হেলথ আর ব্যাটারি সাইকেল। কোনো চেকে সমস্যা পেলে কিনি না।" },
      { q: "দাম কম হয় কিভাবে?", a: "আমরা নতুন কেনা, কম ব্যবহৃত ল্যাপটপ খুঁজি। শেষ ৮টি ডেলিভারিতে দাম মার্কেট প্রাইস থেকে ৳২০,০০০ থেকে ৳৩৬,০০০ কম ছিল।" },
      { q: "আপনাদের কাছে কি ল্যাপটপ স্টকে আছে?", a: "না। বাজেট আর কাজ জানার পর আমরা ল্যাপটপ খুঁজি।" },
      { q: "ল্যাপটপ পেতে কত দিন লাগে?", a: "সাধারণত ২ থেকে ৩ দিন, কখনো বেশি। পছন্দ না হলে আরও দেখাই।" },
      { q: "ওয়ারেন্টি থাকে?", a: "বাজেট আর ল্যাপটপ অনুযায়ী ওয়ারেন্টি ভিন্ন হয়। যে ল্যাপটপ দেখাই, সেটার ওয়ারেন্টি তখনই জানাই।" },
      { q: "ঢাকার বাইরে দেন?", a: "হ্যাঁ। ঢাকায় হাতে হাতে দিই, অন্য জেলায় কুরিয়ারে পাঠাই।" },
      { q: "না কিনে শুধু সাজেশন নেওয়া যাবে?", a: "হ্যাঁ। যে কেউ ল্যাপটপ সাজেশনের জন্য মেসেজ দিতে পারেন।" },
    ],
  },
  risk: {
    title: "আপনার ঝুঁকি নেই",
    items: [
      "কেনার আগে চেকিং রিস্ক সম্পূর্ণ আমাদের",
      "হাতে পেয়ে, সব দেখে তারপর টাকা",
      "পছন্দ না হওয়া পর্যন্ত ল্যাপটপ দেখাই",
    ],
  },
  close: {
    title: ["আপনার ল্যাপটপ খুঁজতে প্রস্তুত?", "বাজেট আর কাজ জানান"],
    body: "বাজেট আর কাজ লিখে পাঠান। স্পেক সাজেশন দিয়ে শুরু করব।",
    facebook: "ফেসবুক পেজ",
    area: "ঢাকায় হাতে হাতে, অন্য জেলায় কুরিয়ার",
    tagline: "Tech for a better you",
  },
};

const en: typeof bn = {
  nav: { how: "How it works", sold: "Deliveries", faq: "Questions", cta: "Send budget" },
  hero: {
    title: ["We don't stock laptops.", "We find yours."],
    body: "You tell us your budget and your work. We handle the search, check the laptop against 5 points before we buy it, and hand it over in person. You pay only once it's in your hands.",
    cta: "Send your budget on WhatsApp",
    proof: (min: string, max: string, n: string) => `${min} to ${max} below market price on our last 8 deliveries · ${n} buyer reviews`,
    asked: "Asked for",
    found: "We found",
    below: "below market price",
    buyer: "Buyer",
  },
  tagline: "One laptop, found for you. Checked before we buy. Paid for when it's in your hands.",
  socialProof: {
    badge: "Verified Buyer Stories",
    title: (n: string) => `${n} buyers found their laptop through us`,
    sub: "We tag them in every post — anyone can ask them about their experience directly.",
    viewDeal: "View laptop & photos",
  },
  benefits: {
    title: "What you get when we search for you",
    items: [
      { t: "Starts from your budget", d: "Tell us ৳60,000 and 'coding'. We suggest the specs, then show options until one fits — not until our stock runs out." },
      { t: "Below market price", d: "On our last 8 deliveries, buyers paid ৳20,000 to ৳36,000 less than the market price." },
      { t: "Five checks before we buy", d: "Cash memo, motherboard, RAM, SSD health and battery cycles. The checking risk is ours." },
      { t: "Pay when it's in your hands", d: "Inspect every spec at handover — battery health screen, SSD health, the lot. Pay only when you're satisfied. In person in Dhaka, courier to other districts." },
    ],
  },
  how: {
    title: "Your laptop in three steps",
    steps: [
      { t: "Tell us your budget and your work", d: "Message us on WhatsApp with your budget and what the laptop is for. We suggest the specs." },
      { t: "We search and check", d: "Once you confirm, we search for 2 to 3 days, sometimes longer. When you like one, we check 5 points — cash memo, motherboard, RAM, SSD health, battery cycles — and only buy if everything passes." },
      { t: "Check it, then pay", d: "Look everything over at handover — open it, check the battery health screen, plug in the charger. Then pay and take the laptop home." },
    ],
  },
  sold: {
    title: "Who we have found laptops for",
    body: "Real photos, specs and the buyer's own words for every delivery. We mention each buyer in our posts, so anyone can ask them about their experience.",
    stats: (n: string, min: string, max: string, p: string) => `${n} deliveries · ${min} to ${max} saved each · ${p} real photos`,
    below: "below market",
    photos: " photos",
    details: "All specs and photos",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
    buyer: "Buyer",
    translated: "Translated from Bangla",
    noReview: "No review yet",
    seeMore: (count: string) => `See ${count} more deliveries`,
    seeLess: "Show less",
    moreNote: (shown: string, total: string) => `Showing top ${shown} of ${total} deliveries`,
    moreHeading: (count: string) => `${count} more past deliveries`,
  },
  finder: {
    title: "What is your budget?",
    body: "Give three details and your WhatsApp message is written for you.",
    budget: "Budget",
    use: "What for",
    size: "Screen",
    uses: ["Study", "Office", "Coding", "Design", "Gaming"],
    sizes: ["14″", "15.6″", "Any"],
    send: "Send your budget on WhatsApp",
    note: "Only want advice? Message us anyway.",
    msg: (b: string, u: string, s: string) =>
      `Hello. I'm looking for a laptop.\nBudget: ${b}\nUse: ${u}\nScreen: ${s}`,
  },
  faq: {
    title: "What people ask",
    items: [
      { q: "When do I pay?", a: "At handover, after you have checked everything yourself." },
      { q: "What do you check before buying?", a: "Cash memo, motherboard, RAM, SSD health and battery cycles. If any check fails, we don't buy it." },
      { q: "How is the price lower?", a: "We look for laptops bought new and lightly used. On our last 8 deliveries the price was ৳20,000 to ৳36,000 below market price." },
      { q: "Do you have laptops in stock?", a: "No. We search after we know your budget and use." },
      { q: "How long does it take?", a: "Usually 2 to 3 days, sometimes longer. If you don't like the options, we show more." },
      { q: "Is there a warranty?", a: "Warranty varies with budget and with each laptop. We tell you for every laptop we show." },
      { q: "Do you deliver outside Dhaka?", a: "Yes. We hand over in person in Dhaka and send by courier to other districts." },
      { q: "Can I just ask for advice?", a: "Yes. Anyone can message us for a laptop suggestion." },
    ],
  },
  risk: {
    title: "No risk on your side",
    items: [
      "The checking risk before purchase is entirely ours",
      "You pay at handover, after checking everything",
      "We keep showing laptops until you like one",
    ],
  },
  close: {
    title: ["Ready to find yours?", "Tell us your budget and work"],
    body: "Send your budget and what it's for. We'll start with a spec suggestion.",
    facebook: "Facebook page",
    area: "In person in Dhaka, courier to other districts",
    tagline: "Tech for a better you",
  },
};

export const copy = { bn, en };
export type Copy = typeof bn;
