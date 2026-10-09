import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '@/redux/services/authApi';
import { setCredentials, selectIsAuthenticated, selectIsAdmin } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/Dispatch/useAppDispatch';
import { Loader2, ShieldAlert } from 'lucide-react';
import logo from "@/assets/pinnacle.jpg";

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate('/admin/dashboard/users');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      const res = await login({ email, password }).unwrap();
      if (res.user.role !== 'admin') {
        setErrorMsg('Access denied. Administrator privileges required.');
        return;
      }
      dispatch(setCredentials({ user: res.user, token: res.token }));
      navigate('/admin/dashboard/users');
    } catch (err) {
      setErrorMsg(err.data?.message || 'Login failed');
    }
  };

  if (isAuthenticated && isAdmin) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f8] p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#e56419]/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#e56419]/5 blur-[80px] pointer-events-none" />
      
      <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 max-w-[400px] w-full relative z-10">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-10 mb-6" />
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-2 text-center">Secure portal for administrators only.</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm font-semibold p-3 rounded-xl mb-6 border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 outline-none transition-all text-sm font-medium"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-[#e56419] focus:ring-2 focus:ring-[#e56419]/20 outline-none transition-all text-sm font-medium"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full h-11 bg-[#e56419] hover:bg-[#d45610] text-white rounded-xl font-bold transition-all shadow-md flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  )
}
