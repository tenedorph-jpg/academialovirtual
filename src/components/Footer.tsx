import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary py-12 px-6">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">
              La Academia de LoVirtual
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Política de Privacidad
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a
              href="#"
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              Términos de Uso
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2026 La Academia de LoVirtual. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
