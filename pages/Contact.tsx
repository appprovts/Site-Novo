import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
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

                    <div className="bg-slate-50 p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-vts-dark mb-6">Envie uma mensagem</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Nome" className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none" />
                                <input type="tel" placeholder="Telefone" className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none" />
                            </div>
                            <input type="email" placeholder="E-mail" className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none" />
                            <select className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none text-slate-600">
                                <option>Interesse em: Residencial</option>
                                <option>Interesse em: Comercial/Industrial</option>
                                <option>Parceria / Integrador</option>
                                <option>Outro</option>
                            </select>
                            <textarea rows={4} placeholder="Como podemos ajudar?" className="w-full p-3 rounded-lg border border-slate-200 focus:border-vts-petrol outline-none"></textarea>
                            <button className="w-full bg-vts-orange hover:bg-vts-orangeHover text-white py-3 rounded-lg font-bold transition-all shadow-lg">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;