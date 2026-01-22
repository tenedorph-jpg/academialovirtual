import Hero from "@/components/Hero";
import CoursesCarousel from "@/components/CoursesCarousel";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <CoursesCarousel />
        <StatsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
