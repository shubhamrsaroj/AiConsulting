import React from 'react';

const ServiceCard = ({ title, description, badge }) => (
    <div className="group relative p-[2px] rounded-2xl bg-gradient-to-b from-neon-purple/50 to-transparent hover:from-neon-cyan/50 hover:to-neon-purple/50 transition-all duration-500">
        <div className="absolute inset-0 bg-neon-purple/20 blur-xl group-hover:bg-neon-cyan/20 transition-colors duration-500 rounded-2xl"></div>
        <div className="relative h-full bg-cyber-black/90 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-start border border-white/5 group-hover:border-neon-cyan/30 transition-colors">
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-neon-purple/10 text-neon-purple group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan transition-colors duration-500">
                <span className="text-2xl">{badge}</span>
            </div>

            <h3 className="text-2xl font-orbitron font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                {description}
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-neon-purple group-hover:text-neon-cyan opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                EXPLORE <span className="text-lg">→</span>
            </div>
        </div>
    </div>
);

const CyberServices = () => {
    const services = [
        {
            title: "AI Strategy",
            description: "We help you identify high-impact AI opportunities aligned with your business goals, navigating the complex landscape of artificial intelligence.",
            badge: "01"
        },
        {
            title: "Custom Dev",
            description: "End-to-end development of machine learning models and AI-powered applications, tailored specifically to your operational needs.",
            badge: "02"
        },
        {
            title: "Data Analytics",
            description: "Turn your raw data into actionable insights with our advanced analytics solutions, leveraging predictive modeling and deep learning.",
            badge: "03"
        },
    ];

    return (
        <section id="services" className="relative py-32 px-10 bg-dark-bg overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-4">
                            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">SERVICES</span>
                        </h2>
                        <div className="h-1 w-24 bg-neon-cyan rounded-full"></div>
                    </div>
                    <p className="text-gray-400 max-w-lg text-right font-rajdhani text-lg">
                        Empowering your business with cutting-edge artificial intelligence solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CyberServices;
