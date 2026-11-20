import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { SignIn } from "@phosphor-icons/react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/admin.css";

export default function AdminLogin() {
  const { session, isAdmin, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already authenticated as admin, redirect to deliveries
  if (!authLoading && session && isAdmin) {
    return <Navigate to="/admin/deliveries" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMsg(error.message || "Failed to sign in. Please verify your credentials.");
      setSubmitting(false);
      return;
    }

    navigate("/admin/deliveries");
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <img
            src="/favicon.png"
            width="36"
            height="36"
            alt="Rifath's Gadget"
            className="admin-login-logo"
          />
          <h1 className="admin-login-title">Admin Dashboard</h1>
          <p className="admin-login-sub">Sign in to manage deliveries and reviews</p>
        </div>

        {errorMsg && <div className="admin-alert-error">{errorMsg}</div>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-email">
              Email Address
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rifathsgadget.com"
              required
              autoComplete="email"
              spellCheck={false}
              enterKeyHint="next"
              disabled={submitting}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              enterKeyHint="done"
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="admin-btn-primary"
            disabled={submitting}
          >
            <SignIn size={18} />
            <span>{submitting ? "Signing in..." : "Sign In"}</span>
          </button>
        </form>

        <Link to="/" className="admin-back-link">
          ← Back to public site
        </Link>
      </div>
    </div>
  );
}
