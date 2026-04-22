/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  CheckCircle2, 
  Star, 
  Users, 
  Activity, 
  Calendar,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  CreditCard,
  ShieldCheck,
  Smartphone,
  FlaskConical,
  Baby,
  HeartPulse,
  Syringe,
  Dna
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import consultationImage from '../pictures/consultation.jpg';
import diagnosticsImage from '../pictures/diagnostics.jpg';
import medecineGeneraleImage from '../pictures/medecine-generale.jpg';
import cardiologieImage from '../pictures/Cardiologie.jpg';
import pediatrieImage from '../pictures/pediatrie.jpg';
import dermatologieImage from '../pictures/Dermatologie.webp';

const navLinks = [
  { name: 'Accueil', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'Domaines', href: '#domaines' },
  { name: 'Rendez-vous', href: '#rdv' },
  { name: 'Contact', href: '#contact' },
];

const stats = [
  { label: 'Années d’expérience', value: '15+' },
  { label: 'Patients suivis', value: '5k+' },
  { label: 'Urgences orientées', value: '24/7' },
  { label: 'Satisfaction', value: '98%' },
];

const services = [
  {
    title: 'Consultation Générale',
    description: 'Suivi complet de votre état de santé, bilans annuels et prise en charge des pathologies courantes.',
    icon: Stethoscope,
    features: ['Examen clinique complet', 'Prescription et suivi'],
    image: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Diagnostics Avancés',
    description: 'Équipements de pointe pour des analyses précises sur place, garantissant une prise en charge rapide.',
    icon: FlaskConical,
    image: 'https://images.unsplash.com/photo-1579154234431-da0c3668e219?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Prévention & Dépistage',
    description: 'Programmes personnalisés pour maintenir votre capital santé sur le long terme.',
    icon: ShieldCheck,
    linkText: 'Voir les programmes'
  },
  {
    title: 'Téléconsultation',
    description: 'Consultez à distance pour le renouvellement d\'ordonnances ou les suivis simples.',
    icon: Smartphone,
    highlight: true
  }
];

