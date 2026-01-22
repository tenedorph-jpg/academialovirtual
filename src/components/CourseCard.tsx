import { motion } from "framer-motion";
import { Clock, BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Course {
  id: number;
  title: string;
  link: string;
  duration: string;
  lessons: string;
  description: string;
  icon: React.ReactNode;
}

interface CourseCardProps {
  course: Course;
  index: number;
}

const CourseCard = ({ course, index }: CourseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="h-full flex flex-col p-6 rounded-xl border border-border/50 bg-card shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-lg">
          <span className="text-primary-foreground">{course.icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 border-accent/30 text-accent">
            <BookOpen className="w-3.5 h-3.5" />
            {course.lessons}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6">
          {course.description}
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group"
        >
          <a href={course.link} target="_blank" rel="noopener noreferrer">
            Iniciar Curso
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseCard;
