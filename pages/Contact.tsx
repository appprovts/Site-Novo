import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from '../services/supabase';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        interest: 'Residencial',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name || 'message']: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: supabaseError } = await supabase
                .from('leads')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        interest: formData.interest,
                        message: formData.message,
                        type: 'contact'
                    }
                ]);

            if (supabaseError) throw supabaseError;

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || 'Erro ao enviar mensagem. Tente novamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="pt-32 pb-20 bg-white min-h-[60vh] flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h2>
                    <p className="text-slate-600 mb-8">Obrigado pelo contato. Nossos engenheiros analisarão sua solicitação e retornarão em breve.</p>
                    <button onClick={() => setSubmitted(false)} className="text-vts-petrol font-bold hover:underline">Enviar outra mensagem</button>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-vts-dark mb-4">Fale com nossos Engenheiros</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">Tire suas dúvidas sobre projetos, homologação ou manutenção.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-2xl font-bold text-vts-dark mb-8">Informações de Contato</h2>
                        <div className="space-y-8">
                            {[
                                { icon: Phone, title: 'Telefone', info: '(86) 9 9918-9443', sub: '(86) 9 9918-9443 (WhatsApp)' },
                                { icon: Mail, title: 'E-mail', info: 'contato@vtsengenharia.com.br', sub: 'projetos@vtsengenharia.com.br' },
                                { icon: MapPin, title: 'Matriz', info: 'Av. Paulista, 1000 - 15º Andar', sub: 'Bela Vista, São Paulo - SP' },
                                { icon: Clock, title: 'Horário', info: 'Segunda a Sexta: 08h às 18h', sub: 'Plantão Técnico 24h para Grupo A' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-vts-petrol shrink-0">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                        <p className="text-vts-petrol font-medium">{item.info}</p>
                                        <p className="text-slate-500 text-sm">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-vts-orange"></div>
                        <h2 className="text-2xl font-bold text-vts-dark mb-6">Envie uma mensagem</h2>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Nome"
                                    className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none bg-white transition-all shadow-sm"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Telefone"
                                    className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none bg-white transition-all shadow-sm"
                                />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="E-mail"
                                className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none bg-white transition-all shadow-sm"
                            />
                            <select
                                name="interest"
                                value={formData.interest}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none text-slate-600 bg-white transition-all shadow-sm"
                            >
                                <option value="Residencial">Interesse em: Residencial</option>
                                <option value="Comercial">Interesse em: Comercial/Industrial</option>
                                <option value="Parceria">Parceria / Integrador</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <textarea
                                name="message"
                                rows={4}
                                required
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Como podemos ajudar?"
                                className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none bg-white transition-all shadow-sm"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-vts-dark hover:bg-slate-800 text-white py-4 rounded-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 group disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        Enviar Mensagem
                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;