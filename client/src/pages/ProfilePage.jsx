import { useState, useEffect } from "react";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/services/authApi";
import {
  User,
  Mail,
  Phone,
  Lock,
  Calendar,
  ShieldCheck,
  Loader2,
  Edit3,
  Save,
  X,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Building,
  FileText,
} from "lucide-react";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
];

const InputField = ({
  icon: Icon,
  label,
  name,
  type = "text",
  placeholder,
  readonly,
  required = false,
  value,
  onChange,
  isEditing,
  isUpdating,
  error,
}) => {
  const isPass = name.toLowerCase().includes("password");
  const [show, setShow] = useState(false);

  return (
    <div className={`flex flex-col gap-2 ${isPass && !isEditing ? "hidden" : "block"}`}>
      <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
        <Icon size={14} className="text-gray-500" />
        {label} {required && <span className="text-red-500">*</span>}
        {isPass && (
          <span className="text-gray-400 font-normal normal-case tracking-normal">
            (optional)
          </span>
        )}
      </label>
      <div className="relative">
        <input
          type={isPass && !show ? "password" : type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readonly}
          disabled={isUpdating}
          placeholder={placeholder}
          className={`w-full h-[42px] px-5 rounded-full border text-[14px] font-medium text-gray-900 transition-all outline-none ${
            error
              ? "border-red-400 bg-red-50/30 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : readonly
                ? "border-gray-200 bg-gray-50/50 cursor-not-allowed text-gray-600"
                : "border-[#e56419]/30 bg-white focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20"
          } ${isPass && !readonly ? 'pr-10' : ''}`}
        />
        {isPass && !readonly && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShow((v) => !v)}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <span className="text-red-500 text-xs font-medium">{error}</span>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const { data: user, isLoading, error } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    companyName: "",
    gst: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        companyName: user.companyName || "",
        gst: user.gst || "",
        password: "",
      });
    }
  }, [user, isEditing]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] pt-24 pb-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#e56419]" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] p-4 pt-24 pb-12">
        <div className="bg-white border border-gray-200 p-8 rounded-3xl max-w-md w-full text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Profile Unavailable
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please log in to view and manage your profile settings.
          </p>
        </div>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Username is required";
    if (!form.companyName.trim()) errs.companyName = "Company name is required";
    if (!form.gst.trim()) errs.gst = "GST is required";
    if (!form.mobile) {
      errs.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(form.mobile)) {
      errs.mobile = "Enter a valid 10-digit mobile number";
    }
    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email";
    }

    if (form.password) {
      if (form.password.length < 8) errs.password = "At least 8 characters";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const payload = {
        name: form.name,
        email: form.email,
        mobile: form.mobile,
        companyName: form.companyName,
        gst: form.gst,
      };
      if (form.password) {
        payload.password = form.password;
      }

      await updateProfile(payload).unwrap();
      setSuccessMsg("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrors({
        apiError: err?.data?.message || err?.message || "Update failed",
      });
    }
  };

  const initial = user.name?.charAt(0).toUpperCase() || "U";

  const commonProps = {
    onChange: handleChange,
    isEditing,
    isUpdating,
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#faf9f8] relative overflow-hidden pt-24 pb-12">
      {/* Decorative background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#e56419]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#e56419]/5 blur-[80px] pointer-events-none" />

      <div className="w-full max-w-[850px] relative flex flex-col gap-6">
        
        {/* Profile Header Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#e56419]/10 border border-[#e56419]/20 flex items-center justify-center text-[#e56419] text-2xl font-extrabold shadow-inner shrink-0">
              {initial}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#e56419]/10 text-[#e56419] uppercase tracking-wider">
                  {user.role || "User"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Mail size={14} className="text-gray-400" /> {user.email}
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" /> Joined{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Recently"}
                </span>
              </div>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 bg-[#e56419] hover:bg-[#d45610] text-white rounded-full text-sm font-bold transition-all shadow-[0_4px_14px_rgba(229,100,25,0.4)] flex items-center gap-2"
            >
              <Edit3 size={16} /> Edit Profile
            </button>
          )}
        </div>

        {/* Alerts */}
        {successMsg && (
          <div className="p-4 bg-[#e56419]/10 border border-[#e56419]/20 text-[#e56419] rounded-2xl text-sm font-bold flex items-center gap-2">
            <Check size={18} /> {successMsg}
          </div>
        )}
        {errors.apiError && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-2">
            <AlertCircle size={18} /> {errors.apiError}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <User className="w-5 h-5 text-[#e56419]" /> Personal Information
            </h2>
            {isEditing && (
              <span className="px-3 py-1 bg-[#e56419]/10 text-[#e56419] border border-[#e56419]/20 text-[11px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e56419] animate-pulse"></span>
                Editing Mode
              </span>
            )}
          </div>
          
          <div className="h-px bg-gray-100 w-full mb-6"></div>

          <form onSubmit={handleSave} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <InputField
                icon={User}
                label="Username"
                name="name"
                placeholder="John Doe"
                readonly={!isEditing}
                required
                value={form.name}
                error={errors.name}
                {...commonProps}
              />
              <InputField
                icon={Mail}
                label="Email address"
                name="email"
                type="email"
                placeholder="you@company.com"
                readonly={!isEditing}
                required
                value={form.email}
                error={errors.email}
                {...commonProps}
              />
              <InputField
                icon={Phone}
                label="Mobile number"
                name="mobile"
                type="tel"
                placeholder="9876543210"
                readonly={!isEditing}
                required
                value={form.mobile}
                error={errors.mobile}
                {...commonProps}
              />
              <InputField
                icon={Building}
                label="Company name"
                name="companyName"
                placeholder="Your Company"
                readonly={!isEditing}
                required
                value={form.companyName}
                error={errors.companyName}
                {...commonProps}
              />
              <InputField
                icon={FileText}
                label="GST Number"
                name="gst"
                placeholder="GST Number"
                readonly={!isEditing}
                required
                value={form.gst}
                error={errors.gst}
                {...commonProps}
              />
              <InputField
                icon={Lock}
                label="Password"
                name="password"
                type="password"
                placeholder="Leave blank to keep current"
                readonly={!isEditing}
                value={form.password}
                error={errors.password}
                {...commonProps}
              />
            </div>

            {isEditing && form.password && (
              <ul className="flex flex-wrap gap-4 mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {PASSWORD_RULES.map((r) => (
                  <li
                    key={r.label}
                    className={`text-xs flex items-center gap-1.5 font-bold tracking-wide ${r.test(form.password) ? "text-[#e56419]" : "text-gray-400"}`}
                  >
                    {r.test(form.password) ? (
                      <Check size={14} className="stroke-[3]" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 ml-0.5" />
                    )}
                    {r.label}
                  </li>
                ))}
              </ul>
            )}

            {isEditing && (
              <>
                <div className="h-px bg-gray-100 w-full mt-8 mb-6"></div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                    }}
                    disabled={isUpdating}
                    className="px-6 h-11 rounded-full bg-[#f4ebe6] hover:bg-[#e8dcd5] text-gray-900 text-sm font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-6 h-11 bg-[#e56419] hover:bg-[#d45610] text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(229,100,25,0.4)] disabled:opacity-70"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Save size={16} /> Save Changes
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
