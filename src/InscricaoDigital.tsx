import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, MapPin, Phone, Mail, FileText, Calendar, Heart, 
  Trash2, Plus, Send, ChevronLeft, Briefcase, Home, Shield,
  CheckCircle2
} from 'lucide-react';

interface Dependent {
  id: number;
  nome: string;
  parente: string;
  cpf: string;
}

const WhatsAppIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

interface InscricaoDigitalProps {
  onBack: () => void;
}

const InscricaoDigital: React.FC<InscricaoDigitalProps> = ({ onBack }) => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const initialFormData: Record<string, string> = {
    wa_num: '6295382038',
    vendedor: '',
    nome: '',
    residencia: '',
    cep: '',
    cidade: '',
    fone1: '',
    fone2: '',
    email: '',
    cpf: '',
    rg: '',
    nascimento: '',
    estado_civil: '',
    profissao: '',
    religiao: '',
    imovel: '',
    plano: '',
    valor_repassado: '150,00',
    venc_prestacao: '',
    data_pedido: getTodayDate(),
    pago_ato: 'Não',
    naturalidade: '',
    nat_cidade: '',
    valor_recebido: '150,00',
    qtd_pago: '1',
    valor_pago_parcelas: '',
    obs: '',
    metodo_cobranca: '',
    mesmo_endereco_cobranca: ''
  };

  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>(initialFormData);

  const [formId, setFormId] = useState<number>(1);

  const [toast, setToast] = useState<string | null>(null);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem('fenix_form_draft');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // Force adhesion fee to 150,00 even if draft has old value
        // Ensure data_pedido is strictly updated to today's date
        setFormData(prev => ({ 
          ...prev, 
          ...data.base, 
          valor_repassado: '150,00',
          data_pedido: getTodayDate()
        }));
        setDependents(data.deps || []);
      } catch (e) {
        console.error('Failed to load draft');
      }
    }

    const lastId = localStorage.getItem('fenix_last_id');
    if (lastId) {
      setFormId(parseInt(lastId));
    }
  }, []);

  // Save draft
  useEffect(() => {
    const draft = {
      base: formData,
      deps: dependents
    };
    localStorage.setItem('fenix_form_draft', JSON.stringify(draft));
  }, [formData, dependents]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let s = 0;
    for (let i = 1; i <= 9; i++) s = s + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    let r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    if (r !== parseInt(cpf.substring(9, 10))) return false;
    s = 0;
    for (let i = 1; i <= 10; i++) s = s + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    r = (s * 10) % 11;
    if (r === 10 || r === 11) r = 0;
    if (r !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  const validateCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14 || !!cnpj.match(/(\d)\1{13}/)) return false;
    let b = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let s = 0;
    for (let i = 0; i < 12; i++) s += parseInt(cnpj.charAt(i)) * b[i];
    if (parseInt(cnpj.charAt(12)) !== (s % 11 < 2 ? 0 : 11 - (s % 11))) return false;
    b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    s = 0;
    for (let i = 0; i <= 12; i++) s += parseInt(cnpj.charAt(i)) * b[i];
    if (parseInt(cnpj.charAt(13)) !== (s % 11 < 2 ? 0 : 11 - (s % 11))) return false;
    return true;
  };

  const fetchAddress = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, '');
    if (cleanCEP.length !== 8) return;

    setLoadingCEP(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
      const data = await res.json();
      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          residencia: `${data.logradouro}${data.bairro ? `, ${data.bairro}` : ''}`,
          cidade: `${data.localidade} / ${data.uf}`
        }));
        showToast('📍 Endereço preenchido!');
      } else {
        showToast('❌ CEP não encontrado');
      }
    } catch (e) {
      showToast('⚠️ Erro ao buscar CEP');
    } finally {
      setLoadingCEP(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    // Apply masks
    if (name === 'cpf') {
      const clean = value.replace(/\D/g, '');
      if (clean.length <= 11) {
        finalValue = clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      } else {
        finalValue = clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      }
      
      // Update error state
      if (clean.length === 11) {
        setErrors(prev => ({ ...prev, cpf: validateCPF(clean) ? '' : 'CPF Inválido' }));
      } else if (clean.length === 14) {
        setErrors(prev => ({ ...prev, cpf: validateCNPJ(clean) ? '' : 'CNPJ Inválido' }));
      } else {
        setErrors(prev => ({ ...prev, cpf: '' }));
      }
    } else if (name === 'cep') {
      finalValue = value.replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9);
      if (finalValue.replace(/\D/g, '').length === 8) {
        fetchAddress(finalValue);
      }
    } else if (name === 'valor_repassado' || name === 'valor_recebido' || name === 'valor_pago_parcelas') {
      const n = value.replace(/\D/g, '');
      finalValue = n ? (Number(n) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '';
    }

    setFormData(prev => ({ ...prev, [name]: finalValue }));
  };

  const addDependent = () => {
    setDependents(prev => [...prev, { id: Date.now(), nome: '', parente: '', cpf: '' }]);
  };

  const removeDependent = (id: number) => {
    setDependents(prev => prev.filter(d => d.id !== id));
  };

  const updateDependent = (id: number, field: keyof Dependent, value: string) => {
    let finalValue = value;
    if (field === 'cpf') {
      const clean = value.replace(/\D/g, '');
      if (clean.length <= 11) {
        finalValue = clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4').slice(0, 14);
      } else {
        finalValue = clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5').slice(0, 18);
      }
    }
    setDependents(prev => prev.map(d => d.id === id ? { ...d, [field]: finalValue } : d));
  };

  const handleSubmit = (target: 'company' | 'group') => {
    if (!formData.nome) return showToast('⚠️ Nome completo é obrigatório');
    if (!formData.cpf) return showToast('⚠️ CPF/CNPJ é obrigatório');
    if (!formData.venc_prestacao) return showToast('⚠️ 1º Vencimento é obrigatório');
    
    // Validation for Valor Recebido (100 - 150)
    const recVal = parseFloat(formData.valor_recebido.replace('.', '').replace(',', '.'));
    if (isNaN(recVal) || recVal < 100 || recVal > 150) {
      return showToast('⚠️ Valor Recebido deve ser entre R$ 100,00 e R$ 150,00');
    }

    // Adesão is fixed at 150

    // Date validation: max 1 month
    const pedidoDate = new Date(formData.data_pedido);
    const vencimentoDate = new Date(formData.venc_prestacao);
    const diffTime = Math.abs(vencimentoDate.getTime() - pedidoDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (vencimentoDate < pedidoDate) return showToast('⚠️ O vencimento não pode ser anterior ao pedido');
    if (diffDays > 31) return showToast('⚠️ O vencimento não pode ultrapassar 31 dias');

    if (errors.cpf) return showToast(`⚠️ ${errors.cpf}`);

    let msg = `🦅 *FÊNIX - PEDIDO DE INSCRIÇÃO*\n`;
    msg += `🔖 *Proposta Nº:* ${String(formId).padStart(3, '0')}\n`;
    if (formData.vendedor) msg += `👔 Atendente: ${formData.vendedor}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    msg += `*DADOS DO CONTRIBUINTE*\n`;
    msg += `👤 *Nome:* ${formData.nome}\n`;
    msg += `🆔 *Identidade:* ${formData.cpf}\n`;
    msg += `📍 *Cidade:* ${formData.cidade || 'Não informada'}\n`;
    if (formData.naturalidade) msg += `🌎 *Naturalidade:* ${formData.nat_cidade || ''} / ${formData.naturalidade}\n`;
    if (formData.profissao) msg += `💼 *Profissão:* ${formData.profissao}\n`;
    if (formData.religiao) msg += `🙏 *Religião:* ${formData.religiao}\n`;
    if (formData.residencia) msg += `🏠 *Endereço:* ${formData.residencia}\n`;
    if (formData.fone1) msg += `📞 *Fone:* ${formData.fone1}\n`;
    if (formData.fone2) msg += `📞 *Fone 2:* ${formData.fone2}\n`;
    if (formData.email) msg += `📧 *E-mail:* ${formData.email}\n\n`;

    msg += `*DETALHES DO PLANO*\n`;
    msg += `📦 *Tipo:* ${formData.plano || 'Não selecionado'}\n`;
    msg += `💰 *Adesão do Sistema:* R$ ${formData.valor_repassado}\n`;
    msg += `💵 *Valor Recebido (Adesão):* R$ ${formData.valor_recebido}\n`;
    msg += `💳 *Valor da Parcela:* R$ ${formData.plano === 'Ônix' ? '68,00' : '53,00'}\n`;
    msg += `🗓️ *1º Vencimento:* ${formData.venc_prestacao ? formData.venc_prestacao.split('-').reverse().join('/') : 'N/A'}\n`;
    msg += `📅 *Data Pedido:* ${formData.data_pedido.split('-').reverse().join('/')}\n`;
    msg += `✅ *1ª Parcela Paga no Ato?* ${formData.pago_ato}\n`;
    if (formData.metodo_cobranca) msg += `💳 *Método de Cobrança:* ${formData.metodo_cobranca}\n`;
    if (formData.metodo_cobranca === 'Cobrador') msg += `📍 *Cobrar no mesmo endereço?* ${formData.mesmo_endereco_cobranca || 'Não informado'}\n`;
    
    if (formData.pago_ato === 'Sim') {
      msg += `━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📊 *PAGAMENTO ANTECIPADO*\n`;
      msg += `📦 *Qtd Mensalidades:* ${formData.qtd_pago}\n`;
      msg += `💰 *Total Recebido:* R$ ${formData.valor_pago_parcelas || '0,00'}\n`;
    }
    msg += `\n`;

    if (dependents.length > 0) {
      msg += `*DEPENDENTES (${dependents.length})*\n`;
      dependents.forEach((d, i) => {
        if (d.nome) msg += `👥 *${i + 1}.* ${d.nome} (${d.parente})\n   🆔 CPF: ${d.cpf || '---'}\n`;
      });
      msg += `\n`;
    }

    if (formData.obs) msg += `📝 *Obs:* ${formData.obs}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🕒 _Gerado via Fênix Digital em ${new Date().toLocaleString('pt-BR')}_`;

    let number = '';
    if (target === 'company') {
      number = '556295382038'; // Corrected official number
    }

    const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    // Increment and save for next time
    const nextId = formId + 1;
    setFormId(nextId);
    localStorage.setItem('fenix_last_id', nextId.toString());

    // Prompt to clear data after submitting
    setTimeout(() => {
      if (confirm('Pedido gerado com sucesso! Deseja limpar os dados do formulário para iniciar um NOVO pedido?')) {
        localStorage.removeItem('fenix_form_draft');
        setFormData({ ...initialFormData, data_pedido: getTodayDate() });
        setDependents([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('🧹 Formulário pronto para novo pedido!');
      }
    }, 500);
  };

  const clearForm = () => {
    if (confirm('Deseja limpar todos os dados?')) {
      localStorage.removeItem('fenix_form_draft');
      setFormData({ ...initialFormData, data_pedido: getTodayDate() });
      setDependents([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showToast('🧹 Todos os dados foram limpos!');
    }
  };

  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-12 px-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-text-soft hover:text-primary transition-colors mb-4 group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Início
            </button>
            <h1 className="text-3xl md:text-4xl font-serif text-primary font-bold">Inscrição Digital</h1>
            <p className="text-text-soft">Preencha o formulário abaixo para formalizar seu pedido.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold text-primary shadow-sm">
                Sistema Fênix 2.1
              </span>
              <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold shadow-sm">
                Seguro & Criptografado
              </span>
            </div>
            <div className="bg-primary/5 px-4 py-1.5 rounded-xl border border-primary/20 flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-primary/60 tracking-tighter">Proposta Nº</span>
              <span className="text-lg font-serif font-bold text-primary tracking-widest">{String(formId).padStart(3, '0')}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-[0.65rem] font-bold text-text-soft uppercase tracking-wider">Identificação do Vendedor</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                name="vendedor"
                value={formData.vendedor}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white appearance-none"
              >
                <option value="">Selecionar Vendedor...</option>
                {[
                  'ESCRITÓRIO',
                  'AUGUSTO CESAR NOGUEIRA',
                  'EDIMILSON GOUVEIA GRANJA',
                  'ISABEL DE JESUS PEREIRA SILVA',
                  'CHARLES DIAS OLIVEIRA',
                  'IRANEIDE DE JESUS MUNIZ SILVA',
                  'PEDRO CÉSAR DE ALMEIDA'
                ].map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[0.65rem] font-bold text-text-soft uppercase tracking-wider">WhatsApp da Unidade</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="tel" 
                name="wa_num"
                value={formData.wa_num}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                placeholder="5562XXXXXXXXX"
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Section: Personal Info */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-primary font-bold mb-6 flex items-center gap-3">
              <User size={24} className="text-secondary" />
              Dados do Contribuinte
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-text-main">Nome Completo <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-bg-light/30"
                  placeholder="Ex: João da Silva"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">CPF / CNPJ <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.cpf ? 'border-red-500 bg-red-50/10' : 'border-gray-200'} focus:border-secondary outline-none transition-all`}
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                  />
                  {errors.cpf && <span className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-bold uppercase">{errors.cpf}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">RG</label>
                <input 
                  type="text" 
                  name="rg"
                  value={formData.rg}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                  placeholder="Nº da Identidade"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Data de Nascimento</label>
                <input 
                  type="date" 
                  name="nascimento"
                  value={formData.nascimento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Estado Civil</label>
                <select 
                  name="estado_civil"
                  value={formData.estado_civil}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                >
                  <option value="">Selecionar...</option>
                  <option>Solteiro(a)</option>
                  <option>Casado(a)</option>
                  <option>Divorciado(a)</option>
                  <option>Viúvo(a)</option>
                  <option>União Estável</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <label className="text-sm font-bold text-text-main">Naturalidade (UF)</label>
                  <select 
                    name="naturalidade"
                    value={formData.naturalidade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                  >
                    <option value="">...</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-bold text-text-main">Naturalidade (Cidade)</label>
                  <input 
                    type="text" 
                    name="nat_cidade"
                    value={formData.nat_cidade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                    placeholder="Cidade onde nasceu"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Profissão</label>
                <select 
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                >
                  <option value="">Selecionar...</option>
                  {['Aposentado(a)','Autônomo(a)','Comerciante','Dona de Casa','Estudante','Funcionário Público','Lavrador(a)','Pensionista','Outros'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Religião</label>
                <select 
                  name="religiao"
                  value={formData.religiao}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                >
                  <option value="">Selecionar...</option>
                  {['Católica','Evangélica','Espírita','Matriz Africana','Testemunha de Jeová','Outras','Sem Religião'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Section: Address & Contact */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-primary font-bold mb-6 flex items-center gap-3">
              <MapPin size={24} className="text-secondary" />
              Endereço e Contato
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-text-main">Residência (Rua, nº, Bairro)</label>
                <input 
                  type="text" 
                  name="residencia"
                  value={formData.residencia}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                  placeholder="Ex: Rua das Flores, 123, Centro"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">CEP</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="cep"
                    value={formData.cep}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                    placeholder="00000-000"
                  />
                  {loadingCEP && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Cidade / UF</label>
                <input 
                  type="text" 
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                  placeholder="Ex: Goiânia / GO"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Telefone Principal</label>
                <input 
                  type="tel" 
                  name="fone1"
                  value={formData.fone1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                  placeholder="(62) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Telefone Alternativo</label>
                <input 
                  type="tel" 
                  name="fone2"
                  value={formData.fone2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                  placeholder="(62) 99999-9999"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-text-main">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all"
                    placeholder="contato@exemplo.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Plan Details */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-primary font-bold mb-6 flex items-center gap-3">
              <Shield size={24} className="text-secondary" />
              Plano Selecionado
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
              {[
                { id: 'Ônix', label: 'Ônix', icon: '🔷', price: '68,00' },
                { id: 'Fênix', label: 'Fênix', icon: '🦅', price: '53,00' }
              ].map(plano => (
                <label 
                  key={plano.id}
                  className={`
                    relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all cursor-pointer
                    ${formData.plano === plano.id 
                      ? 'border-primary bg-primary/5 text-primary shadow-md' 
                      : 'border-gray-100 hover:border-gray-200 text-text-soft bg-white'}
                  `}
                >
                  <input 
                    type="radio" 
                    name="plano" 
                    value={plano.id}
                    checked={formData.plano === plano.id}
                    onChange={(e) => {
                      handleInputChange(e);
                      // Adhesion fee is fixed at 150,00 as requested
                      // This comment just clarifies we keep valor_repassado as '150,00'
                    }}
                    className="absolute opacity-0"
                  />
                  <span className="text-3xl mb-2">{plano.icon}</span>
                  <span className="text-sm font-black uppercase tracking-tight">{plano.label}</span>
                  <span className="text-xs font-bold opacity-60 mt-1">R$ {plano.price}/mês</span>
                  {formData.plano === plano.id && (
                    <motion.div 
                      layoutId="activePlan"
                      className="absolute -top-2 -right-2 bg-primary text-white p-1 rounded-full shadow-lg"
                    >
                      <CheckCircle2 size={14} />
                    </motion.div>
                  )}
                </label>
              ))}
            </div>

            <div className="max-w-md mx-auto mb-8 p-6 bg-primary/5 rounded-2xl border border-primary/20 text-center">
              <label className="text-sm font-bold text-primary block mb-2">Valor da Adesão</label>
              <div className="relative max-w-[200px] mx-auto">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary opacity-60">R$</span>
                <input 
                  type="text" 
                  name="valor_repassado"
                  value={formData.valor_repassado}
                  readOnly
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-primary/10 outline-none bg-white font-bold text-xl text-primary text-center"
                />
              </div>
              <p className="text-[10px] text-primary/60 mt-2 font-bold uppercase tracking-wider">Valor Padrão do Sistema</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-bg-light/50 rounded-2xl border border-gray-100">
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Valor Recebido (Adesão)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-secondary">R$</span>
                  <input 
                    type="text" 
                    name="valor_recebido"
                    value={formData.valor_recebido}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white font-black text-secondary"
                    placeholder="150,00"
                  />
                </div>
                <p className="text-[10px] text-text-soft italic">Mín: 100 | Máx: 150</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">1º Vencimento <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  name="venc_prestacao"
                  value={formData.venc_prestacao}
                  onChange={handleInputChange}
                  min={formData.data_pedido}
                  max={(() => {
                    const d = new Date(formData.data_pedido);
                    d.setDate(d.getDate() + 31);
                    return d.toISOString().split('T')[0];
                  })()}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">1ª Parcela Paga no Ato?</label>
                <select 
                  name="pago_ato"
                  value={formData.pago_ato}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                >
                  <option value="Não">Não</option>
                  <option value="Sim">Sim</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-text-main">Método de Cobrança</label>
                <select 
                  name="metodo_cobranca"
                  value={formData.metodo_cobranca}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                >
                  <option value="">Selecionar...</option>
                  <option value="Pix">Pix</option>
                  <option value="Cobrador">Cobrador</option>
                </select>
              </div>

              {formData.metodo_cobranca === 'Cobrador' && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Cobrar no mesmo endereço?</label>
                  <select 
                    name="mesmo_endereco_cobranca"
                    value={formData.mesmo_endereco_cobranca}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                  >
                    <option value="">Selecionar...</option>
                    <option value="Sim">Sim</option>
                    <option value="Não">Não</option>
                  </select>
                </div>
              )}

              <div className="space-y-2 md:col-span-3">
                <label className="text-sm font-bold text-text-main opacity-60">Data do Pedido (Automática)</label>
                <input 
                  type="date" 
                  name="data_pedido"
                  value={formData.data_pedido}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-gray-50 text-text-soft"
                />
              </div>
            </div>

            <AnimatePresence>
              {formData.pago_ato === 'Sim' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mt-4 bg-secondary/5 rounded-2xl border border-secondary/20">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary">Qtd de Parcelas Pagas</label>
                      <input 
                        type="number" 
                        name="qtd_pago"
                        min="1"
                        value={formData.qtd_pago}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-secondary/20 focus:border-secondary outline-none transition-all bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary">Valor Recebido (Mensalidades)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-secondary">R$</span>
                        <input 
                          type="text" 
                          name="valor_pago_parcelas"
                          value={formData.valor_pago_parcelas}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-secondary/20 focus:border-secondary outline-none transition-all bg-white font-black text-secondary"
                          placeholder={(() => {
                            const preco = formData.plano === 'Ônix' ? 68 : 53;
                            const qtd = parseInt(formData.qtd_pago) || 1;
                            return (preco * qtd).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                          })()}
                        />
                      </div>
                      <p className="text-[10px] text-secondary/60 italic font-bold">
                        Sugestão: R$ {(() => {
                          const preco = formData.plano === 'Ônix' ? 68 : 53;
                          const qtd = parseInt(formData.qtd_pago) || 1;
                          return (preco * qtd).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
                        })()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Section: Dependents */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-primary font-bold flex items-center gap-3">
                <Heart size={24} className="text-secondary" />
                Dependentes
              </h2>
              <span className="text-xs font-bold text-text-soft uppercase bg-bg-light px-3 py-1 rounded-full">
                {dependents.length} Inclusos
              </span>
            </div>

            <div className="space-y-4 mb-6">
              <AnimatePresence mode="popLayout">
                {dependents.map((dep, index) => (
                  <motion.div 
                    key={dep.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="p-6 bg-bg-light/30 rounded-2xl border border-gray-100 relative group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <button 
                        onClick={() => removeDependent(dep.id)}
                        className="text-text-soft hover:text-red-500 transition-colors p-1"
                        aria-label="Remover dependente"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[0.65rem] font-bold text-text-soft uppercase">Nome Completo</label>
                        <input 
                          type="text" 
                          value={dep.nome}
                          onChange={(e) => updateDependent(dep.id, 'nome', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                          placeholder="Nome do dependente"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[0.65rem] font-bold text-text-soft uppercase">Parentesco</label>
                          <select 
                            value={dep.parente}
                            onChange={(e) => updateDependent(dep.id, 'parente', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                          >
                            <option value="">...</option>
                            {['Cônjuge','Filho(a)','Pai','Mãe','Irmão(ã)','Neto(a)','Avô/Avó','Outro'].map(p => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[0.65rem] font-bold text-text-soft uppercase">CPF</label>
                          <input 
                            type="text" 
                            value={dep.cpf}
                            onChange={(e) => updateDependent(dep.id, 'cpf', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all bg-white"
                            placeholder="000.000.000-00"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button 
              onClick={addDependent}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-text-soft font-bold flex items-center justify-center gap-2 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            >
              <Plus size={20} />
              Adicionar Dependente
            </button>
          </section>

          {/* Section: Observations */}
          <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-serif text-primary font-bold mb-6 flex items-center gap-3">
              <FileText size={24} className="text-secondary" />
              Observações
            </h2>
            <textarea 
              name="obs"
              value={formData.obs}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-secondary outline-none transition-all resize-none"
              placeholder="Ex: Informações sobre carência, pedidos especiais ou detalhes adicionais..."
            />
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-4 mt-12">
            <button 
              onClick={() => handleSubmit('company')}
              className="w-full py-5 rounded-2xl bg-footer text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all group"
            >
              <WhatsAppIcon size={22} className="fill-white group-hover:translate-x-1 transition-transform" />
              Mandar para Empresa (Escritório)
            </button>
            <button 
              onClick={() => handleSubmit('group')}
              className="w-full py-5 rounded-2xl bg-whatsapp text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-whatsapp/20 hover:scale-[1.02] active:scale-[0.98] transition-all btn-shimmer"
            >
              <WhatsAppIcon size={22} className="fill-white" />
              Mandar no Grupo (Selecionar Vendedor)
            </button>
            <button 
              onClick={clearForm}
              className="w-full py-4 rounded-xl border border-gray-200 text-text-soft font-semibold hover:border-red-400 hover:text-red-500 transition-all flex items-center justify-center gap-2"
            >
              Limpar Todos os Dados
            </button>
          </div>
        </div>
      </div>

      {/* Floating Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-text-main text-white rounded-full shadow-2xl z-[100] font-bold text-sm"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-16 text-center text-text-soft text-xs space-y-2">
        <p>© {new Date().getFullYear()} Fênix Assessoria e Assistência Familiar</p>
        <p className="opacity-60">Sua segurança e privacidade são nossa prioridade.</p>
      </footer>
    </div>
  );
};

export default InscricaoDigital;
