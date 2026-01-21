import React from 'react';
import { Factory, Home, Settings, Search, Zap, BarChart3, ArrowRight, Unplug, PlugZap, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }: { service: any }) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all group flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-vts-petrol rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
          <service.icon size={28} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-vts-dark leading-tight">{service.title}</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {service.tags.map((tag: string) => (
          <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-vts-light px-2 py-1 rounded text-vts-petrol border border-slate-200">{tag}</span>
        ))}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>

      {service.features && (
        <div className="mb-6">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs font-bold text-slate-500 hover:text-vts-orange flex items-center gap-1 transition-colors outline-none"
          >
            {showDetails ? 'Ocultar Detalhes' : 'Ver Detalhes Técnicos'}
            <ArrowRight size={12} className={`transition-transform ${showDetails ? 'rotate-90' : ''}`} />
          </button>

          {showDetails && (
            <ul className="mt-4 space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 animate-fade-in">
              {service.features.map((feature: string, fIdx: number) => (
                <li key={fIdx} className="text-xs font-medium text-slate-700 flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-vts-orange mt-1.5 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <Link to={service.link} className="inline-flex items-center gap-2 text-vts-orange font-bold text-sm hover:gap-3 transition-all mt-auto pt-4 border-t border-slate-50">
        Saiba mais <ArrowRight size={16} />
      </Link>
    </div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: Factory,
      title: "Consultoria Grupo A",
      desc: "Análise estratégica de faturas de alta tensão para máxima eficiência financeira.",
      tags: ["Indústria", "Grandes Comércios", "Agronegócio"],
      link: "/group-a",
      features: [
        "Estudo de Modalidade Tarifária (Verde vs Azul)",
        "Correção de Fator de Potência (Energia Reativa)",
        "Ajuste de Demanda Contratada",
        "Migração para Mercado Livre (ACL)"
      ]
    },
    {
      icon: Zap,
      title: "Usinas Fotovoltaicas",
      desc: "Projetos turn-key de alta performance. Da simulação à homologação.",
      tags: ["Residencial Premium", "Industrial", "Comercial"],
      link: "/calculator",
      features: [
        "Projetos Executivos em 3D",
        "Homologação em todas as concessionárias",
        "Instalação com equipe própria e certificada"
      ]
    },
    {
      icon: Settings,
      title: "Operação e Manutenção (O&M)",
      desc: "Garanta 100% de performance do seu ativo solar por 25 anos.",
      tags: ["Pós-Venda", "Monitoramento IA", "Preventiva"],
      link: "/app",
      features: [
        "Monitoramento Ativo 24/7 via App",
        "Limpeza Técnica de Módulos",
        "Manutenção Preventiva e Corretiva"
      ]
    },
    {
      icon: Search,
      title: "Auditoria Energética",
      desc: "Laudos técnicos para identificação de desperdícios e riscos elétricos.",
      tags: ["Laudos", "Engenharia Diagnóstica", "Eficiência"],
      link: "/contact",
      features: [
        "Termografia Infravermelha",
        "Análise de Qualidade de Energia (Prodist)",
        "Laudos de Aterramento e SPDA"
      ]
    },
    {
      icon: Unplug,
      title: "Grid Zero",
      desc: "Gere energia sem injetar na rede. ideal para evitar taxas de fio B.",
      tags: ["Homologação", "Autoconsumo", "Zero Export"],
      link: "/contact",
      features: [
        "Inversores com Limitador de Exportação",
        "Autoconsumo Instantâneo",
        "Sem taxas de disponibilidade ou Fio B"
      ]
    },
    {
      icon: PlugZap,
      title: "Sistemas Híbridos",
      desc: "Segurança energética total. Energia solar com backup de baterias.",
      tags: ["Backup de Energia", "Segurança", "Autonomia"],
      link: "/contact",
      features: [
        "Baterias de Lítio (LFP) de Alta Vida Útil",
        "Sistema Anti-Apagão (No-Break Solar)",
        "Gestão Inteligente de Cargas"
      ]
    },
    {
      icon: Battery,
      title: "Soluções BESS",
      desc: "Armazenamento em larga escala para indústrias. Reduza custos de ponta.",
      tags: ["Indústria 4.0", "Peak Shaving", "Armazenamento"],
      link: "/group-a",
      features: [
        "Peak Shaving (Corte de Ponta)",
        "Time Shifting (Arbitragem Tarifária)",
        "Estabilidade de Tensão e Frequência"
      ]
    }
  ];

  return (
    <div className="animate-fade-in pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-vts-dark mb-6">Soluções de <span className="text-vts-orange">Engenharia Elite</span></h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Nossa abordagem técnica é baseada em dados e rigor normativo. Oferecemos um portfólio completo para gestão de energia 4.0.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>

        <section className="mt-24 bg-vts-dark rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-vts-petrol/20 to-transparent"></div>
          <h2 className="text-3xl font-bold mb-6 relative z-10">Precisa de um projeto personalizado?</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto relative z-10">Nossa equipe de engenharia está pronta para analisar seu caso específico e propor a solução técnica mais rentável.</p>
          <Link to="/contact" className="bg-vts-orange hover:bg-vts-orangeHover text-white px-10 py-4 rounded-full font-bold text-lg transition-all relative z-10 inline-block">
            Solicitar Consultoria Técnica
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Services;
