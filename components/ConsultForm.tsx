
import React from 'react';
import { Lamp, Star } from 'lucide-react';

const ConsultForm: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-blue-600 rounded-[40px] overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row items-center gap-16 shadow-2xl shadow-blue-300">
          
          {/* Left Visual */}
          <div className="lg:w-1/2 space-y-8 relative">
            <div className="space-y-2">
              <h2 className="text-white text-4xl md:text-5xl font-bold font-poppins">ENGMIND</h2>
              <p className="text-blue-100 text-xl font-medium">Học tiếng Anh với tư duy vượt trội</p>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <Lamp className="w-40 h-40 text-white/20 rotate-12" />
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 inline-flex">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Star className="text-blue-600 fill-blue-600" />
              </div>
              <div>
                <p className="text-white font-bold">10,000+ Học viên</p>
                <p className="text-blue-200 text-xs">Tin tưởng & theo học mỗi tháng</p>
              </div>
            </div>

            {/* Mascot Placeholder */}
            <div className="absolute -bottom-16 -right-16 opacity-20">
              <div className="w-64 h-64 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Đăng ký nhận tư vấn miễn phí ngay</h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Họ và tên</label>
                  <input 
                    type="text" 
                    placeholder="Nguyễn Văn A" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                  <input 
                    type="tel" 
                    placeholder="09xx xxx xxx" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Nhu cầu học</label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none">
                    <option>Luyện thi THPTQG</option>
                    <option>Giao tiếp cơ bản</option>
                    <option>IELTS / TOEIC</option>
                    <option>Lấy lại gốc tiếng Anh</option>
                  </select>
                </div>

                <button className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform hover:scale-[1.02]">
                  Đăng ký ngay
                </button>

                <p className="text-center text-xs text-slate-400 font-medium italic">
                  * Thông tin của bạn sẽ được bảo mật tuyệt đối
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ConsultForm;
