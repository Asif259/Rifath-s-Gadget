import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequireAdmin from "./components/admin/RequireAdmin";

// Lazy-load admin modules so public visitors never download admin chunk
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const DeliveriesList = lazy(() => import("./pages/admin/DeliveriesList"));
const DeliveryForm = lazy(() => import("./pages/admin/DeliveryForm"));

function AdminLoadingFallback() {
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
      <span>Loading dashboard...</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
        <Suspense fallback={<AdminLoadingFallback />}>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<RequireAdmin />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/deliveries" replace />} />
                <Route path="deliveries" element={<DeliveriesList />} />
                <Route path="deliveries/new" element={<DeliveryForm />} />
                <Route path="deliveries/:id" element={<DeliveryForm />} />
              </Route>
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
    </BrowserRouter>
  );
}
