import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ScrollToHash } from '@/components/ScrollToHash'
import { AuthModalProvider } from '@/components/auth-modal-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import AdminRoute from '@/components/AdminRoute'

const Home = lazy(() => import('./pages/Home'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <AuthModalProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Customer auth */}
              {/* <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} /> */}

              {/* Storefront */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
              <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />

              {/* ── Admin area ── */}
              <Route path="/admin">
                <Route index element={<AdminLogin />} />
                <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
      </AuthModalProvider>
    </BrowserRouter>
  )
}
