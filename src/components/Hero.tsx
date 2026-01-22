import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center hero-gradient overflow-hidden">
      {/* Abstract decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-highlight/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/40 blur-3xl"
        />
        
        {/* Floating decorative circles */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-[15%] w-4 h-4 rounded-full bg-highlight/40"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-[20%] w-6 h-6 rounded-full bg-highlight/30"
        />
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[10%] w-3 h-3 rounded-full bg-primary-foreground/20"
        />
      </div>

      <div className="container relative z-10 px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="relative">
            <GraduationCap className="w-16 h-16 text-primary-foreground" strokeWidth={1.5} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-5 h-5 text-highlight" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight"
        >
          Bienvenido a La Academia de LoVirtual
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 italic font-light max-w-3xl mx-auto leading-relaxed"
        >
          "Donde tu talento rompe fronteras. Capacítate, crece y conviértete en el profesional que el mundo digital necesita."
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-12"
        >
          <a
            href="#cursos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary-foreground text-primary font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl glow-accent"
          >
            Explorar Cursos
          </a>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
