import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin, Heart, Upload, FileText, X,
  User as UserIcon, Lock, Download, Activity, Users, DollarSign, Calendar,
  Navigation, CheckCircle, AlertCircle, ArrowRight,
  LogOut, Shield, ChevronRight, Stethoscope
} from 'lucide-react';
import { WhatsAppButton } from './components/WhatsAppButton'


// ============================================================
// INTERFACES (TIPAGEM DO TYPESCRIPT)
// ============================================================

interface User {
  name: string;
  email: string;
  role: string;
}

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  goToDashboard: () => void;
  goToLanding: () => void;
  currentView: 'landing' | 'dashboard';
}

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: User) => void;
}

interface DashboardProps {
  user: User | null;
}

interface KpiCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  color: string;
}

// ============================================================
// ÍCONE CUSTOMIZADO: DENTE
// ============================================================

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const Tooth = ({ size = 24, className = "", ...props }: CustomIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M12 5.5c-1.074-.586-2.583-1.5-4-1.5-2.1 0-4 1.25-4 4 0 3.195 1.58 6.495 3.32 8.78 1.373 1.795 2.152 3.214 2.871 5.03.515 1.303 2.103 1.303 2.618 0 .72-1.816 1.498-3.235 2.871-5.03 1.74-2.285 3.32-5.585 3.32-8.78 0-2.75-1.9-4-4-4-1.417 0-2.926.914-4 1.5z" />
  </svg>
);


// ============================================================
// COMPONENTE RAIZ
// ============================================================

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    document.title = "Odonto | Casa Espírita Trabalhadores de Jesus";
  }, [view]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth">
      <Navbar
        user={user}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={() => { setUser(null); setView('landing'); }}
        goToDashboard={() => setView('dashboard')}
        goToLanding={() => setView('landing')}
        currentView={view}
      />

      {view === 'landing' ? (
        <main>
          <HeroSection />
          <FeaturesSection />
          <ImpactStats />
          <VolunteerSection />
          <DonationSection />
          <LocationSection />
        </main>
      ) : (
        <Dashboard user={user} />
      )}

      <Footer />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(userData: User) => {
            setUser(userData);
            setShowAuthModal(false);
            setView('dashboard');
          }}
        />
      )}

      <WhatsAppButton
        phoneNumber="5511925284060" // Número reservado para este projeto
        message="Olá! Gostaria de falar com a equipe de Odonto."
      />

    </div>
  );
}


// ============================================================
// NAVBAR & FOOTER
// ============================================================

