'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ParticleNetwork from '@/components/ParticleNetwork';

interface Vacancy {
  _id?: string;
  id: string;
  title: string;
  desc: string;
  tags: string[];
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  department: string;
}

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vacancyId = searchParams.get('vacancy');
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    portfolio: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    resume: null as File | null,
  });

  // Load vacancy details
  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch('/api/vacancies');
        const data = await res.json();
        const found = data.find((v: Vacancy) => v.id === vacancyId || v._id === vacancyId);
        setVacancy(found || null);
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      } finally {
        setLoading(false);
      }
    };

    if (vacancyId) {
      fetchVacancy();
    } else {
      setLoading(false);
    }
  }, [vacancyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName || !formData.email) {
      alert('Please provide your name and email');
      return;
    }
    
    if (!formData.resume) {
      alert('Please upload your resume');
      return;
    }
    
    setSubmitting(true);

    // Create form data
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('experience', formData.experience);
    submitData.append('currentCompany', formData.currentCompany);
    submitData.append('portfolio', formData.portfolio);
    submitData.append('linkedin', formData.linkedin);
    submitData.append('github', formData.github);
    submitData.append('coverLetter', formData.coverLetter);
    submitData.append('vacancyId', vacancyId || '');
    submitData.append('vacancyTitle', vacancy?.title || '');
    if (formData.resume) {
      submitData.append('resume', formData.resume);
    }

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        alert('✅ Your application has been submitted successfully! We will contact you soon.');
        // Redirect to careers page on success
        router.push('/CareerPage');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // File size check (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size cannot exceed 5MB');
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6c5ce7]"></div>
      </div>
    );
  }

  if (!vacancy && vacancyId) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Vacancy Not Found</h1>
          <Link
            href="/CareerPage"
            className="inline-block px-6 py-2 bg-[#6c5ce7] text-white rounded-lg hover:bg-[#5a4bd1] transition"
          >
            Back to Careers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Particle Network BG */}
      <ParticleNetwork 
        opacity={0.35}
        particleCount={60}
        connectionDistance={160}
        particleSize={{ min: 0.8, max: 2.2 }}
        particleColor="rgba(108, 92, 231, 0.4)"
        lineColor="rgba(108, 92, 231"
        lineOpacity={0.1}
        speed={0.3}
        glowEffect={true}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button - Using Link */}
        <Link
          href="/CareerPage"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
        >
          ← Back to Careers
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Apply for{' '}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] bg-clip-text text-transparent">
              {vacancy?.title}
            </span>
          </h1>
          <p className="text-white/40">
            {vacancy?.department} • {vacancy?.salary && `Salary: ${vacancy.salary}`}
          </p>
        </motion.div>

        {/* Application Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-[#11111e]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
        >
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="+880 1234 567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Experience (Years)
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="0-1">0-1 Years</option>
                  <option value="1-3">1-3 Years</option>
                  <option value="3-5">3-5 Years</option>
                  <option value="5-8">5-8 Years</option>
                  <option value="8+">8+ Years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Current Company
                </label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="Company Name"
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Profile Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Portfolio/Website
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Documents
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Resume/CV <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#6c5ce7] file:text-white hover:file:bg-[#5a4bd1] cursor-pointer"
                />
                <p className="text-xs text-white/40 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                {formData.resume && (
                  <p className="text-xs text-green-400 mt-1">✓ {formData.resume.name} uploaded</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Cover Letter
                </label>
                <textarea
                  rows={5}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="Tell us about your experience, skills, and why you're the right fit for this position..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/CareerPage"
              className="flex-1 px-6 py-3 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 transition text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-lg text-white font-bold hover:shadow-lg transition disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application →'}
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}