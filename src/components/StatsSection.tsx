import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-highlight flex items-center justify-center mb-4 shadow-lg">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
        <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
      </div>
      <p className="text-primary-foreground/80 font-medium text-lg">
        {label}
      </p>
    </motion.div>
  );
};

const stats = [
  {
    icon: <GraduationCap className="w-8 h-8 text-accent-foreground" />,
    value: 500,
    prefix: "+",
    label: "Graduados",
  },
  {
    icon: <Building2 className="w-8 h-8 text-accent-foreground" />,
    value: 100,
    prefix: "+",
    label: "Empresas",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-accent-foreground" />,
    value: 6,
    label: "Cursos Disponibles",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 lg:py-20 hero-gradient">
      <div className="container max-w-5xl mx-auto px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Nuestra Comunidad en Números
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Únete a una red global de profesionales que han transformado sus carreras con LoVirtual.
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
