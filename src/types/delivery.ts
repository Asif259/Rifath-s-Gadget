export type Lang = "bn" | "en";

export interface L {
  bn: string;
  en: string;
}

export interface DeliveryPhoto {
  url: string;
  thumb_url: string;
  sort_order: number;
  is_cover: boolean;
  storage_path?: string;
  thumb_path?: string;
}

/**
 * Raw PostgreSQL row representation from public.deliveries
 */
export type DeliveryRow = {
  id: number;
  model: string;
  buyer_name_bn: string;
  buyer_name_en: string;
  saving: number;
  highlights: string[];
  specs: L[];
  asked_bn: string | null;
  asked_en: string | null;
  review_name: string | null;
  review_text_bn: string | null;
  review_text_en: string | null;
  review_translated: boolean;
  photos: DeliveryPhoto[];
  is_hero: boolean;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/**
 * Insert payload for public.deliveries
 */
export type DeliveryInsert = Omit<DeliveryRow, "id" | "created_at" | "updated_at"> & {
  id?: number;
  created_at?: string;
  updated_at?: string;
};

/**
 * Update payload for public.deliveries
 */
export type DeliveryUpdate = Partial<DeliveryInsert>;

/**
 * UI-level Delivery model consumed by landing page components
 */
export interface Delivery {
  id: number;
  model: string;
  buyer: L;
  highlights: string[];
  specs: L[];
  saving: number;
  asked?: L;
  review?: {
    name: string;
    text: L;
    translated?: boolean;
  };
  photos: DeliveryPhoto[];
  count: number;
  cover: number;
  is_hero: boolean;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
}

/**
 * Helper to map a raw Supabase DeliveryRow into a UI Delivery object
 */
export function mapRowToDelivery(row: DeliveryRow): Delivery {
  const photos = Array.isArray(row.photos) ? row.photos : [];
  const coverIndex = photos.findIndex((p) => p.is_cover);
  const coverNum = coverIndex >= 0 ? coverIndex + 1 : 1;

  return {
    id: Number(row.id),
    model: row.model,
    buyer: {
      bn: row.buyer_name_bn,
      en: row.buyer_name_en,
    },
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    specs: Array.isArray(row.specs) ? row.specs : [],
    saving: Number(row.saving),
    asked:
      row.asked_bn && row.asked_en
        ? { bn: row.asked_bn, en: row.asked_en }
        : undefined,
    review:
      row.review_name && row.review_text_bn && row.review_text_en
        ? {
            name: row.review_name,
            text: { bn: row.review_text_bn, en: row.review_text_en },
            translated: Boolean(row.review_translated),
          }
        : undefined,
    photos,
    count: photos.length,
    cover: coverNum,
    is_hero: Boolean(row.is_hero),
    is_featured: Boolean(row.is_featured),
    is_published: Boolean(row.is_published),
    sort_order: Number(row.sort_order),
  };
}

/**
 * Database schema type definition for Supabase client typing
 */
export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      deliveries: {
        Row: DeliveryRow;
        Insert: DeliveryInsert;
        Update: DeliveryUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
