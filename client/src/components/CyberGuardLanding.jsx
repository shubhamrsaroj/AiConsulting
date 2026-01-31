import React, { useState } from 'react';
import robotImg from '../assets/cyber_robot.png';
import CyberServices from './CyberServices';
import CyberContact from './CyberContact';
import { CyberAudioProvider, useCyberAudio } from './CyberAudio';
import { motion, AnimatePresence } from 'framer-motion';

// Inner component to use the hook
const CyberGuardContent = () => {
    const { playSfx } = useCyberAudio();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        playSfx('click');
        setIsMenuOpen(false); // Close menu on click
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-cyber-black text-white font-rajdhani overflow-x-hidden relative selection:bg-neon-pink selection:text-white">

            {/* Background Grids and Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(176,38,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(176,38,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-neon-purple/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neon-purple/10 to-transparent"></div>
            </div>

            {/* Decorative Corners */}
            <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-cyan z-50"></div>
            <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-cyan z-50"></div>
            <div className="fixed bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-cyan z-50"></div>
            <div className="fixed bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-cyan z-50"></div>

            {/* Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-10 py-4 md:py-6 bg-cyber-black/80 backdrop-blur-md border-b border-white/5"
            >
                <div
                    className="text-2xl font-orbitron font-bold tracking-widest text-white flex items-center gap-2 cursor-pointer"
                    onClick={() => { playSfx('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    onMouseEnter={() => playSfx('hover')}
                >
                    <span className="text-neon-cyan">AI</span>CONSULT.
                </div>

                <div className="border border-neon-purple/30 rounded-full px-6 py-1 bg-black/50 backdrop-blur-sm hidden lg:flex gap-8 text-xs font-bold tracking-[0.2em] text-neon-purple/80 uppercase">
                    <span>Strategy</span>
                    <span className="text-neon-cyan">♦</span>
                    <span>Development</span>
                    <span className="text-neon-cyan">♦</span>
                    <span>Insights</span>
                </div>

                <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
                    <button
                        onClick={() => scrollToSection('services')}
                        onMouseEnter={() => playSfx('hover')}
                        className="hover:text-neon-cyan transition-colors uppercase"
                    >Services</button>
                    <button
                        onClick={() => scrollToSection('about')}
                        onMouseEnter={() => playSfx('hover')}
                        className="hover:text-neon-cyan transition-colors uppercase"
                    >About</button>
                    <button
                        onClick={() => scrollToSection('contacts')}
                        onMouseEnter={() => playSfx('hover')}
                        className="hover:text-neon-cyan transition-colors uppercase"
                    >Contacts</button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => { playSfx('click'); setIsMenuOpen(!isMenuOpen); }}
                >
                    <div className="space-y-2">
                        <motion.div
                            animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-8 h-0.5 bg-neon-cyan origin-center"
                        />
                        <motion.div
                            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-8 h-0.5 bg-neon-cyan"
                        />
                        <motion.div
                            animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-8 h-0.5 bg-neon-cyan origin-center"
                        />
                    </div>
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-cyber-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8 pt-20"
                    >
                        <button
                            onClick={() => scrollToSection('services')}
                            className="text-2xl font-orbitron font-bold text-white hover:text-neon-cyan tracking-widest uppercase"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-2xl font-orbitron font-bold text-white hover:text-neon-cyan tracking-widest uppercase"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('contacts')}
                            className="text-2xl font-orbitron font-bold text-white hover:text-neon-cyan tracking-widest uppercase"
                        >
                            Contacts
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="relative z-10">
                {/* HERO SECTION */}
                <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 min-h-screen pt-24 md:pt-20">
                    {/* Left Text */}
                    <div className="flex-1 space-y-8 mt-10 md:mt-0 relative">
                        {/* Text Glitch Effect Layer */}
                        <div className="absolute -left-4 -top-4 w-64 h-64 bg-neon-purple/20 blur-[100px] rounded-full"></div>

                        <motion.h1
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-3xl sm:text-4xl md:text-8xl font-orbitron font-medium leading-none uppercase relative"
                        >
                            Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Intelligent</span> <br />
                            Business
                        </motion.h1>

                        <motion.p
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="max-w-md text-gray-400 text-sm md:text-base leading-relaxed border-l-2 border-neon-purple pl-4"
                        >
                            Transform your enterprise with cutting-edge AI strategy, custom machine learning solutions, and data-driven insights.
                        </motion.p>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            onClick={() => scrollToSection('services')}
                            onMouseEnter={() => playSfx('hover')}
                            className="group relative px-8 py-3 bg-transparent border border-neon-cyan/50 hover:border-neon-cyan transition-all overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative font-bold tracking-widest text-neon-cyan flex items-center gap-2">
                                START INNOVATING <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </motion.button>
                    </div>

                    {/* Center Character */}
                    <div className="flex-1 flex justify-center items-center relative h-[80vh]">
                        {/* Glowing Orbs behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full animate-pulse-slow"></div>

                        {/* Character Image */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="relative z-10 animate-float w-full max-w-lg"
                        >
                            <img
                                src={robotImg}
                                alt="AI Assistant"
                                className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(176,38,255,0.4)]"
                            />
                        </motion.div>

                        {/* Holographic Rings (CSS Only) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-neon-pink/20 rounded-full rotate-x-[60deg] animate-spin-slow pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-neon-cyan/10 rounded-full rotate-x-[60deg] scale-110 pointer-events-none"></div>
                    </div>

                    {/* Right Info Details */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="hidden md:flex flex-col gap-12 text-right text-xs font-bold tracking-wider text-gray-500 w-48"
                    >
                        <div className="group cursor-pointer" onMouseEnter={() => playSfx('hover')}>
                            <span className="block text-neon-purple mb-1 group-hover:text-white transition-colors">STRATEGIC PLANNING:</span>
                            AI ROADMAP & IMPLEMENTATION
                        </div>
                        <div className="group cursor-pointer" onMouseEnter={() => playSfx('hover')}>
                            <span className="block text-neon-purple mb-1 group-hover:text-white transition-colors">CUSTOM MODELS:</span>
                            TAILORED ML SOLUTIONS
                        </div>
                        <div className="group cursor-pointer" onMouseEnter={() => playSfx('hover')}>
                            <span className="block text-neon-purple mb-1 group-hover:text-white transition-colors">DATA ANALYTICS:</span>
                            ACTIONABLE BUSINESS INSIGHTS
                        </div>
                    </motion.div>
                </section>

                {/* SERVICES SECTION */}
                <CyberServices />

                {/* CONTACT SECTION */}
                <CyberContact />
            </main>

            {/* Footer / Bottom Bar - now relative to bottom of page content, or could be fixed/sticky if preferred, keeping as relative footer */}
            <footer className="w-full flex justify-between items-end px-4 md:px-10 py-6 border-t border-white/5 bg-black font-mono text-sm text-neon-cyan">
                <div className="border border-neon-purple/30 rounded-full px-6 py-2">
                    <span className="text-white">AI</span>CONSULT © 2024
                </div>

                <div
                    className="flex items-center gap-4 cursor-pointer hover:text-white transition-colors"
                    onClick={() => { playSfx('click'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    onMouseEnter={() => playSfx('hover')}
                >
                    BACK TO TOP
                    <div className="w-8 h-8 border border-neon-cyan rounded-full flex items-center justify-center">
                        <span className="-rotate-90">→</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const CyberGuardLanding = () => {
    return (
        <CyberAudioProvider>
            <CyberGuardContent />
        </CyberAudioProvider>
    );
};

export default CyberGuardLanding;
