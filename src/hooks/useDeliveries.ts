import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  deliveries as staticRawDeliveries,
  heroCases as staticHeroCases,
  featuredReviews as staticFeaturedReviews,
} from "../content";
import { mapRowToDelivery } from "../types/delivery";
import type { Delivery, DeliveryPhoto, DeliveryRow } from "../types/delivery";

// Convert existing static deliveries from content.ts into unified UI Delivery objects
const initialDeliveries: Delivery[] = staticRawDeliveries.map((d, index) => {
  const isHero = staticHeroCases.includes(d.id);
  const isFeatured = staticFeaturedReviews.includes(d.id);

  const photos: DeliveryPhoto[] = Array.from({ length: d.count }, (_, k) => {
    const photoNum = k + 1;
    return {
      url: `/deliveries/${d.id}/${photoNum}.jpg`,
      thumb_url: `/deliveries/${d.id}/t${photoNum}.jpg`,
      sort_order: photoNum,
      is_cover: photoNum === d.cover,
    };
  });

  return {
    id: d.id,
    model: d.model,
    buyer: d.buyer,
    highlights: d.highlights,
    specs: d.specs,
    saving: d.saving,
    asked: d.asked,
    review: d.review,
    photos,
    count: photos.length,
    cover: d.cover,
    is_hero: isHero,
    is_featured: isFeatured,
    is_published: true,
    sort_order: (staticRawDeliveries.length - index) * 10,
  };
});

export function useDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    async function fetchLiveDeliveries() {
      try {
        const { data, error } = await supabase
          .from("deliveries")
          .select("*")
          .eq("is_published", true)
          .order("sort_order", { ascending: false })
          .order("id", { ascending: false });

        if (error) {
          if (import.meta.env.DEV) {
            console.warn("[useDeliveries] Supabase query failed, using static fallback:", error.message);
          }
          return;
        }

        if (data && data.length > 0 && mounted) {
          const mapped = (data as DeliveryRow[]).map(mapRowToDelivery);
          setDeliveries(mapped);
          setIsLive(true);
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.warn("[useDeliveries] Network/runtime error fetching deliveries:", err);
        }
      }
    }

    fetchLiveDeliveries();

    return () => {
      mounted = false;
    };
  }, []);

  // Deliveries flagged for the hero deal carousel
  const heroCases = useMemo(() => {
    const flagged = deliveries.filter((d) => d.is_hero);
    if (flagged.length > 0) return flagged;
    // Fallback: deliveries with customer requests defined
    const withAsked = deliveries.filter((d) => d.asked);
    return withAsked.length > 0 ? withAsked : deliveries.slice(0, 4);
  }, [deliveries]);

  // Deliveries flagged for the verified reviews proof strip
  const featuredReviews = useMemo(() => {
    const flagged = deliveries.filter((d) => d.is_featured && d.review);
    if (flagged.length > 0) return flagged;
    // Fallback: first 3 deliveries with reviews
    const withReview = deliveries.filter((d) => d.review);
    return withReview.slice(0, 3);
  }, [deliveries]);

  // Min and max savings in taka computed dynamically
  const savingRange = useMemo(() => {
    if (deliveries.length === 0) return { min: 0, max: 0 };
    const savings = deliveries.map((d) => d.saving);
    return {
      min: Math.min(...savings),
      max: Math.max(...savings),
    };
  }, [deliveries]);

  // Count of deliveries containing customer reviews
  const reviewCount = useMemo(() => {
    return deliveries.filter((d) => d.review).length;
  }, [deliveries]);

  // Total photo count across all live deliveries
  const totalPhotos = useMemo(() => {
    return deliveries.reduce((sum, d) => sum + (d.photos?.length || d.count || 0), 0);
  }, [deliveries]);

  return {
    deliveries,
    heroCases,
    featuredReviews,
    savingRange,
    reviewCount,
    totalPhotos,
    isLive,
  };
}
