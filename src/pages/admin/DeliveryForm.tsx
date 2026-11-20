import { useEffect, useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  FloppyDisk,
  Images,
  Plus,
  Trash,
  ArrowUp,
  ArrowDown,
  CaretLeft,
  CaretRight,
  Star,
  Sparkle,
  UploadSimple,
} from "@phosphor-icons/react";
import { supabase } from "../../lib/supabase";
import { uploadDeliveryPhoto, deleteStoragePaths } from "../../lib/storage";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE,
} from "../../lib/imageProcessor";
import type { DeliveryRow, DeliveryPhoto, L } from "../../types/delivery";

interface SpecItem {
  id: string;
  bn: string;
  en: string;
}

export default function DeliveryForm() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id && id !== "new");
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track newly uploaded photos in this session to clean up if cancelled/abandoned (SEC-06)
  const newlyUploadedPathsRef = useRef<string[]>([]);
  const isSavedRef = useRef<boolean>(false);

  // Loading & submission state
  const [loadingInitial, setLoadingInitial] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Core delivery fields
  const [model, setModel] = useState("");
  const [saving, setSaving] = useState<string>("25000");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [isHero, setIsHero] = useState<boolean>(false);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  // Buyer bilingual details
  const [buyerNameBn, setBuyerNameBn] = useState("");
  const [buyerNameEn, setBuyerNameEn] = useState("");

  // Customer asked request (optional)
  const [askedBn, setAskedBn] = useState("");
  const [askedEn, setAskedEn] = useState("");

  // Highlights (3 chips)
  const [highlights, setHighlights] = useState<[string, string, string]>(["", "", ""]);

  // Specs repeater
  const [specs, setSpecs] = useState<SpecItem[]>([
    { id: "1", bn: "", en: "" },
  ]);

  // Review (optional)
  const [reviewName, setReviewName] = useState("");
  const [reviewTextBn, setReviewTextBn] = useState("");
  const [reviewTextEn, setReviewTextEn] = useState("");
  const [reviewTranslated, setReviewTranslated] = useState(true);

  // Photos & queued deletions for safe storage cleanup
  const [photos, setPhotos] = useState<DeliveryPhoto[]>([]);
  const [queuedDeletions, setQueuedDeletions] = useState<string[]>([]);

  // Load existing data in Edit mode
  useEffect(() => {
    if (!isEdit || !id) return;

    async function loadDelivery() {
      try {
        const { data, error } = await supabase
          .from("deliveries")
          .select("*")
          .eq("id", Number(id))
          .single();

        if (error) throw error;
        const row = data as DeliveryRow;

        setModel(row.model || "");
        setSaving(String(row.saving ?? 0));
        setSortOrder(row.sort_order ?? 0);
        setIsPublished(Boolean(row.is_published));
        setIsHero(Boolean(row.is_hero));
        setIsFeatured(Boolean(row.is_featured));

        setBuyerNameBn(row.buyer_name_bn || "");
        setBuyerNameEn(row.buyer_name_en || "");

        setAskedBn(row.asked_bn || "");
        setAskedEn(row.asked_en || "");

        const hl = Array.isArray(row.highlights) ? row.highlights : [];
        setHighlights([hl[0] || "", hl[1] || "", hl[2] || ""]);

        const rawSpecs = Array.isArray(row.specs) ? row.specs : [];
        if (rawSpecs.length > 0) {
          setSpecs(
            rawSpecs.map((s: L, idx: number) => ({
              id: `${Date.now()}-${idx}`,
              bn: s.bn || "",
              en: s.en || "",
            }))
          );
        }

        setReviewName(row.review_name || "");
        setReviewTextBn(row.review_text_bn || "");
        setReviewTextEn(row.review_text_en || "");
        setReviewTranslated(Boolean(row.review_translated));

        const rawPhotos = Array.isArray(row.photos) ? row.photos : [];
        setPhotos(rawPhotos);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setErrorMsg(`Failed to load delivery: ${msg}`);
      } finally {
        setLoadingInitial(false);
      }
    }

    loadDelivery();
  }, [id, isEdit]);

  // SEC-06: Automatically clean up any newly uploaded, unsaved storage files if navigating away
  useEffect(() => {
    return () => {
      if (!isSavedRef.current && newlyUploadedPathsRef.current.length > 0) {
        deleteStoragePaths([...newlyUploadedPathsRef.current]);
      }
    };
  }, []);

  // ---------- Photo Management ----------
  const handlePhotoSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate maximum photos
    if (photos.length + files.length > 25) {
      setErrorMsg("A maximum of 25 photos is allowed per delivery.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Pre-validate file formats and sizes before starting upload/canvas pipeline
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
        setErrorMsg(
          `"${file.name}" has an unsupported format (${file.type || "unknown"}). Only JPG, PNG, and WebP images are allowed.`
        );
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      if (file.size > MAX_IMAGE_FILE_SIZE) {
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        setErrorMsg(
          `"${file.name}" exceeds the 15MB size limit (${sizeMb}MB). Please select smaller images.`
        );
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
    }

    setUploading(true);
    setErrorMsg(null);

    const folderKey = isEdit && id ? `delivery-${id}` : `delivery-${Date.now()}`;
    const newPhotos: DeliveryPhoto[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploaded = await uploadDeliveryPhoto(folderKey, file);
        if (uploaded.storage_path) newlyUploadedPathsRef.current.push(uploaded.storage_path);
        if (uploaded.thumb_path) newlyUploadedPathsRef.current.push(uploaded.thumb_path);

        const orderNum = photos.length + newPhotos.length + 1;
        const isCover = photos.length === 0 && newPhotos.length === 0;

        newPhotos.push({
          ...uploaded,
          sort_order: orderNum,
          is_cover: isCover,
        });
      }

      setPhotos((prev) => {
        const combined = [...prev, ...newPhotos];
        // Enforce cover invariant: at least one photo must be marked as cover
        if (!combined.some((p) => p.is_cover) && combined.length > 0) {
          combined[0].is_cover = true;
        }
        return combined;
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Photo upload failed: ${msg}`);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetCover = (index: number) => {
    setPhotos((prev) =>
      prev.map((p, idx) => ({
        ...p,
        is_cover: idx === index,
      }))
    );
  };

  const handleMovePhoto = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= photos.length) return;

    setPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy.map((p, idx) => ({ ...p, sort_order: idx + 1 }));
    });
  };

  const handleRemovePhoto = (index: number) => {
    const photoToRemove = photos[index];

    // If removing an existing Supabase Storage photo, queue its paths for cleanup on save
    if (photoToRemove.storage_path) {
      newlyUploadedPathsRef.current = newlyUploadedPathsRef.current.filter(
        (p) => p !== photoToRemove.storage_path && p !== photoToRemove.thumb_path
      );
      setQueuedDeletions((prev) => [
        ...prev,
        photoToRemove.storage_path!,
        photoToRemove.thumb_path!,
      ].filter(Boolean));
    }

    setPhotos((prev) => {
      const filtered = prev.filter((_, idx) => idx !== index);
      // Enforce cover invariant: if the deleted photo was the cover, promote the first photo
      if (photoToRemove.is_cover && filtered.length > 0) {
        filtered[0].is_cover = true;
      }
      return filtered.map((p, idx) => ({ ...p, sort_order: idx + 1 }));
    });
  };

  // ---------- Specs Management ----------
  const handleAddSpec = () => {
    if (specs.length >= 25) {
      setErrorMsg("A maximum of 25 specification rows is allowed.");
      return;
    }
    setSpecs((prev) => [...prev, { id: `${Date.now()}-${prev.length}`, bn: "", en: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveSpec = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= specs.length) return;

    setSpecs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[target];
      copy[target] = temp;
      return copy;
    });
  };

  const handleSpecChange = (index: number, lang: "bn" | "en", value: string) => {
    setSpecs((prev) =>
      prev.map((s, idx) => (idx === index ? { ...s, [lang]: value } : s))
    );
  };

  // ---------- Form Submission & Validation ----------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    const cleanModel = model.trim();
    if (!cleanModel) {
      setErrorMsg("Model name is required.");
      return;
    }
    if (cleanModel.length > 150) {
      setErrorMsg("Model name must be 150 characters or fewer.");
      return;
    }

    const cleanBuyerBn = buyerNameBn.trim();
    const cleanBuyerEn = buyerNameEn.trim();
    if (!cleanBuyerBn || !cleanBuyerEn) {
      setErrorMsg("Both Bangla and English buyer names are required.");
      return;
    }
    if (cleanBuyerBn.length > 100 || cleanBuyerEn.length > 100) {
      setErrorMsg("Buyer names must be 100 characters or fewer.");
      return;
    }

    const savingNum = Number(saving);
    if (isNaN(savingNum) || savingNum < 0 || savingNum > 2_000_000_000) {
      setErrorMsg("Savings must be a valid number between ৳0 and ৳2,000,000,000.");
      return;
    }

    const sortOrderNum = Math.max(-100_000, Math.min(100_000, Number(sortOrder) || 0));

    if (photos.length === 0) {
      setErrorMsg("Please upload at least one photo for this delivery.");
      return;
    }

    if (askedBn.trim().length > 500 || askedEn.trim().length > 500) {
      setErrorMsg("Customer request notes must be 500 characters or fewer.");
      return;
    }

    if (reviewName.trim().length > 100) {
      setErrorMsg("Reviewer name must be 100 characters or fewer.");
      return;
    }

    if (reviewTextBn.trim().length > 2000 || reviewTextEn.trim().length > 2000) {
      setErrorMsg("Review text must be 2000 characters or fewer.");
      return;
    }

    setSubmitting(true);

    try {
      // Clean specs: keep rows where at least one language has text (capped at 150 chars each)
      const cleanSpecs: L[] = specs
        .map(({ bn, en }) => ({ bn: bn.trim().slice(0, 150), en: en.trim().slice(0, 150) }))
        .filter((s) => s.bn || s.en);

      // Clean highlights: filter out empty strings (capped at 60 chars each)
      const cleanHighlights = highlights.map((h) => h.trim().slice(0, 60)).filter(Boolean);

      const payload = {
        model: cleanModel,
        buyer_name_bn: cleanBuyerBn,
        buyer_name_en: cleanBuyerEn,
        saving: savingNum,
        highlights: cleanHighlights,
        specs: cleanSpecs,
        asked_bn: askedBn.trim() || null,
        asked_en: askedEn.trim() || null,
        review_name: reviewName.trim() || null,
        review_text_bn: reviewTextBn.trim() || null,
        review_text_en: reviewTextEn.trim() || null,
        review_translated: Boolean(reviewTranslated),
        photos,
        is_hero: isHero,
        is_featured: isFeatured,
        is_published: isPublished,
        sort_order: sortOrderNum,
      };

      if (isEdit && id) {
        const { error: updateError } = await supabase
          .from("deliveries")
          .update(payload)
          .eq("id", Number(id));

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from("deliveries")
          .insert(payload);

        if (insertError) throw insertError;
      }

      // Mark as saved so unmount cleanup does not delete files
      isSavedRef.current = true;
      newlyUploadedPathsRef.current = [];

      // Safe storage cleanup: now that the record has saved, remove any queued deleted photos
      if (queuedDeletions.length > 0) {
        await deleteStoragePaths(queuedDeletions);
      }

      navigate("/admin/deliveries");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Failed to save delivery: ${msg}`);
      setSubmitting(false);
    }
  };

  if (loadingInitial) {
    return (
      <div className="admin-card admin-empty-state">
        <p>Loading delivery data...</p>
      </div>
    );
  }

  return (
    <div className="admin-form-page">
      <div className="admin-form-header">
        <Link to="/admin/deliveries" className="admin-back-link">
          <ArrowLeft size={16} />
          <span>Back to Deliveries</span>
        </Link>
        <h1 className="h2 admin-title">
          {isEdit ? `Edit Delivery: ${model || "Untitled"}` : "Add New Delivery"}
        </h1>
      </div>

      {errorMsg && <div className="admin-alert-error">{errorMsg}</div>}

      <form className="admin-delivery-form" onSubmit={handleSubmit}>
        {/* SECTION 1: Core Details */}
        <section className="admin-card">
          <h2 className="admin-section-title">1. Core Information</h2>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="model">
                Laptop Model *
              </label>
              <input
                id="model"
                type="text"
                className="admin-input"
                placeholder="e.g. HP 15 fd0154wm"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                maxLength={150}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="saving">
                Savings Below Market Price (৳ BDT) *
              </label>
              <input
                id="saving"
                type="number"
                min="0"
                max="2000000000"
                step="500"
                className="admin-input"
                placeholder="e.g. 25000"
                value={saving}
                onChange={(e) => setSaving(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-grid-2" style={{ marginTop: "16px" }}>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="sortOrder">
                Sort Order (Higher displays first)
              </label>
              <input
                id="sortOrder"
                type="number"
                min="-100000"
                max="100000"
                className="admin-input"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Visibility & Curation Flags</label>
              <div className="admin-checkbox-group">
                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                  />
                  <span>Published (Live on site)</span>
                </label>

                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isHero}
                    onChange={(e) => setIsHero(e.target.checked)}
                  />
                  <span>Hero Carousel Deal</span>
                </label>

                <label className="admin-checkbox-label">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Featured in Proof Strip</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Bilingual Buyer Name & Asked Requirement */}
        <section className="admin-card">
          <h2 className="admin-section-title">2. Buyer & Sourcing Request</h2>
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="buyerNameBn">
                Buyer Name (Bangla) *
              </label>
              <input
                id="buyerNameBn"
                type="text"
                className="admin-input"
                placeholder="e.g. লিমন ইসলাম স্বাধীন"
                value={buyerNameBn}
                onChange={(e) => setBuyerNameBn(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="buyerNameEn">
                Buyer Name (English) *
              </label>
              <input
                id="buyerNameEn"
                type="text"
                className="admin-input"
                placeholder="e.g. Limon Islam Shadhin"
                value={buyerNameEn}
                onChange={(e) => setBuyerNameEn(e.target.value)}
                maxLength={100}
                required
              />
            </div>
          </div>

          <div className="admin-grid-2" style={{ marginTop: "16px" }}>
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="askedBn">
                Customer's Initial Request (Bangla - Optional)
              </label>
              <input
                id="askedBn"
                type="text"
                className="admin-input"
                placeholder="e.g. টাচ স্ক্রিন, ভালো ডিসপ্লে আর পারফরম্যান্স"
                value={askedBn}
                onChange={(e) => setAskedBn(e.target.value)}
                maxLength={500}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="askedEn">
                Customer's Initial Request (English - Optional)
              </label>
              <input
                id="askedEn"
                type="text"
                className="admin-input"
                placeholder="e.g. Touch screen, a good display and performance"
                value={askedEn}
                onChange={(e) => setAskedEn(e.target.value)}
                maxLength={500}
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: Highlights (3 Short Card Chips) */}
        <section className="admin-card">
          <h2 className="admin-section-title">3. Card Highlight Badges</h2>
          <p className="admin-desc" style={{ marginBottom: "16px" }}>
            Three concise spec tags shown on the delivery card (e.g. processor, RAM/SSD, condition).
          </p>
          <div className="admin-grid-3">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="admin-form-group">
                <label className="admin-label">Highlight #{idx + 1}</label>
                <input
                  type="text"
                  className="admin-input"
                  maxLength={60}
                  placeholder={
                    idx === 0
                      ? "Core Ultra 5 125H"
                      : idx === 1
                      ? "16GB DDR5 · 512GB"
                      : "Touch screen"
                  }
                  value={highlights[idx]}
                  onChange={(e) => {
                    const val = e.target.value;
                    setHighlights((prev) => {
                      const next = [...prev] as [string, string, string];
                      next[idx] = val;
                      return next;
                    });
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: Full Specifications Repeater */}
        <section className="admin-card">
          <div className="admin-flex-between" style={{ marginBottom: "16px" }}>
            <div>
              <h2 className="admin-section-title">4. Specifications List</h2>
              <p className="admin-desc">
                Full list of verified checks, parts, battery cycle, and warranty details.
              </p>
            </div>
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={handleAddSpec}
            >
              <Plus size={15} />
              <span>Add Spec Row</span>
            </button>
          </div>

          <div className="admin-specs-list">
            {specs.map((s, idx) => (
              <div key={s.id} className="admin-spec-row">
                <span className="admin-spec-number">#{idx + 1}</span>
                <input
                  type="text"
                  className="admin-input"
                  maxLength={150}
                  placeholder="Bangla spec (e.g. 512GB SSD, ১০০% হেলথ)"
                  value={s.bn}
                  onChange={(e) => handleSpecChange(idx, "bn", e.target.value)}
                />
                <input
                  type="text"
                  className="admin-input"
                  maxLength={150}
                  placeholder="English spec (e.g. 512GB SSD, 100% health)"
                  value={s.en}
                  onChange={(e) => handleSpecChange(idx, "en", e.target.value)}
                />
                <div className="admin-spec-actions">
                  <button
                    type="button"
                    className="admin-icon-btn"
                    disabled={idx === 0}
                    onClick={() => handleMoveSpec(idx, -1)}
                    title="Move Up"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn"
                    disabled={idx === specs.length - 1}
                    onClick={() => handleMoveSpec(idx, 1)}
                    title="Move Down"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="admin-icon-btn delete"
                    onClick={() => handleRemoveSpec(idx)}
                    title="Delete Spec"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: Customer Review (Optional) */}
        <section className="admin-card">
          <h2 className="admin-section-title">5. Customer Review (Optional)</h2>
          <div className="admin-form-group" style={{ marginBottom: "16px" }}>
            <label className="admin-label" htmlFor="reviewName">
              Reviewer Name on Comment
            </label>
            <input
              id="reviewName"
              type="text"
              className="admin-input"
              placeholder="e.g. Limon Islam Shadhin"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              maxLength={100}
            />
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="reviewTextBn">
                Review Text (Bangla)
              </label>
              <textarea
                id="reviewTextBn"
                rows={3}
                className="admin-input admin-textarea"
                placeholder="Buyer's words in Bangla..."
                value={reviewTextBn}
                onChange={(e) => setReviewTextBn(e.target.value)}
                maxLength={2000}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="reviewTextEn">
                Review Text (English)
              </label>
              <textarea
                id="reviewTextEn"
                rows={3}
                className="admin-input admin-textarea"
                placeholder="Buyer's words translated to English..."
                value={reviewTextEn}
                onChange={(e) => setReviewTextEn(e.target.value)}
                maxLength={2000}
              />
            </div>
          </div>

          <label className="admin-checkbox-label" style={{ marginTop: "12px" }}>
            <input
              type="checkbox"
              checked={reviewTranslated}
              onChange={(e) => setReviewTranslated(e.target.checked)}
            />
            <span>Show "Translated from Bangla" footnote on English view</span>
          </label>
        </section>

        {/* SECTION 6: Photo Manager with Compression & Cover Selection */}
        <section className="admin-card">
          <div className="admin-flex-between" style={{ marginBottom: "16px" }}>
            <div>
              <h2 className="admin-section-title">6. Photos & Lightbox Media</h2>
              <p className="admin-desc">
                Upload real delivery photos. Images are automatically compressed to WebP and
                thumbnails are generated before saving. (Max 15MB each, JPG/PNG/WebP).
              </p>
            </div>
            <label className="admin-btn-secondary" style={{ cursor: "pointer" }}>
              <UploadSimple size={16} />
              <span>{uploading ? "Processing..." : "Upload Photos"}</span>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                style={{ display: "none" }}
                onChange={handlePhotoSelect}
                disabled={uploading}
              />
            </label>
          </div>

          {photos.length === 0 ? (
            <div className="admin-dropzone" onClick={() => fileInputRef.current?.click()}>
              <Images size={36} color="var(--muted)" />
              <p>No photos uploaded yet.</p>
              <span className="admin-dropzone-cta">
                Click here or use the button above to upload delivery photos.
              </span>
            </div>
          ) : (
            <div className="admin-photo-grid">
              {photos.map((p, idx) => (
                <div
                  key={`${p.url}-${idx}`}
                  className={`admin-photo-card ${p.is_cover ? "is-cover" : ""}`}
                >
                  <div className="admin-photo-img-wrap">
                    <img
                      src={p.thumb_url || p.url}
                      alt={`Photo ${idx + 1}`}
                      className="admin-photo-img"
                    />
                    {p.is_cover && (
                      <span className="admin-cover-badge">
                        <CheckCircle size={12} weight="fill" />
                        Cover Photo
                      </span>
                    )}
                  </div>

                  <div className="admin-photo-meta">
                    <span className="admin-photo-order">#{idx + 1}</span>
                    {!p.is_cover && (
                      <button
                        type="button"
                        className="admin-cover-btn"
                        onClick={() => handleSetCover(idx)}
                      >
                        Set as Cover
                      </button>
                    )}
                  </div>

                  <div className="admin-photo-actions">
                    <button
                      type="button"
                      className="admin-icon-btn"
                      disabled={idx === 0}
                      onClick={() => handleMovePhoto(idx, -1)}
                      title="Move Left"
                    >
                      <CaretLeft size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn"
                      disabled={idx === photos.length - 1}
                      onClick={() => handleMovePhoto(idx, 1)}
                      title="Move Right"
                    >
                      <CaretRight size={14} />
                    </button>
                    <button
                      type="button"
                      className="admin-icon-btn delete"
                      onClick={() => handleRemovePhoto(idx)}
                      title="Remove Photo"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <div className="admin-form-footer">
          <Link to="/admin/deliveries" className="admin-btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="admin-btn-primary"
            style={{ width: "auto" }}
            disabled={submitting || uploading}
          >
            <FloppyDisk size={18} />
            <span>{submitting ? "Saving..." : isEdit ? "Update Delivery" : "Create Delivery"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
