
import React from 'react';
import { Factory, Home, Settings, Search, Zap, BarChart3, ArrowRight, Unplug, PlugZap, Battery } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const services = [
    {
      icon: Factory,
      title: "Consultoria Grupo A",
      desc: "Análise estratégica de faturas de alta tensão, ajuste de demanda contratada e migração para o Mercado Livre de Energia (ACL).",
      tags: ["Indústria", "Grandes Comércios", "Agronegócio"],
      link: "/group-a"
    },
    {
      icon: Zap,
      title: "Usinas Fotovoltaicas",
      desc: "Projetos turn-key de alta performance. Da simulação de viabilidade técnica à homologação final com a concessionária.",
      tags: ["Residencial Premium", "Industrial", "Comercial"],
      link: "/calculator"
    },
    {
      icon: Settings,
      title: "Operação e Manutenção (O&M)",
      desc: "Monitoramento ativo via software, limpeza técnica de módulos e manutenção preventiva para garantir 100% de performance.",
      tags: ["Pós-Venda", "Monitoramento IA", "Preventiva"],
      link: "/app"
    },
    {
      icon: Search,
      title: "Auditoria Energética",
      desc: "Laudos técnicos de eficiência, termografia infravermelha e identificação de fugas de corrente para redução imediata de custos.",
      tags: ["Laudos", "Engenharia Diagnóstica", "Eficiência"],
      link: "/contact"
    },
    {
      icon: Unplug,
      title: "Grid Zero",
      desc: "Sistemas de injeção zero na rede elétrica. Gere sua própria energia para consumo instantâneo sem necessidade de homologação complexa ou taxas de fio B.",
      tags: ["Homologação", "Autoconsumo", "Zero Export"],
      link: "/contact"
    },
    {
      icon: PlugZap,
      title: "Sistemas Híbridos",
      desc: "A revolução da autonomia. Combine a economia do On-Grid com a segurança do Off-Grid, garantindo energia mesmo durante apagões da concessionária.",
      tags: ["Backup de Energia", "Segurança", "Autonomia"],
      link: "/contact"
    },
    {
      icon: Battery,
      title: "Soluções BESS",
      desc: "Battery Energy Storage Systems para Comércios e Indústrias. Reduza custos com Peak Shaving (Corte de Ponta) e proteja equipamentos sensíveis.",
      tags: ["Indústria 4.0", "Peak Shaving", "Armazenamento"],
      link: "/group-a"
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

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all group">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-16 h-16 bg-vts-petrol rounded-2xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <service.icon size={32} />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest bg-vts-light px-2 py-1 rounded text-vts-petrol border border-slate-200">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-vts-dark mb-4">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{service.desc}</p>
                  <Link to={service.link} className="inline-flex items-center gap-2 text-vts-orange font-bold hover:gap-4 transition-all">
                    Saiba mais <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
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
