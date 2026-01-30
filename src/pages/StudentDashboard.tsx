import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, BookOpen, BarChart3, Award, FileText, User,
  LogOut, Menu, X, Clock, Target, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from "recharts";
import { mockUsers, mockCourses, mockBadges, mockCertificates, mockStudyStats } from "@/data/mockData";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("progress");
  const userName = localStorage.getItem('userName') || 'Estudiante';

  // Get current user data (mock)
  const currentUser = mockUsers[0];
  const enrolledCourses = mockCourses.filter(c => currentUser.enrolledCourses.includes(c.id));
  const unlockedBadges = mockBadges.filter(b => currentUser.badges.includes(b.id));
  const lockedBadges = mockBadges.filter(b => !currentUser.badges.includes(b.id));

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const menuItems = [
    { id: "progress", label: "Mi Progreso", icon: BookOpen },
    { id: "stats", label: "Estadísticas", icon: BarChart3 },
    { id: "badges", label: "Insignias", icon: Award },
    { id: "certificates", label: "Certificados", icon: FileText },
    { id: "profile", label: "Perfil", icon: User },
  ];

  const chartConfig = {
    hours: { label: "Horas", color: "hsl(var(--primary))" },
    quizScore: { label: "Quiz Score", color: "hsl(var(--accent))" },
  };

  const getBadgeIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'footprints': <Target className="h-6 w-6" />,
      'clock': <Clock className="h-6 w-6" />,
      'trophy': <Award className="h-6 w-6" />,
      'graduation-cap': <GraduationCap className="h-6 w-6" />,
      'compass': <TrendingUp className="h-6 w-6" />,
      'flame': <BarChart3 className="h-6 w-6" />,
    };
    return icons[iconName] || <Award className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Mobile Menu Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-foreground">LoVirtual</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                <p className="text-xs text-muted-foreground">Empleado</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {menuItems.find(m => m.id === activeTab)?.label}
                </h1>
                <p className="text-sm text-muted-foreground">
                  ¡Sigue aprendiendo, {userName.split(' ')[0]}!
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Mi Progreso */}
          {activeTab === "progress" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-2 bg-primary/20">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${currentUser.progress[course.id] || 0}%` }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{course.duration}</span>
                        <span className="font-semibold text-primary">
                          {currentUser.progress[course.id] || 0}%
                        </span>
                      </div>
                      <Progress
                        value={currentUser.progress[course.id] || 0}
                        className="mt-2 h-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Estadísticas */}
          {activeTab === "stats" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Horas de Estudio</CardTitle>
                    <CardDescription>Últimos 7 días</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockStudyStats}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Puntajes en Quizzes</CardTitle>
                    <CardDescription>Últimos 7 días</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockStudyStats}>
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="quizScore"
                            stroke="hsl(var(--accent))"
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--accent))" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Insignias */}
          {activeTab === "badges" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Insignias Desbloqueadas</h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {unlockedBadges.map((badge) => (
                    <Card key={badge.id} className="text-center p-4">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <h4 className="font-semibold text-sm text-foreground">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Por Desbloquear</h3>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {lockedBadges.map((badge) => (
                    <Card key={badge.id} className="text-center p-4 opacity-50">
                      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-3 text-muted-foreground">
                        {getBadgeIcon(badge.icon)}
                      </div>
                      <h4 className="font-semibold text-sm text-muted-foreground">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Certificados */}
          {activeTab === "certificates" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {mockCertificates.length > 0 ? (
                mockCertificates.map((cert) => (
                  <Card key={cert.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{cert.courseName}</h4>
                        <p className="text-sm text-muted-foreground">
                          Completado el {new Date(cert.completedAt).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Certificado
                    </Button>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground">Sin certificados aún</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Completa un curso para obtener tu certificado
                  </p>
                </Card>
              )}
            </motion.div>
          )}

          {/* Perfil */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tu información de perfil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-20 w-20 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Cambiar Foto
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nombre Completo</label>
                    <input
                      type="text"
                      defaultValue={userName}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Correo Electrónico</label>
                    <input
                      type="email"
                      defaultValue={currentUser.email}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nueva Contraseña</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    />
                  </div>
                  <Button className="w-full mt-4">Guardar Cambios</Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
