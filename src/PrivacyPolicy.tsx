import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, FileText, Lock, Globe, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-bg-light text-text-main p-6 md:p-12 lg:p-24 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
      >
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-primary font-bold mb-8 hover:underline"
        >
          <ArrowLeft size={18} /> Voltar para o Início
        </button>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Política de Privacidade</h1>
            <p className="text-text-soft font-medium">Fênix Funerária</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-text-soft">
          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <FileText size={20} className="text-primary" />
              1. Coleta de Informações
            </h2>
            <p>
              A Fênix Funerária coleta e processa informações necessárias para a prestação de serviços funerários e planos de assistência. Isso inclui nomes, números de telefone, endereços e documentos de identificação fornecidos voluntariamente através de nossos canais de atendimento, incluindo nossa sede física e canais digitais como o WhatsApp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Lock size={20} className="text-primary" />
              2. Proteção de Dados
            </h2>
            <p>
              Adotamos medidas rigorosas de segurança para proteger suas informações contra acesso não autorizado, alteração ou divulgação. Seus dados são utilizados exclusivamente para o gerenciamento de planos, atendimento em momentos de necessidade e comunicação oficial da empresa. Não compartilhamos suas informações com terceiros para fins de marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <ShieldCheck size={20} className="text-primary" />
              3. Uso de Tecnologia e APIs
            </h2>
            <p>
              Podemos utilizar integrações tecnológicas, como a API do WhatsApp, para facilitar o atendimento imediato 24h. O processamento desses dados segue os padrões de segurança das plataformas integradas e as diretrizes da LGPD (Lei Geral de Proteção de Dados).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Globe size={20} className="text-primary" />
              4. Seus Direitos
            </h2>
            <p>
              Você tem o direito de solicitar o acesso, a correção ou a exclusão de seus dados pessoais a qualquer momento. Para isso, entre em contato através de nossos canais oficiais de atendimento ou visite nossa unidade administrativa.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-text-soft">
          <span>Última atualização: Abril de 2026</span>
          <span className="font-bold text-primary">Fênix Funerária</span>
        </div>
      </motion.div>

      <p className="mt-8 text-[10px] text-text-soft opacity-50 uppercase tracking-widest">
        Dignidade e Respeito em Todos os Momentos
      </p>
    </div>
  );
}