function Navbar({ user, onLoginClick, onLogout, goToDashboard, goToLanding, currentView }: NavbarProps) {
  const scrollTo = (id: string) => {
    if (currentView !== 'landing') goToLanding();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={goToLanding}>
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white">
            <Stethoscope size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl leading-tight text-teal-800">Odonto</h1>
            <p className="text-xs text-slate-500">Trabalhadores de Jesus</p>
          </div>
        </div>

        <div className="hidden md:flex gap-8 items-center text-sm font-medium text-slate-600">
          <button onClick={() => scrollTo('sobre')} className="hover:text-teal-600 transition-colors">Sobre o Projeto</button>
          <button onClick={() => scrollTo('voluntarios')} className="hover:text-teal-600 transition-colors">Seja Voluntário</button>
          <button onClick={() => scrollTo('doacoes')} className="hover:text-teal-600 transition-colors">Fazer Doação</button>
          <button onClick={() => scrollTo('localizacao')} className="hover:text-teal-600 transition-colors">Localização</button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {currentView === 'landing' ? (
                <button onClick={goToDashboard} className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1">
                  <Activity size={18} /> Acessar Dashboard
                </button>
              ) : (
                <button onClick={goToLanding} className="text-sm font-semibold text-slate-600 hover:text-slate-800">
                  Voltar ao Site
                </button>
              )}
              <div className="h-6 w-px bg-slate-200"></div>
              <button onClick={onLogout} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700">
                <LogOut size={18} /> Sair
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 bg-teal-50 text-teal-700 px-5 py-2.5 rounded-full font-medium hover:bg-teal-100 transition-colors"
            >
              <UserIcon size={18} /> Área Restrita
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <Stethoscope size={20} className="text-teal-400" /> Odonto
          </h3>
          <p className="leading-relaxed opacity-80">
            Uma iniciativa da Casa Espírita Trabalhadores de Jesus. Levando sorrisos, saúde e dignidade para a comunidade de Atibaia e região.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Contato</h4>
          <p>Av. Professor Flávio Pires de Camargo, 56</p>
          <p>Caetetuba, Atibaia - SP, 12951-750</p>
          <p className="mt-2 text-teal-400">contato@piodonto.org.br</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Acesso Rápido</h4>
          <ul className="space-y-2 opacity-80">
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre nós</a></li>
            <li><a href="#voluntarios" className="hover:text-white transition-colors">Portal do Voluntário</a></li>
            <li><a href="#doacoes" className="hover:text-white transition-colors">Transparência e Doações</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}


// ============================================================
// SEÇÕES DA LANDING PAGE
// ============================================================

function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 text-teal-800 text-sm font-semibold tracking-wide">
            <Heart size={16} className="text-teal-600" /> Cuidando da Comunidade
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
            Sorrisos que <span className="text-teal-600 relative">transformam</span> vidas.
          </h1>
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            O Projeto Odonto, da Casa Espírita Trabalhadores de Jesus, une profissionais dedicados e tecnologia para oferecer tratamento odontológico gratuito e humanizado.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#voluntarios"
              className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 transition-all duration-300 hover:bg-teal-700 hover:scale-105 hover:shadow-xl hover:shadow-teal-600/40"
            >
              Quero ser Voluntário <ChevronRight size={20} />
            </a>
            <a
              href="#doacoes"
              className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 hover:bg-slate-50 hover:scale-105 hover:border-teal-300 hover:shadow-xl hover:shadow-slate-200"
            >
              Fazer uma Doação <Heart size={20} className="text-rose-500" />
            </a>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-teal-200 rounded-[3rem] transform rotate-3 scale-105 -z-10 opacity-50 blur-lg"></div>
          <img
            src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800&h=600"
            alt="Dentista sorrindo"
            className="rounded-[3rem] shadow-2xl border-8 border-white object-cover h-[500px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    { icon: Users, title: "Atendimento Humanizado", desc: "Oferecemos cuidado com foco integral no bem‑estar físico, emocional e social do paciente, promovendo acolhimento, empatia e respeito em cada etapa do atendimento." },
    { icon: Tooth, title: "Equipamentos Modestos", desc: "Contamos com equipamentos simples, mas funcionais, cedidos por um voluntário da instituição. Todos estão em excelentes condições de uso e preservação, o que nos permite oferecer este serviço às crianças carentes da comunidade com qualidade e segurança." },
    { icon: Shield, title: "Transparência Total", desc: "Gestão rigorosa e responsável dos recursos e das doações recebidas, com acompanhamento claro e prestação de contas completa para toda a comunidade." }
  ];

  return (
    <section id="sobre" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Muito além da odontologia</h2>
          <p className="text-slate-600">Nosso sistema de gestão integra todas as pontas do processo para garantir que a ajuda chegue a quem precisa de forma eficiente.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStats() {
  // Inicializamos com 0 para não dar erro de undefined
  const [stats, setStats] = useState({ atendimentos: 0, dentistas: 0, criancas: 0 });

  useEffect(() => {
  fetch('http://localhost:3001/api/estatisticas')
    .then(res => res.json())
    .then(data => {
      console.log("Dados que chegaram no Front:", data); // Olhe o F12 para ver isso!
      setStats({
        atendimentos: Number(data.atendimentos) || 0,
        dentistas: Number(data.dentistas) || 0,
        criancas: Number(data.criancas) || 0
      });
    })
    .catch(err => console.error('Erro ao conectar com o back:', err));
}, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-16">
          Já contamos com:
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Exibição dos dados puxados do Back */}
          <div className="flex flex-col items-center">
            <span className="text-8xl font-black text-teal-500 mb-4">{stats.dentistas}</span>
            <span className="text-3xl font-bold text-slate-700">Dentistas</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-8xl font-black text-teal-500 mb-4">{stats.criancas}</span>
            <span className="text-3xl font-bold text-slate-700">Crianças</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-8xl font-black text-teal-500 mb-4">{stats.atendimentos}</span>
            <span className="text-3xl font-bold text-slate-700">Atendimentos</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function VolunteerSection() {
  const [tab, setTab] = useState<'casa' | 'dentista'>('casa');
  // 1. Estado atualizado para incluir a estrutura do currículo
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    curriculo: { dados: '', tipo: '', nomeArquivo: '' } 
  });
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrs: Record<string, string> = {};
    if (!formData.name.trim()) newErrs.name = "Nome é obrigatório.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrs.email = "Email inválido.";
    if (!formData.phone.trim()) newErrs.phone = "Telefone é obrigatório.";
    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  // 2. Função para capturar o arquivo e converter em Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validação de tamanho (ex: max 2MB)
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("O arquivo é muito grande. Máximo de 2MB.");
        return;
      }

      setFile(selectedFile); // Para exibição visual no card

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          curriculo: {
            dados: reader.result as string, // String Base64 do PDF/Doc
            tipo: selectedFile.type,
            nomeArquivo: selectedFile.name
          }
        }));
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validate()) return;

  setStatus('loading');
  setErrors({}); // limpa erros anteriores

  try {
    const response = await fetch('http://localhost:3001/api/voluntarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: formData.name,
        telefone: formData.phone,
        email: formData.email,
        curriculo: formData.curriculo.dados ? formData.curriculo : undefined
      })
    });

    const data = await response.json();

    if (response.ok) {
      setStatus('success');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        curriculo: { dados: '', tipo: '', nomeArquivo: '' } 
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } else {
      setStatus('error');
      setErrors({ global: data.erro || 'Erro ao enviar.' });
    }

  } catch (error) {
    console.error("Erro na comunicação com o backend:", error);
    setStatus('error');
    setErrors({ global: 'Erro de conexão com o servidor.' });
  }
};

  const beneficiosCasa = ['Horários flexíveis', 'Proatividade', 'Amor ao próximo'];
  const beneficiosDentista = ['Horários flexíveis de atendimento', 'Sala de consulta equipada', 'Certificado de horas voluntárias'];
  const beneficios = tab === 'casa' ? beneficiosCasa : beneficiosDentista;

  return (
    <section id="voluntarios" className="py-24 bg-teal-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 relative z-10 items-center">

        {/* LADO ESQUERDO */}
        <div>
          <span className="text-teal-300 font-semibold tracking-wider text-sm uppercase mb-2 block">
            Faça parte da equipe
          </span>
          <h2 className="text-4xl font-bold mb-6">Traga seu talento para nossa causa</h2>
          <p className="text-teal-100 mb-8 leading-relaxed text-lg">
            {tab === 'casa'
              ? 'Buscamos voluntários que estejam dispostos a ajudar a casa com os desafios do dia a dia.'
              : 'Buscamos dentistas, auxiliares e estudantes que desejam doar parte do seu tempo para transformar a saúde bucal da comunidade carente de Atibaia.'}
          </p>

          <ul className="space-y-4 mb-10">
            {beneficios.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-teal-50">
                <CheckCircle className="text-teal-400 shrink-0" size={20} /> {item}
              </li>
            ))}
          </ul>

          {/* TOGGLE */}
          <div className="inline-flex bg-teal-800/60 border border-teal-700 rounded-full p-1 gap-1">
            <button
              onClick={() => { setTab('casa'); setStatus('idle'); setErrors({}); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === 'casa'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              Voluntário da Casa
            </button>
            <button
              onClick={() => { setTab('dentista'); setStatus('idle'); setErrors({}); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                tab === 'dentista'
                  ? 'bg-teal-500 text-white shadow'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              Dentista Voluntário
            </button>
          </div>
        </div>

        {/* LADO DIREITO — CARD DE CADASTRO */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">

          {tab === 'casa' && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-center text-slate-800">Cadastro de Voluntário</h3>

              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Inscrição Recebida!</h4>
                  <p className="text-slate-600">Agradecemos seu interesse. Entraremos em contato em breve.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-teal-600 font-semibold hover:underline"
                  >
                    Enviar outro formulário
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700">Nome Completo:</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="ex. José da Silva"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-slate-700">e-mail:</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-3 rounded-xl bg-slate-50 border ${errors.email ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
                      placeholder="jose_silva@gmail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

{/* Telefone */}
<div>
  <label className="block text-sm font-medium mb-1 text-slate-700">Telefone:</label>
  <input
    type="text"
    value={formData.phone}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
      // 1. Pega apenas os números digitados
      const apenasNumeros = e.target.value.replace(/\D/g, '');

      // 2. Bloqueia se for maior que 11 dígitos
      if (apenasNumeros.length <= 11) {
        // 3. Aplica a máscara visual (opcional, mas recomendado)
        let valorComMascara = apenasNumeros;
        if (apenasNumeros.length > 2) {
          valorComMascara = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
        }
        if (apenasNumeros.length > 7) {
          valorComMascara = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7)}`;
        }

        setFormData({ ...formData, phone: valorComMascara });
      }
    }}
    className={`w-full p-3 rounded-xl bg-slate-50 border ${errors.phone ? 'border-red-400' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-teal-500`}
    placeholder="(11) 91234-5678"
    maxLength={15} // Limite de caracteres incluindo os símbolos ( (11) 91234-5678 )
  />
  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
</div>
                  
                  {/* Campo de Currículo Ajustado */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      Anexar currículo (PDF):{' '}
                      <span className="text-slate-400 font-normal">(opcional)</span>
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-colors ${
                        file
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange} 
                      />
                      {file ? (
                        <div className="flex flex-col items-center">
                          <FileText className="text-teal-600 mb-1" size={24} />
                          <p className="text-sm font-medium text-teal-800">{file.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-slate-400 mb-1" size={24} />
                          <p className="text-sm text-slate-500">clique para selecionar ou arraste seu arquivo</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2">
                      <AlertCircle size={16} /> {errors.global || 'Erro ao enviar.'}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? 'Enviando...' : <>Finalizar <ArrowRight size={20} /></>}
                  </button>
                </form>
              )}
            </>
          )}

          {/* ABA: DENTISTA VOLUNTÁRIO */}
          {tab === 'dentista' && (
            <div className="flex flex-col items-center justify-center text-center py-8 gap-6">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
                <Stethoscope size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Faça parte da equipe</h3>
              <p className="text-teal-600 font-medium text-sm leading-relaxed">
                Cadastre-se no nosso site principal através do botão abaixo
              </p>
              <a
                href="https://odonto-nenz.onrender.com/Voluntario/Cadastro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition-all shadow-lg flex justify-center items-center gap-2 text-lg"
              >
                Cadastrar-se <ArrowRight size={22} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DonationSection() {
  return (
    <section id="doacoes" className="py-24 bg-teal-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Heart size={48} className="text-rose-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Ajude a manter nossos motores ligados</h2>
        <p className="text-slate-600 mb-10 text-lg">
          O tratamento é gratuito para os pacientes, mas os insumos odontológicos (resinas, anestésicos, luvas) têm custo constante. Sua doação via PIX vai direto para a conta da Casa Espírita.
        </p>

        <div className="bg-white p-10 rounded-3xl shadow-lg border border-teal-100 inline-block w-full max-w-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-50 rounded-full opaque-50"></div>

          <h3 className="text-xl font-bold mb-1 text-slate-800 relative z-10">Chave PIX (Celular)</h3>
          <p className="text-sm text-slate-500 mb-5 relative z-10">Casa Espírita Trabalhadores de Jesus</p>

          <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between font-mono text-lg mb-6 border border-slate-200 relative z-10">
            <span className="text-slate-700">11 941556472</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText("11941556472");
                alert("Chave copiada para a área de transferência!");
              }}
              className="text-teal-600 text-sm font-bold hover:text-teal-800 p-1.5 rounded-lg hover:bg-teal-50 transition-colors"
              title="Copiar apenas os números para colar no banco"
            >
              COPIAR
            </button>
          </div>

          <div className="relative z-10 bg-white p-4 rounded-2xl shadow-inner border border-slate-100 inline-block mb-4">
            <img
              src="/qr-code-pix.png"
              alt="QR Code Pix Angelita"
              className="w-48 h-48 mx-auto rounded-xl object-cover"
              loading="lazy"
            />
          </div>

          <p className="text-xs text-slate-400 max-w-xs mx-auto">Abra o app do seu banco, escolha "Pagar com Pix" e escaneie a imagem acima.</p>
        </div>
      </div>
    </section>
  );
}

function LocationSection() {
  const address = "Av. Professor Flávio Pires de Camargo, 56 - Caetetuba, Atibaia - SP, 12951-750";
  const encodeAddr = encodeURIComponent(address);

  return (
    <section id="localizacao" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <MapPin size={28} />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Onde estamos localizados</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Nossa sala de atendimento odontológico está estruturada na Casa Espírita Trabalhadores de Jesus, em Atibaia. Venha nos visitar ou trace a rota diretamente nos aplicativos.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
              <h4 className="font-bold text-slate-800 mb-2">Endereço Completo:</h4>
              <p className="text-slate-600">{address}</p>
            </div>

            <div className="flex gap-4">
              <a
                href={`https://waze.com/ul?q=${encodeAddr}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 bg-blue-50 text-blue-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
              >
                <Navigation size={18} /> Abrir no Waze
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeAddr}`}
                target="_blank" rel="noopener noreferrer"
                className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <MapPin size={18} /> Google Maps
              </a>
            </div>
          </div>

          <div className="h-[450px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-100">
            <iframe
              title="Mapa de Localização"
              src={`https://maps.google.com/maps?q=${encodeAddr}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MODAL DE AUTENTICAÇÃO
// ============================================================

function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@piodonto.org' && password === 'admin') {
        onSuccess({ name: 'Administrador Odonto', email, role: 'ADMIN' });
      } else {
        setError('Credenciais inválidas. (Dica: admin@piodonto.org / admin)');
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X size={24} /></button>
        <div className="p-8">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Lock size={32} /></div>
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Acesso Restrito</h2>
          <p className="text-center text-slate-500 text-sm mb-8">Gestão do Projeto PI Odonto</p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="admin@piodonto.org"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 mt-4 disabled:opacity-60"
            >
              {loading ? 'Autenticando...' : 'Entrar no Sistema'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// DASHBOARD
// ============================================================

function Dashboard({ user }: DashboardProps) {
  const handleDownloadRelatorio = () => {
    const dataAtual = new Date().toLocaleDateString();
    const conteudoCSV = `Relatório Gerencial - PI Odonto\nData: ${dataAtual}\nTotal Pacientes,142\nVoluntários Ativos,18\nDoações Mensais (R$),12500.00`;
    const blob = new Blob([conteudoCSV], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `relatorio_odonto_${dataAtual.replace(/\//g, '-')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Painel de Controle</h2>
          <p className="text-slate-500">Bem-vindo(a), {user?.name}. Aqui estão os dados em tempo real.</p>
        </div>
        <button
          onClick={handleDownloadRelatorio}
          className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2"
        >
          <Download size={18} /> Baixar Relatório (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard title="Pacientes Atendidos" value="142" sub="+12 esta semana" icon={Users} color="bg-blue-50 text-blue-600" />
        <KpiCard title="Dentistas Voluntários" value="18" sub="3 novos em análise" icon={Stethoscope} color="bg-teal-50 text-teal-600" />
        <KpiCard title="Consultas Agendadas" value="45" sub="Para os próximos 7 dias" icon={Calendar} color="bg-indigo-50 text-indigo-600" />
        <KpiCard title="Doações Recebidas" value="R$ 12.5k" sub="Referente a este mês" icon={DollarSign} color="bg-green-50 text-green-600" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Últimos Voluntários Cadastrados</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-100">
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">CRO</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Currículo</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50">
                <td className="p-4 font-medium text-slate-800">Dra. Amanda Costa</td>
                <td className="p-4 text-slate-600">SP-98765</td>
                <td className="p-4">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Em Análise</span>
                </td>
                <td className="p-4">
                  <button className="text-teal-600 hover:underline flex items-center gap-1">
                    <FileText size={16} /> Baixar PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// KPI CARD
// ============================================================

function KpiCard({ title, value, sub, icon: Icon, color }: KpiCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <div className={`p-3 rounded-xl inline-block mb-4 ${color}`}><Icon size={24} /></div>
      <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
      <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
      <p className="text-xs text-slate-400 font-medium">{sub}</p>
    </div>
  );
}