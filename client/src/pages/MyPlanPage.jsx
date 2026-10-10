import { useGetMyPlanQuery } from "@/redux/services/paymentApi";
import { Loader2, Package, Calendar, CheckCircle2 } from "lucide-react";

export default function MyPlanPage() {
  // const { data: subscriptions, isLoading } = useGetMyPlanQuery();

  let subscriptions;
  let isLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#e56419]" />
      </div>
    );
  }

  // Get all successful subscriptions
  const allSuccessfulSubs =
    subscriptions?.filter((sub) => sub.status === "Success") || [];

  const currentPlan =
    allSuccessfulSubs.length > 0 ? allSuccessfulSubs[0] : null;
  const pastSubscriptions = allSuccessfulSubs.slice(1);

  if (!currentPlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 pt-28">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No Active Plan
        </h2>
        <p className="text-gray-500 max-w-md mb-8">
          You are currently not subscribed to any premium plan. Head over to our
          pricing page to choose a plan that fits your needs.
        </p>
        <a
          href="/#pricing"
          className="bg-[#e56419] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#d45610] transition-colors"
        >
          View Pricing Plans
        </a>
      </div>
    );
  }

  const {
    PayPeriod,
    PayPeriodPrice,
    Features,
    startDate,
    endDate,
    amount,
    razorpayOrderId,
    razorpayPaymentId,
  } = currentPlan;
  const isExpired = new Date(endDate) < new Date();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 pt-28 sm:px-6 lg:px-8 min-h-[70vh] flex flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Plan
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your current subscription and billing details.
        </p>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-[#e56419] to-[#d4551a] p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold">
                {Features?.name || "Premium Plan"}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isExpired ? "bg-red-500/20 text-red-100" : "bg-white/20 text-white"}`}
              >
                {isExpired ? "Expired" : "Active"}
              </span>
            </div>
            <p className="text-white/80 max-w-md text-sm leading-relaxed">
              {Features?.description ||
                "You are currently enjoying our premium features."}
            </p>
          </div>
          <div className="text-left md:text-right">
            <div className="text-sm text-white/80 uppercase font-bold tracking-wider mb-1">
              {PayPeriod?.name || "Billing Cycle"}
            </div>
            <div className="text-4xl font-black">₹{amount}</div>
          </div>
        </div>

        {/* Content body */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Col - Details */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={16} /> Billing Cycle
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <div className="text-xs text-gray-500 mb-1">Started On</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(startDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div
                    className={`rounded-xl p-4 border ${isExpired ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}
                  >
                    <div
                      className={`text-xs mb-1 ${isExpired ? "text-red-600" : "text-green-600"}`}
                    >
                      Expires On
                    </div>
                    <div className="font-semibold text-gray-900">
                      {new Date(endDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Payment Information
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-mono text-gray-900 font-medium">
                    {razorpayOrderId}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm mt-2">
                  <span className="text-gray-500">Payment ID:</span>
                  <span className="font-mono text-gray-900 font-medium">
                    {razorpayPaymentId}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col - Features included */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                What's Included
              </h3>
              <ul className="space-y-3">
                {PayPeriodPrice?.payPeriodContents?.map((content) => (
                  <li key={content.id} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#e56419] shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {content.name}
                    </span>
                  </li>
                ))}
                {(!PayPeriodPrice?.payPeriodContents ||
                  PayPeriodPrice.payPeriodContents.length === 0) && (
                  <li className="text-sm text-gray-500 italic">
                    No specific features listed for this plan.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Past Subscriptions */}
      {pastSubscriptions.length > 0 && (
        <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">
              Subscription History
            </h3>
          </div>
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Billing
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pastSubscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {sub.Features?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {sub.PayPeriod?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    ₹{sub.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(sub.startDate).toLocaleDateString()} -{" "}
                    {new Date(sub.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-600">
                      Expired
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
