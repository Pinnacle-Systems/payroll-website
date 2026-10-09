import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  User,
  LogIn,
  LogOut,
  Search,
  ChevronDown,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "./auth-modal-provider";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/Dispatch/useAppDispatch";
import {
  selectCurrentUser,
  selectIsAuthenticated,
  logout,
} from "@/redux/features/authSlice";
import logo from "@/assets/pinnacle.jpg";

const navLinks = [
  { name: "Features", href: "/#features" },
  { name: "Workflow", href: "/#workflow" },
  { name: "Compliance", href: "/#compliance" },
  { name: "Industries", href: "/#industries" },
  { name: "Pricing", href: "/#pricing" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openLogin, openRegister } = useAuthModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center group mr-8">
            <img src={logo} alt="Logo" className="h-14 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-foreground text-[15px] font-medium hover:text-[#e56419] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1"></div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {/* <button className="p-2 hover:bg-muted rounded-full transition-colors hidden sm:flex">
              <Search className="w-5 h-5 text-foreground" />
            </button> */}

            {/* Auth section – desktop */}
            <div className="hidden md:flex items-center gap-6">
              {isAuthenticated && user ? (
                <div className="relative group">
                  <div className="flex items-center gap-2 px-2 py-1.5 pr-4 rounded-full bg-[#f4ebe6] border border-[#e56419]/20 cursor-pointer transition-colors hover:bg-[#e8dcd5]">
                    <div className="w-7 h-7 rounded-full bg-[#e56419] flex items-center justify-center shadow-sm">
                      <span className="text-white text-xs font-bold uppercase">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[13px] font-semibold text-gray-800">
                      {user.name}
                    </span>
                  </div>

                  {/* Hover Dropdown Menu */}
                  <div className="absolute right-0 top-full pt-2 w-44 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden py-1.5">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2.5 px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        <User size={16} className="text-gray-400" /> Profile
                      </Link>
                      <Link
                        to="/my-plan"
                        className="flex items-center gap-2.5 px-4 py-2 text-[14px] text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                      >
                        <Package size={16} className="text-gray-400" /> My Plans
                      </Link>
                      <div className="border-t border-gray-100 my-1.5"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-[14px] text-red-500 hover:bg-red-50 transition-colors font-medium"
                      >
                        <LogOut size={16} className="text-red-500" /> Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={openLogin}
                    className="text-[#e56419] font-semibold text-[15px] hover:underline"
                  >
                    Sign In
                  </button>
                  <Button
                    onClick={openRegister}
                    className="bg-[#e56419] hover:bg-[#cc161f] text-white font-bold rounded shadow-sm px-6 py-2.5 text-[15px]"
                  >
                    Sign up now
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-[80vh]" : "max-h-0 overflow-hidden"}`}
      >
        <nav className="px-4 py-4 bg-card border-t border-border">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors font-medium flex items-center gap-1">
              <span>All Products</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>

            <div className="mt-2 flex flex-col gap-2">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#f4ebe6] rounded-xl border border-[#e56419]/20 mt-2">
                    <div className="w-9 h-9 rounded-full bg-[#e56419] flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold uppercase">
                        {user.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-[15px] font-semibold text-gray-800">
                      {user.name}
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    className="px-4 py-3 mt-1 text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="text-gray-400" /> Profile
                  </Link>

                  <Link
                    to="/my-plan"
                    className="px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium flex items-center gap-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Package size={18} className="text-gray-400" /> My Plans
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-xl flex items-center gap-3 mt-1 px-4 py-3 text-[15px] text-red-500 hover:bg-red-50 transition-colors font-medium"
                  >
                    <LogOut size={18} className="text-red-500" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openLogin();
                    }}
                    className="w-full text-red-600 font-semibold text-[15px] py-2 hover:underline"
                  >
                    Sign In
                  </button>
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      openRegister();
                    }}
                    className="w-full bg-[#e51923] hover:bg-[#cc161f] text-white font-bold rounded shadow-sm py-2.5 text-[15px]"
                  >
                    Sign up now
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
