import React, { useState, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, Sun, Zap, Info, Loader2, Sparkles, MapPin, User, Mail, MessageCircle, Send } from 'lucide-react';
import { generateEngineeringReport } from '../services/geminiService';
import { SolarCalculationResult, UserType } from '../types';
import { supabase } from '../services/supabase';

const SolarCalculator: React.FC = () => {
    const [billValue, setBillValue] = useState<number | ''>('');
    const [userType, setUserType] = useState<UserType>(UserType.RESIDENTIAL);
    const [region, setRegion] = useState('Nordeste');
    const [result, setResult] = useState<SolarCalculationResult | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [aiReport, setAiReport] = useState<string>('');
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Lead Form State
    const [leadData, setLeadData] = useState({
        name: '',
        surname: '',
        email: '',
        cep: '',
        city: '',
        state: ''
    });

    const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLeadData({ ...leadData, [e.target.name]: e.target.value });
    };

    const [isCapturingLead, setIsCapturingLead] = useState(false);

    const sendToWhatsApp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!result) return;
        setIsCapturingLead(true);

        // Persist lead to Supabase
        try {
            await supabase
                .from('leads')
                .insert([
                    {
                        name: leadData.name + ' ' + leadData.surname,
                        email: leadData.email,
                        city: leadData.city,
                        state: leadData.state,
                        type: 'simulation',
                        interest: userType,
                        simulation_data: result
                    }
                ]);
        } catch (err) {
            console.error('Error saving lead:', err);
        }

        // Google Analytics Conversion Tracking
        if ((window as any).gtag) {
            (window as any).gtag('event', 'generate_lead', {
                event_category: 'calculator',
                event_label: 'whatsapp_proposal',
                currency: 'BRL',
                value: result.totalInvestment
            });
        }

        const message = `Olá, VTS Engenharia! Fiz uma simulação no site e gostaria de garantir a condição especial.

👤 *Dados do Cliente:*
Nome: ${leadData.name} ${leadData.surname}
Cidade: ${leadData.city}/${leadData.state}
Email: ${leadData.email}

📊 *Resultado da Simulação:*
Conta Atual: R$ ${result.monthlyBill}
Sistema Sugerido: ${result.systemSizeKWp.toFixed(2)} kWp
Geração Estimada: ${result.monthlyGenerationKWh.toFixed(0)} kWh
Investimento Aprox.: R$ ${result.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
Economia Anual: R$ ${result.annualSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}

Gostaria de saber mais sobre a disponibilidade do estoque!`;

        const phoneNumber = '5586999199443';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setIsCapturingLead(false);
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!billValue || billValue < 50) return;

        setIsCalculating(true);

        // --- LÓGICA DE CÁLCULO CALIBRADA (NORDESTE) ---
        // Benchmark do Cliente: Conta R$ 1.000 -> 7.4 kWp -> R$ 17.000 Investimento.

        // 1. Definição da Tarifa (R$/kWh)
        // Para R$ 1.000 gerar a necessidade de 7.4 kWp (aprox 950kWh/mês), a tarifa média considerada é R$ 1,05.
        let kwhPrice = 1.05;

        // 2. Definição da Irradiação (HSP - Horas de Sol Pleno)
        // Nordeste com média alta.
        let sunHours = 5.35;

        let performanceRatio = 0.80; // Eficiência do sistema (Perdas de 20%)

        // Ajustes finos para outras regiões (mantendo a lógica proporcional)
        if (region === 'Sudeste') { sunHours = 4.8; kwhPrice = 0.98; }
        if (region === 'Sul') { sunHours = 4.4; kwhPrice = 0.95; }
        if (region === 'Norte') { sunHours = 4.9; kwhPrice = 0.92; }
        if (region === 'Centro-Oeste') { sunHours = 5.1; kwhPrice = 0.94; }

        const monthlyGeneration = Number(billValue) / kwhPrice;
        const dailyGeneration = monthlyGeneration / 30;

        // Fórmula: Potência (kWp) = Geração Diária / (HSP * Performance)
        const systemSizeKWp = dailyGeneration / (sunHours * performanceRatio);

        // 3. Custo Base do Investimento (R$/Wp)
        // Benchmark: 7.4 kWp custa R$ 17.000 -> R$ 17.000 / 7400W = ~R$ 2.297
        let costPerWp = 2.297;

        // Ajuste de Economia de Escala
        if (systemSizeKWp > 75) {
            costPerWp = 2.100; // Indústria
        } else if (systemSizeKWp > 30) {
            costPerWp = 2.200; // Comercial Grande
        } else if (systemSizeKWp < 4) {
            costPerWp = 2.450; // Residencial Pequeno (Micro inversor ou custo fixo maior)
        }

        const totalInvestment = systemSizeKWp * 1000 * costPerWp;

        // Cálculo Financeiro
        const annualSavings = monthlyGeneration * kwhPrice * 12 * 0.95; // Margem de disponibilidade (Taxa mínima)
        const payback = totalInvestment / annualSavings;
        const co2 = monthlyGeneration * 12 * 0.126; // Fator de emissão (kg CO2)

        setTimeout(() => {
            setResult({
                monthlyBill: Number(billValue),
                systemSizeKWp,
                monthlyGenerationKWh: monthlyGeneration,
                totalInvestment,
                annualSavings,
                paybackYears: payback,
                co2Savings: co2,
            });
            setIsCalculating(false);
            setAiReport(''); // Clear previous report
            setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }, 1500);
    };

    const generateAiInsight = async () => {
        if (!result) return;
        setIsLoadingAi(true);
        const report = await generateEngineeringReport(result, userType);
        setAiReport(report);
        setIsLoadingAi(false);
    };

    // Chart Data Generation
    const generateChartData = () => {
        if (!result) return [];
        const data = [];
        let accumulatedSavings = -result.totalInvestment;
        for (let year = 0; year <= 25; year++) {
            data.push({
                year: `Ano ${year}`,
                balance: Math.round(accumulatedSavings),
            });
            // Inflação energética (aprox 6% a.a.) + Degradação do painel (-0.5% a.a.) = Net +5.5%
            const adjustedSavings = result.annualSavings * Math.pow(1.055, year);
            accumulatedSavings += adjustedSavings;
        }
        return data;
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-vts-dark mb-4">Calculadora Solar Fotovoltaica</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">Descubra o potencial do seu telhado. Utilizamos dados atualizados de irradiação solar e custos de kits fotovoltaicos da sua região.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Input Form */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-vts-orange to-yellow-500"></div>

                        <h2 className="text-2xl font-bold text-vts-petrol mb-6 flex items-center gap-2">
                            <Calculator className="text-vts-orange" /> Dados do Projeto
                        </h2>

                        <form onSubmit={handleCalculate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Região do Imóvel</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-vts-petrol outline-none appearance-none bg-slate-50 text-slate-700 font-medium"
                                    >
                                        <option value="Nordeste">Nordeste</option>
                                        <option value="Norte">Norte</option>
                                        <option value="Centro-Oeste">Centro-Oeste</option>
                                        <option value="Sudeste">Sudeste</option>
                                        <option value="Sul">Sul</option>
                                    </select>
                                </div>
                                {region === 'Nordeste' && (
                                    <p className="text-xs text-green-600 mt-2 font-bold flex items-center gap-1 animate-pulse">
                                        <Sparkles size={12} /> Condições especiais enquanto durar o estoque!
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Imóvel</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setUserType(UserType.RESIDENTIAL)}
                                        className={`py-3 rounded-lg border-2 text-sm font-medium transition-all ${userType === UserType.RESIDENTIAL ? 'border-vts-petrol bg-vts-petrol/5 text-vts-petrol' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                    >
                                        Residencial
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setUserType(UserType.COMMERCIAL)}
                                        className={`py-3 rounded-lg border-2 text-sm font-medium transition-all ${userType === UserType.COMMERCIAL ? 'border-vts-petrol bg-vts-petrol/5 text-vts-petrol' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}
                                    >
                                        Comercial
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Média da Fatura de Energia (R$)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">R$</span>
                                    <input
                                        type="number"
                                        value={billValue}
                                        onChange={(e) => setBillValue(e.target.value ? Number(e.target.value) : '')}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-vts-orange focus:ring-2 focus:ring-vts-orange/20 outline-none text-xl font-bold text-vts-dark transition-all placeholder:font-normal"
                                        placeholder="0,00"
                                        min="50"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><Info size={12} /> Valor médio dos últimos 12 meses.</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isCalculating}
                                className="w-full bg-vts-orange hover:bg-vts-orangeHover text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isCalculating ? (
                                    <><Loader2 className="animate-spin" /> Processando Engenharia...</>
                                ) : (
                                    'Calcular Investimento'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Results Area */}
                    <div ref={resultsRef} className={`transition-all duration-700 ${result ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-10 blur-sm pointer-events-none'}`}>
                        {result && (
                            <div className="space-y-6">
                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-vts-dark text-white p-6 rounded-2xl">
                                        <p className="text-slate-400 text-sm mb-1">Economia Anual</p>
                                        <p className="text-3xl font-bold text-emerald-400">R$ {result.annualSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                    </div>
                                    <div className="bg-white border border-slate-200 p-6 rounded-2xl">
                                        <p className="text-slate-500 text-sm mb-1">Retorno (Payback)</p>
                                        <p className="text-3xl font-bold text-vts-petrol">{result.paybackYears.toFixed(1)} <span className="text-lg font-normal text-slate-400">anos</span></p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><Sun size={20} className="text-yellow-500" /> Dimensionamento VTS</h3>
                                    <ul className="space-y-3">
                                        <li className="flex justify-between text-sm">
                                            <span className="text-slate-500">Potência Necessária:</span>
                                            <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{result.systemSizeKWp.toFixed(2)} kWp</span>
                                        </li>
                                        <li className="flex justify-between text-sm">
                                            <span className="text-slate-500">Geração Mensal Estimada:</span>
                                            <span className="font-bold text-slate-800">{result.monthlyGenerationKWh.toFixed(0)} kWh</span>
                                        </li>
                                        <li className="flex justify-between text-sm border-t border-slate-100 pt-3 mt-1">
                                            <span className="text-slate-500 font-medium">Investimento Estimado:</span>
                                            <span className="font-bold text-vts-orange text-lg">R$ {result.totalInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                        </li>
                                        <li className="text-[10px] text-right text-slate-400">
                                            *Valor aproximado. Solicite proposta final para precisão.
                                        </li>
                                    </ul>
                                </div>

                                {/* Chart */}
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 h-64 shadow-sm">
                                    <h4 className="text-sm font-bold text-slate-500 mb-4">Fluxo de Caixa Acumulado (25 Anos)</h4>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={generateChartData()}>
                                            <defs>
                                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#115e59" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#115e59" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                            <XAxis dataKey="year" hide />
                                            <YAxis hide />
                                            <Tooltip
                                                formatter={(value: number) => `R$ ${value.toLocaleString()}`}
                                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            />
                                            <Area type="monotone" dataKey="balance" stroke="#115e59" fillOpacity={1} fill="url(#colorPv)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* AI Integration */}
                                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-100 rounded-2xl p-6 relative">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                                            <Sparkles size={18} className="text-indigo-600" /> Análise VTS Intelligence
                                        </h3>
                                        {!aiReport && (
                                            <button
                                                onClick={generateAiInsight}
                                                disabled={isLoadingAi}
                                                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 disabled:opacity-50"
                                            >
                                                {isLoadingAi ? 'Analisando...' : 'Gerar Relatório IA'}
                                            </button>
                                        )}
                                    </div>

                                    {isLoadingAi ? (
                                        <div className="py-8 flex justify-center">
                                            <Loader2 className="animate-spin text-indigo-600" size={32} />
                                        </div>
                                    ) : aiReport ? (
                                        <div className="prose prose-sm text-slate-700 leading-relaxed">
                                            <p className="whitespace-pre-line">{aiReport}</p>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-indigo-800/60">
                                            Clique para receber uma análise técnica detalhada do nosso engenheiro virtual baseada nos seus dados de consumo.
                                        </p>
                                    )}
                                </div>

                                {/* WHATSAPP LEAD CAPTURE FORM */}
                                <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-green-500 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                                            <MessageCircle className="text-green-500" /> Garanta esta condição exclusiva
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-6">
                                            Preencha seus dados para receber esta proposta técnica oficial diretamente no seu WhatsApp.
                                        </p>

                                        <form onSubmit={sendToWhatsApp} className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        placeholder="Nome"
                                                        required
                                                        value={leadData.name}
                                                        onChange={handleLeadChange}
                                                        className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="surname"
                                                        placeholder="Sobrenome"
                                                        required
                                                        value={leadData.surname}
                                                        onChange={handleLeadChange}
                                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="Seu melhor e-mail"
                                                    required
                                                    value={leadData.email}
                                                    onChange={handleLeadChange}
                                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="cep"
                                                        placeholder="CEP"
                                                        required
                                                        value={leadData.cep}
                                                        onChange={handleLeadChange}
                                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                                                    />
                                                </div>
                                                <div className="relative col-span-2">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            placeholder="Cidade"
                                                            required
                                                            value={leadData.city}
                                                            onChange={handleLeadChange}
                                                            className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                                                        />
                                                        <input
                                                            type="text"
                                                            name="state"
                                                            placeholder="UF"
                                                            maxLength={2}
                                                            required
                                                            value={leadData.state}
                                                            onChange={handleLeadChange}
                                                            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none uppercase"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isCapturingLead}
                                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                                            >
                                                {isCapturingLead ? (
                                                    <Loader2 className="animate-spin" size={20} />
                                                ) : (
                                                    <>
                                                        <MessageCircle size={20} fill="white" /> Solicitar Proposta no WhatsApp
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-[10px] text-center text-slate-400">
                                                Ao clicar, você será redirecionado para o WhatsApp Oficial da VTS Engenharia.
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarCalculator;