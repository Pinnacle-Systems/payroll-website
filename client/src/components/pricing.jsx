import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { useGetPublicPricingQuery } from "@/redux/services/publicApi";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "@/redux/services/paymentApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function Pricing() {
  const { data: payperiods = [], isLoading } = useGetPublicPricingQuery();
  const [activePeriodId, setActivePeriodId] = useState(null);
  
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [processingId, setProcessingId] = useState(null);

  // Set default active tab
  useEffect(() => {
    if (payperiods.length > 0 && !activePeriodId) {
      setActivePeriodId(payperiods[0].id);
    }
  }, [payperiods, activePeriodId]);

  const activePeriod = payperiods.find((p) => p.id === activePeriodId) || payperiods[0];

  const getCardStyles = (idx) => {
    // Featured logic (e.g. middle card)
    const featured = idx === 1; // You can make this dynamic if needed
    return {
      featured,
      ctaStyle: featured
        ? "w-full bg-white text-[#e56419] hover:bg-orange-50 py-6 text-base rounded-2xl font-bold shadow-lg cursor-pointer transition-all duration-200 mt-auto"
        : "w-full bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300 py-6 text-base rounded-2xl font-bold shadow-sm cursor-pointer transition-all duration-200 mt-auto",
      cardStyle: featured
        ? "bg-gradient-to-b from-[#e56419] to-[#d4551a] rounded-[32px] p-8 shadow-[0_16px_50px_rgba(229,100,25,0.35)] relative md:-translate-y-5 border border-[#e56419] h-full flex flex-col"
        : "bg-white rounded-[32px] p-8 border border-gray-100 shadow-[0_8px_30px_rgba(229,100,25,0.05)] hover:shadow-[0_12px_36px_rgba(229,100,25,0.10)] transition-all duration-300 h-full flex flex-col",
      checkStyle: featured ? "text-white" : "text-gray-400",
      badge: featured ? "Most Popular" : null,
    };
  };

  const loadRazorpay = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleGetStarted = async (plan) => {
    if (!user) {
      alert("Please login to proceed with the payment.");
      navigate("/login");
      return;
    }

    setProcessingId(plan.id);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setProcessingId(null);
      return;
    }

    try {
      const orderResult = await createOrder({
        payPeriodId: activePeriodId,
        payPeriodPriceId: plan.id,
        featureId: plan.featureId
      }).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_xxxx",
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "Payroll Website",
        description: `Subscription for ${plan.Features.name}`,
        order_id: orderResult.orderId,
        handler: async function (response) {
          try {
            const verifyResult = await verifyPayment({
              ...response,
              subscriptionId: orderResult.subscriptionId
            }).unwrap();
            alert(verifyResult.message);
            // Optionally redirect to dashboard
            // navigate("/dashboard");
          } catch (err) {
            alert(err.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.mobile || ""
        },
        theme: {
          color: "#e56419"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <section
      id="pricing"
      className="bg-[#fffaf5] py-16 border-b border-[#ffe0cc] relative overflow-hidden"
    >
      {/* Orange Shading */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#e56419]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <FadeIn className="text-center mb-12 space-y-4">
          <p className="text-[#e56419] font-bold tracking-[0.2em] text-xs sm:text-sm uppercase">
            Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] leading-tight tracking-tight">
            Simple, transparent <span className="text-[#e56419]">pricing.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            Choose the perfect plan for your business needs.
          </p>

          {/* Billing Period Tabs */}
          {isLoading ? (
            <div className="flex justify-center pt-8">
              <Loader2 className="animate-spin text-[#e56419] w-8 h-8" />
            </div>
          ) : payperiods.length > 0 ? (
            <div className="flex items-center justify-center pt-4">
              <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-2xl p-1.5 shadow-sm">
                {payperiods.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePeriodId(p.id)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      activePeriodId === p.id
                        ? "bg-[#e56419] text-white shadow-md"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 pt-8">No pricing plans available at the moment.</p>
          )}
        </FadeIn>

        {/* Pricing Cards */}
        {activePeriod && activePeriod.PayPeriodPrice && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
            {activePeriod.PayPeriodPrice.map((plan, idx) => {
              const styles = getCardStyles(idx);
              const isProcessing = processingId === plan.id;
              
              return (
                <FadeIn key={plan.id} delay={idx * 80} className={styles.cardStyle}>
                  {/* Badge */}
                  {styles.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-gray-900 text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
                        {styles.badge}
                      </span>
                    </div>
                  )}

                  {/* Plan name */}
                  <h3
                    className={`text-2xl font-extrabold mb-1 ${
                      styles.featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.Features?.name || "Plan"}
                  </h3>

                  {/* Tagline / Description */}
                  <p
                    className={`text-sm mb-6 leading-relaxed min-h-[40px] ${
                      styles.featured ? "text-white/75" : "text-gray-500"
                    }`}
                  >
                    {plan.Features?.description || "Get started with our basic features."}
                  </p>

                  {/* Price */}
                  <div className="mb-7">
                    <div className="flex items-end gap-1">
                      <span
                        className={`text-4xl font-black leading-none transition-all duration-200 ${
                          styles.featured ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ₹{plan.price}
                      </span>
                      <span
                        className={`text-sm font-medium mb-1 ${
                          styles.featured ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        / {activePeriod.name.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`h-px mb-6 ${
                      styles.featured ? "bg-white/20" : "bg-gray-100"
                    }`}
                  />

                  {/* Features */}
                  <ul className="space-y-3.5 mb-8 flex-grow">
                    {plan.payPeriodContents?.map((content) => (
                      <li key={content.id} className="flex items-start gap-3">
                        <div
                          className={`shrink-0 mt-0.5 ${
                            styles.featured ? "bg-white/15 rounded-full p-0.5" : ""
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 ${styles.checkStyle}`}
                            strokeWidth={2.5}
                          />
                        </div>
                        <span
                          className={`text-sm leading-snug ${
                            styles.featured
                              ? "text-white font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {content.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button 
                    className={styles.ctaStyle}
                    onClick={() => handleGetStarted(plan)}
                    disabled={isProcessing}
                  >
                    {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Get Started"}
                  </Button>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
