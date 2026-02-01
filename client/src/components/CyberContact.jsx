import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCyberAudio } from './CyberAudio';
import emailjs from '@emailjs/browser';

const CyberContact = () => {
    const { playSfx } = useCyberAudio();
    const formRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // '', 'sending', 'success', 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        playSfx('click');
        setStatus('sending');

        // EmailJS Configuration
        const SERVICE_ID = 'service_lhn9ja8';
        const TEMPLATE_ID = 'template_axstext';
        const PUBLIC_KEY = 'THP0F2_XlcYMowhAC';

        try {
            // 1. Send Email via EmailJS (Frontend)
            const emailPromise = emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to_name: "Admin"
                },
                PUBLIC_KEY
            );

            // 2. Save to Database via Backend API
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const dbPromise = fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // Wait for both
            await Promise.all([emailPromise, dbPromise]);

            setStatus('success');
            playSfx('success');
            setFormData({ name: '', email: '', message: '' });

            // Reset status after 3 seconds
            setTimeout(() => {
                setStatus('');
            }, 5000);

        } catch (error) {
            console.error('EmailJS/DB Error:', error);
            setStatus('error');
            playSfx('error');
            setTimeout(() => setStatus(''), 5000);
        }
    };

    return (
        <section id="contacts" className="relative py-16 px-4 md:py-32 md:px-10 bg-cyber-black overflow-hidden font-rajdhani">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none"></div>

            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10 w-full min-h-[600px] flex flex-col justify-center">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6">
                        INITIATE <span className="text-neon-cyan">CONTACT</span>
                    </h2>
                    <p className="text-gray-400">Establish a secure connection with our team.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden min-h-[400px] flex items-center justify-center">
                    {/* Decor lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"></div>

                    <form onSubmit={handleSubmit} className="space-y-8 w-full">
                        {status === 'error' && (
                            <div className="mb-4 text-red-400 text-center font-bold tracking-widest animate-pulse">
                                ⚠ CONNECTION INTERRUPTED. RETRY.
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-bold tracking-widest text-neon-purple mb-2 uppercase group-focus-within:text-neon-cyan transition-colors">Identity / Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border-b-2 border-white/20 px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-neon-cyan/5 transition-all rounded-t-lg"
                                    placeholder="ENTER DESIGNATION"
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-bold tracking-widest text-neon-purple mb-2 uppercase group-focus-within:text-neon-cyan transition-colors">Comms / Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-black/40 border-b-2 border-white/20 px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-neon-cyan/5 transition-all rounded-t-lg"
                                    placeholder="ENTER FREQUENCY"
                                    disabled={status === 'sending'}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="message" className="block text-xs font-bold tracking-widest text-neon-purple mb-2 uppercase group-focus-within:text-neon-cyan transition-colors">Data / Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/40 border-b-2 border-white/20 px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-neon-cyan/5 transition-all rounded-t-lg resize-none"
                                placeholder="INPUT DATA STREAM..."
                                disabled={status === 'sending'}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'sending' || status === 'success'}
                            className={`w-full relative group overflow-hidden bg-transparent border p-4 transition-all ${status === 'success'
                                ? 'border-green-500 text-green-400'
                                : 'border-neon-cyan/50 hover:border-neon-cyan text-neon-cyan'
                                }`}
                        >
                            <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${status === 'success' ? 'bg-green-500/10' : 'bg-neon-cyan/10'
                                }`}></div>

                            <span className="relative font-bold tracking-[0.2em] flex items-center justify-center gap-4">
                                {status === 'sending' ? (
                                    <>
                                        <span className="animate-spin mr-2">⟳</span> SENDING...
                                    </>
                                ) : status === 'success' ? (
                                    <>
                                        SUCCESS<span className="text-xl">✓</span>
                                    </>
                                ) : (
                                    <>
                                        SUBMIT <span className="group-hover:translate-x-2 transition-transform">→</span>
                                    </>
                                )}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CyberContact;
