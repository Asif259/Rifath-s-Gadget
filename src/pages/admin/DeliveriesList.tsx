import { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  MagnifyingGlass,
  PencilSimple,
  Trash,
  Images,
  Tag,
  CheckCircle,
  XCircle,
  Eye,
  Star,
  Sparkle,
  WarningCircle,
  ArrowUp,
} from "@phosphor-icons/react";
import { supabase } from "../../lib/supabase";
import { deleteStoragePaths } from "../../lib/storage";
import type { DeliveryRow, DeliveryPhoto } from "../../types/delivery";

type FilterTab = "all" | "top8" | "seemore" | "published" | "draft" | "hero" | "featured";

export default function DeliveriesList() {
  const [deliveries, setDeliveries] = useState<DeliveryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // Delete modal state
  const [itemToDelete, setItemToDelete] = useState<DeliveryRow | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const fetchDeliveries = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { data, error } = await supabase
        .from("deliveries")
        .select("*")
        .order("sort_order", { ascending: false })
        .order("id", { ascending: false });

      if (error) {
        throw error;
      }
      setDeliveries((data as DeliveryRow[]) || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Failed to load deliveries: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Map of published delivery ID -> rank (1 to N, sorted by sort_order desc, id desc)
  const publishedOrderMap = useMemo(() => {
    const published = [...deliveries]
      .filter((d) => d.is_published)
      .sort((a, b) => (b.sort_order ?? 0) - (a.sort_order ?? 0) || b.id - a.id);

    const map = new Map<number, number>();
    published.forEach((d, idx) => {
      map.set(d.id, idx + 1);
    });
    return map;
  }, [deliveries]);

  const maxSortOrder = useMemo(() => {
    if (deliveries.length === 0) return 0;
    return Math.max(...deliveries.map((d) => d.sort_order ?? 0));
  }, [deliveries]);

  const top8Count = useMemo(() => {
    return Math.min(8, publishedOrderMap.size);
  }, [publishedOrderMap]);

  const seeMoreCount = useMemo(() => {
    return Math.max(0, publishedOrderMap.size - 8);
  }, [publishedOrderMap]);

  // Filtered deliveries list
  const filteredDeliveries = useMemo(() => {
    return deliveries.filter((d) => {
      // 1. Tab filter
      if (activeTab === "top8") {
        const rank = publishedOrderMap.get(d.id);
        return Boolean(d.is_published && rank && rank <= 8);
      }
      if (activeTab === "seemore") {
        const rank = publishedOrderMap.get(d.id);
        return Boolean(d.is_published && rank && rank > 8);
      }
      if (activeTab === "published" && !d.is_published) return false;
      if (activeTab === "draft" && d.is_published) return false;
      if (activeTab === "hero" && !d.is_hero) return false;
      if (activeTab === "featured" && !d.is_featured) return false;

      // 2. Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchModel = d.model.toLowerCase().includes(q);
      const matchBuyerEn = d.buyer_name_en.toLowerCase().includes(q);
      const matchBuyerBn = d.buyer_name_bn.toLowerCase().includes(q);
      return matchModel || matchBuyerEn || matchBuyerBn;
    });
  }, [deliveries, activeTab, searchQuery, publishedOrderMap]);

  // Quick promote to Top 8 Slot #1
  const handlePromoteToTop = async (delivery: DeliveryRow) => {
    const newSortOrder = (maxSortOrder || 0) + 10;
    // Optimistic UI update
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === delivery.id ? { ...d, sort_order: newSortOrder, is_published: true } : d
      )
    );

    const { error } = await supabase
      .from("deliveries")
      .update({ sort_order: newSortOrder, is_published: true } as any)
      .eq("id", delivery.id);

    if (error) {
      setErrorMsg(`Failed to promote delivery: ${error.message}`);
      fetchDeliveries();
    }
  };

  // Inline toggle for status flags (is_published, is_hero, is_featured)
  const handleToggle = async (
    id: number,
    field: "is_published" | "is_hero" | "is_featured",
    currentVal: boolean
  ) => {
    const newVal = !currentVal;
    // Optimistic UI update
    setDeliveries((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: newVal } : d))
    );

    const { error } = await supabase
      .from("deliveries")
      .update({ [field]: newVal } as any)
      .eq("id", id);

    if (error) {
      // Revert if error occurs
      setDeliveries((prev) =>
        prev.map((d) => (d.id === id ? { ...d, [field]: currentVal } : d))
      );
      setErrorMsg(`Could not update ${field}: ${error.message}`);
    }
  };

  // Open native dialog for delete confirmation
  const openDeleteModal = (delivery: DeliveryRow) => {
    setItemToDelete(delivery);
    deleteDialogRef.current?.showModal();
  };

  const closeDeleteModal = () => {
    deleteDialogRef.current?.close();
    setItemToDelete(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);

    try {
      // 1. Delete row from database
      const { error: dbError } = await supabase
        .from("deliveries")
        .delete()
        .eq("id", itemToDelete.id);

      if (dbError) throw dbError;

      // 2. Clean up any Supabase Storage files
      const photos = Array.isArray(itemToDelete.photos) ? itemToDelete.photos : [];
      const pathsToDelete: string[] = [];
      photos.forEach((p: DeliveryPhoto) => {
        if (p.storage_path) pathsToDelete.push(p.storage_path);
        if (p.thumb_path) pathsToDelete.push(p.thumb_path);
      });

      if (pathsToDelete.length > 0) {
        await deleteStoragePaths(pathsToDelete);
      }

      // 3. Remove from local state
      setDeliveries((prev) => prev.filter((d) => d.id !== itemToDelete.id));
      closeDeleteModal();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Failed to delete delivery: ${msg}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const getCoverThumb = (photos: DeliveryPhoto[]): string => {
    if (!photos || photos.length === 0) return "/favicon.png";
    const cover = photos.find((p) => p.is_cover) || photos[0];
    return cover.thumb_url || cover.url || "/favicon.png";
  };

  return (
    <div className="admin-deliveries-page">
      <div className="admin-page-head">
        <div>
          <h1 className="h2 admin-title">Deliveries</h1>
          <p className="admin-desc">
            Manage live laptop delivery stories, buyer feedback, and specs.
          </p>
        </div>
        <Link to="/admin/deliveries/new" className="admin-btn-primary" style={{ width: "auto" }}>
          <Plus size={16} weight="bold" />
          <span>Add Delivery</span>
        </Link>
      </div>

      {errorMsg && <div className="admin-alert-error">{errorMsg}</div>}

      {/* Homepage Slot Management Banner */}
      <div className="admin-slots-banner">
        <div className="admin-slots-left">
          <span className="admin-slots-tag">Homepage Layout:</span>
          <span className="admin-slots-pill active">
            <CheckCircle size={14} weight="fill" />
            {top8Count} / 8 on Homepage Grid
          </span>
          {seeMoreCount > 0 ? (
            <span className="admin-slots-pill seemore">
              {seeMoreCount} in &ldquo;See more&rdquo; section
            </span>
          ) : (
            <span className="admin-slots-pill muted">
              0 in &ldquo;See more&rdquo;
            </span>
          )}
        </div>
        <p className="admin-slots-hint">
          The homepage displays the top 8 published deliveries (sorted by highest Sort Order). Any additional published deliveries automatically appear when visitors click &ldquo;See more&rdquo;.
        </p>
      </div>

      {/* Toolbar: Search input + filter tabs */}
      <div className="admin-toolbar">
        <div className="admin-search-wrap">
          <MagnifyingGlass size={16} className="admin-search-icon" />
          <input
            type="search"
            className="admin-search-input"
            placeholder="Search by model or buyer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="admin-filter-tabs">
          {(
            [
              { id: "all", label: "All", count: deliveries.length },
              { id: "top8", label: "Homepage (Top 8)", count: `${top8Count}/8` },
              { id: "seemore", label: `"See More" (9+)`, count: seeMoreCount },
              { id: "published", label: "Published", count: publishedOrderMap.size },
              { id: "draft", label: "Drafts", count: deliveries.filter((d) => !d.is_published).length },
              { id: "hero", label: "Hero Deals", count: deliveries.filter((d) => d.is_hero).length },
              { id: "featured", label: "Featured", count: deliveries.filter((d) => d.is_featured).length },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id as FilterTab)}
            >
              {tab.label}
              <span className="admin-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div className="admin-empty-state">Loading deliveries...</div>
        ) : filteredDeliveries.length === 0 ? (
          <div className="admin-empty-state">
            <Images size={36} color="var(--muted)" />
            <p>No deliveries found matching your search or filter.</p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>Cover</th>
                  <th>Model & Highlights</th>
                  <th>Buyer</th>
                  <th>Saving</th>
                  <th>Photos</th>
                  <th>Status & Placement</th>
                  <th>Order</th>
                  <th style={{ textAlign: "right", width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeliveries.map((d) => (
                  <tr key={d.id}>
                    {/* Thumbnail */}
                    <td>
                      <img
                        src={getCoverThumb(d.photos)}
                        alt={d.model}
                        className="admin-table-thumb"
                        loading="lazy"
                      />
                    </td>

                    {/* Model + Highlights */}
                    <td>
                      <div className="admin-table-model">{d.model}</div>
                      <div className="admin-table-chips">
                        {d.highlights?.slice(0, 3).map((h) => (
                          <span key={h} className="admin-chip">
                            {h}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Buyer */}
                    <td>
                      <div className="admin-buyer-name">{d.buyer_name_en}</div>
                      <div className="admin-buyer-bn">{d.buyer_name_bn}</div>
                    </td>

                    {/* Saving */}
                    <td>
                      <span className="admin-saving-pill">
                        <Tag size={13} />
                        ৳{Number(d.saving).toLocaleString("en-US")}
                      </span>
                    </td>

                    {/* Photo count */}
                    <td>
                      <span className="admin-photo-count">
                        <Images size={14} />
                        {d.photos?.length || 0}
                      </span>
                    </td>

                    {/* Quick status toggles */}
                    <td>
                      <div className="admin-toggle-group">
                        <button
                          type="button"
                          className={`admin-status-toggle ${
                            d.is_published ? "active" : "inactive"
                          }`}
                          title={d.is_published ? "Published (click to unpublish)" : "Draft (click to publish)"}
                          onClick={() => handleToggle(d.id, "is_published", d.is_published)}
                        >
                          {d.is_published ? (
                            <>
                              <CheckCircle size={14} weight="fill" />
                              <span>Live</span>
                            </>
                          ) : (
                            <>
                              <XCircle size={14} weight="fill" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          className={`admin-status-toggle ${d.is_hero ? "hero-on" : "inactive"}`}
                          title={d.is_hero ? "In Hero rotation" : "Add to Hero"}
                          onClick={() => handleToggle(d.id, "is_hero", d.is_hero)}
                        >
                          <Sparkle size={13} weight={d.is_hero ? "fill" : "regular"} />
                          <span>Hero</span>
                        </button>

                        <button
                          type="button"
                          className={`admin-status-toggle ${d.is_featured ? "featured-on" : "inactive"}`}
                          title={d.is_featured ? "Featured in proof strip" : "Feature review"}
                          onClick={() => handleToggle(d.id, "is_featured", d.is_featured)}
                        >
                          <Star size={13} weight={d.is_featured ? "fill" : "regular"} />
                          <span>Featured</span>
                        </button>
                      </div>
                    </td>

                    {/* Sort Order */}
                    <td style={{ color: "var(--muted)", fontSize: "13px" }}>
                      {d.sort_order}
                    </td>

                    {/* Action buttons */}
                    <td>
                      <div className="admin-actions-cell">
                        <Link
                          to={`/admin/deliveries/${d.id}`}
                          className="admin-icon-btn edit"
                          title="Edit Delivery"
                        >
                          <PencilSimple size={16} />
                        </Link>
                        <button
                          type="button"
                          className="admin-icon-btn delete"
                          title="Delete Delivery"
                          onClick={() => openDeleteModal(d)}
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Native Delete Confirmation Dialog */}
      <dialog
        ref={deleteDialogRef}
        className="admin-dialog"
        aria-labelledby="delete-dialog-title"
      >
        <div className="admin-dialog-body">
          <div className="admin-dialog-icon danger">
            <WarningCircle size={28} weight="fill" />
          </div>
          <div>
            <h2 id="delete-dialog-title" className="admin-dialog-title">
              Delete Delivery?
            </h2>
            <p className="admin-dialog-text">
              Are you sure you want to delete <strong>{itemToDelete?.model}</strong> (
              {itemToDelete?.buyer_name_en})? This will permanently delete the record and its
              uploaded photos from Supabase Storage.
            </p>
          </div>
        </div>

        <div className="admin-dialog-actions">
          <button
            type="button"
            className="admin-btn-secondary"
            onClick={closeDeleteModal}
            disabled={isDeleting}
            autoFocus
          >
            Cancel
          </button>
          <button
            type="button"
            className="admin-btn-danger"
            onClick={confirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </dialog>
    </div>
  );
}
