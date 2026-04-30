"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import ParticleNetwork from "@/components/ParticleNetwork";

/* ─── tiny helpers ─── */
const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[9px] tracking-[0.18em] uppercase border border-white/20 text-white/50 px-2 py-0.5 rounded-sm">
    {children}
  </span>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <motion.p 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    className="text-[10px] tracking-[0.25em] text-[#6c5ce7] uppercase mb-3"
  >
    {children}
  </motion.p>
);

/* ─── blob 3-D placeholder (pure CSS) ─── */
function BlobVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl bg-[#111]">
      <div
        className="w-48 h-48 rounded-full animate-spin-slow"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #b0a8ff 0%, #6c5ce7 40%, #1a1a2e 80%)",
          filter: "blur(0px)",
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 70%",
          animation: "morph 8s ease-in-out infinite",
          boxShadow: "0 0 80px #6c5ce755",
        }}
      />
      <style>{`
        @keyframes morph {
          0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 70%; transform: rotate(0deg); }
          25%      { border-radius: 30% 70% 40% 60% / 60% 40% 70% 30%; transform: rotate(90deg); }
          50%      { border-radius: 50% 50% 30% 70% / 40% 60% 50% 50%; transform: rotate(180deg); }
          75%      { border-radius: 70% 30% 60% 40% / 70% 50% 30% 60%; transform: rotate(270deg); }
        }
      `}</style>
    </div>
  );
}

