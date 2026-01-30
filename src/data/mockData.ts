// Mock Data for Academia LoVirtual

export interface User {
  id: string;
  name: string;
  email: string;
  accessCode: string;
  role: 'employee' | 'admin';
  avatar?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  progress: Record<string, number>;
  badges: string[];
  createdAt: string;
  isActive: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  modules: number;
  enrolledCount: number;
  completionRate: number;
  image?: string;
}

export interface PendingReview {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  sprintName: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Certificate {
  id: string;
  courseName: string;
  completedAt: string;
  certificateUrl: string;
}

export interface StudyStats {
  day: string;
  hours: number;
  quizScore: number;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María García López',
    email: 'maria.garcia@lovirtual.com',
    accessCode: 'LOV-2026-MGL',
    role: 'employee',
    enrolledCourses: ['c1', 'c2', 'c3'],
    completedCourses: ['c4'],
    progress: { c1: 75, c2: 30, c3: 10 },
    badges: ['b1', 'b2', 'b3'],
    createdAt: '2025-01-15',
    isActive: true,
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@lovirtual.com',
    accessCode: 'LOV-2026-CRD',
    role: 'employee',
    enrolledCourses: ['c1', 'c4'],
    completedCourses: ['c2'],
    progress: { c1: 45, c4: 60 },
    badges: ['b1'],
    createdAt: '2025-02-01',
    isActive: true,
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana.martinez@lovirtual.com',
    accessCode: 'LOV-2026-AMT',
    role: 'employee',
    enrolledCourses: ['c2', 'c3'],
    completedCourses: [],
    progress: { c2: 15, c3: 5 },
    badges: [],
    createdAt: '2025-03-10',
    isActive: true,
  },
  {
    id: '4',
    name: 'Roberto Sánchez',
    email: 'roberto.sanchez@lovirtual.com',
    accessCode: 'LOV-2026-RSZ',
    role: 'employee',
    enrolledCourses: ['c1'],
    completedCourses: ['c3', 'c4'],
    progress: { c1: 90 },
    badges: ['b1', 'b2', 'b3', 'b4'],
    createdAt: '2024-12-05',
    isActive: true,
  },
  {
    id: '5',
    name: 'Laura Fernández',
    email: 'laura.fernandez@lovirtual.com',
    accessCode: 'LOV-2026-LFZ',
    role: 'employee',
    enrolledCourses: ['c4'],
    completedCourses: ['c1', 'c2'],
    progress: { c4: 50 },
    badges: ['b1', 'b2'],
    createdAt: '2025-01-20',
    isActive: false,
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: 'c1',
    title: 'Asistente Virtual Profesional',
    description: 'Domina las habilidades esenciales para ser un asistente virtual de clase mundial.',
    duration: '40 horas',
    modules: 12,
    enrolledCount: 85,
    completionRate: 72,
  },
  {
    id: 'c2',
    title: 'Gestión de Redes Sociales',
    description: 'Aprende a crear y gestionar contenido para redes sociales profesionalmente.',
    duration: '30 horas',
    modules: 8,
    enrolledCount: 62,
    completionRate: 65,
  },
  {
    id: 'c3',
    title: 'Customer Success',
    description: 'Estrategias para garantizar el éxito y satisfacción de los clientes.',
    duration: '25 horas',
    modules: 6,
    enrolledCount: 48,
    completionRate: 58,
  },
  {
    id: 'c4',
    title: 'Herramientas Digitales',
    description: 'Domina las herramientas esenciales del trabajo remoto moderno.',
    duration: '20 horas',
    modules: 10,
    enrolledCount: 95,
    completionRate: 88,
  },
];

// Mock Pending Reviews
export const mockPendingReviews: PendingReview[] = [
  {
    id: 'r1',
    studentId: '1',
    studentName: 'María García López',
    courseId: 'c1',
    courseName: 'Asistente Virtual Profesional',
    sprintName: 'Sprint 3: Gestión del Tiempo',
    submittedAt: '2026-01-28',
    status: 'pending',
  },
  {
    id: 'r2',
    studentId: '2',
    studentName: 'Carlos Rodríguez',
    courseId: 'c4',
    courseName: 'Herramientas Digitales',
    sprintName: 'Sprint 5: Automatización',
    submittedAt: '2026-01-29',
    status: 'pending',
  },
  {
    id: 'r3',
    studentId: '4',
    studentName: 'Roberto Sánchez',
    courseId: 'c1',
    courseName: 'Asistente Virtual Profesional',
    sprintName: 'Sprint 8: Comunicación Efectiva',
    submittedAt: '2026-01-30',
    status: 'pending',
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  { id: 'b1', name: 'Primer Paso', description: 'Completaste tu primer módulo', icon: 'footprints', unlocked: true },
  { id: 'b2', name: 'Estudiante Dedicado', description: '10 horas de estudio', icon: 'clock', unlocked: true },
  { id: 'b3', name: 'Quiz Master', description: 'Score perfecto en un quiz', icon: 'trophy', unlocked: true },
  { id: 'b4', name: 'Graduado', description: 'Completaste tu primer curso', icon: 'graduation-cap', unlocked: true },
  { id: 'b5', name: 'Explorador', description: 'Inscrito en 3+ cursos', icon: 'compass', unlocked: false },
  { id: 'b6', name: 'Maratonista', description: '50 horas de estudio', icon: 'flame', unlocked: false },
];

// Mock Certificates
export const mockCertificates: Certificate[] = [
  { id: 'cert1', courseName: 'Herramientas Digitales', completedAt: '2025-12-15', certificateUrl: '#' },
];

// Mock Study Stats
export const mockStudyStats: StudyStats[] = [
  { day: 'Lun', hours: 2.5, quizScore: 85 },
  { day: 'Mar', hours: 1.8, quizScore: 90 },
  { day: 'Mié', hours: 3.2, quizScore: 78 },
  { day: 'Jue', hours: 2.0, quizScore: 92 },
  { day: 'Vie', hours: 1.5, quizScore: 88 },
  { day: 'Sáb', hours: 4.0, quizScore: 95 },
  { day: 'Dom', hours: 0.5, quizScore: 80 },
];

// Course popularity data for charts
export const coursePopularityData = [
  { name: 'Asistente Virtual', enrolled: 85 },
  { name: 'Redes Sociales', enrolled: 62 },
  { name: 'Customer Success', enrolled: 48 },
  { name: 'Herramientas Digitales', enrolled: 95 },
];

// Completion rate data for pie chart
export const completionRateData = [
  { name: 'Completados', value: 45, fill: 'hsl(var(--primary))' },
  { name: 'En Progreso', value: 38, fill: 'hsl(var(--accent))' },
  { name: 'No Iniciados', value: 17, fill: 'hsl(var(--muted))' },
];

// Dashboard KPIs
export const dashboardKPIs = {
  totalStudents: 150,
  pendingReviews: 6,
  approvedSprints: 45,
  activeCourses: 7,
};
