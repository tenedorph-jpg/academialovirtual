import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard, { Course } from "./CourseCard";
import {
  Rocket,
  Calculator,
  Briefcase,
  Users,
  Palette,
  Globe,
} from "lucide-react";

const courses: Course[] = [
  {
    id: 1,
    title: "Introducción a LoVirtual",
    link: "https://intro-lovirtual.lovable.app/",
    duration: "2 Semanas",
    lessons: "10 Lecciones",
    description:
      "El primer paso de tu carrera. Conoce nuestra cultura, historia y las bases para ser un Asistente Virtual exitoso.",
    icon: <Rocket className="w-7 h-7" />,
  },
  {
    id: 2,
    title: "Contabilidad para AVs",
    link: "https://cursocontabilidad.lovable.app/",
    duration: "4 Semanas",
    lessons: "9 Módulos",
    description:
      "Domina la gestión financiera, conciliaciones, flujo de caja y conviértete en un asesor proactivo.",
    icon: <Calculator className="w-7 h-7" />,
  },
  {
    id: 3,
    title: "Administración y Gestión",
    link: "https://lovirtualadmin.lovable.app/",
    duration: "3 Semanas",
    lessons: "8 Módulos",
    description:
      "Herramientas de organización, manejo de agendas ejecutivas y liderazgo de procesos administrativos.",
    icon: <Briefcase className="w-7 h-7" />,
  },
  {
    id: 4,
    title: "Community Management (CM)",
    link: "https://lovirtualcm.lovable.app/",
    duration: "4 Semanas",
    lessons: "12 Lecciones",
    description:
      "Gestión de redes sociales, creación de contenido estratégico y métricas para marcas globales.",
    icon: <Users className="w-7 h-7" />,
  },
  {
    id: 5,
    title: "Diseño Gráfico Corporativo",
    link: "https://lovirtualgrafico.lovable.app/",
    duration: "4 Semanas",
    lessons: "10 Lecciones",
    description:
      "Domina la identidad visual, Canva, herramientas de Adobe y crea piezas de impacto.",
    icon: <Palette className="w-7 h-7" />,
  },
  {
    id: 6,
    title: "Inglés para Negocios",
    link: "https://lovirtualus.lovable.app/",
    duration: "Continua",
    lessons: "Práctica Diaria",
    description:
      "Perfecciona tu comunicación en inglés para interactuar con clientes internacionales con confianza.",
    icon: <Globe className="w-7 h-7" />,
  },
];

const CoursesCarousel = () => {
  return (
    <section id="cursos" className="py-16 lg:py-20 px-4 lg:px-6 bg-background scroll-mt-20">
      <div className="container max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Cursos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Elige el programa que mejor se adapte a tus metas profesionales y comienza tu transformación hoy.
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full px-4"
        >
          <CarouselContent>
            {courses.map((course, index) => (
              <CarouselItem
                key={course.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <CourseCard course={course} index={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8">
            <CarouselPrevious className="relative static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none h-12 w-12 rounded-full" />
            <CarouselNext className="relative static translate-y-0 bg-primary text-primary-foreground hover:bg-primary/90 border-none h-12 w-12 rounded-full" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CoursesCarousel;
