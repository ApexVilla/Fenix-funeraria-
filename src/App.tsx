import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone, MapPin, Clock, Heart, ShieldCheck, Globe, FileText, Users,
  CheckCircle2, Star, Menu, X, ArrowRight, Send, ChevronLeft, ChevronRight,
  Flower2, Truck, Home, BookOpen, Award, HandHeart, Crown, Sparkles
} from 'lucide-react';

/* ========== UTILITY COMPONENTS ========== */

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">{children}</span>
);

const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-3xl md:text-4xl lg:text-[2.75rem] font-serif text-text-main mb-5 leading-tight ${className}`}>{children}</h2>
);

/* Counter hook */
function useCounter(target: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [started, target, duration]);

  return { count, ref };
}

/* WhatsApp SVG */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ========== NAVBAR ========== */

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Início', href: '#home' },
    { name: 'Planos', href: '#plans' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Coberturas', href: '#coverage' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'navbar-scrolled py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex flex-col">
          <span className={`font-serif font-bold text-2xl md:text-3xl tracking-tight leading-none transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
            Fênix
          </span>
          <span className={`text-[0.55rem] font-bold tracking-[0.15em] uppercase mt-0.5 transition-colors ${scrolled ? 'text-text-soft' : 'text-white/80'}`}>
            Funerária
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map(l => (
            <a key={l.name} href={l.href} className={`text-sm font-medium transition-colors ${scrolled ? 'text-text-soft hover:text-primary' : 'text-white/80 hover:text-white'}`}>
              {l.name}
            </a>
          ))}
          <a href="#contact" className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all btn-shimmer ${scrolled ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-white/15 text-white backdrop-blur-sm border border-white/25 hover:bg-white/25'
            }`}>
            Solicitar Proposta
          </a>
        </nav>

        <button className={`lg:hidden p-2 ${scrolled ? 'text-primary' : 'text-white'}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(l => (
                <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="text-text-main font-medium py-3 border-b border-gray-50 hover:text-primary transition-colors">
                  {l.name}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-3 flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-white font-bold">
                Solicitar Proposta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ========== HERO ========== */

const Hero = () => (
  <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1B5A9A] to-secondary z-0" />
    {/* Decorative circles */}
    <div className="absolute inset-0 z-[1] overflow-hidden opacity-10">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full border border-white/40" />
      <div className="absolute bottom-20 -left-20 w-[300px] h-[300px] rounded-full border border-white/30" />
      <div className="absolute top-1/2 right-1/4 w-[200px] h-[200px] rounded-full bg-white/5" />
    </div>
    {/* SVG Wave bottom */}
    <div className="absolute bottom-0 left-0 w-full z-[2]">
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px]">
        <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="#F4F8FD" />
      </svg>
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-8 text-center mt-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-bold tracking-[0.15em] uppercase mb-8">
          ✓ Atendimento Humanizado 24h
        </span>
      </motion.div>

      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-white leading-[1.1] mb-6">
        Cuidado e Segurança{' '}
        <span className="block mt-2">
          Para Quem Você <span className="italic text-gold-light">Ama</span>
        </span>
      </motion.h1>

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
        Planos funerários com dignidade, respeito e total suporte em todos os momentos. Sua família protegida com quem entende de cuidado.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <a href="#plans" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-bg-light transition-all shadow-lg hover:shadow-xl btn-shimmer flex items-center justify-center gap-2">
          Conheça Nossos Planos <ArrowRight size={18} />
        </a>
        <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          Fale Conosco
        </a>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/70 text-sm">
        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-gold" /> +10.000 famílias atendidas</span>
        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-gold" /> Atendimento 24h</span>
        <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-gold" /> Cobertura Nacional</span>
      </motion.div>
    </div>

    <motion.div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 text-white/40 z-10" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
      <div className="flex flex-col items-center gap-1">
        <span className="text-[0.6rem] tracking-[0.2em] uppercase">Rolar</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </motion.div>
  </section>
);

/* ========== DIFFERENTIALS ========== */

