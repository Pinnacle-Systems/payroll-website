import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { X } from "lucide-react";

const AuthModalContext = createContext(undefined);

const FADE_MS = 200;

export function AuthModalProvider({ children }) {
  // `open`        — whether the backdrop/wrapper is mounted
  // `activeType`  — which form is currently rendered ('login' | 'register')
  // `contentVisible` — opacity of the inner card (for switching animation)
  // `backdropVisible` — opacity of the backdrop (for open/close animation)

  const [open, setOpen] = useState(false);
  const [activeType, setActiveType] = useState("login");
  const [contentVisible, setContentVisible] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const switchTimer = useRef(null);

  // ── Open modal ─────────────────────────────────────────────────────────────
  const openModal = useCallback((type) => {
    setActiveType(type);
    setOpen(true);
    setContentVisible(false);
    setBackdropVisible(false);
    // Next tick → fade in
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setBackdropVisible(true);
        setContentVisible(true);
      })
    );
  }, []);

  // ── Close modal ────────────────────────────────────────────────────────────
  const closeAll = useCallback(() => {
    setContentVisible(false);
    setBackdropVisible(false);
    setTimeout(() => setOpen(false), FADE_MS + 20);
  }, []);

  // ── Switch form (login ↔ register) without closing ─────────────────────────
  const switchTo = useCallback((type) => {
    clearTimeout(switchTimer.current);
    // 1. Fade content out
    setContentVisible(false);
    switchTimer.current = setTimeout(() => {
      // 2. Swap the form while invisible
      setActiveType(type);
      // 3. Fade content back in
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setContentVisible(true))
      );
    }, FADE_MS);
  }, []);

  const openLogin    = useCallback(() => open ? switchTo("login")    : openModal("login"),    [open, openModal, switchTo]);
  const openRegister = useCallback(() => open ? switchTo("register") : openModal("register"), [open, openModal, switchTo]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeAll();
  };

  return (
    <AuthModalContext.Provider value={{ openLogin, openRegister, closeAll, modalType: activeType }}>
      {children}

      {open && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto py-10 px-4"
          style={{
            backgroundColor: `rgba(0,0,0,${backdropVisible ? 0.6 : 0})`,
            backdropFilter: `blur(${backdropVisible ? 6 : 0}px)`,
            transition: `background-color ${FADE_MS}ms ease, backdrop-filter ${FADE_MS}ms ease`,
          }}
        >
          {/* Card wrapper — stays mounted, only content fades */}
          <div
            className={`relative w-full transition-all duration-[200ms] ease-in-out ${
              activeType === "register" ? "max-w-[580px]" : "max-w-[460px]"
            }`}
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.97)",
              transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
            }}
          >
            {/* Close button */}
            <button
              onClick={closeAll}
              className="absolute top-4 right-4 z-50 p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {activeType === "login" ? (
              <LoginPage
                isModal={true}
                onClose={closeAll}
                onSwitchToRegister={openRegister}
              />
            ) : (
              <RegisterPage
                isModal={true}
                onClose={closeAll}
                onSwitchToLogin={openLogin}
              />
            )}
          </div>
        </div>
      )}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
