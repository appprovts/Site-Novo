
import { GoogleGenAI } from "@google/genai";
import { SolarCalculationResult } from '../types';

export const generateEngineeringReport = async (data: SolarCalculationResult, userType: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Nota: Configure a API Key para receber uma análise detalhada da IA.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      Atue como um Engenheiro Sênior da VTS Engenharia, especialista em energia solar fotovoltaica.
      Gere um relatório técnico curto, persuasivo e profissional (máximo 3 parágrafos) para um cliente do tipo ${userType}.
      
      Dados do dimensionamento preliminar:
      - Conta Mensal Atual: R$ ${data.monthlyBill.toFixed(2)}
      - Tamanho do Sistema Sugerido: ${data.systemSizeKWp.toFixed(2)} kWp
      - Geração Estimada: ${data.monthlyGenerationKWh.toFixed(0)} kWh/mês
      - Economia Anual Estimada: R$ ${data.annualSavings.toFixed(2)}
      - Payback Estimado: ${data.paybackYears.toFixed(1)} anos
      
      O tom deve ser técnico mas acessível, focando em retorno sobre investimento (ROI), valorização do imóvel e sustentabilidade.
      Encerre convidando para uma visita técnica da equipe VTS para validar o telhado.
      Use formatação Markdown simples (negrito nos números importantes).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Não foi possível gerar o relatório no momento.";
  } catch (error) {
    console.error("Error generating report:", error);
    return "Erro ao conectar com o assistente de engenharia VTS.";
  }
};

export const diagnoseGroupA = async (demand: number, consumptionPeak: number, consumptionOffPeak: number): Promise<string> => {
    if (!process.env.API_KEY) return "API Key necessária para diagnóstico IA.";
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const prompt = `
            Você é um especialista em eficiência energética industrial (Grupo A) da VTS Engenharia.
            Analise estes dados preliminares:
            - Demanda Contratada: ${demand} kW
            - Consumo Ponta: ${consumptionPeak} kWh
            - Consumo Fora de Ponta: ${consumptionOffPeak} kWh
            
            Forneça 3 bullet points estratégicos sobre oportunidades de economia. Seja direto e técnico.
        `;
         const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || "Análise indisponível.";
    } catch (e) {
        return "Erro na análise automática.";
    }
};

export const getChatAssistantResponse = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) return "Olá! Sou o assistente da VTS. Como posso ajudar você hoje?";
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const prompt = `
      Você é o "VTS Assistant", o assistente virtual da VTS Engenharia.
      Sua missão é ser prestativo, técnico e elegante.
      
      Informações da VTS:
      - Especialidade: Energia Solar de Alta Performance, Diagnóstico Grupo A (Alta Tensão) e App de Gestão Pro.
      - Diferencial: Engenharia sênior e monitoramento inteligente.
      
      Se o usuário perguntar sobre preços, diga que depende do dimensionamento e sugira usar a "Calculadora Solar" no site.
      Se o usuário tiver problemas técnicos, sugira o "Suporte App Pro".
      Mantenha as respostas curtas (máximo 2-3 frases).
      
      Pergunta do usuário: "${userMessage}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Entendi. Como posso prosseguir com seu atendimento?";
  } catch (error) {
    return "Desculpe, tive um problema técnico. Posso te encaminhar para um consultor no WhatsApp?";
  }
};