const Differentials = () => {
  const items = [
    { icon: <Clock size={28} />, title: 'Atendimento 24h', desc: 'Equipe disponível a qualquer hora do dia ou da noite.' },
    { icon: <Heart size={28} />, title: 'Planos Acessíveis', desc: 'Opções que cabem no orçamento de toda família.' },
    { icon: <Globe size={28} />, title: 'Cobertura Nacional', desc: 'Atendimento em todo o território brasileiro.' },
    { icon: <ShieldCheck size={28} />, title: 'Suporte Completo', desc: 'Cuidamos de tudo, do início ao fim.' },
    { icon: <FileText size={28} />, title: 'Documentação Facilitada', desc: 'Toda burocracia resolvida por nossa equipe.' },
    { icon: <HandHeart size={28} />, title: 'Respeito e Dignidade', desc: 'Tratamento humanizado em cada detalhe.' },
  ];

  return (
    <section className="py-20 bg-bg-light section-pattern">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeIn>
            <SectionLabel>Nossos Diferenciais</SectionLabel>
            <SectionTitle>Por que escolher a <span className="italic text-primary">Fênix</span>?</SectionTitle>
            <p className="text-text-soft">Oferecemos o melhor em assistência funerária, combinando profissionalismo, empatia e respeito.</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white p-7 rounded-2xl border border-gray-100 card-hover group h-full">
                <div className="w-14 h-14 rounded-xl bg-bg-light text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-serif text-text-main mb-2">{item.title}</h3>
                <p className="text-text-soft text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== PLANS ========== */

const Plans = () => {
  const plans = [
    {
      name: 'Essencial', price: 'R$ 49,90', period: '/mês',
      desc: 'Cobertura básica e digna para o titular e dependentes.',
      features: ['Urna padrão', 'Preparação básica', 'Coroa de flores simples', 'Traslado até 100km', 'Assistência funeral 24h'],
      highlight: false, color: 'border-t-secondary'
    },
    {
      name: 'Familiar', price: 'R$ 89,90', period: '/mês',
      desc: 'A escolha ideal, com conforto extra para toda a família.',
      features: ['Urna luxo', 'Tanatopraxia completa', '2 Coroas de flores', 'Traslado até 300km', 'Assistência funeral 24h', 'Sala de velório premium'],
      highlight: true, color: 'border-t-gold'
    },
    {
      name: 'Premium', price: 'R$ 149,90', period: '/mês',
      desc: 'Máximo conforto e exclusividade, sem preocupações.',
      features: ['Urna super luxo', 'Tanatopraxia completa', 'Coroas de flores nobres', 'Traslado nacional ilimitado', 'Assistência funeral 24h', 'Cerimonialista exclusivo', 'Apoio psicológico pós-luto'],
      highlight: false, color: 'border-t-primary'
    }
  ];

  return (
    <section id="plans" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeIn>
            <SectionLabel>Prevenção e Cuidado</SectionLabel>
            <SectionTitle>Planos Funerários</SectionTitle>
            <p className="text-text-soft">Garantir a tranquilidade da sua família no futuro é um ato de amor no presente.</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {plans.map((plan, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`relative p-8 rounded-3xl border ${plan.color} border-t-[3px] h-full flex flex-col ${plan.highlight ? 'bg-primary text-white shadow-2xl lg:scale-105' : 'bg-white border-gray-200 shadow-sm card-hover'
                }`}>
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 badge-popular">
                    ★ Mais Popular
                  </div>
                )}
                <h3 className={`text-2xl font-serif mb-2 ${plan.highlight ? 'text-white' : 'text-text-main'}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-white/75' : 'text-text-soft'}`}>{plan.desc}</p>
                <div className="mb-7">
                  <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                  <span className={`text-sm ${plan.highlight ? 'text-white/60' : 'text-text-soft'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-gold' : 'text-secondary'}`} />
                      <span className={`text-sm ${plan.highlight ? 'text-white/90' : 'text-text-soft'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`w-full py-3.5 rounded-full font-bold text-center transition-all btn-shimmer block ${plan.highlight ? 'bg-white text-primary hover:bg-bg-light' : 'bg-primary text-white hover:bg-primary-dark'
                  }`}>
                  Solicitar Proposta
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== HOW IT WORKS ========== */

const HowItWorks = () => {
  const steps = [
    { num: '01', title: 'Escolha o Plano', desc: 'Selecione o plano ideal para sua família entre nossas opções.', icon: <BookOpen size={24} /> },
    { num: '02', title: 'Cadastre-se', desc: 'Preencha seus dados e dos dependentes de forma simples e rápida.', icon: <FileText size={24} /> },
    { num: '03', title: 'Receba seu Cartão', desc: 'Você recebe o cartão de identificação do plano em sua casa.', icon: <Award size={24} /> },
    { num: '04', title: 'Esteja Protegido', desc: 'Acione a qualquer momento, 24h por dia, em todo o Brasil.', icon: <ShieldCheck size={24} /> },
  ];

  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeIn>
            <SectionLabel>Simples e Rápido</SectionLabel>
            <SectionTitle>Como Funciona</SectionTitle>
            <p className="text-text-soft">Em poucos passos sua família já está protegida.</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                  {s.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-secondary/30 to-transparent" />
                )}
                <span className="text-xs font-bold text-gold tracking-wider">PASSO {s.num}</span>
                <h3 className="text-lg font-serif text-text-main mt-2 mb-2">{s.title}</h3>
                <p className="text-text-soft text-sm leading-relaxed">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== ABOUT ========== */

const About = () => {
  const c1 = useCounter(20, 2000);
  const c2 = useCounter(10000, 2000);
  const c3 = useCounter(500, 2000);

  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-3 bg-bg-light rounded-[2rem] transform -rotate-2 z-0" />
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1470&auto=format&fit=crop" alt="Família feliz reunida" className="relative z-10 w-full h-[450px] object-cover rounded-[2rem] shadow-xl" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-lg z-20" ref={c1.ref}>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-bg-light flex items-center justify-center text-primary"><Heart size={22} /></div>
                  <div className="font-serif text-3xl text-primary font-bold">{c1.count}+</div>
                </div>
                <p className="text-xs text-text-soft font-medium mt-1">Anos de experiência</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <SectionLabel>Nossa Essência</SectionLabel>
            <SectionTitle>Compromisso com a <span className="italic text-primary">serenidade</span> e o <span className="italic text-primary">respeito</span>.</SectionTitle>
            <p className="text-text-soft mb-5 leading-relaxed">
              A Fênix Funerária nasceu com o propósito de oferecer um atendimento verdadeiramente humanizado, onde a empatia e o respeito guiam cada ação. Compreendemos que a despedida de um ente querido é um dos momentos mais delicados da vida.
            </p>
            <p className="text-text-soft mb-8 leading-relaxed">
              Nossa equipe cuida de todos os trâmites burocráticos e logísticos, sendo um ombro amigo para que sua família tenha espaço e tranquilidade.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-bg-light rounded-2xl">
              <div className="text-center" ref={c2.ref}>
                <div className="font-serif text-2xl md:text-3xl text-primary font-bold">{c2.count.toLocaleString('pt-BR')}+</div>
                <p className="text-xs text-text-soft mt-1">Famílias Atendidas</p>
              </div>
              <div className="text-center" ref={c3.ref}>
                <div className="font-serif text-2xl md:text-3xl text-primary font-bold">{c3.count}+</div>
                <p className="text-xs text-text-soft mt-1">Cidades Cobertas</p>
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl md:text-3xl text-primary font-bold">24h</div>
                <p className="text-xs text-text-soft mt-1">Atendimento</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {['Atendimento Humanizado', 'Transparência Total', 'Ética Profissional', 'Estrutura Acolhedora'].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="text-secondary shrink-0" size={18} />
                  <span className="text-text-main text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

/* ========== TESTIMONIALS ========== */

const Testimonials = () => {
  const testimonials = [
    { text: 'Em um momento de tanta dor, a equipe da Fênix foi um verdadeiro anjo. Cuidaram de tudo com delicadeza e profissionalismo que nos trouxe muita paz.', author: 'Maria Silva', city: 'São Paulo, SP' },
    { text: 'A transparência e o respeito com que fomos tratados fizeram toda a diferença. A estrutura é impecável e o atendimento verdadeiramente humanizado.', author: 'João Pereira', city: 'Rio de Janeiro, RJ' },
    { text: 'Não precisamos nos preocupar com nenhuma burocracia. Resolveram tudo de forma rápida e discreta, permitindo que focássemos na nossa despedida.', author: 'Ana Costa', city: 'Belo Horizonte, MG' },
    { text: 'A Fênix nos acolheu como família. O suporte psicológico pós-luto foi fundamental para nossa recuperação. Recomendo de coração.', author: 'Carlos Mendes', city: 'Curitiba, PR' },
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [paused, testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-bg-light">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeIn>
            <SectionLabel>Depoimentos</SectionLabel>
            <SectionTitle>Palavras de quem confia em nós</SectionTitle>
          </FadeIn>
        </div>

        <div className="max-w-3xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 relative min-h-[250px]">
            <div className="absolute top-6 left-8 text-5xl text-primary/10 font-serif">"</div>
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.5 }}>
                <div className="flex gap-1 text-gold mb-5">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-text-main text-lg md:text-xl italic leading-relaxed mb-8 font-light">"{testimonials[current].text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {testimonials[current].author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-main text-sm">{testimonials[current].author}</h4>
                    <span className="text-text-soft text-xs">{testimonials[current].city}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-text-soft hover:text-primary hover:border-primary transition-colors" aria-label="Anterior">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-primary w-7' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Depoimento ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-text-soft hover:text-primary hover:border-primary transition-colors" aria-label="Próximo">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ========== COVERAGE ========== */

const Coverage = () => {
  const items = [
    { icon: <Crown size={26} />, name: 'Urna / Caixão' },
    { icon: <Truck size={26} />, name: 'Traslado' },
    { icon: <Home size={26} />, name: 'Sala de Velório' },
    { icon: <Heart size={26} />, name: 'Preparação do Corpo' },
    { icon: <FileText size={26} />, name: 'Documentação' },
    { icon: <Flower2 size={26} />, name: 'Coroa de Flores' },
    { icon: <Users size={26} />, name: 'Apoio à Família' },
    { icon: <Sparkles size={26} />, name: 'Cerimônia' },
  ];

  return (
    <section id="coverage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <FadeIn>
            <SectionLabel>Coberturas</SectionLabel>
            <SectionTitle>Serviços Inclusos nos Planos</SectionTitle>
            <p className="text-text-soft">Todos os nossos planos incluem uma gama completa de serviços para que você não precise se preocupar com nada.</p>
          </FadeIn>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-bg-light rounded-2xl p-6 text-center card-hover group border border-transparent hover:border-secondary/20">
                <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-text-main">{item.name}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ========== CONTACT ========== */

const Contact = () => (
  <section id="contact" className="py-20 bg-bg-light section-pattern">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <FadeIn>
          <SectionLabel>Fale Conosco</SectionLabel>
          <SectionTitle>Estamos aqui para ajudar</SectionTitle>
          <p className="text-text-soft mb-10">Nossa equipe está disponível 24h por dia, 7 dias por semana. Entre em contato ou preencha o formulário para receber sua proposta.</p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Phone size={22} /></div>
              <div>
                <h4 className="font-bold text-text-main mb-1">Plantão 24h</h4>
                <p className="text-text-soft">(62) 3283-0202</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><MapPin size={22} /></div>
              <div>
                <h4 className="font-bold text-text-main mb-1">Endereço</h4>
                <p className="text-text-soft">Av. B, s/n - St. Araguaia<br />Aparecida de Goiânia - GO, 74981-150</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0"><Clock size={22} /></div>
              <div>
                <h4 className="font-bold text-text-main mb-1">Horário</h4>
                <p className="text-text-soft">Atendimento 24 horas<br />Todos os dias, inclusive feriados</p>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <form className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-serif text-text-main mb-1">Solicite sua Proposta</h3>
            <p className="text-text-soft text-sm mb-6">Preencha o formulário e entraremos em contato.</p>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-text-main mb-1">Nome completo</label>
                <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white" placeholder="Seu nome" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-text-main mb-1">Telefone / WhatsApp</label>
                  <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-text-main mb-1">E-mail</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-bold text-text-main mb-1">Cidade</label>
                  <input type="text" id="city" className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white" placeholder="Sua cidade" />
                </div>
                <div>
                  <label htmlFor="dependents" className="block text-sm font-bold text-text-main mb-1">Nº de Dependentes</label>
                  <input type="number" id="dependents" className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white" placeholder="0" min="0" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-bold text-text-main mb-1">Mensagem (opcional)</label>
                <textarea id="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 form-input bg-white resize-none" placeholder="Como podemos ajudar?" />
              </div>
              <button type="button" className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors btn-shimmer flex items-center justify-center gap-2 mt-1">
                <Send size={18} /> Quero Receber Minha Proposta
              </button>
            </div>
          </form>
        </FadeIn>
      </div>
    </div>
  </section>
);

/* ========== FOOTER ========== */

const Footer = () => (
  <footer className="bg-footer text-white/70 pt-14 pb-6">
    <div className="max-w-7xl mx-auto px-5 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-4">
            <span className="font-serif font-bold text-2xl text-white">Fênix</span>
            <span className="block text-[0.6rem] font-bold tracking-[0.15em] uppercase text-white/60 mt-0.5">Funerária</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">Cuidando de cada detalhe com respeito, dignidade e amor nos momentos mais delicados da vida.</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            {['Início#home', 'Planos#plans', 'Sobre Nós#about', 'Coberturas#coverage', 'Depoimentos#testimonials', 'Contato#contact'].map(l => {
              const [name, href] = l.split('#');
              return <li key={href}><a href={`#${href}`} className="hover:text-white transition-colors">{name}</a></li>;
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Serviços</h4>
          <ul className="space-y-2 text-sm">
            <li>Planos Funerários</li>
            <li>Traslado Nacional</li>
            <li>Sala de Velório</li>
            <li>Assistência Documental</li>
            <li>Apoio ao Luto</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Atendimento 24h</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={14} /> (62) 3283-0202</li>
            <li className="flex items-center gap-2"><Send size={14} /> contato@fenixfuneraria.com.br</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Av. B, s/n - St. Araguaia, Aparecida de Goiânia - GO</li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-3">
        <p>&copy; {new Date().getFullYear()} Fênix Funerária. Todos os direitos reservados.</p>
        <p className="text-white/40">Desenvolvido com respeito e dedicação.</p>
      </div>
    </div>
  </footer>
);

/* ========== INTRO CLOUD OVERLAY ========== */

const IntroOverlay = ({ onFinish }: { onFinish: () => void }) => {
  const [phase, setPhase] = useState<'logo' | 'open' | 'done'>('logo');

  useEffect(() => {
    // Phase 1: Show logo for 1.5s
    const t1 = setTimeout(() => setPhase('open'), 1500);
    // Phase 2: Clouds open animation runs for 1.2s, then remove
    const t2 = setTimeout(() => {
      setPhase('done');
      onFinish();
    }, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onFinish]);

  if (phase === 'done') return null;

  // Generate particles once
  const particles = Array.from({ length: 15 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    size: `${3 + Math.random() * 4}px`,
  }));

  return (
    <div className="intro-overlay">
      {/* Top cloud */}
      <motion.div
        className="intro-cloud intro-cloud--top"
        animate={phase === 'open' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="intro-particles">
          {particles.slice(0, 7).map((p, i) => (
            <span key={i} className="intro-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }} />
          ))}
        </div>
      </motion.div>

      {/* Bottom cloud */}
      <motion.div
        className="intro-cloud intro-cloud--bottom"
        animate={phase === 'open' ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="intro-particles">
          {particles.slice(7).map((p, i) => (
            <span key={i} className="intro-particle" style={{ left: p.left, top: p.top, animationDelay: p.delay, width: p.size, height: p.size }} />
          ))}
        </div>
      </motion.div>

      {/* Centered Logo */}
      <motion.div
        className="intro-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          phase === 'logo'
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 1.15 }
        }
        transition={
          phase === 'logo'
            ? { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
            : { duration: 0.6, ease: 'easeIn' }
        }
      >
        <div className="intro-logo__name">Fênix</div>
        <div className="intro-logo__sub">Funerária</div>
        <span className="intro-logo__line" />
      </motion.div>
    </div>
  );
};

/* ========== FLOATING WHATSAPP ========== */

const FloatingWhatsApp = () => (
  <motion.a href="https://wa.me/556232830202" target="_blank" rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 20 }}
    aria-label="Falar no WhatsApp"
  >
    <WhatsAppIcon />
    <span className="absolute inset-0 rounded-full border-2 border-whatsapp animate-pulse-ring" />
  </motion.a>
);

/* ========== APP ========== */

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const handleIntroFinish = useCallback(() => setIntroFinished(true), []);

  return (
    <div className="font-sans text-text-main bg-bg-light">
      <AnimatePresence>
        {!introFinished && <IntroOverlay onFinish={handleIntroFinish} />}
      </AnimatePresence>
      <Navbar />
      <main>
        <Hero />
        <Differentials />
        <Plans />
        <HowItWorks />
        <About />
        <Testimonials />
        <Coverage />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
