import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap, Users, ClipboardCheck, CheckCircle2, BookOpen,
  LogOut, Menu, X, Plus, Eye, Edit, UserX, Search
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
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  mockUsers,
  mockCourses,
  mockPendingReviews,
  dashboardKPIs,
  coursePopularityData,
  completionRateData,
} from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    course: "",
  });

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
    enrolled: { label: "Inscritos", color: "hsl(var(--primary))" },
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
              <span className="font-bold text-foreground">Admin Panel</span>
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

          {/* Admin Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 bg-primary">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Administrador</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
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
                  Panel de Administración - Academia LoVirtual
                </h1>
                <p className="text-sm text-muted-foreground">
                  Gestiona tu academia de forma eficiente
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {/* Overview Section */}
          {activeSection === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* KPI Cards */}
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {kpiCards.map((kpi, index) => (
                  <Card key={index}>
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
              <Card>
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
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
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
              <Card>
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
              className="space-y-4"
            >
              <Card>
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
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Course Popularity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cursos Más Populares</CardTitle>
                    <CardDescription>Número de estudiantes inscritos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={coursePopularityData} layout="vertical">
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="enrolled" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Completion Rate */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tasa de Finalización</CardTitle>
                    <CardDescription>Estado general de los estudiantes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={completionRateData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {completionRateData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    <div className="flex justify-center gap-6 mt-4">
                      {completionRateData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.fill }}
                          />
                          <span className="text-xs text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
