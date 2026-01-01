import React, { useState } from 'react';
import { User, Mail, Lock, FileText, ArrowRight, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cnpj: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Algoritmo de Validação de CNPJ (Módulo 11)
  const validateCNPJ = (cnpj: string): boolean => {
    // Remove caracteres não numéricos
    cnpj = cnpj.replace(/[^\d]+/g, '');

    // Verifica tamanho e se todos os dígitos são iguais
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Validação do primeiro dígito verificador
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    // Validação do segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  };

  // Máscara de CNPJ
  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'cnpj') {
      const formatted = formatCNPJ(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));

      // Limpa erro se estiver corrigindo
      if (errors.cnpj) setErrors(prev => ({ ...prev, cnpj: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validações
    const newErrors: Record<string, string> = {};

    if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido. Verifique os números digitados.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            cnpj: formData.cnpj,
          }
        }
      });

      if (error) {
        throw error;
      }

      setSuccess(true);
    } catch (err: any) {
      setErrors({ form: err.message || 'Erro ao realizar cadastro.' });
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center animate-fade-in border-t-4 border-green-500">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cadastro Solicitado!</h2>
          <p className="text-slate-600 mb-6">
            Recebemos seus dados empresariais. Nossa equipe de homologação validará seu CNPJ e liberará o acesso Pro em até 24h.
          </p>
          <Link to="/" className="inline-block bg-vts-petrol text-white px-6 py-3 rounded-xl font-bold hover:bg-vts-dark transition-colors">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-vts-dark relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-vts-dark via-slate-900 to-vts-petrol/20"></div>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-vts-petrol rounded-xl text-white mb-4 shadow-lg shadow-vts-petrol/30">
            <Building2 size={24} />
          </div>
          <h1 className="text-3xl font-bold text-white">Acesso Integrador</h1>
          <p className="text-slate-400 mt-2">Crie sua conta corporativa e gerencie suas usinas.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nome */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Razão Social ou Nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ex: VTS Engenharia LTDA"
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-vts-petrol focus:border-vts-petrol outline-none transition-all"
                  />
                </div>
              </div>

              {/* CNPJ */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">CNPJ (Obrigatório)</label>
                <div className="relative">
                  <FileText className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.cnpj ? 'text-red-400' : 'text-slate-400'}`} size={18} />
                  <input
                    type="text"
                    name="cnpj"
                    required
                    maxLength={18}
                    value={formData.cnpj}
                    onChange={handleChange}
                    placeholder="00.000.000/0000-00"
                    className={`w-full pl-10 p-3 bg-slate-50 border rounded-xl text-slate-800 focus:ring-2 outline-none transition-all font-mono ${errors.cnpj ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-slate-200 focus:ring-vts-petrol focus:border-vts-petrol'}`}
                  />
                </div>
                {errors.cnpj && (
                  <p className="text-xs text-red-500 mt-1 font-bold flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.cnpj}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="financeiro@suaempresa.com.br"
                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-vts-petrol focus:border-vts-petrol outline-none transition-all"
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="******"
                      className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-vts-petrol outline-none transition-all"
                    />
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div className="relative">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Confirmar</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="******"
                      className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-vts-petrol outline-none transition-all"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-vts-orange hover:bg-vts-orangeHover text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Validando...' : 'Criar Conta Profissional'}
                {!isSubmitting && <ArrowRight size={20} />}
              </button>
            </form>
          </div>
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-sm text-slate-600">
              Já tem conta? <Link to="/login" className="text-vts-petrol font-bold hover:underline">Faça Login</Link>
            </p>
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Ao se cadastrar, você concorda com os Termos de Uso e Política de Privacidade da VTS Engenharia.
        </p>
      </div>
    </div>
  );
};

export default Register;
