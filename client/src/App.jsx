import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ScrollToHash } from '@/components/ScrollToHash'
import { AuthModalProvider } from '@/components/auth-modal-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const Home = lazy(() => import('./pages/Home'))
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
              {/* Landing Page */}
              <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            </Routes>
          </Suspense>
      </AuthModalProvider>
    </BrowserRouter>
  )
}
