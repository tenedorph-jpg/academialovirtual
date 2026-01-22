import { motion } from "framer-motion";
import { Target, Eye, Sparkles } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 lg:py-20 px-4 lg:px-6 bg-muted/50">
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Quiénes Somos
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Conectamos Talento con Oportunidades Globales
            </h2>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                Somos <strong className="text-foreground">LoVirtual, LLC</strong>. Bajo el liderazgo de nuestro fundador, el emprendedor puertorriqueño{" "}
                <strong className="text-foreground">Gamaliel Melecio Cabrera</strong>, hemos transformado la manera en que las empresas del mundo encuentran talento.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg mt-4">
                Conectamos a cientos de organizaciones con profesionales capacitados en áreas clave como{" "}
                <span className="text-accent font-medium">administración</span>,{" "}
                <span className="text-accent font-medium">marketing</span>,{" "}
                <span className="text-accent font-medium">finanzas</span> y{" "}
                <span className="text-accent font-medium">tecnología</span>, eliminando barreras geográficas y potenciando el crecimiento mutuo.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Mission & Vision Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="p-6 rounded-xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Nuestra Misión
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Simplificar la vida de nuestros clientes mediante asistentes virtuales confiables y eficientes, construyendo relaciones estratégicas y duraderas.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.1 }}
              className="p-6 rounded-xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Eye className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Nuestra Visión
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Liderar la revolución del trabajo digital global, redefiniendo la eficiencia y superando las expectativas en cada interacción.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
