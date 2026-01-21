import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ClipboardCheck,
    FileCheck,
    Users,
    BookOpen,
    Rocket,
    CheckCircle2,
    PlayCircle,
    MessageSquare,
    CreditCard,
    FileText,
    Filter,
    Smartphone,
    Bot,
    Search,
    Zap,
    Layout,
    Clock,
    Star,
    Quote,
    Image as ImageIcon,
    Video,
    Plus,
    Hash,
    FolderOpen,
    Cloud,
    CalendarDays,
    Loader2,
    LogIn,
    UserPlus,
    LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Helper Component for Premium Lazy Loading
const LazyMedia = ({ src, alt, type = 'image', badgeIcon: BadgeIcon, badgeText }: { src: string, alt: string, type?: 'image' | 'video', badgeIcon?: React.ElementType, badgeText?: string }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative rounded-xl overflow-hidden h-32 group cursor-pointer bg-slate-800 border border-slate-700 ${type === 'video' ? 'border-vts-petrol/50' : ''}`}>
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 size={20} className="text-slate-600 animate-spin" />
                </div>
            )}

            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${isLoaded ? 'opacity-80 group-hover:opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                loading="lazy"
                decoding="async"
                onLoad={() => setIsLoaded(true)}
            />

            {type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg ring-1 ring-white/30">
                        <PlayCircle size={24} fill="currentColor" className="text-white" />
                    </div>
                </div>
            )}

            {BadgeIcon && badgeText && (
                <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] text-white font-bold flex items-center gap-1 backdrop-blur-sm transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${type === 'video' ? 'bg-vts-orange' : 'bg-black/60'}`}>
                    <BadgeIcon size={10} /> {badgeText}
                </div>
            )}
        </div>
    );
};

