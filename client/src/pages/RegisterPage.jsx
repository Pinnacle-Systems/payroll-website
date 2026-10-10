import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  ArrowRight,
  Check,
  Building,
  FileText,
  KeyRound,
} from "lucide-react";
import {
  useRegisterMutation,
  useSendOtpMutation,
} from "../redux/services/authApi";
import { setCredentials } from "../redux/features/authSlice";
import { useAppDispatch } from "../redux/Dispatch/useAppDispatch";
import faviconImg from "../assets/pinnacle.jpg";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

export default function RegisterPage({
  isModal = false,
  onClose,
  onSwitchToLogin,
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    companyName: "",
    gst: "",
    mobile: "",
    password: "",
    confirm: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [addData, { isLoading: isRegistering }] = useRegisterMutation();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.gst.trim()) errs.gst = "GST is required";
    if (!form.mobile) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!form.email) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "At least 8 characters";
    if (!form.confirm) errs.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)
      errs.confirm = "Passwords do not match";

    return errs;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      await sendOtp({ email: form.email }).unwrap();
      setStep(2);
    } catch (err) {
      const errMsg =
        err?.data?.message || err?.message || "Failed to send OTP.";
      setErrors({ apiError: errMsg });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.otp || form.otp.length !== 6) {
      setErrors({ apiError: "Please enter a valid 6-digit OTP." });
      return;
    }
    setErrors({});

    try {
      const result = await addData({
        name: form.name,
        email: form.email,
        companyName: form.companyName,
        gst: form.gst,
        mobile: form.mobile,
        password: form.password,
        otp: form.otp,
      }).unwrap();

      dispatch(setCredentials({ user: result.user, token: result.token }));
      if (isModal) onClose();
      else navigate("/");
    } catch (err) {
      const errMsg =
        err?.data?.message || err?.message || "Registration failed.";
      setErrors({ apiError: errMsg });
    }
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const cardContent = (
    <div className="bg-white rounded-3xl p-6  w-full max-w-[700px] shadow-2xl relative border border-gray-100">
      {/* Brand */}
      <div className="flex items-center gap-3 mb-4">
        <img src={faviconImg} alt="Logo" className="h-14 object-contain" />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Create your account
      </h1>
      <p className="text-gray-500 text-[15px] mb-8">
        Join thousands of companies simplifying their payroll today.
      </p>

      <form
        // onSubmit={step === 1 ? handleSendOtp : handleRegister}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        noValidate
      >
        {errors.apiError && (
          <div className="sm:col-span-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium text-center">
            {errors.apiError}
          </div>
        )}

        {/* Full Name */}
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            htmlFor="reg-name"
            className="text-[14px] font-semibold text-gray-700"
          >
            Full name
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.name ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <User size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.name}
            </span>
          )}
        </div>

        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-companyName"
            className="text-[14px] font-semibold text-gray-700"
          >
            Company name
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.companyName ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Building size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-companyName"
              name="companyName"
              type="text"
              autoComplete="companyName"
              placeholder="you@company.com"
              value={form.companyName}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {errors.companyName && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.companyName}
            </span>
          )}
        </div>
        {/* GST */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-gst"
            className="text-[14px] font-semibold text-gray-700"
          >
            GST Number
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.gst ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <FileText size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-gst"
              name="gst"
              type="text"
              autoComplete="gst"
              placeholder="GST Number"
              value={form.gst}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {errors.gst && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.gst}
            </span>
          )}
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-email"
            className="text-[14px] font-semibold text-gray-700"
          >
            Email address
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.email ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Mail size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
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

        {/* Mobile */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-mobile"
            className="text-[14px] font-semibold text-gray-700"
          >
            Mobile number
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.mobile ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Phone size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              placeholder="9876543210"
              value={form.mobile}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400"
            />
          </div>
          {errors.mobile && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.mobile}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-password"
            className="text-[14px] font-semibold text-gray-700"
          >
            Password
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.password ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Lock size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 w-full"
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.password}
            </span>
          )}

          {/* Password Rules */}
          {form.password && (
            <ul className="flex flex-col gap-1 mt-1">
              {PASSWORD_RULES.map((r) => (
                <li
                  key={r.label}
                  className={`text-xs flex items-center gap-1.5 ${r.test(form.password) ? "text-[#e56419]" : "text-gray-400"}`}
                >
                  {r.test(form.password) ? (
                    <Check size={12} />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />
                  )}
                  {r.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="reg-confirm"
            className="text-[14px] font-semibold text-gray-700"
          >
            Confirm password
          </label>
          <div
            className={`flex items-center gap-3 bg-gray-50 border ${errors.confirm ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
          >
            <Lock size={18} className="text-gray-400 shrink-0" />
            <input
              id="reg-confirm"
              name="confirm"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirm}
              onChange={handleChange}
              className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 w-full"
            />
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowConfirm((v) => !v)}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirm && (
            <span className="text-red-500 text-xs font-medium mt-1">
              {errors.confirm}
            </span>
          )}
        </div>

        {/* Submit / Step buttons */}
        {step === 1 ? (
          <button
            type="submit"
            className="sm:col-span-2 mt-4 h-12 bg-[#e56419] hover:bg-[#d45610] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(229,100,25,0.4)] hover:shadow-[0_6px_20px_rgba(229,100,25,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
            disabled={isSendingOtp}
          >
            {isSendingOtp ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {" "}
                Continue <ArrowRight size={18} />
              </>
            )}
          </button>
        ) : (
          <div className="sm:col-span-2 flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="reg-otp"
                className="text-[14px] font-semibold text-gray-700"
              >
                Enter OTP sent to {form.email}
              </label>
              <div
                className={`flex items-center gap-3 bg-gray-50 border ${errors.otp ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/20" : "border-gray-200 focus-within:border-[#e56419] focus-within:ring-[#e56419]/20"} focus-within:ring-4 rounded-xl px-4 h-12 transition-all`}
              >
                <KeyRound size={18} className="text-gray-400 shrink-0" />
                <input
                  id="reg-otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  value={form.otp}
                  onChange={handleChange}
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-gray-900 placeholder:text-gray-400 text-center tracking-widest font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="h-12 bg-[#e56419] hover:bg-[#d45610] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(229,100,25,0.4)] hover:shadow-[0_6px_20px_rgba(229,100,25,0.6)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {" "}
                  Verify & Create Account <Check size={18} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-medium text-gray-500 hover:text-gray-700 mt-2"
            >
              Back to details
            </button>
          </div>
        )}
      </form>

      <p className="text-center text-[14px] text-gray-500 mt-8">
        Already have an account?{" "}
        {isModal ? (
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#e56419] font-bold hover:underline cursor-pointer"
          >
            Login
          </button>
        ) : (
          <Link
            to="/login"
            className="text-[#e56419] font-bold hover:underline"
          >
            Login
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
