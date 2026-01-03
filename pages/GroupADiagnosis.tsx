import React, { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle2, Factory, ArrowRight, Activity, AlertTriangle, X, Check, Loader2, MessageCircle } from 'lucide-react';
import { diagnoseGroupA } from '../services/geminiService';

const GroupADiagnosis: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        company: '',
        cnpj: '',
        demand: '',
        peakConsumption: '',
        offPeakConsumption: ''
    });
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    // Upload & Modal States
    const [dragActive, setDragActive] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // File Upload Handlers
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSelectFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndSelectFile(e.target.files[0]);
        }
    };

    const validateAndSelectFile = (file: File) => {
        // Here you could add validation logic (PDF/Image type)
        setSelectedFile(file);
        setShowConfirmModal(true);
    };

    const confirmGroupAUpload = () => {
        setShowConfirmModal(false);
        simulateOCRExtraction();
    };

    const simulateOCRExtraction = () => {
        setIsExtracting(true);
        // Simulate extraction delay
        setTimeout(() => {
            setFormData({
                company: 'Indústria Exemplo S.A.',
                cnpj: '12.345.678/0001-90',
                demand: '150', // Mock extracted data
                peakConsumption: '2500',
                offPeakConsumption: '18500'
            });
            setIsExtracting(false);
        }, 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const aiResult = await diagnoseGroupA(
            Number(formData.demand), 
            Number(formData.peakConsumption), 
            Number(formData.offPeakConsumption)
        );
        
        setAnalysis(aiResult);
        setStep(2);
        setLoading(false);
    };

    const handleConsultancyRequest = () => {
        const message = `Olá, VTS! Fiz o pré-diagnóstico Grupo A no site.
🏢 *Empresa:* ${formData.company}
⚡ *Demanda:* ${formData.demand} kW
📊 *Consumo Ponta:* ${formData.peakConsumption} kWh
📉 *Consumo F. Ponta:* ${formData.offPeakConsumption} kWh

O sistema sugeriu oportunidades de economia. Gostaria de solicitar minha consultoria gratuita.`;
        
        const phoneNumber = '5586999199443';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="pt-24 pb-20 bg-slate-50 min-h-screen relative">
            
            {/* Modal de Confirmação Grupo A */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowConfirmModal(false)}></div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full relative z-10 shadow-2xl animate-fade-in">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-center text-slate-900 mb-2">Confirmação de Fatura</h3>
                        <p className="text-center text-slate-600 mb-6">
                            Para garantir a precisão da análise, confirme se a fatura enviada pertence ao <strong>Grupo A (Alta Tensão)</strong>.
                        </p>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={confirmGroupAUpload}
                                className="flex-1 py-3 bg-vts-petrol hover:bg-vts-dark text-white rounded-xl font-bold transition-colors flex justify-center items-center gap-2"
                            >
                                <Check size={18} /> Sim, é Grupo A
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                    <span className="bg-vts-petrol/10 text-vts-petrol px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">B2B & Industrial</span>
                    <h1 className="text-3xl md:text-5xl font-bold text-vts-dark mt-4 mb-4">Diagnóstico Grupo A</h1>
                    <p className="text-slate-600 text-lg">Análise inteligente de demanda contratada e oportunidades no Mercado Livre de Energia.</p>
                </div>

                {step === 1 && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
                        <div className="bg-vts-dark p-6 md:p-10 text-white flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-3"><Factory className="text-vts-orange"/> Dados da Unidade</h2>
                                <p className="text-slate-400 mt-2 text-sm">Insira os dados ou faça upload da fatura (PDF/Imagem).</p>
                            </div>
                            <div className="hidden md:block">
                                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                    <FileText size={32} />
                                </div>
                            </div>
                        </div>

                        {/* Upload Zone */}
                        <div 
                            className={`mx-8 mt-8 border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActive ? 'border-vts-orange bg-orange-50' : 'border-slate-200 hover:border-vts-petrol hover:bg-slate-50'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                className="hidden" 
                                accept=".pdf,image/*" 
                                onChange={handleChange} 
                            />
                            
                            {isExtracting ? (
                                <div className="flex flex-col items-center">
                                    <Loader2 className="animate-spin text-vts-petrol mb-3" size={32} />
                                    <p className="font-bold text-vts-dark">Extraindo dados via IA...</p>
                                    <p className="text-xs text-slate-500">Lendo demanda e consumo da fatura</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                                        <Upload size={24} />
                                    </div>
                                    <p className="font-bold text-slate-700">Clique para enviar ou arraste sua fatura</p>
                                    <p className="text-xs text-slate-400 mt-1">Suportamos PDF, JPG ou PNG</p>
                                </>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Empresa</label>
                                    <input required name="company" value={formData.company} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-vts-petrol focus:border-vts-petrol transition-all" placeholder="Nome da Razão Social" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">CNPJ</label>
                                    <input required name="cnpj" value={formData.cnpj} onChange={handleInputChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-vts-petrol transition-all" placeholder="00.000.000/0001-00" />
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-6">
                                <h3 className="text-lg font-bold text-vts-petrol mb-4">Dados Técnicos (Pré-Diagnóstico)</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Demanda (kW)</label>
                                        <input type="number" required name="demand" value={formData.demand} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Ex: 75" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Consumo Ponta (kWh)</label>
                                        <input type="number" required name="peakConsumption" value={formData.peakConsumption} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Ex: 500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Consumo F. Ponta (kWh)</label>
                                        <input type="number" required name="offPeakConsumption" value={formData.offPeakConsumption} onChange={handleInputChange} className="w-full p-3 border border-slate-200 rounded-lg" placeholder="Ex: 12000" />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button type="submit" disabled={loading} className="w-full bg-vts-petrol hover:bg-vts-dark text-white py-4 rounded-xl font-bold text-lg transition-all flex justify-center items-center gap-2 shadow-lg shadow-vts-petrol/20">
                                    {loading ? (
                                        <><Loader2 className="animate-spin" /> Gerando Relatório de Engenharia...</>
                                    ) : (
                                        <>Gerar Diagnóstico Completo <ArrowRight size={20}/></>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in border-t-8 border-vts-orange">
                        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
                                <CheckCircle2 size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Pré-Diagnóstico Concluído</h2>
                                <p className="text-slate-500">Análise preliminar para <strong>{formData.company}</strong></p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Activity size={18} className="text-vts-orange"/> Potencial Identificado
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                    Baseado nos dados extraídos, sua unidade apresenta perfil compatível com sistema de geração distribuída de <strong>{Math.round(Number(formData.offPeakConsumption)/115)} kWp</strong>.
                                </p>
                                <div className="mt-4 p-3 bg-white rounded border border-slate-200 text-xs text-slate-500">
                                    <p><strong>Demanda Atual:</strong> {formData.demand} kW</p>
                                    <p><strong>Fator de Carga:</strong> {(Number(formData.offPeakConsumption) / (Number(formData.demand) * 730)).toFixed(2)} (Estimado)</p>
                                </div>
                            </div>
                             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full opacity-50"></div>
                                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <Factory size={18} /> Recomendação Técnica VTS
                                </h3>
                                <div className="prose prose-sm text-blue-800 relative z-10">
                                    <p className="whitespace-pre-line">{analysis}</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center bg-vts-dark text-white p-10 rounded-2xl relative overflow-hidden shadow-2xl">
                             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-vts-petrol/20 to-transparent"></div>
                            <h3 className="text-2xl font-bold mb-3 relative z-10">Transforme este diagnóstico em economia real</h3>
                            <p className="text-slate-300 mb-8 max-w-lg mx-auto relative z-10">
                                Nossos engenheiros especialistas em Grupo A estão prontos para validar estes dados e propor a melhor solução de Mercado Livre ou Geração Própria.
                            </p>
                            
                            <button 
                                onClick={handleConsultancyRequest}
                                className="relative z-10 bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-3 mx-auto transform hover:-translate-y-1"
                            >
                                <MessageCircle size={24} fill="white" />
                                Solicitar Consultoria Gratuita
                            </button>
                            <p className="text-xs text-slate-500 mt-4 relative z-10">Fale diretamente com nossa engenharia via WhatsApp</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GroupADiagnosis;