

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { Mail, Lock, ArrowRight, LogIn, ShieldCheck, AlertCircle, Loader2, Globe } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Integração com Supabase
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      navigate('/app');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Falha na autenticação. Verifique seu e-mail e senha.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-vts-dark relative overflow-hidden flex items-center justify-center px-4">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-vts-dark via-slate-900 to-vts-petrol/20"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-vts-petrol/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-vts-orange/5 rounded-full blur-[120px]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-vts-petrol to-teal-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-lg tracking-tighter leading-none">VTS</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white tracking-tight">Portal do Membro</h1>
          <p className="text-slate-400 mt-2">Acesse o ecossistema App Pro e Diagnósticos.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10">
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3 animate-fade-in">
                  <AlertCircle className="text-red-500 shrink-0" size={18} />
                  <p className="text-xs text-red-600 font-medium leading-relaxed">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">E-mail Corporativo</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-vts-petrol transition-colors" size={18} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com.br"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:ring-4 focus:ring-vts-petrol/10 focus:border-vts-petrol outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex justify-between items-center mb-1.5 ml-1">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Senha de Acesso</label>
                    {/* Fixed Error: Removed 'size' prop which is not supported by Link component */}
                    <Link to="/forgot-password" className="text-[10px] font-bold text-vts-petrol hover:text-vts-lightPetrol uppercase tracking-widest">
                      Esqueceu?
                    </Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-vts-petrol transition-colors" size={18} />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 focus:ring-4 focus:ring-vts-petrol/10 focus:border-vts-petrol outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-md bg-white peer-checked:bg-vts-petrol peer-checked:border-vts-petrol transition-all"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">Lembrar-me neste dispositivo</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-vts-dark hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Acessar Plataforma
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center"><span className="bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ou acesse via</span></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700">
                  <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" /> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-bold text-slate-700">
                  <img src="https://www.linkedin.com/favicon.ico" className="w-4 h-4" alt="LinkedIn" /> LinkedIn
                </button>
              </div>
            </form>
          </div>
          <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Não é membro Pro? <Link to="/register" className="text-vts-orange hover:text-vts-orangeHover transition-colors ml-1">Solicite sua conta</Link>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 animate-fade-in delay-300">
          <div className="flex items-center gap-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-vts-lightPetrol transition-colors">Termos</a>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <a href="#" className="hover:text-vts-lightPetrol transition-colors">Privacidade</a>
            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
            <a href="#" className="hover:text-vts-lightPetrol transition-colors">Ajuda</a>
          </div>
          <div className="flex items-center gap-2 text-slate-600 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={14} className="text-vts-lightPetrol" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Acesso Seguro SSL 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
