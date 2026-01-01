
import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "O futuro das Usinas Solares no Brasil em 2025",
      excerpt: "Entenda como as novas resoluções da ANEEL impactam o ROI de sistemas industriais e o que muda na taxação do fio B.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600",
      date: "15 Mai, 2024",
      author: "Eng. Ricardo Viana",
      category: "Mercado"
    },
    {
      id: 2,
      title: "Mercado Livre de Energia para PMEs: Vale a pena?",
      excerpt: "O guia definitivo para pequenas e médias empresas que desejam migrar para o ACL e economizar até 40% na conta de luz.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      date: "12 Mai, 2024",
      author: "Consultoria VTS",
      category: "Economia"
    },
    {
      id: 3,
      title: "Manutenção Preventiva vs Preditiva em Sistemas Grupo A",
      excerpt: "Como o monitoramento térmico via IA pode evitar paradas críticas em grandes plantas de geração fotovoltaica.",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=600",
      date: "08 Mai, 2024",
      author: "Equipe Técnica",
      category: "Tecnologia"
    }
  ];

  return (
    <div className="animate-fade-in pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-vts-dark mb-4">VTS <span className="text-vts-orange">Insights</span></h1>
                <p className="text-lg text-slate-600">Conteúdo técnico de alto valor sobre o mercado de energia, engenharia e sustentabilidade.</p>
            </div>
            <div className="flex gap-3">
                {["Todos", "Mercado", "Tecnologia", "Economia"].map(cat => (
                    <button key={cat} className="px-4 py-2 rounded-full bg-vts-light border border-slate-200 text-sm font-bold text-vts-dark hover:bg-vts-petrol hover:text-white transition-all">
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-slate-100 group">
              <div className="relative h-56 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4">
                    <span className="bg-vts-orange text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        {post.category}
                    </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14}/> {post.author}</span>
                </div>
                <h3 className="text-xl font-bold text-vts-dark mb-4 group-hover:text-vts-orange transition-colors">
                    {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                </p>
                <button className="flex items-center gap-2 text-vts-petrol font-bold hover:gap-4 transition-all">
                    Ler artigo completo <ArrowRight size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
