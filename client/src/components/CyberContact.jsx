import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCyberAudio } from './CyberAudio';

const CyberContact = () => {
    const { playSfx } = useCyberAudio();
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

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Fake delay to show off animation
                setTimeout(() => {
                    setStatus('success');
                    playSfx('success');
                    setFormData({ name: '', email: '', message: '' });
                }, 2000);
            } else {
                setStatus('error');
                playSfx('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
            playSfx('error');
        }
    };

    return (
        <section id="contacts" className="relative py-32 px-10 bg-cyber-black overflow-hidden font-rajdhani">
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

                    <AnimatePresence mode='wait'>
                        {/* FORM STATE */}
                        {status === '' || status === 'error' ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                onSubmit={handleSubmit}
                                className="space-y-8 w-full"
                            >
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
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full relative group overflow-hidden bg-transparent border border-neon-cyan/50 hover:border-neon-cyan p-4 transition-all"
                                >
                                    <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative font-bold tracking-[0.2em] text-neon-cyan flex items-center justify-center gap-4">
                                        INITIATE UPLOAD
                                        <span className="group-hover:translate-x-2 transition-transform">→</span>
                                    </span>
                                </button>
                            </motion.form>
                        ) : status === 'sending' ? (
                            /* UPLOADING STATE ANIMATION */
                            <motion.div
                                key="sending"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center space-y-8 w-full"
                            >
                                <div className="relative w-32 h-32">
                                    {/* Spinner Rings */}
                                    <div className="absolute inset-0 border-4 border-neon-purple/20 rounded-full"></div>
                                    <div className="absolute inset-0 border-t-4 border-neon-cyan rounded-full animate-spin"></div>
                                    <div className="absolute inset-4 border-r-4 border-neon-pink rounded-full animate-spin-reverse"></div>

                                    {/* Center Data Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-4xl animate-pulse">📡</span>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-xl font-orbitron text-white tracking-widest mb-2 animate-pulse">TRANSMITTING DATA</h3>
                                    <p className="text-neon-cyan font-mono text-sm">ENCRYPTING PACKETS...</p>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 2, ease: "linear" }}
                                    ></motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            /* SUCCESS STATE ANIMATION */
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center space-y-6 w-full py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                    className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-2 border-green-400 shadow-[0_0_30px_rgba(74,222,128,0.4)]"
                                >
                                    <span className="text-5xl text-green-400">✓</span>
                                </motion.div>

                                <div className="text-center">
                                    <h3 className="text-2xl font-orbitron text-white tracking-widest mb-2">UPLOAD COMPLETE</h3>
                                    <p className="text-gray-400">Your signal has been received.</p>
                                </div>

                                <button
                                    onClick={() => setStatus('')}
                                    className="mt-8 px-8 py-3 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all rounded-lg text-sm tracking-widest text-gray-300"
                                >
                                    SEND NEW TRANSMISSION
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default CyberContact;
