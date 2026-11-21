import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

export default function RequireAdmin() {
  const { session, isAdmin, loading } = useAuthStore();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "var(--page)",
          color: "var(--muted)",
          fontFamily: "var(--latin)",
          fontSize: "14px",
        }}
      >
        <span>Verifying access...</span>
      </div>
    );
  }

  if (!session || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
