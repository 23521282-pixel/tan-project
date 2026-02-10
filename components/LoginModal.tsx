
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUseDemo = () => {
    setUsername('demo_user');
    setPassword('demo123');
    // Giving a small timeout to let the user see the fields filled before auto-entering
    setTimeout(() => {
      onSuccess();
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'demo_user' && password === 'demo123') {
      onSuccess();
    } else {
      alert('Sai thông tin đăng nhập! Thử: demo_user / demo123');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 md:p-12 animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#00609b] font-poppins mb-2 drop-shadow-sm">Đăng nhập</h2>
          <p className="text-slate-500 font-medium">Tiếp tục hành trình học tiếng Anh</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Tên đăng nhập</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#00609b] transition-all text-slate-700 placeholder:text-slate-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#00609b] transition-all text-slate-700 placeholder:text-slate-300"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-[#00609b] text-white font-black text-lg rounded-[24px] hover:opacity-95 transition-all shadow-xl shadow-blue-200 transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Đăng nhập
          </button>
        </form>

        <div className="mt-8 text-center space-y-6">
          <p className="text-slate-500 font-medium text-sm">
            Chưa có tài khoản? <button className="text-[#00609b] font-bold hover:underline">Đăng ký ngay</button>
          </p>
          
          <div className="pt-6 border-t border-slate-50">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-3">Sử dụng tài khoản có sẵn:</p>
            <button 
              onClick={handleUseDemo}
              className="text-[#00609b] font-black text-lg hover:underline transition-all"
            >
              Dùng tài khoản demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
