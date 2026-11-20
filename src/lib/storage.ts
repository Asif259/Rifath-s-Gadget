import { supabase } from "./supabase";
import { processImage } from "./imageProcessor";
import type { DeliveryPhoto } from "../types/delivery";

const BUCKET_NAME = "delivery-photos";

export type UploadedPhotoMeta = Omit<DeliveryPhoto, "sort_order" | "is_cover">;

/**
 * Compresses and uploads both a full-sized image and a thumbnail to Supabase Storage.
 * @param folderKey Subfolder inside the bucket (e.g. delivery ID or temporary uuid)
 * @param file The original user-selected File
 */
export async function uploadDeliveryPhoto(
  folderKey: string,
  file: File
): Promise<UploadedPhotoMeta> {
  const { fullBlob, thumbBlob, ext } = await processImage(file);
  const uuid = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const cleanFolder = folderKey.trim().replace(/^\/+|\/+$/g, "") || "general";
  const storagePath = `${cleanFolder}/${uuid}.${ext}`;
  const thumbPath = `${cleanFolder}/${uuid}_thumb.${ext}`;
  const contentType = ext === "webp" ? "image/webp" : "image/jpeg";

  // Upload full image
  const { error: fullError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, fullBlob, {
      contentType,
      upsert: true,
    });

  if (fullError) {
    throw new Error(`Failed to upload full photo: ${fullError.message}`);
  }

  // Upload thumbnail
  const { error: thumbError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(thumbPath, thumbBlob, {
      contentType,
      upsert: true,
    });

  if (thumbError) {
    // Attempt cleanup of the full image if thumbnail upload fails
    await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    throw new Error(`Failed to upload thumbnail: ${thumbError.message}`);
  }

  const {
    data: { publicUrl: fullUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);

  const {
    data: { publicUrl: thumbUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(thumbPath);

  return {
    url: fullUrl,
    thumb_url: thumbUrl,
    storage_path: storagePath,
    thumb_path: thumbPath,
  };
}

/**
 * Batch deletes storage objects from the bucket.
 * Safely filters out empty values and legacy static paths (/deliveries/...)
 */
export async function deleteStoragePaths(
  paths: (string | undefined | null)[]
): Promise<void> {
  const validPaths = paths.filter(
    (p): p is string => Boolean(p && !p.startsWith("/deliveries/"))
  );

  if (validPaths.length === 0) return;

  const { error } = await supabase.storage.from(BUCKET_NAME).remove(validPaths);
  if (error) {
    console.error("[Storage] Failed to delete storage objects:", error.message);
  }
}
