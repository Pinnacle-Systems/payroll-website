import { useGetUsersQuery } from '@/redux/services/adminApi';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useGetUsersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-[#e56419]" /></div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Registered Users</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${item.role === 'admin' ? 'bg-[#e56419]/10 text-[#e56419]' : 'bg-gray-100 text-gray-600'}`}>
                    {item.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => navigate(`/admin/dashboard/users/${item.id}/plan`)}
                    className="text-xs font-bold text-[#e56419] bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    View Plans
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
