import { X, Play, Clock, Building, Quote } from "lucide-react";
import { useState } from "react";

export function DemoModal({ isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[850px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fade-in-up">
        {/* Close Button (Mobile) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 md:hidden p-2 bg-white/50 backdrop-blur-md rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Side: Information */}
        <div className="w-full md:w-[45%] bg-gradient-to-br from-[#fff7ef] to-[#fde8d7] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#e56419] opacity-[0.07] blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-xl lg:text-2xl font-extrabold text-gray-900 leading-tight">
              Get expert help to{" "}
              <span className="text-[#e56419]">transform your payroll</span>{" "}
              operations
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-xl bg-orange-100 text-[#e56419]">
                  <Play size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">10,000+</h4>
                  <p className="text-gray-600 text-sm">
                    Hours of helpful 1-on-1 demos done
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-xl bg-orange-100 text-[#e56419]">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">500,000+</h4>
                  <p className="text-gray-600 text-sm">
                    Man-hours saved through efficient payroll
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-xl bg-orange-100 text-[#e56419]">
                  <Building size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-base">100+</h4>
                  <p className="text-gray-600 text-sm">
                    Unique industries served globally
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <Quote className="text-[#e56419] mb-2 opacity-50" size={20} />
            <p className="text-gray-700 text-sm leading-relaxed font-medium mb-3">
              "Pinnacle Payroll processes payroll for 1,500 of our employees
              across 12 branches accurately, with zero disputes."
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-bold text-gray-900 text-xs">
                  Sarah Jenkins
                </h5>
                <p className="text-gray-500 text-[11px]">VP of HR, TechFlow Inc.</p>
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 text-xs">
                TF
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-[55%] bg-white p-6 md:p-8 overflow-y-auto relative">
          {/* Close Button (Desktop) */}
          <button
            onClick={onClose}
            className="hidden md:flex absolute top-5 right-5 p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <div className="max-w-[420px] mx-auto w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-5 hidden md:block">
              Request a demo
            </h3>

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Request Sent!
                </h3>
                <p className="text-gray-600 text-sm">
                  Our experts will be in touch with you shortly to schedule your
                  personalized demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-3">
                  <input
                    required
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full px-4 h-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Your Work Email"
                    className="w-full px-4 h-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Your Phone Number"
                    className="w-full px-4 h-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      required
                      className="w-full px-4 h-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm text-gray-600 appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>
                        Country
                      </option>
                      <option value="in">India</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                    </select>

                    <select
                      required
                      className="w-full px-4 h-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm text-gray-600 appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>
                        Employees
                      </option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201+">201+</option>
                    </select>
                  </div>

                  <textarea
                    rows="3"
                    placeholder="Explain your requirements briefly"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <div className="pt-1">
                  <p className="text-[11px] text-gray-500 mb-3 text-center">
                    By clicking "Submit", you agree to our{" "}
                    <a
                      href="#"
                      className="text-[#e56419] hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-[#e56419] hover:bg-[#d45610] text-white rounded-xl font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:hover:shadow-md text-sm"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Submit My Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