const domains = [
  { title: 'Médecine Générale', icon: Stethoscope, image: medecineGeneraleImage },
  { title: 'Cardiologie', icon: HeartPulse, image: cardiologieImage },
  { title: 'Pédiatrie', icon: Baby, image: pediatrieImage },
  { title: 'Dermatologie', icon: Dna, image: dermatologieImage },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'medical-glass py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-medical-primary rounded-xl flex items-center justify-center text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-medical-text">Cabinet Dr. Benali</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-medical-muted hover:text-medical-primary text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="btn-primary flex items-center gap-2 py-2.5">
              <span>Prendre RDV</span>
              <ArrowRight size={16} />
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold font-display">Dr. Benali</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6 items-center italic">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-light text-medical-text"
                >
                  {link.name}
                </a>
              ))}
              <button className="btn-primary w-full max-w-xs mt-4">Prendre RDV</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-medical-primary rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                <Activity size={14} />
                <span>Soins d'Excellence</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-medium text-medical-text leading-[1.1] mb-8">
                Une expertise médicale au service de votre bien-être.
              </h1>
              <p className="text-lg text-medical-muted leading-relaxed mb-8 max-w-lg">
                Le Cabinet du Dr. Benali allie technologies de pointe et approche humaine pour une prise en charge complète et personnalisée de votre santé.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="btn-primary flex items-center gap-2">
                  <Calendar size={18} />
                  <span>Prendre rendez-vous</span>
                </button>
                <button className="btn-secondary">Nos Services</button>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/doctor${i}/100/100`} 
                      alt="Avatar"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-xs text-medical-muted font-medium">+2,500 Patients satisfaits</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                  alt="Modern Clinic"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Disponibilité</p>
                  <p className="text-xs text-medical-muted italic">Rendez-vous sous 48h</p>
                </div>
              </motion.div>
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-medical-secondary rounded-full filter blur-3xl opacity-50 z-0"></div>
            </motion.div>
          </div>
        </section>

        {/* Info Cards / Stats */}
        <section className="bg-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-display font-medium mb-4">Pourquoi nous choisir ?</h2>
              <p className="text-medical-muted max-w-2xl mx-auto">Une approche moderne de la médecine centrée sur le confort et la précision du diagnostic.</p>
            </motion.div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 + 0.16, duration: 0.6 }}
                  className="medical-card text-center"
                >
                  <p className="text-4xl font-display font-semibold text-medical-primary mb-2 tracking-tighter">{stat.value}</p>
                  <p className="text-xs font-semibold text-medical-muted uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-16 gap-4 flex-wrap"
          >
            <div className="max-w-2xl">
              <p className="text-medical-primary font-bold text-xs uppercase tracking-widest mb-4">Nos Expertises</p>
              <h2 className="text-4xl font-display font-medium leading-[1.2]">
                Des soins médicaux d'excellence pour votre santé.
              </h2>
            </div>
            <p className="text-medical-muted max-w-md">
              Dr. Benali et son équipe vous accueillent dans un cadre moderne pour des soins personnalisés, alliant rigueur clinique et approche humaine.
            </p>
          </motion.div>

          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Consultation Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: 0.16, duration: 0.6 }}
                className="md:col-span-2 medical-card p-0 flex flex-col md:flex-row overflow-hidden border-none shadow-sm bg-slate-50"
              >
                <div className="p-8 md:w-3/5 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-medical-primary mb-6">
                    <Stethoscope size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4">Consultation Générale</h3>
                  <p className="text-medical-muted mb-6">Suivi complet de votre état de santé, bilans annuels et prise en charge des pathologies courantes pour adultes et enfants.</p>
                  <ul className="grid gap-2 mb-8">
                    {['Examen clinique complet', 'Prescription et suivi'].map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-medium">
                        <CheckCircle2 size={16} className="text-medical-primary" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="flex items-center gap-2 text-medical-primary font-semibold text-sm group">
                    <span>En savoir plus</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="md:w-2/5 relative h-64 md:h-auto">
                  <img src={consultationImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-blue-900/10"></div>
                </div>
              </motion.div>

              {/* Specialised Care Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: 0.24, duration: 0.6 }}
                className="medical-card border-none bg-blue-50/50"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-medical-primary mb-6">
                  <HeartPulse size={24} />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">Soins Spécialisés</h3>
                <p className="text-medical-muted mb-8 italic">Expertise pointue en cardiologie et nutrition pour un accompagnement spécifique et durable.</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">Cardiologie</span>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">Nutrition</span>
                </div>
                <button className="flex items-center gap-2 text-medical-primary font-semibold text-sm group">
                  <span>Détails</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Diagnostics Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: 0.16, duration: 0.6 }}
                className="medical-card p-0 flex flex-col border-none shadow-sm bg-white"
              >
                <div className="p-8">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-medical-primary mb-6">
                    <FlaskConical size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-4">Diagnostics</h3>
                  <p className="text-medical-muted mb-6 leading-relaxed">Équipements de pointe pour des analyses précises sur place, garantissant une prise en charge rapide.</p>
                </div>
                <div className="mt-auto h-48 overflow-hidden rounded-b-3xl">
                  <img src={diagnosticsImage} className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              </motion.div>

              {/* Teleconsultation Card (Highlight) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: 0.24, duration: 0.6 }}
                className="medical-card border-none bg-medical-primary text-white flex flex-col justify-center items-start overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Smartphone size={160} />
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">Téléconsultation</h3>
                <p className="text-blue-100 mb-8 leading-relaxed">Consultez à distance en toute sécurité. Idéal pour le renouvellement d'ordonnances ou les suivis simples.</p>
                <button className="bg-white text-medical-primary px-8 py-3 rounded-2xl font-semibold transition-all hover:bg-blue-50 active:scale-95">
                  Prendre RDV en ligne
                </button>
              </motion.div>

              {/* Prevention Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ delay: 0.32, duration: 0.6 }}
                className="medical-card border-none bg-slate-50/50"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-medical-primary mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-4">Prévention</h3>
                <p className="text-medical-muted mb-8 italic">Programmes de dépistage et conseils personnalisés pour maintenir votre capital santé sur le long terme.</p>
                <button className="flex items-center gap-2 text-medical-primary font-semibold text-sm group">
                  <span>Voir les programmes</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interaction / Areas */}
        <section id="domaines" className="bg-slate-50 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl font-display font-medium mb-4">Domaines d'Intervention</h2>
                <p className="text-medical-muted max-w-lg">Des solutions médicales complètes pour toute la famille, de la prévention au suivi thérapeutique spécialisé.</p>
              </div>
              <button className="hidden md:flex items-center gap-2 text-medical-primary font-bold text-xs uppercase tracking-widest transition-opacity hover:opacity-70 group">
                <span>Voir tous les services</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((domain, i) => (
                <motion.div 
                  key={domain.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-[400px] flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={domain.image} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-medical-primary flex items-center justify-center">
                        <domain.icon size={18} />
                      </div>
                      <h3 className="font-display font-semibold text-medical-text leading-tight">{domain.title}</h3>
                    </div>
                    <p className="text-xs text-medical-muted italic flex-1">
                      {domain.title === "Médecine Générale" ? "Consultations de routine, bilans de santé et vaccinations." : 
                       domain.title === "Cardiologie" ? "Dépistage et suivi des pathologies cardiovasculaires." :
                       domain.title === "Pédiatrie" ? "Suivi de la croissance et soins spécifiques pour les enfants." :
                       "Traitements des maladies de peau et petite chirurgie."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-medical-text text-white py-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="italic uppercase text-xs font-bold tracking-[0.2em] mb-12 opacity-60 text-center">Paroles de patients</div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <MessageSquare size={48} className="text-medical-primary mb-8" />
                <blockquote className="text-3xl font-display font-medium leading-normal mb-8">
                  "Un médecin à l'écoute et très compétent. Le cabinet est moderne et le temps d'attente est minimal. Je recommande vivement le Dr. Benali pour son professionnalisme."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-medical-primary/30">
                    <img src="https://picsum.photos/seed/patient/100/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Jean-Marc T.</p>
                    <p className="text-sm opacity-50 italic">Patient depuis 2019</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Années d'expérience", value: "15+" },
                  { label: "Consultations", value: "12k+" },
                  { label: "Taux de satisfaction", value: "98%" },
                  { label: "Spécialités", value: "4" }
                ].map(stat => (
                  <div key={stat.label} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                    <p className="text-4xl font-display font-medium mb-2">{stat.value}</p>
                    <p className="text-xs opacity-50 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="bg-medical-primary rounded-[40px] p-12 lg:p-24 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-display font-medium mb-8">Prenez soin de votre santé dès aujourd’hui</h2>
              <p className="text-lg text-blue-100 mb-12 italic">
                Réservez votre créneau en ligne en moins de 2 minutes. Notre équipe vous recontactera pour confirmer le rendez-vous.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="bg-white text-medical-primary px-10 py-4 rounded-2xl font-bold transition-all hover:bg-blue-50 active:scale-95 flex items-center gap-2">
                  <Smartphone size={20} />
                  <span>Réserver en ligne</span>
                </button>
                <button className="bg-blue-700/50 backdrop-blur-sm border border-blue-400/30 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:bg-blue-700 active:scale-95 flex items-center gap-2">
                  <Phone size={20} />
                  <span>05 22 00 00 00</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Map Section */}
        <section id="contact" className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-display font-medium mb-8 italic">Nous trouver</h2>
                  
                  <ul className="space-y-8">
                    <li className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">Adresse</p>
                        <p className="text-medical-muted">45 Boulevard Mohamed V, Bureau 12<br />Casablanca, 20000</p>
                      </div>
                    </li>
                    <li className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">Horaires d'ouverture</p>
                        <p className="text-medical-muted">Lundi - Vendredi: 09:00 - 18:00<br />Samedi: 09:00 - 13:00</p>
                      </div>
                    </li>
                    <li className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 text-medical-primary rounded-xl flex items-center justify-center">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">Téléphone</p>
                        <p className="text-medical-muted">05 22 00 00 00</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-slate-100 rounded-[40px] overflow-hidden group">
                  <iframe 
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106371.18520862562!2d-7.6570335!3d33.5719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1620000000000!5m2!1sfr!2sma" 
                    className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700" 
                    allowFullScreen 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur shadow-sm rounded-2xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-widest italic">Acces PMR & Ascenseur</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 py-16 border-t border-slate-100 italic">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-medical-primary rounded-lg flex items-center justify-center text-white">
                <Stethoscope size={18} />
              </div>
              <span className="font-display font-medium text-lg">Cabinet Médical Dr. Benali</span>
            </div>
            <div className="flex gap-8 text-sm text-medical-muted underline underline-offset-4 decoration-slate-200 hover:decoration-medical-primary transition-all">
              <a href="#">Mentions Légales</a>
              <a href="#">Confidentialité</a>
              <a href="#">Plan du site</a>
            </div>
          </div>
          <div className="text-center text-xs text-medical-muted font-medium opacity-50">
            © 2024 Cabinet Médical Dr. Benali. Expertise & Bienveillance.
          </div>
        </div>
      </footer>
    </div>
  );
}