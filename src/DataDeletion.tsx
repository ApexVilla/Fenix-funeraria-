import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowLeft, Trash2, Mail, Info, FileX } from 'lucide-react';

interface DataDeletionProps {
  onBack: () => void;
}

export default function DataDeletion({ onBack }: DataDeletionProps) {
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
            <Trash2 size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-serif font-bold text-primary">Exclusão de Dados</h1>
            <p className="text-text-soft font-medium">Instruções para remoção de informações pessoais</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-text-soft">
          <section className="bg-bg-light p-6 rounded-2xl border border-gray-100">
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Info size={20} className="text-primary" />
              Por que esta página existe?
            </h2>
            <p>
              Em conformidade com as políticas da Meta (WhatsApp Business) e com a LGPD, a Fênix Funerária disponibiliza este canal direto para que usuários possam solicitar a exclusão de seus dados pessoais armazenados em nossos sistemas de atendimento e CRM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <FileX size={20} className="text-primary" />
              Quais dados são excluídos?
            </h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Histórico de mensagens no WhatsApp Cloud API;</li>
              <li>Informações de cadastro em nosso CRM (Nome, Telefone, Email);</li>
              <li>Registros de atendimento administrativo;</li>
              <li>Qualquer informação pessoal identificável coletada durante o atendimento digital.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-serif font-bold text-text-main flex items-center gap-2 mb-4">
              <Mail size={20} className="text-primary" />
              Como solicitar a exclusão?
            </h2>
            <p>
              Para solicitar a exclusão definitiva dos seus dados, você pode seguir um dos seguintes procedimentos:
            </p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                <div className="font-bold text-primary mt-0.5">1.</div>
                <p>Envie um e-mail para <span className="font-bold">contato@fenixfuneraria.com.br</span> com o assunto "Solicitação de Exclusão de Dados — LGPD".</p>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                <div className="font-bold text-primary mt-0.5">2.</div>
                <p>Nesse e-mail, informe o número de telefone (com DDD) que foi utilizado durante o atendimento.</p>
              </div>
            </div>
            <p className="mt-4">
              Nossa equipe administrativa processará a solicitação em até <span className="font-bold">72 horas úteis</span> e enviará uma confirmação de conclusão da exclusão por e-mail ou mensagem.
            </p>
          </section>

          <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h2 className="text-lg font-serif font-bold text-primary flex items-center gap-2 mb-3">
              <ShieldAlert size={18} />
              Importante
            </h2>
            <p className="text-xs">
              A exclusão de dados de nossos canais digitais não anula obrigações contratuais ou fiscais decorrentes de serviços funerários já prestados, que devem ser mantidos por períodos legais obrigatórios conforme a legislação brasileira.
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
