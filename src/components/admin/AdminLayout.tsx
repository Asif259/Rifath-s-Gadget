import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowSquareOut, SignOut, Package } from "@phosphor-icons/react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link to="/admin/deliveries" className="admin-header-brand">
            <img src="/favicon.png" width="28" height="28" alt="Logo" />
            <span className="admin-header-title">Rifath’s Gadget</span>
            <span className="admin-badge-role">Admin</span>
          </Link>

          <nav className="admin-header-nav">
            <NavLink
              to="/admin/deliveries"
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <Package size={16} />
              <span>Deliveries</span>
            </NavLink>
          </nav>
        </div>

        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-nav-link"
            title="View Live Public Site"
          >
            <span>Live Site</span>
            <ArrowSquareOut size={15} />
          </a>

          {user?.email && <span className="admin-user-pill">{user.email}</span>}

          <button
            type="button"
            className="admin-btn-signout"
            onClick={handleSignOut}
            title="Sign out of Admin Dashboard"
          >
            <SignOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>

      <footer className="admin-footer">
        <div className="admin-footer-inner caption-2 muted">
          <span>© {new Date().getFullYear()} Rifath’s Gadget</span>
          <span className="admin-footer-credit">
            Designed &amp; built by{" "}
            <a
              href="https://ashrafulasif.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-link"
            >
              Asif
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
