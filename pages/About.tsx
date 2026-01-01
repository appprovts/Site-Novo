
import React from 'react';
import { Target, Eye, Heart, Shield, Award, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="animate-fade-in pt-32">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-vts-dark mb-8 tracking-tight">
              Excelência em <span className="text-vts-orange">Engenharia Energética</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              A VTS Engenharia nasceu da necessidade de elevar o padrão técnico do mercado fotovoltaico brasileiro. Não somos apenas instaladores; somos uma empresa de engenharia de alta performance dedicada a transformar o consumo de energia em um ativo financeiro estratégico.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Com foco em grandes indústrias e projetos comerciais de alta complexidade, unimos monitoramento via IA, rigor normativo NBR e uma equipe de engenheiros seniores para garantir que cada kWp instalado retorne o máximo de lucro para nossos clientes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg mt-8" alt="Engenharia" />
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg" alt="Escritório" />
          </div>
        </div>
      </section>

      <section className="bg-vts-dark py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-vts-orange font-bold uppercase tracking-widest text-sm mb-3">Nossos Pilares</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Cultura de Resultados</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: "Missão", desc: "Viabilizar a transição energética através de engenharia de precisão, maximizando o ROI e a sustentabilidade de nossos parceiros." },
              { icon: Eye, title: "Visão", desc: "Ser a referência nacional em gestão de energia inteligente para o setor industrial e comercial até 2030." },
              { icon: Heart, title: "Valores", desc: "Rigor Técnico, Transparência Absoluta, Inovação Constante e Compromisso com a Entrega de Resultados Reais." }
            ].map((pilar, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl text-center group hover:border-vts-petrol transition-colors">
                <div className="w-16 h-16 bg-vts-petrol/20 rounded-full flex items-center justify-center mx-auto mb-6 text-vts-lightPetrol group-hover:scale-110 transition-transform">
                  <pilar.icon size={32} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{pilar.title}</h4>
                <p className="text-slate-400 leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-vts-dark mb-12">Números que comprovam nossa autoridade</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: "Anos de Engenharia", value: "12+", icon: Shield },
                    { label: "Engenheiros Seniores", value: "08", icon: Award },
                    { label: "MWp Gerenciados", value: "45+", icon: Target },
                    { label: "Clientes Felizes", value: "2500+", icon: Users },
                ].map((item, idx) => (
                    <div key={idx} className="p-6">
                        <div className="text-vts-orange flex justify-center mb-4"><item.icon size={40}/></div>
                        <p className="text-4xl font-extrabold text-vts-dark mb-2">{item.value}</p>
                        <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
