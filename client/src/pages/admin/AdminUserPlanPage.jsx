import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserPlanQuery } from '@/redux/services/adminApi';
import { Loader2, Package, Calendar, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function AdminUserPlanPage() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { data: subscriptions, isLoading, error } = useGetUserPlanQuery(userId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-[#e56419]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500 font-medium bg-red-50 rounded-xl">
        Failed to fetch user plan.
      </div>
    );
  }

  // Get all successful subscriptions
  const allSuccessfulSubs = subscriptions?.filter(sub => sub.status === "Success") || [];
  
  // The first one is the most recent (since backend orders by createdAt desc)
  const currentPlan = allSuccessfulSubs.length > 0 ? allSuccessfulSubs[0] : null;
  const pastSubscriptions = allSuccessfulSubs.slice(1);
  
  // To display user info even if no subscription, let's grab it from the first entry if exists
  const userInfo = subscriptions?.[0]?.User;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/admin/dashboard/users')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Plan Details</h2>
          {userInfo && (
            <p className="text-sm text-gray-500 mt-1">
              {userInfo.name} ({userInfo.email}) - {userInfo.companyName}
            </p>
          )}
        </div>
      </div>

      {!currentPlan ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Subscriptions Found</h3>
          <p className="text-gray-500">This user has never purchased a paid plan.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6 max-w-4xl">
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#e56419] to-[#d4551a] p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">{currentPlan.Features?.name || "Premium Plan"}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${new Date(currentPlan.endDate) < new Date() ? "bg-red-500/20 text-red-100" : "bg-white/20 text-white"}`}>
                    {new Date(currentPlan.endDate) < new Date() ? "Expired" : "Active"}
                  </span>
                </div>
                <p className="text-white/80 max-w-md text-sm leading-relaxed">
                  {currentPlan.Features?.description}
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="text-sm text-white/80 uppercase font-bold tracking-wider mb-1">
                  {currentPlan.PayPeriod?.name}
                </div>
                <div className="text-4xl font-black">
                  ₹{currentPlan.amount}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Calendar size={16} /> Billing Cycle
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">Started On</div>
                        <div className="font-semibold text-gray-900">
                          {new Date(currentPlan.startDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className={`rounded-xl p-4 border ${new Date(currentPlan.endDate) < new Date() ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}>
                        <div className={`text-xs mb-1 ${new Date(currentPlan.endDate) < new Date() ? "text-red-600" : "text-green-600"}`}>Expires On</div>
                        <div className="font-semibold text-gray-900">
                          {new Date(currentPlan.endDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Payment Information</h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500">Order ID:</span>
                      <span className="font-mono text-gray-900 font-medium">{currentPlan.razorpayOrderId}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm mt-2">
                      <span className="text-gray-500">Payment ID:</span>
                      <span className="font-mono text-gray-900 font-medium">{currentPlan.razorpayPaymentId}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Included Features</h3>
                  <ul className="space-y-3">
                    {currentPlan.PayPeriodPrice?.payPeriodContents?.map(content => (
                      <li key={content.id} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#e56419] shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{content.name}</span>
                      </li>
                    ))}
                    {(!currentPlan.PayPeriodPrice?.payPeriodContents || currentPlan.PayPeriodPrice.payPeriodContents.length === 0) && (
                      <li className="text-sm text-gray-500 italic">No specific features listed.</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Past Subscriptions */}
          {pastSubscriptions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Subscription History</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Plan</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Billing</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pastSubscriptions.map(sub => (
                    <tr key={sub.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{sub.Features?.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{sub.PayPeriod?.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">₹{sub.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}
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
      )}
    </div>
  );
}
