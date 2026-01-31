import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Importing local audios
import hoverSfx from '../../audios/mixkit-water-sci-fi-bleep-902.wav';
import clickSfx from '../../audios/mixkit-interface-click-hover-1127.wav';
import successSfx from '../../audios/mixkit-fast-sweeping-transition-164.wav';
import errorSfx from '../../audios/mixkit-wrong-long-buzzer-954.wav';

const CyberAudioContext = createContext();

export const useCyberAudio = () => useContext(CyberAudioContext);

export const CyberAudioProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false); // Default unmuted since no annoying BG music

    // SFX Refs
    const hoverSfxRef = useRef(null);
    const clickSfxRef = useRef(null);
    const successSfxRef = useRef(null);
    const errorSfxRef = useRef(null);

    useEffect(() => {
        // Initialize Audio objects with imported files
        hoverSfxRef.current = new Audio(hoverSfx);
        hoverSfxRef.current.volume = 0.2;

        clickSfxRef.current = new Audio(clickSfx);
        clickSfxRef.current.volume = 0.4;

        successSfxRef.current = new Audio(successSfx);
        successSfxRef.current.volume = 0.5;

        errorSfxRef.current = new Audio(errorSfx);
        errorSfxRef.current.volume = 0.5;
    }, []);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const playSfx = (type) => {
        if (isMuted) return;

        let audio = null;
        switch (type) {
            case 'hover': audio = clickSfxRef.current; break;
            case 'click': audio = hoverSfxRef.current; break;
            case 'success': audio = successSfxRef.current; break;
            case 'error': audio = errorSfxRef.current; break;
            default: break;
        }

        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.error("SFX play failed:", e));
        }
    };

    return (
        <CyberAudioContext.Provider value={{ isMuted, toggleMute, playSfx }}>
            {children}

            {/* Audio Toggle UI */}
            <div className="fixed bottom-6 right-10 z-50 pointer-events-auto">
                <button
                    onClick={toggleMute}
                    className={`
                        relative group flex items-center justify-center w-12 h-12 rounded-full border 
                        transition-all duration-300 backdrop-blur-md
                        ${!isMuted
                            ? 'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                            : 'border-white/20 bg-black/50 hover:border-neon-purple'
                        }
                    `}
                >
                    {/* Sound wave animation bits */}
                    {!isMuted && (
                        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-neon-cyan"></div>
                    )}

                    <span className={`text-xl ${!isMuted ? 'text-neon-cyan' : 'text-gray-400 group-hover:text-neon-purple'}`}>
                        {!isMuted ? '🔊' : '🔇'}
                    </span>

                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-1 rounded border border-white/10">
                        {isMuted ? 'ACTIVATE SOUND' : 'MUTE AUDIO'}
                    </div>
                </button>
            </div>
        </CyberAudioContext.Provider>
    );
};

export default CyberAudioProvider;
