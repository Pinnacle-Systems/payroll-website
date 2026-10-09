import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToHash } from "@/components/ScrollToHash";
import { AuthModalProvider } from "@/components/auth-modal-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import AdminRoute from "./components/AdminRoute";

const Home = lazy(() => import("./pages/Home"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const MyPlanPage = lazy(() => import("./pages/MyPlanPage"));

// Admin Pages
const AdminLoginPage = lazy(() => import("./pages/admin/AdminLoginPage"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminPayperiodPage = lazy(
  () => import("./pages/admin/AdminPayperiodPage"),
);
const AdminFeaturesPage = lazy(() => import("./pages/admin/AdminFeaturesPage"));
const AdminUserPlanPage = lazy(() => import("./pages/admin/AdminUserPlanPage"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <AuthModalProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public/User Pages */}
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/profile"
              element={
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              }
            />
            <Route
              path="/my-plan"
              element={
                <MainLayout>
                  <MyPlanPage />
                </MainLayout>
              }
            />

            {/* Admin Pages */}
            <Route path="/admin" element={<AdminLoginPage />} />

            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<Navigate to="users" replace />} />
              <Route path="users" element={<AdminUsersPage />} />
              <Route path="users/:id/plan" element={<AdminUserPlanPage />} />
              <Route path="payperiods" element={<AdminPayperiodPage />} />
              <Route path="features" element={<AdminFeaturesPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthModalProvider>
    </BrowserRouter>
  );
}

