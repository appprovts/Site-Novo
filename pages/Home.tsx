
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sun,
  ShieldCheck,
  Award,
  Cpu,
  BarChart,
  Settings,
  Users,
  Coins,
  Globe,
  Home as HomeIcon,
  Zap,
  TrendingUp,
  Target
} from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2000"
          alt="Engenharia Solar VTS"
          className="w-full h-full object-cover filter brightness-[0.35]"
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-vts-dark/95 via-vts-dark/70 to-vts-petrol/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <div className="sm:max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vts-petrol/30 border border-vts-petrol/50 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-vts-orange animate-pulse"></span>
            <span className="text-xs font-semibold text-vts-lightPetrol tracking-wider uppercase">Engenharia de Alta Performance</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Transforme Sol em <span className="text-transparent bg-clip-text bg-gradient-to-r from-vts-orange to-yellow-400">Ativos Financeiros</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 font-light leading-relaxed">
            Solicite uma consultoria personalizada e descubra quanto você pode lucrar economizando com tecnologiaVTS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/calculator" className="flex items-center justify-center gap-2 bg-vts-orange hover:bg-vts-orangeHover text-white px-8 py-4 rounded-lg text-lg font-bold transition-all shadow-lg shadow-vts-orange/20 transform hover:-translate-y-1">
              <Sun size={20} />
              Simular Economia
            </Link>
            <Link to="/group-a" className="flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg text-lg font-medium backdrop-blur-sm transition-all">
              Diagnóstico de energia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <div className="bg-vts-dark py-12 border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { label: 'Projetos Entregues', value: '+2.500' },
        { label: 'Megawatts Instalados', value: '45 MWp' },
        { label: 'Economia Gerada', value: 'R$ 85M+' },
        { label: 'Taxa de Sucesso', value: '100%' },
      ].map((stat, idx) => (
        <div key={idx} className="group cursor-default">
          <p className="text-3xl md:text-4xl font-bold text-white group-hover:text-vts-orange transition-colors">{stat.value}</p>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-2 font-bold">{stat.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const Diferenciais = () => (
  <section id="diferenciais" className="py-32 bg-vts-dark relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-vts-petrol/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-vts-orange/5 rounded-full blur-[100px] -ml-48 -mb-48"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-20">
        <h2 className="text-vts-orange font-bold uppercase tracking-[0.2em] text-xs mb-4">Nossa Excelência</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Diferenciais Técnicos VTS</h3>
        <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">Unimos rigor normativo com tecnologia de ponta para entregar usinas que performam acima da média de mercado.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { icon: Award, title: "Engenharia Sênior", desc: "Corpo técnico composto por engenheiros especialistas em alta tensão e sistemas fotovoltaicos complexos.", color: "text-blue-400" },
          { icon: Cpu, title: "Plataforma App Pro", desc: "Membros têm acesso exclusivo ao monitoramento 24/7 e gestão de documentos em tempo real.", color: "text-vts-orange" },
          { icon: BarChart, title: "ROI Calibrado", desc: "Nossas simulações consideram a inflação energética real e degradação técnica dos componentes.", color: "text-emerald-400" },
          { icon: Settings, title: "Rigor Normativo", desc: "Total aderência às NBRs e exigências das concessionárias, garantindo homologações rápidas.", color: "text-purple-400" },
          { icon: ShieldCheck, title: "Garantia de Geração", desc: "Segurança total: se a usina não produzir o projetado, nossa engenharia atua sem custos.", color: "text-teal-400" },
          { icon: Target, title: "Projetos Sob Medida", desc: "Não vendemos kits prontos. Projetamos a solução ideal para o seu perfil de consumo específico.", color: "text-amber-400" }
        ].map((item, idx) => (
          <div key={idx} className="group bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 rounded-[2rem] hover:border-vts-petrol/50 transition-all duration-500 hover:-translate-y-2">
            <div className={`w-16 h-16 bg-slate-800/80 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-vts-dark transition-all ${item.color} shadow-lg shadow-black/20`}>
              <item.icon size={32} />
            </div>
            <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-vts-orange transition-colors">{item.title}</h4>
            <p className="text-slate-400 leading-relaxed text-sm font-light">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Beneficios = () => (
  <section id="beneficios" className="py-32 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <h2 className="text-vts-petrol font-bold uppercase tracking-[0.2em] text-xs mb-4">Valor Entregue</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-vts-dark mb-10 leading-tight">Por que escolher a <br /><span className="text-vts-orange">Engenharia VTS?</span></h3>
          <div className="space-y-10">
            {[
              { icon: Coins, title: "Economia Imediata de até 95%", desc: "Transforme sua fatura de energia em lucro. Libere capital para investir no crescimento do seu negócio." },
              { icon: HomeIcon, title: "Valorização Patrimonial", desc: "Imóveis com sistemas fotovoltaicos de engenharia sênior valorizam até 10% no mercado imobiliário." },
              { icon: Globe, title: "Impacto Sustentável (ESG)", desc: "Reduza drasticamente sua emissão de CO2 e fortaleça a imagem sustentável da sua marca perante o mercado." },
              { icon: Zap, title: "Independência Energética", desc: "Fique imune aos reajustes tarifários anuais e às bandeiras de escassez hídrica." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="w-14 h-14 bg-vts-light rounded-2xl flex items-center justify-center text-vts-petrol shrink-0 group-hover:bg-vts-petrol group-hover:text-white transition-all shadow-sm">
                  <item.icon size={28} />
                </div>
                <div>
                  <h4 className="font-bold text-vts-dark text-xl mb-2">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-vts-petrol/10 rounded-[3rem] -rotate-3 scale-105"></div>
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000"
              alt="Usina Solar VTS"
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vts-dark/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <p className="text-white font-bold text-lg mb-1">Qualidade sem concessões.</p>
              <p className="text-slate-200 text-xs font-light uppercase tracking-widest">Padrão VTS de Instalação</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <Stats />
      <Diferenciais />
      <Beneficios />
      <section className="py-24 bg-gradient-to-br from-vts-dark to-teal-900 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-vts-orange"></div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Pronto para a transição energética?</h2>
        <p className="text-teal-100 max-w-2xl mx-auto mb-12 text-lg font-light relative z-10">Realize agora um diagnóstico técnico completo e descubra o ROI real para sua estrutura.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
          <Link to="/calculator" className="bg-vts-orange hover:bg-vts-orangeHover text-white font-bold text-lg px-12 py-5 rounded-full transition-all shadow-xl hover:shadow-orange-500/30">
            Simular Investimento
          </Link>
          <Link to="/contact" className="bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-lg px-12 py-5 rounded-full transition-all backdrop-blur-sm">
            Falar com Engenheiro
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
