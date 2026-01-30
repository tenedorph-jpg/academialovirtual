import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, User, Lock, Users, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<'employee' | 'admin'>('employee');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (role === 'admin' && username === 'admin' && password === 'admin') {
      toast({
        title: "¡Bienvenido Administrador!",
        description: "Accediendo al panel de control...",
      });
      localStorage.setItem('userRole', 'admin');
      localStorage.setItem('userName', 'Administrador');
      navigate('/admin-dashboard');
    } else if (role === 'employee' && username === 'user' && password === 'user') {
      toast({
        title: "¡Bienvenido!",
        description: "Accediendo a tu espacio de aprendizaje...",
      });
      localStorage.setItem('userRole', 'employee');
      localStorage.setItem('userName', 'María García López');
      navigate('/student-dashboard');
    } else {
      toast({
        title: "Error de acceso",
        description: "Usuario o contraseña incorrectos. Intenta de nuevo.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-gradient p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-highlight/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.08, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-accent/40 blur-3xl"
        />
      </div>

      {/* Back button */}
      <Link 
        to="/" 
        className="absolute top-4 left-4 z-20 flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-sm font-medium">Volver al inicio</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="glass-card border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
            >
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Academia LoVirtual
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Accede a tu espacio de aprendizaje
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <Tabs value={role} onValueChange={(v) => setRole(v as 'employee' | 'admin')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                <TabsTrigger 
                  value="employee" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Users className="h-4 w-4" />
                  Soy Empleado
                </TabsTrigger>
                <TabsTrigger 
                  value="admin" 
                  className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Soy Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="employee" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee-user" className="text-foreground">
                      Usuario o Correo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employee-user"
                        placeholder="tu.nombre@empresa.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employee-pass" className="text-foreground">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="employee-pass"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Ingresando..." : "Ingresar a la Academia"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Demo: usuario <code className="bg-muted px-1 rounded">user</code> / contraseña <code className="bg-muted px-1 rounded">user</code>
                  </p>
                </form>
              </TabsContent>

              <TabsContent value="admin" className="mt-0">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-user" className="text-foreground">
                      Usuario Administrador
                    </Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-user"
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-pass" className="text-foreground">
                      Contraseña
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-pass"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold"
                    disabled={isLoading}
                  >
                    {isLoading ? "Ingresando..." : "Acceder al Panel"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Demo: usuario <code className="bg-muted px-1 rounded">admin</code> / contraseña <code className="bg-muted px-1 rounded">admin</code>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