const SolarApp: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    const trackEvent = (eventName: string, params?: any) => {
        if ((window as any).gtag) {
            (window as any).gtag('event', eventName, params);
        }
    };

    const handleWhatsAppAction = (actionType: 'access') => {
        const phoneNumber = '5586999199443';
        const message = 'Olá, equipe VTS! Gostaria de solicitar meu Acesso Pro ao aplicativo de gestão.';

        trackEvent('select_content', { content_type: 'app_request_access', item_id: 'hero_btn' });
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleScheduleDemo = () => {
        const title = encodeURIComponent("Demonstração VTS App Pro");
        const details = encodeURIComponent("Apresentação técnica das funcionalidades: Financeiro, Engenharia e Vistorias. Validar horário com consultor VTS.");
        const location = encodeURIComponent("Reunião Online / Google Meet");
        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
        const phoneNumber = '5586999199443';
        const message = encodeURIComponent("Olá, equipe VTS! Estou organizando minha agenda e gostaria de confirmar um horário para a demonstração do App Pro.");
        const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(gCalUrl, '_blank');
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 800);
        trackEvent('select_content', { content_type: 'app_demo_schedule', item_id: 'hero_btn_calendar' });
    };

    return (
        <div className="animate-fade-in bg-vts-dark min-h-screen">
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-vts-dark via-slate-900 to-vts-petrol/20"></div>
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            {/* NOVO: Header de Marca com Botões de Acesso */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 bg-gradient-to-br from-vts-petrol to-teal-900 rounded-2xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:scale-105 transition-transform">
                                        <span className="text-white font-black text-base tracking-tighter leading-none">VTS</span>
                                    </div>
                                    <div className="h-10 w-px bg-white/20 hidden sm:block"></div>
                                    <div className="inline-flex items-center gap-2 bg-vts-orange/10 border border-vts-orange/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                                        <span className="w-2 h-2 rounded-full bg-vts-orange animate-pulse"></span>
                                        <span className="text-sm font-bold text-vts-orange tracking-wide uppercase">Plataforma Pro</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {user ? (
                                        <div className="flex items-center gap-4">
                                            <div className="hidden sm:block text-right">
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Bem-vindo</p>
                                                <p className="text-sm text-white font-bold">{user.email?.split('@')[0]}</p>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-bold transition-all border border-red-500/20"
                                            >
                                                <LogOut size={16} /> Sair
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Link to="/login" className="flex items-center gap-2 text-white hover:text-vts-orange transition-colors text-sm font-bold bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                                                <LogIn size={16} /> Entrar
                                            </Link>
                                            <Link to="/register" className="flex items-center gap-2 bg-vts-petrol hover:bg-vts-lightPetrol text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-vts-petrol/20">
                                                <UserPlus size={16} /> Criar Conta
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                                Gestão Solar <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-vts-orange to-yellow-400">Sem Limites</span>
                            </h1>

                            <h2 className="text-xl md:text-2xl text-slate-300 font-light mb-8 leading-relaxed">
                                A ferramenta definitiva para engenheiros e integradores que buscam escala.
                            </h2>

                            <p className="text-base text-slate-400 mb-10 leading-relaxed border-l-4 border-vts-petrol pl-6">
                                Simplifique processos complexos. Do comissionamento à entrega técnica, tudo centralizado em um ecossistema inteligente e intuitivo.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => handleWhatsAppAction('access')}
                                    className="flex items-center justify-center gap-3 bg-vts-orange hover:bg-vts-orangeHover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 transform hover:-translate-y-1"
                                >
                                    <Rocket size={20} />
                                    <span>Solicitar Demonstração Vip</span>
                                </button>
                                <button
                                    onClick={handleScheduleDemo}
                                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm group"
                                >
                                    <CalendarDays size={20} className="group-hover:text-vts-lightPetrol transition-colors" />
                                    <span>Agendar via Calendar</span>
                                </button>
                            </div>
                            <p className="mt-4 text-[10px] text-slate-500 flex items-center gap-1">
                                <CheckCircle2 size={10} className="text-green-500" /> Suporte especializado para parceiros VTS
                            </p>
                        </div>

                        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-vts-petrol/30 rounded-full blur-[100px]"></div>
                            <div className="relative z-20 w-[300px] h-[600px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
                                <div className="h-8 bg-slate-900 w-full flex justify-between items-center px-6">
                                    <span className="text-[10px] text-white font-bold">9:41</span>
                                    <div className="flex gap-1">
                                        <div className="w-4 h-2.5 bg-white rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 h-full flex flex-col">
                                    <div className="bg-vts-dark p-6 pb-8 rounded-b-3xl shadow-lg">
                                        <div className="flex justify-between items-center mb-6">
                                            <div>
                                                <p className="text-slate-400 text-xs uppercase font-bold">Projeto Atual</p>
                                                <h3 className="text-white font-bold text-lg">Usina Santa Fé</h3>
                                            </div>
                                            <div className="w-10 h-10 bg-vts-petrol rounded-full flex items-center justify-center text-white font-bold">VS</div>
                                        </div>
                                        <div className="flex justify-between items-center px-2 relative">
                                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -z-0"></div>
                                            <div className="relative z-10 w-3 h-3 bg-vts-orange rounded-full ring-4 ring-vts-dark"></div>
                                            <div className="relative z-10 w-3 h-3 bg-vts-orange rounded-full ring-4 ring-vts-dark"></div>
                                            <div className="relative z-10 w-3 h-3 bg-slate-600 rounded-full ring-4 ring-vts-dark"></div>
                                            <div className="relative z-10 w-3 h-3 bg-slate-600 rounded-full ring-4 ring-vts-dark"></div>
                                        </div>
                                        <div className="flex justify-between text-[9px] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                                            <span>Vistoria</span>
                                            <span>Projeto</span>
                                            <span>Homolog.</span>
                                            <span>Obra</span>
                                        </div>
                                    </div>
                                    <div className="p-5 space-y-4 overflow-hidden">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm"><CreditCard size={14} className="text-vts-petrol" /> Financeiro</h4>
                                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Em dia</span>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <div>
                                                    <p className="text-xs text-slate-500">Próxima Parcela</p>
                                                    <p className="text-lg font-bold text-slate-900">R$ 4.250,00</p>
                                                </div>
                                                <button className="bg-vts-petrol text-white text-xs px-3 py-1.5 rounded-lg">Pagar</button>
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm"><FileText size={14} className="text-vts-orange" /> Docs Automáticos</h4>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center text-red-500"><FileText size={12} /></div>
                                                        <span className="text-xs font-medium text-slate-600">ART de Projeto</span>
                                                    </div>
                                                    <CheckCircle2 size={14} className="text-green-500" />
                                                </div>
                                                <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-blue-500"><FileText size={12} /></div>
                                                        <span className="text-xs font-medium text-slate-600">Memorial Descritivo</span>
                                                    </div>
                                                    <CheckCircle2 size={14} className="text-green-500" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-xl text-white shadow-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Filter size={14} className="text-vts-orange" />
                                                <span className="text-xs font-bold uppercase">Busca Inteligente</span>
                                            </div>
                                            <p className="text-xs text-slate-300 mb-3">Encontramos 3 projetos similares na região (Telhado Metálico + 75kW).</p>
                                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                                <div className="w-2/3 h-full bg-vts-orange"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-vts-petrol font-bold uppercase tracking-widest text-sm mb-3">Ecossistema Completo</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Ferramentas de Engenharia Avançada</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: MessageSquare, title: 'Chat Interno', desc: 'Comunicação direta entre engenharia, vendas e cliente. Histórico centralizado por projeto.' },
                            { icon: CreditCard, title: 'Gestão Financeira', desc: 'Módulo de pagamentos integrado, emissão de boletos e gestão de planos de manutenção.' },
                            { icon: FileText, title: 'Docs Automáticos', desc: 'Geração instantânea de Memoriais, Procurações e ARTs com dados preenchidos pelo sistema.' },
                            { icon: Search, title: 'Filtros Avançados', desc: 'Busque projetos similares por potência, tipo de telhado ou inversor para referência técnica.' },
                            { icon: Clock, title: 'Timeline Real-Time', desc: 'Acompanhamento detalhado de fases: Vistoria > Projeto > Homologação > Instalação.' },
                            { icon: ClipboardCheck, title: 'Vistorias Digitais', desc: 'Checklists padronizados com upload obrigatório de fotos e validação geográfica.' },
                            { icon: BookOpen, title: 'Biblioteca Técnica', desc: 'Datasheets, normas (NBR) e manuais de instalação disponíveis offline.' },
                            { icon: Zap, title: 'Comissionamento', desc: 'Protocolos de teste e start-up do sistema guiados passo a passo pelo aplicativo.' }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-vts-petrol/5 transition-all group hover:-translate-y-1">
                                <div className="w-12 h-12 bg-slate-50 group-hover:bg-vts-petrol rounded-xl flex items-center justify-center text-vts-petrol group-hover:text-white transition-colors mb-4">
                                    <feature.icon size={24} />
                                </div>
                                <h4 className="font-bold text-vts-dark text-lg mb-2">{feature.title}</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white overflow-hidden border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2">
                            <div className="bg-slate-50 rounded-3xl p-6 shadow-2xl border border-slate-200 max-w-md mx-auto relative">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-vts-petrol flex items-center justify-center text-white">
                                        <Bot size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm">Assistente Técnico VTS</h4>
                                        <p className="text-xs text-green-600 font-bold flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-sm font-medium">
                                    <div className="flex justify-end">
                                        <div className="bg-vts-petrol text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md">
                                            Não entendi como funciona o plano de manutenção preventiva.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-white text-slate-600 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm border border-slate-100">
                                            <p className="mb-2">Olá! O plano <strong>VTS Care</strong> inclui 2 visitas anuais.</p>
                                            <p className="mb-3">Nós fazemos a limpeza dos painéis e reaperto das conexões elétricas para garantir segurança.</p>
                                            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 mb-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CreditCard size={12} className="text-vts-orange" />
                                                    <span className="text-xs font-bold text-slate-800">Plano Anual</span>
                                                </div>
                                                <p className="text-xs text-slate-500">12x R$ 89,90 no cartão.</p>
                                            </div>
                                            <p>Gostaria de contratar agora?</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <div className="bg-vts-petrol text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-md">
                                            Sim, por favor.
                                        </div>
                                    </div>
                                    <div className="flex justify-start">
                                        <div className="bg-white text-slate-600 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-sm border border-slate-100">
                                            <p className="flex items-center gap-2 mb-2 text-green-600 font-bold">
                                                <CheckCircle2 size={16} /> Plano ativado!
                                            </p>
                                            <p>Já geramos o contrato. Acesse a aba <strong>Financeiro</strong> para visualizar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="inline-flex items-center gap-2 bg-vts-petrol/10 px-3 py-1 rounded-full text-vts-petrol text-xs font-bold uppercase tracking-widest mb-6">
                                <MessageSquare size={14} /> Chat Responsivo Inteligente
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-vts-dark mb-6">
                                Dúvidas esclarecidas na hora. <br />Sem filas, sem espera.
                            </h3>
                            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                                Nosso chat não é apenas um robô de perguntas frequentes. Ele entende o contexto do seu projeto, tira dúvidas técnicas sobre equipamentos, explica faturas e conduz o cliente até a contratação de serviços ou resolução de problemas.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Explicação detalhada de termos técnicos',
                                    'Condução para pagamento e contratação de serviços',
                                    'Consulta de status de obra em linguagem natural',
                                    'Suporte a integradores sobre normas NBR'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-slate-700 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-vts-dark text-white border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-vts-orange/10 px-3 py-1 rounded-full text-vts-orange text-xs font-bold uppercase tracking-widest mb-6">
                                <ImageIcon size={14} /> Galeria Técnica
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Centralize fotos e vídeos da obra. <br />Adeus WhatsApp.
                            </h3>
                            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                                Mantenha o histórico visual completo de cada projeto. Usuários autorizados podem fazer upload de fotos e vídeos organizados automaticamente por tags e geolocalização.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { title: 'Upload Inteligente', desc: 'Envie múltiplas fotos de uma vez. O app sugere tags baseadas na etapa da obra.', icon: Cloud },
                                    { title: 'Geotagging GPS', desc: 'Garantia de que a foto foi tirada no local da obra (Metadados validados).', icon: CheckCircle2 },
                                    { title: 'Categorias (Tags)', desc: '#Inversor, #StringBox, #Módulos. Filtre milhares de fotos em segundos.', icon: Hash },
                                    { title: 'Vídeos Técnicos', desc: 'Suporte para upload de vídeos de drone e vistorias detalhadas.', icon: Video },
                                ].map((feat, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-vts-lightPetrol shrink-0">
                                            <feat.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm">{feat.title}</h4>
                                            <p className="text-xs text-slate-400 mt-1">{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 order-1 lg:order-2">
                            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-400 mb-4 font-mono">
                                    <FolderOpen size={16} />
                                    <span>Projetos</span>
                                    <span>/</span>
                                    <span className="text-white">Residencial Silva</span>
                                    <span>/</span>
                                    <span className="text-vts-orange">Vistoria Técnica</span>
                                </div>
                                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                    <span className="px-3 py-1 bg-vts-petrol text-white text-xs rounded-full font-medium whitespace-nowrap">Todas</span>
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full font-medium whitespace-nowrap hover:bg-slate-700 cursor-pointer">#Telhado</span>
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full font-medium whitespace-nowrap hover:bg-slate-700 cursor-pointer">#Elétrica</span>
                                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full font-medium whitespace-nowrap hover:bg-slate-700 cursor-pointer">#Drone</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center h-32 hover:border-vts-orange hover:bg-slate-800/50 transition-all cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 group-hover:bg-vts-orange group-hover:text-white transition-colors mb-2">
                                            <Plus size={20} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-500 group-hover:text-white">Adicionar Mídia</span>
                                    </div>
                                    <LazyMedia
                                        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=300"
                                        alt="Solar Panel"
                                        badgeIcon={Hash}
                                        badgeText="Telhado"
                                    />
                                    <LazyMedia
                                        src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=300"
                                        alt="Inverter"
                                        badgeIcon={Hash}
                                        badgeText="Inversor"
                                    />
                                    <LazyMedia
                                        type="video"
                                        src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=300"
                                        alt="Drone View"
                                        badgeIcon={Video}
                                        badgeText="Drone"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-vts-petrol font-bold uppercase tracking-widest text-sm mb-3">Feedback</h2>
                        <h3 className="text-3xl font-bold text-slate-900">O que dizem nossos parceiros</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Carlos Mendes", role: "Integrador Solar", quote: "O App Pro VTS revolucionou minhas vistorias. O que levava 2 horas agora faço em 30 minutos com o checklist digital integrado.", rating: 5 },
                            { name: "Eng. Fernanda Lima", role: "Projetista Elétrica", quote: "A geração automática de memoriais descritivos é impecável. Ganhei muito tempo na etapa de homologação junto à concessionária.", rating: 5 },
                            { name: "Roberto Almeida", role: "Investidor de Usinas", quote: "Gerenciamos 4 usinas de solo pelo app. O módulo financeiro integrado me dá total controle sobre o ROI em tempo real.", rating: 5 }
                        ].map((review, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 relative group hover:-translate-y-1 transition-transform">
                                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                                    <Quote size={40} className="text-vts-petrol" />
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 mb-6 leading-relaxed italic">"{review.quote}"</p>
                                <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                                    <div className="w-10 h-10 rounded-full bg-vts-dark flex items-center justify-center text-white font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                                        <p className="text-xs text-vts-petrol font-medium uppercase tracking-wide">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-vts-dark relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vts-petrol/10 to-transparent"></div>
                <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold text-white mb-4">Leve a VTS Engenharia no bolso</h2>
                        <p className="text-slate-400 mb-8 text-lg">
                            Disponível para iOS e Android. Acesse seus projetos, gerencie equipes e controle suas finanças de onde estiver.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => trackEvent('app_download_click', { store: 'app_store' })}
                                className="bg-white text-vts-dark px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-slate-200 transition-colors shadow-lg group"
                            >
                                <Smartphone size={24} className="text-vts-petrol" />
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-500 leading-none group-hover:text-vts-petrol transition-colors">Disponível na</p>
                                    <p className="font-bold leading-none">App Store</p>
                                </div>
                            </button>
                            <button
                                onClick={() => trackEvent('app_download_click', { store: 'google_play' })}
                                className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-colors shadow-lg"
                            >
                                <PlayCircle size={24} />
                                <div className="text-left">
                                    <p className="text-[10px] uppercase font-bold text-slate-400 leading-none">Baixe no</p>
                                    <p className="font-bold leading-none">Google Play</p>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 transform rotate-2 hover:rotate-0 transition-all duration-500 group cursor-pointer">
                            <div className="relative">
                                <img
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://vtsengenharia.com.br/app&color=0f172a"
                                    alt="QR Code para Download"
                                    className="w-48 h-48 mb-4 mix-blend-multiply group-hover:scale-105 transition-transform"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/90">
                                    <span className="text-vts-petrol font-bold text-sm">Baixar Agora</span>
                                </div>
                            </div>
                            <div className="text-center pt-2 border-t border-slate-100">
                                <p className="text-xs font-bold text-vts-orange uppercase tracking-widest flex items-center justify-center gap-1">
                                    <Smartphone size={12} /> Scan Me
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SolarApp;
