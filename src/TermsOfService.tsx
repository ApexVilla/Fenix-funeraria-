import React from 'react';
import { motion } from 'motion/react';
import { FileText, ArrowLeft, BookOpen, AlertCircle, Scale, Shield } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export default function TermsOfService({ onBack }: TermsOfServiceProps) {
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
            <BookOpen size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Termos de Serviço</h1>
            <p className="text-text-soft font-medium">Fênix Funerária</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-text-soft">
          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Shield size={20} className="text-primary" />
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar o site da Fênix Funerária, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum destes termos, está proibido de usar ou acessar este site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Scale size={20} className="text-primary" />
              2. Uso de Licença
            </h2>
            <p>
              É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Fênix Funerária, apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Modificar ou copiar os materiais;</li>
              <li>Usar os materiais para qualquer finalidade comercial ou para exibição pública;</li>
              <li>Remover quaisquer direitos autorais ou outras notações de propriedade dos materiais.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <AlertCircle size={20} className="text-primary" />
              3. Prestação de Serviços
            </h2>
            <p>
              A Fênix Funerária compromete-se a prestar assistência funerária com o máximo profissionalismo e ética. Os detalhes específicos de cada plano (Fênix e Ônix) são regidos pelos respectivos contratos de adesão assinados no momento da contratação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <FileText size={20} className="text-primary" />
              4. Limitações
            </h2>
            <p>
              Em nenhum caso a Fênix Funerária ou seus fornecedores serão responsáveis ​​por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais em nosso site, mesmo que tenhamos sido notificados oralmente ou por escrito da possibilidade de tais danos.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-text-soft">
          <span>Última atualização: Abril de 2026</span>
          <span className="font-bold text-primary">Fênix Funerária</span>
        </div>
      </motion.div>
    </div>
  );
}
