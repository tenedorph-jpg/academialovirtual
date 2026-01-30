import { LogIn, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-lg text-foreground">
            Academia <span className="text-primary">LoVirtual</span>
          </span>
        </Link>

        {/* Navigation Links - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/#cursos" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Cursos
          </a>
          <a href="/#nosotros" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Nosotros
          </a>
          <a href="/#contacto" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Contacto
          </a>
        </div>

        {/* Login Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/login')}
          className="gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
