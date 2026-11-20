export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_IMAGE_FILE_SIZE = 15 * 1024 * 1024; // 15MB

export interface ProcessedImages {
  fullBlob: Blob;
  thumbBlob: Blob;
  ext: "webp" | "jpg";
}

let cachedWebpSupport: boolean | null = null;

async function checkWebpSupport(): Promise<boolean> {
  if (cachedWebpSupport !== null) return cachedWebpSupport;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const isSupported = await new Promise<boolean>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob?.type === "image/webp");
      }, "image/webp");
    });
    cachedWebpSupport = isSupported;
    return isSupported;
  } catch {
    cachedWebpSupport = false;
    return false;
  }
}

function resizeToCanvas(img: HTMLImageElement, maxWidth: number): HTMLCanvasElement {
  let width = img.naturalWidth || img.width;
  let height = img.naturalHeight || img.height;

  // Downscale proportionally, but do not upscale smaller images
  if (width > maxWidth) {
    height = Math.round((height * maxWidth) / width);
    width = maxWidth;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not acquire 2D canvas context");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to encode canvas to blob"));
      },
      mimeType,
      quality
    );
  });
}

/**
 * Optimizes an uploaded File using HTML5 canvas:
 * - Full image resized to max 1600px width at 0.82 quality
 * - Thumbnail resized to max 480px width at 0.78 quality
 * - Encodes as WebP with automatic fallback to JPEG
 */
export async function processImage(file: File): Promise<ProcessedImages> {
  // Validate file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    throw new Error(
      `Invalid image format "${file.type || "unknown"}". Only JPG, PNG, and WebP images are supported.`
    );
  }

  // Validate file size (15MB maximum)
  if (file.size > MAX_IMAGE_FILE_SIZE) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    throw new Error(
      `File "${file.name}" exceeds the 15MB limit (${sizeMb}MB). Please select a smaller image.`
    );
  }

  const isWebpSupported = await checkWebpSupport();
  const mimeType = isWebpSupported ? "image/webp" : "image/jpeg";
  const ext: "webp" | "jpg" = isWebpSupported ? "webp" : "jpg";

  const objectUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Failed to load image file: ${file.name}`));
      el.src = objectUrl;
    });

    const fullCanvas = resizeToCanvas(img, 1600);
    const fullBlob = await canvasToBlob(fullCanvas, mimeType, 0.82);

    const thumbCanvas = resizeToCanvas(img, 480);
    const thumbBlob = await canvasToBlob(thumbCanvas, mimeType, 0.78);

    return {
      fullBlob,
      thumbBlob,
      ext,
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