/* ─── HERO SECTION ─── */
function CareerHero() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <motion.section 
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-10"
    >
      <div className="fixed top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#6c5ce7]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00cec9]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <svg
        className="absolute bottom-0 left-0 w-full h-[160px] sm:h-[200px] pointer-events-none z-1"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          d="M0,140 C200,80 400,200 600,130 C800,60 1000,180 1200,110 C1320,75 1400,130 1440,120"
          fill="none"
          stroke="rgba(108,92,231,0.35)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-[#a29bfe]/30 bg-[#6c5ce7]/10 backdrop-blur-md px-3 py-1.5 rounded-full mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
          <span className="text-[9px] sm:text-[11px] tracking-[0.3em] text-white uppercase font-bold">
            WE ARE HIRING
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-black leading-tight tracking-tight text-white text-[2.2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5.5rem] mb-5"
        >
          JOIN THE DIGITAL
          <br className="hidden sm:block" />
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]">
            PROTOCOL
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto md:mx-0 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-8"
        >
          Architecting high-performance digital ecosystems for a data-driven future.
          Harness AI to transform complex processes into elegant automated solutions.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase"
          >
            Explore Open Roles
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-auto border border-white/20 px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase"
          >
            Our Philosophy
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] tracking-[0.3em] text-white/30 uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ─── MANIFESTO ─── */
function Manifesto() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <SectionLabel>Zone: Manifesto</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-6">
            PRECISION OVER
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe]">CONVENIENCE.</span>
          </h2>
          <p className="text-sm text-white/40 leading-relaxed mb-10 max-w-sm">
            We don&apos;t just build software. We forge digital environments where
            data flows with architectural elegance. Our culture is rooted in deep
            focus, radical autonomy, and a relentless pursuit of engineering
            prestige.
          </p>
          <div className="grid grid-cols-2 gap-6">
            {[
              { num: "01.", title: "Async Native", desc: "Designed for deep work. No useless stand-ups." },
              { num: "02.", title: "Tech Sovereign", desc: "We own the stack. No technical debt compromises." },
            ].map((item, idx) => (
              <motion.div 
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-[#6c5ce7] font-black text-lg mb-1">{item.num}</p>
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">{item.title}</p>
                <p className="text-white/35 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-[340px] md:h-[420px]"
        >
          <BlobVisual />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── DYNAMIC VACANCIES SECTION ─── */
interface Vacancy {
  _id?: string;
  id: string;
  tags: string[];
  title: string;
  desc: string;
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  icon?: boolean;
  department: string;
}

function Vacancies() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    tags: '',
    title: '',
    desc: '',
    stack: '',
    salary: '',
    featured: false,
    color: '#6c5ce7',
    department: 'Engineering',
  });

  const fetchVacancies = async () => {
    try {
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
    const checkAdmin = () => {
      const user = localStorage.getItem('user');
      setIsAdmin(user === 'admin');
    };
    checkAdmin();
  }, []);

  const openModal = (vacancy?: Vacancy) => {
    if (vacancy) {
      setEditingVacancy(vacancy);
      setFormData({
        tags: vacancy.tags.join(', '),
        title: vacancy.title,
        desc: vacancy.desc,
        stack: vacancy.stack.join(', '),
        salary: vacancy.salary || '',
        featured: vacancy.featured,
        color: vacancy.color,
        department: vacancy.department,
      });
    } else {
      setEditingVacancy(null);
      setFormData({
        tags: '',
        title: '',
        desc: '',
        stack: '',
        salary: '',
        featured: false,
        color: '#6c5ce7',
        department: 'Engineering',
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      tags: formData.tags.split(',').map(t => t.trim()),
      title: formData.title,
      desc: formData.desc,
      stack: formData.stack.split(',').map(s => s.trim()),
      salary: formData.salary,
      featured: formData.featured,
      color: formData.color,
      department: formData.department,
    };

    try {
      let response;
      if (editingVacancy) {
        response = await fetch(`/api/vacancies/${editingVacancy.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingVacancy.id }),
        });
      } else {
        response = await fetch('/api/vacancies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setModalOpen(false);
        fetchVacancies();
        alert(editingVacancy ? 'Vacancy updated!' : 'Vacancy created!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save vacancy');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vacancy?')) return;
    
    try {
      const response = await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchVacancies();
        alert('Vacancy deleted!');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete vacancy');
    }
  };

  const engineeringCount = vacancies.filter(v => v.department === 'Engineering').length;
  const designCount = vacancies.filter(v => v.department === 'Design').length;

  const VacancyCard = ({ role }: { role: Vacancy }) => {
    if (role.icon) {
      return (
        <motion.div 
          whileHover={{ y: -5, borderColor: "#6c5ce7" }}
          className="border border-white/10 bg-[#11111e]/80 backdrop-blur-sm rounded-xl p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[220px] group cursor-pointer transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-2xl group-hover:scale-110 transition-transform">
            +
          </div>
          <p className="text-white font-bold text-base tracking-wide uppercase">{role.title}</p>
          <p className="text-white/35 text-xs leading-relaxed">{role.desc}</p>
          <button className="mt-2 text-[10px] tracking-[0.18em] uppercase text-[#6c5ce7] hover:text-white transition-colors">
            Submit Pitch →
          </button>
        </motion.div>
      );
    }

    return (
      <motion.div
        whileHover={{ y: -5 }}
        className={`border rounded-xl p-6 flex flex-col gap-4 backdrop-blur-sm transition-all duration-300 ${
          role.featured
            ? "border-[#6c5ce7]/40 bg-gradient-to-br from-[#13112a]/90 to-[#11111e]/90 col-span-1 md:col-span-2 shadow-[0_0_30px_rgba(108,92,231,0.1)]"
            : "border-white/10 bg-[#11111e]/80 hover:border-[#6c5ce7]/30"
        }`}
      >
        {role.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {role.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
          </div>
        )}

        <h3 className={`font-black text-white leading-tight ${role.featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {role.title}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed">{role.desc}</p>

        {role.stack && (
          <div className="flex flex-wrap gap-2">
            {role.stack.map((s) => (<Tag key={s}>{s}</Tag>))}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto flex-wrap gap-3">
          {role.salary && (
            <p className="text-[10px] tracking-widest text-white/40 uppercase">
              Salary: {role.salary}
            </p>
          )}
          <div className="flex gap-2">
            {isAdmin && (
              <>
                <button
                  onClick={() => openModal(role)}
                  className="px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase transition-all bg-amber-500 hover:bg-amber-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase transition-all bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
           
            <button
              onClick={() => {
                const vacancyId = role._id || role.id;
                window.location.href = `/careers/apply?vacancy=${vacancyId}`;
              }}
              className="px-5 py-2 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase transition-all hover:opacity-80 hover:scale-105"
              style={{ backgroundColor: role.color || "#6c5ce7" }}
            >
              Apply Now →
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
        <div className="text-center text-white/50">Loading vacancies...</div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
        <SectionLabel>Operational Series</SectionLabel>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="text-5xl md:text-6xl font-black text-white leading-none">
            AVAILABLE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] to-[#00cec9]">VACANCIES</span>
          </h2>
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">Engineering</p>
              <p className="text-white font-black text-lg" style={{ color: "#6c5ce7" }}>{engineeringCount} Roles</p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mb-1">Design</p>
              <p className="text-white font-black text-lg" style={{ color: "#00cec9" }}>{designCount} Roles</p>
            </div>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-6">
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-lg text-sm font-bold uppercase hover:shadow-lg transition-all"
            >
              + Add New Vacancy
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {vacancies.map((vacancy) => (<VacancyCard key={vacancy.id} role={vacancy} />))}
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-[#11111e] border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a2e] p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">{editingVacancy ? 'Edit Vacancy' : 'Create New Vacancy'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Title *</label>
                  <input type="text" className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Description *</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.desc} onChange={(e) => setFormData({ ...formData, desc: e.target.value })} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Tags (comma separated)</label>
                    <input type="text" className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="System Architecture, Full-Time" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Tech Stack (comma separated)</label>
                    <input type="text" className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.stack} onChange={(e) => setFormData({ ...formData, stack: e.target.value })} placeholder="Go, Rust, Kubernetes" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Salary Range</label>
                    <input type="text" className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} placeholder="$160k – $220k" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Department</label>
                    <select className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })}>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Color</label>
                    <input type="color" className="w-full h-10 bg-black/50 border border-white/20 rounded-lg cursor-pointer" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                      <span className="text-sm text-white/80">Featured Position</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="flex-1 px-6 py-2 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 transition">Cancel</button>
                  <button type="submit" className="flex-1 px-6 py-2 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-lg text-white font-bold hover:shadow-lg transition">{editingVacancy ? 'Update' : 'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ─── WHY BUILD WITH US ─── */
const perks = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" 
          fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12L15 15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Equity & Ownership",
    desc: "Generous stock options. You are not an employee; you are a primary stakeholder in the ecosystem's growth.",
    color: "#6c5ce7",
    gradient: "from-[#6c5ce7]/20 to-[#6c5ce7]/5"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M5 12V17L12 21L19 17V12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12 15V21" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Remote Autonomous",
    desc: "Work from any node in the world. We focus on output quality, not clock-in timestamps.",
    color: "#00cec9",
    gradient: "from-[#00cec9]/20 to-[#00cec9]/5"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M19 19L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Health Protocol",
    desc: "Premium global health coverage and a mandatory 4-week 'Deep Sabbath' sabbatical every year.",
    color: "#a29bfe",
    gradient: "from-[#a29bfe]/20 to-[#a29bfe]/5"
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V4M12 20V22M4 12H2M6.5 6.5L5 5M17.5 6.5L19 5M22 12H20M18 18L19 19" 
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18 12C18 15.3137 15.3137 18 12 18" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Learning Budget",
    desc: "$5,000 annual budget for conferences, courses, and cutting-edge certifications.",
    color: "#fdcb6e",
    gradient: "from-[#fdcb6e]/20 to-[#fdcb6e]/5"
  },
];

function WhyBuild() {
  return (
    <section className="relative bg-transparent py-24 px-6 md:px-16 max-w-7xl mx-auto z-10">
      <div className="text-center mb-14">
        <SectionLabel>Protocol · Rewards</SectionLabel>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-black text-white"
        >
          WHY BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6c5ce7] via-[#a29bfe] to-[#00cec9]">WITH US</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-sm text-white/40 max-w-md mx-auto"
        >
          Join a collective that values your growth as much as your contribution
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {perks.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, borderColor: p.color, scale: 1.02 }}
            className={`group relative border border-white/10 bg-gradient-to-br ${p.gradient} bg-[#11111e]/80 backdrop-blur-sm rounded-2xl p-7 flex flex-col gap-4 transition-all duration-500 cursor-pointer overflow-hidden`}
          >
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${p.color}20, transparent 70%)`
              }}
            />
            
            <motion.div 
              className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${p.color}20, ${p.color}05)`,
                color: p.color,
                border: `1px solid ${p.color}30`
              }}
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.3 }}
            >
              {p.icon}
            </motion.div>

            <div className="relative">
              <h3 className="text-white font-black text-sm tracking-[0.1em] uppercase mb-2">
                {p.title}
              </h3>
              <motion.div 
                className="h-px w-8 group-hover:w-12 transition-all duration-300"
                style={{ background: p.color }}
              />
            </div>

            <p className="text-white/35 text-xs leading-relaxed group-hover:text-white/50 transition-colors duration-300">
              {p.desc}
            </p>

            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16"
      >
        {[
          { value: "98%", label: "Retention Rate", color: "#6c5ce7" },
          { value: "🌍", label: "Global Team", color: "#00cec9" },
          { value: "4.9★", label: "Glassdoor Rating", color: "#fdcb6e" },
        ].map((stat, i) => (
          <div key={i} className="text-center group cursor-pointer">
            <p className="text-2xl md:text-3xl font-black transition-all duration-300 group-hover:scale-110" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-[9px] tracking-[0.2em] text-white/40 uppercase mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── CTA BANNER (Enhanced) ─── */
/* ─── CTA BANNER (Enhanced with Navigation) ─── */
function CtaBanner() {
  const router = useRouter();
  
  return (
    <section className="relative bg-transparent py-32 px-6 text-center overflow-hidden z-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[300px] rounded-full bg-[#6c5ce7]/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-black text-white leading-none text-[clamp(2.5rem,9vw,6rem)]">
            READY TO INITIATE
          </h2>
          <h2
            className="font-black italic text-[clamp(2.5rem,9vw,6rem)] leading-none underline decoration-[#6c5ce7] underline-offset-8 mt-2"
            style={{
              background: "linear-gradient(135deg,#b0a8ff,#6c5ce7,#00cec9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SEQUENCE?
          </h2>
          <p className="mt-6 text-sm text-white/40 max-w-sm mx-auto leading-relaxed">
            Join a team that values technical mastery over corporate tradition.
            Your best work starts here.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/careers/apply')}
            className="mt-10 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] hover:shadow-[0_0_30px_rgba(108,92,231,0.5)] transition-all px-9 py-4 rounded-full text-xs font-bold tracking-[0.2em] uppercase cursor-pointer"
          >
            Initiate Application
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ROOT ─── */
export default function CareersPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      nodes = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.2 + 0.6,
        color:
          Math.random() > 0.6
            ? "rgba(108, 92, 231, 0.4)"
            : "rgba(162, 155, 254, 0.3)",
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const opacity = 0.1 * (1 - d / 160);
            ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        }
        if (n.x > canvas.width) {
          n.x = canvas.width;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        }
        if (n.y > canvas.height) {
          n.y = canvas.height;
          n.vy *= -1;
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#05070a] text-white overflow-x-hidden">
      {/* Full Page Particle Network Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30 z-0"
      />

      {/* Fixed Gradient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6c5ce7]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00cec9]/8 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Page Content */}
      <CareerHero />
      <Manifesto />
      <Vacancies />
      <WhyBuild />
      <CtaBanner />
    </main>
  );
}