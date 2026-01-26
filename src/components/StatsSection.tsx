import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState, MouseEvent } from "react";
import { GraduationCap, Building2, BookOpen } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ target, prefix = "", suffix = "", duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  const spring = useSpring(0, { duration: duration * 1000 });
  const rounded = useTransform(spring, (value) => Math.round(value));

  useEffect(() => {
    if (isInView) {
      spring.set(target);
    }
  }, [isInView, spring, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (value) => {
      setDisplayValue(value);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon, value, prefix, suffix, label, delay }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center mb-4 shadow-lg">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className="text-primary-foreground/80 font-medium text-base">
        {label}
      </p>
    </motion.div>
  );
};

const stats = [
  {
    icon: <GraduationCap className="w-7 h-7 text-accent-foreground" />,
    value: 50,
    prefix: "+",
    label: "Graduados",
  },
  {
    icon: <Building2 className="w-7 h-7 text-accent-foreground" />,
    value: 250,
    prefix: "+",
    label: "Empresas",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-accent-foreground" />,
    value: 10,
    prefix: "+",
    label: "Cursos Disponibles",
  },
];

// Floating particle component
const FloatingParticle = ({ delay, size, initialX, initialY }: { delay: number; size: number; initialX: number; initialY: number }) => (
  <motion.div
    className="absolute rounded-full bg-highlight/20"
    style={{
      width: size,
      height: size,
      left: `${initialX}%`,
      top: `${initialY}%`,
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 30);
    mouseY.set(y * 30);
  };

  const backgroundX = useTransform(mouseX, (value) => `${50 + value * 0.5}%`);
  const backgroundY = useTransform(mouseY, (value) => `${50 + value * 0.5}%`);

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 0.2,
    size: 4 + Math.random() * 8,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }));

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-16 lg:py-20 relative overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0 hero-gradient"
        style={{
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Interactive radial gradient that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, hsla(197, 100%, 75%, 0.3) 0%, transparent 50%)`,
          left: backgroundX,
          top: backgroundY,
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, index) => (
          <FloatingParticle key={index} {...particle} />
        ))}
      </div>

      {/* Animated wave patterns */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container max-w-5xl mx-auto px-4 lg:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Nuestra Comunidad
          </h2>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
            Gracias por formar parte de LoVirtual y por confiar en nosotros.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              prefix={stat.prefix}
              label={stat.label}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
