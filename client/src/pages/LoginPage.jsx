import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, X } from "lucide-react";
import { useLoginMutation } from "../redux/services/authApi";
import { setCredentials } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/Dispatch/useAppDispatch";
import faviconImg from "../assets/favicon.png";

export default function LoginPage({
  isModal = false,
  onClose,
  onSwitchToRegister,
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const result = await loginUser({
        email: form.email,
        password: form.password,
      }).unwrap();
      dispatch(setCredentials({ user: result.user, token: result.token }));
      if (isModal) onClose();
      else navigate("/");
    } catch (err) {
      const msg = err?.data?.message || "Invalid email or password";
      setErrors({ apiError: msg });
    }
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const cardContent = (
    <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-[460px] shadow-2xl relative border border-gray-100">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-8">
        <img src={faviconImg} alt="Logo" className="w-10 h-10 object-contain" />
        <span className="text-xl font-extrabold tracking-tight text-gray-900">
          Pinnacle <span className="text-[#e56419]">Systems</span>
        </span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
      <p className="text-gray-500 text-[15px] mb-8">
        Sign in to your account to manage your payroll.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        {errors.apiError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {errors.apiError}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="login-email"
            className="text-[14px] font-semibold text-gray-700"
          >
            Email address
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.email ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Mail size={18} className="text-gray-400 shrink-0" />
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="login-password"
              className="text-[14px] font-semibold text-gray-700"
            >
              Password
            </label>
            <Link
              to="#"
              className="text-[#e56419] hover:text-[#d45610] text-[13px] font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.password ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Lock size={18} className="text-gray-400 shrink-0" />
            <input
              id="login-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="mt-2 h-12 bg-[#e56419] hover:bg-[#d45610] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(229,100,25,0.4)] hover:shadow-[0_6px_20px_rgba(229,100,25,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {" "}
              Sign in <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <p className="text-center text-[14px] text-gray-500 mt-8">
        Don't have an account?{" "}
        {isModal ? (
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-[#e56419] font-bold hover:underline cursor-pointer"
          >
            Create one
          </button>
        ) : (
          <Link
            to="/register"
            className="text-[#e56419] font-bold hover:underline"
          >
            Create one
          </Link>
        )}
      </p>
    </div>
  );

  if (isModal) return cardContent;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#e56419]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#e56419]/10 blur-[80px] pointer-events-none" />

      {cardContent}
    </div>
  );
}
