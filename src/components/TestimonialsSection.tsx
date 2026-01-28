import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  { name: "Ana Meza", text: "Fue muy útil para conocer mejor a la empresa y la esencia de lo que es ser un asistente virtual." },
  { name: "Eberth Ortega", text: "¡Excelente curso! Aclaré varias dudas que tenía y me sirvió para profesionalizar mis futuras entrevistas para hacerlas más asertivas. Está bien organizado y concreto." },
  { name: "Douglas Pereira", text: "Me he dado cuenta que a través de este curso cualquier profesional puede dar una excelente respuesta ante cualquier situación en una entrevista. Facilita la interacción entre el asistente virtual y el posible cliente." },
  { name: "Mariana Zambrano", text: "Excelente la dinámica pedagógica que lleva a un aprendizaje fluido de aspectos básicos pero no menos importantes." },
  { name: "Victor Moreno", text: "Excelente Información, Muy Importante." },
  { name: "Douglas Pereira", text: "El curso deja muy claro todo lo relacionado con normas y procesos. Cualquier desviación conllevaría a sanciones, por lo que la claridad es vital." },
  { name: "Checira Urdaneta", text: "Muy completo, se presta a seguir investigando las herramientas." },
  { name: "Camila Gallardo", text: "Excelente curso, fácil de entender y muy dinámico." },
  { name: "María Molina", text: "Excelente curso, fácil de entender y de ejecutar." },
  { name: "Juan Castillo", text: "Excelente trabajo realizado en la Academia para la formación de asistentes virtuales." },
  { name: "Rock Stuar", text: "Increíble trabajo con los cursos y la preparación docente que da la Academia." },
  { name: "Neomar Marquina", text: "Excelentes herramientas." },
  { name: "Daniel Gonzales", text: "Super agradecido y encantado, gracias por confiar en mi trabajo, los cursos tienen muy buena información." },
  { name: "Sofía Ramírez", text: "La plataforma es muy intuitiva, me sentí acompañada en todo el proceso de aprendizaje." },
  { name: "Carlos Méndez", text: "Lo mejor es poder aprender a mi propio ritmo. La calidad del contenido sobre IA superó mis expectativas." },
  { name: "Laura Vargas", text: "Gracias a LoVirtual ahora entiendo cómo cobrar mis servicios y gestionar clientes internacionales." },
  { name: "Andrés Colmenares", text: "Una formación obligatoria para quien quiera tomarse en serio el trabajo remoto. Muy profesional." },
  { name: "Gabriela Torres", text: "Las herramientas prácticas que enseñan se pueden aplicar desde el día uno. 100% recomendado." }
];

// Split testimonials into 3 columns
const column1 = testimonials.filter((_, i) => i % 3 === 0);
const column2 = testimonials.filter((_, i) => i % 3 === 1);
const column3 = testimonials.filter((_, i) => i % 3 === 2);

interface TestimonialCardProps {
  name: string;
  text: string;
}

const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const TestimonialCard = ({ name, text }: TestimonialCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border border-border/50">
    <p className="text-muted-foreground text-sm leading-relaxed mb-3">"{text}"</p>
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8 bg-primary">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <p className="font-semibold text-primary text-sm">{name}</p>
    </div>
  </div>
);

interface MarqueeColumnProps {
  testimonials: typeof column1;
  duration?: number;
  reverse?: boolean;
}

const MarqueeColumn = ({ testimonials, duration = 25, reverse = false }: MarqueeColumnProps) => {
  // Duplicate the testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative h-[500px] overflow-hidden">
      <motion.div
        className="flex flex-col"
        animate={{
          y: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.name}-${index}`}
            name={testimonial.name}
            text={testimonial.text}
          />
        ))}
      </motion.div>
    </div>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#F0F9FF" }}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Lo Que Dicen Nuestros Estudiantes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Testimonios reales de profesionales que han transformado su carrera con LoVirtual Academy.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          {/* Fade overlay top */}
          <div 
            className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
            style={{ 
              background: "linear-gradient(to bottom, #F0F9FF 0%, transparent 100%)" 
            }}
          />
          
          {/* Fade overlay bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
            style={{ 
              background: "linear-gradient(to top, #F0F9FF 0%, transparent 100%)" 
            }}
          />

          {/* Desktop: 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <MarqueeColumn testimonials={column1} duration={30} />
            <MarqueeColumn testimonials={column2} duration={35} reverse />
            <MarqueeColumn testimonials={column3} duration={28} />
          </div>

          {/* Mobile: 1 column */}
          <div className="md:hidden">
            <MarqueeColumn testimonials={testimonials.slice(0, 8)} duration={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
