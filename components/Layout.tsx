
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Calculator, 
  Phone, 
  Send, 
  User, 
  LogIn, 
  UserPlus, 
  Lock, 
  ChevronRight,
  Globe
} from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isDarkPage = location.pathname === '/' || location.pathname === '/app';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/about' },
    { name: 'Serviços', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'App', path: '/app', isPro: true },
    { name: 'Diagnóstico', path: '/group-a', isPro: true },
  ];

  const navBgClass = isScrolled
    ? 'bg-vts-dark/95 backdrop-blur-md shadow-lg py-2'
    : isDarkPage
        ? 'bg-transparent py-4'
        : 'bg-vts-dark py-4 shadow-md';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-vts-petrol to-teal-900 rounded-xl flex items-center justify-center shadow-lg border border-white/10 group-hover:scale-105 transition-transform relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                <span className="text-white font-extrabold text-sm tracking-tighter leading-none">VTS</span>
            </div>
            <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">VTS</span>
                <span className="text-[10px] text-vts-lightPetrol font-semibold tracking-widest uppercase -mt-1">Engenharia</span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center space-x-5">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-sm font-medium transition-all hover:text-vts-orange text-slate-300 flex items-center gap-1 group relative py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-vts-orange transition-all group-hover:w-full"></span>
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all flex items-center gap-1.5 relative group py-2 ${location.pathname === link.path ? 'text-vts-orange' : 'text-slate-300 hover:text-white'}`}
                >
                  {link.name}
                  {link.isPro && (
                    <span className="bg-vts-orange/20 text-vts-orange text-[8px] font-black px-1.5 py-0.5 rounded border border-vts-orange/30 flex items-center gap-0.5 group-hover:bg-vts-orange group-hover:text-white transition-colors">
                      <Lock size={8} /> PRO
                    </span>
                  )}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-vts-orange rounded-full"></span>
                  )}
                </Link>
              )
            ))}
            
             <div className="flex items-center space-x-3 pl-5 border-l border-white/10">
                 <Link to="/login" className="text-sm font-bold text-white hover:text-vts-orange transition-colors flex items-center gap-2">
                    <LogIn size={16} /> Entrar
                 </Link>
                 <Link to="/register" className="bg-vts-orange hover:bg-vts-orangeHover text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-orange-500/20">
                    Cadastrar
                 </Link>
             </div>
          </div>

          <div className="xl:hidden flex items-center gap-4">
            <Link to="/calculator" className="bg-vts-petrol p-2 rounded-lg text-white">
                <Calculator size={20} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-vts-orange transition-colors p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden bg-vts-dark border-t border-slate-800 animate-fade-in max-h-[90vh] overflow-y-auto">
          <div className="px-4 pt-4 pb-8 space-y-2">
            <p className="px-3 text-[10px] text-slate-500 uppercase font-black tracking-widest mb-4">Menu Principal</p>
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  {link.name}
                  <ChevronRight size={16} className="text-slate-600" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold transition-colors ${location.pathname === link.path ? 'bg-vts-petrol/20 text-vts-lightPetrol' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                >
                  <span className="flex items-center gap-2">
                    {link.name}
                    {link.isPro && (
                        <span className="bg-vts-orange text-white text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Lock size={10} /> PRO
                        </span>
                    )}
                  </span>
                  <ChevronRight size={16} className="text-slate-600" />
                </Link>
              )
            ))}
             <div className="pt-6 mt-4 border-t border-slate-800 space-y-3">
                <p className="px-3 text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Acesso Restrito</p>
                <Link 
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors font-bold"
                >
                    <LogIn size={20} className="text-vts-orange" /> Login do Cliente
                </Link>
                <Link 
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-4 text-white bg-vts-orange border border-vts-orangeHover rounded-xl hover:bg-vts-orangeHover transition-colors font-bold shadow-lg"
                >
                    <UserPlus size={20} /> Criar Conta Pro
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-vts-dark text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-vts-petrol to-teal-900 rounded-lg flex items-center justify-center shadow-lg border border-white/10">
                    <span className="text-white font-extrabold text-xs tracking-tighter leading-none">VTS</span>
                </div>
                <span className="text-xl font-bold text-white">VTS Engenharia</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Engenharia de alta performance para projetos fotovoltaicos. Do dimensionamento ao projeto homologado.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-vts-petrol inline-block pb-1 text-sm uppercase tracking-widest">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#diferenciais" className="hover:text-vts-orange transition-colors">Diferenciais</a></li>
              <li><a href="/#beneficios" className="hover:text-vts-orange transition-colors">Benefícios</a></li>
              <li><Link to="/about" className="hover:text-vts-orange transition-colors">Sobre Nós</Link></li>
              <li><Link to="/blog" className="hover:text-vts-orange transition-colors">Blog Insights</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-vts-petrol inline-block pb-1 text-sm uppercase tracking-widest">Soluções</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/calculator" className="hover:text-vts-orange transition-colors">Calculadora Solar</Link></li>
              <li><Link to="/group-a" className="hover:text-vts-orange transition-colors">Diagnóstico Grupo A</Link></li>
              <li><Link to="/app" className="hover:text-vts-orange transition-colors">Plataforma App Pro</Link></li>
              <li><Link to="/services" className="hover:text-vts-orange transition-colors">Serviços Técnicos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 border-b border-vts-petrol inline-block pb-1 text-sm uppercase tracking-widest">Suporte</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={14} className="text-vts-orange"/> 86 99918-9443</li>
              <li className="flex items-center gap-2"><Globe size={14} className="text-vts-orange"/> www.vtsengenharia.com.br</li>
              <li className="pt-4">
                 <Link to="/contact" className="inline-block bg-vts-petrol hover:bg-vts-lightPetrol text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all">
                    Falar com Consultor
                 </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} VTS Engenharia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};
