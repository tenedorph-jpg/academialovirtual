import { LogIn, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-lg text-white">
            Academia <span className="text-highlight">LoVirtual</span>
          </span>
        </Link>

        {/* Login Button */}
        <Button
          variant="outline"
          onClick={() => navigate('/login')}
          className="gap-2 border-primary/40 bg-primary/20 text-white hover:bg-primary/30 hover:border-primary/50 hover:text-white transition-all backdrop-blur-sm"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Iniciar Sesión</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
