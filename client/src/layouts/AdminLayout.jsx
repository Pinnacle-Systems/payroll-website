import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Calendar, Star, LogOut } from "lucide-react";
import { useAppDispatch } from "@/redux/Dispatch/useAppDispatch";
import { logout } from "@/redux/features/authSlice";

export default function AdminLayout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const links = [
    { name: "Users", path: "/admin/dashboard/users", icon: Users },
    {
      name: "Payperiod Master",
      path: "/admin/dashboard/payperiods",
      icon: Calendar,
    },
    { name: "Features Master", path: "/admin/dashboard/features", icon: Star },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-10">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#e56419] rounded-lg flex items-center justify-center shrink-0">
            <LayoutDashboard className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-gray-900 text-lg">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-[#e56419]/10 text-[#e56419] border border-[#e56419]/20"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[#e56419]" : "text-gray-400"}`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen max-w-[calc(100vw-256px)]">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm shrink-0">
          <h2 className="text-lg font-bold text-gray-800">
            {links.find((l) => location.pathname.startsWith(l.path))?.name ||
              "Dashboard"}
          </h2>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
