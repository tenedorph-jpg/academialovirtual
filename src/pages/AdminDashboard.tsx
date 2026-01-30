import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, ClipboardCheck, CheckCircle2, BookOpen,
  LogOut, Plus, Eye, Edit, UserX, Search, Download, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";
import {
  mockUsers,
  mockCourses,
  mockPendingReviews,
  dashboardKPIs,
  coursePopularityData,
  completionRateData,
  averageTimePerCourseData,
  attendeesPerCourseData,
  exportStudentsData,
  exportCoursesSummaryData,
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    course: "",
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const generateAccessCode = () => {
    const year = new Date().getFullYear();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `LOV-${year}-${random}`;
  };

  const handleCreateUser = () => {
    const accessCode = generateAccessCode();
    toast({
      title: "Usuario creado exitosamente",
      description: `Código de acceso: ${accessCode}`,
    });
    setIsCreateModalOpen(false);
    setNewUser({ name: "", lastName: "", email: "", course: "" });
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const menuItems = [
    { id: "overview", label: "Resumen", icon: BookOpen },
    { id: "users", label: "Usuarios", icon: Users },
    { id: "reviews", label: "Revisiones", icon: ClipboardCheck },
    { id: "metrics", label: "Métricas", icon: CheckCircle2 },
  ];

  const kpiCards = [
    {
      title: "Total Estudiantes",
      value: dashboardKPIs.totalStudents,
      icon: Users,
      color: "bg-primary",
    },
    {
      title: "Revisiones Pendientes",
      value: dashboardKPIs.pendingReviews,
      icon: ClipboardCheck,
      color: "bg-orange-500",
    },
    {
      title: "Sprints Aprobados",
      value: dashboardKPIs.approvedSprints,
      icon: CheckCircle2,
      color: "bg-green-500",
    },
    {
      title: "Cursos Activos",
      value: dashboardKPIs.activeCourses,
      icon: BookOpen,
      color: "bg-accent",
    },
  ];

  const chartConfig = {
    students: { label: "Estudiantes", color: "hsl(var(--primary))" },
    hours: { label: "Horas", color: "hsl(var(--accent))" },
    attendees: { label: "Asistentes", color: "hsl(var(--primary))" },
  };

  // Funciones de exportación CSV
  const exportToCsv = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map(row => Object.values(row).join(",")).join("\n");
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportación exitosa",
      description: `Se ha descargado ${filename}`,
    });
  };

  const handleExportCourseMetrics = () => {
    const courseData = [
      { curso: "Asistente Virtual", inscritos: 85, completados: 62, tiempoPromedio: "42h" },
      { curso: "Marketing Digital", inscritos: 72, completados: 51, tiempoPromedio: "35h" },
      { curso: "Customer Success", inscritos: 48, completados: 33, tiempoPromedio: "28h" },
      { curso: "Herramientas Digitales", inscritos: 95, completados: 84, tiempoPromedio: "22h" },
      { curso: "Community Manager", inscritos: 63, completados: 45, tiempoPromedio: "30h" },
    ];
    exportToCsv(courseData, "metricas_cursos.csv");
  };

  const handleExportStudentMetrics = () => {
    const studentData = mockUsers.map(user => ({
      nombre: user.name,
      email: user.email,
      cursosInscritos: user.enrolledCourses.length,
      cursosCompletados: user.completedCourses.length,
      estado: user.isActive ? "Activo" : "Inactivo",
    }));
    exportToCsv(studentData, "metricas_estudiantes.csv");
  };

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Fondo dinámico interactivo */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsla(197, 100%, 75%, 0.15), transparent 40%)`,
          }}
        />
        {/* Partículas flotantes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Navbar Horizontal */}
      <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Academia <span className="text-highlight">LoVirtual</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <Avatar className="h-8 w-8 bg-white/20 border border-white/30">
                  <AvatarFallback className="text-white text-xs">AD</AvatarFallback>
                </Avatar>
                <span className="text-sm text-white/80 hidden lg:inline">Administrador</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Overview Section */}
        {activeSection === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            
            {/* KPI Cards */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              {kpiCards.map((kpi, index) => (
                <Card key={index} className="bg-white/90 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${kpi.color}`}>
                        <kpi.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pending Reviews Quick View */}
            <Card className="bg-white/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-orange-500" />
                  Revisiones Pendientes
                </CardTitle>
                <CardDescription>Sprints enviados esperando calificación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPendingReviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <AvatarFallback className="text-primary text-xs">
                            {review.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-foreground">{review.studentName}</p>
                          <p className="text-xs text-muted-foreground">
                            {review.courseName} - {review.sprintName}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Revisar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Users Section */}
        {activeSection === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-2xl font-bold text-white">Gestión de Usuarios</h1>
            
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuario..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90"
                />
              </div>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Crear Nuevo Usuario
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                    <DialogDescription>
                      Registra un nuevo empleado en la academia
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nombre</Label>
                        <Input
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="María"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Apellido</Label>
                        <Input
                          value={newUser.lastName}
                          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                          placeholder="García"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Correo Corporativo</Label>
                      <Input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="maria.garcia@empresa.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Curso Inicial</Label>
                      <Select
                        value={newUser.course}
                        onValueChange={(value) => setNewUser({ ...newUser, course: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCourses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground">
                        Código de acceso generado: <span className="font-mono font-bold text-foreground">{generateAccessCode()}</span>
                      </p>
                    </div>
                    <Button className="w-full" onClick={handleCreateUser}>
                      Crear Usuario
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Users Table */}
            <Card className="bg-white/90 backdrop-blur-sm border-white/20">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead className="hidden md:table-cell">Código</TableHead>
                      <TableHead className="hidden sm:table-cell">Estado</TableHead>
                      <TableHead className="hidden lg:table-cell">Cursos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 bg-primary/10">
                              <AvatarFallback className="text-primary text-xs">
                                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell font-mono text-xs">
                          {user.accessCode}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isActive ? "Activo" : "Inactivo"}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {user.enrolledCourses.length} inscrito(s)
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                              <UserX className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Reviews Section */}
        {activeSection === "reviews" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-2xl font-bold text-white">Revisiones Pendientes</h1>
            
            <Card className="bg-white/90 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Todas las Revisiones Pendientes</CardTitle>
                <CardDescription>Sprints que requieren tu calificación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockPendingReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 bg-orange-100">
                          <AvatarFallback className="text-orange-600">
                            {review.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{review.studentName}</p>
                          <p className="text-sm text-muted-foreground">{review.courseName}</p>
                          <p className="text-xs text-accent font-medium">{review.sprintName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:ml-auto">
                        <span className="text-xs text-muted-foreground">
                          Enviado: {new Date(review.submittedAt).toLocaleDateString('es-ES')}
                        </span>
                        <Button size="sm">Revisar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Metrics Section */}
        {activeSection === "metrics" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-white">Métricas de la Academia</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportCourseMetrics}
                  className="gap-2 bg-white/90 hover:bg-white"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar Métricas por Curso (CSV)</span>
                  <span className="sm:hidden">Cursos CSV</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportStudentMetrics}
                  className="gap-2 bg-white/90 hover:bg-white"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">Exportar Métricas por Estudiante (CSV)</span>
                  <span className="sm:hidden">Estudiantes CSV</span>
                </Button>
              </div>
            </div>

            {/* Grid 2x2 de gráficos */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Gráfico 1: Cursos Más Populares - Barras Horizontales */}
              <Card className="bg-white/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cursos Más Populares</CardTitle>
                  <CardDescription>Número de estudiantes inscritos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={coursePopularityData} 
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          width={130} 
                          tick={{ fontSize: 10 }} 
                          tickLine={false}
                          axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="students" 
                          fill="hsl(var(--primary))" 
                          radius={[0, 4, 4, 0]}
                          maxBarSize={30}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico 2: Tasa de Finalización - Donut/Pie */}
              <Card className="bg-white/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tasa de Finalización</CardTitle>
                  <CardDescription>Estado general de los estudiantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={completionRateData}
                          cx="50%"
                          cy="45%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {completionRateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="flex justify-center gap-4 -mt-4">
                    {completionRateData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.fill }}
                        />
                        <span className="text-xs text-muted-foreground">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico 3: Tiempo Promedio por Curso - Barras Verticales */}
              <Card className="bg-white/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tiempo Promedio por Curso</CardTitle>
                  <CardDescription>Horas de estudio promedio</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={averageTimePerCourseData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="course" 
                          tick={{ fontSize: 10 }} 
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="hours" 
                          fill="hsl(var(--accent))" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Gráfico 4: Cantidad de Asistentes por Curso */}
              <Card className="bg-white/90 backdrop-blur-sm border-white/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Asistentes por Curso</CardTitle>
                  <CardDescription>Total vs. Activos actualmente</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[280px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={attendeesPerCourseData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="course" 
                          tick={{ fontSize: 10 }} 
                          angle={-45}
                          textAnchor="end"
                          height={60}
                          tickLine={false}
                        />
                        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                          dataKey="attendees" 
                          name="Total Asistentes"
                          fill="hsl(var(--primary))" 
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
