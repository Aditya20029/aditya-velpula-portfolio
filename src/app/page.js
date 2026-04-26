import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SmoothScroll from "@/components/layout/SmoothScroll";
import GlitterStorm from "@/components/canvas/GlitterStorm";
import NeuralBackground from "@/components/canvas/NeuralBackground";
import CursorSystem from "@/components/canvas/CursorSystem";
import GrainOverlay from "@/components/canvas/GrainOverlay";
import PremiumBackdrop from "@/components/layout/PremiumBackdrop";
import MobileMotion from "@/components/layout/MobileMotion";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import TechMarquee from "@/components/ui/TechMarquee";

export default function Home() {
  return (
    <MobileMotion>
      <Preloader />
      <SmoothScroll />
      <GlitterStorm />
      <NeuralBackground />
      <CursorSystem />
      <GrainOverlay />
      <PremiumBackdrop />
      <ScrollProgress />
      <Navbar />
      <div aria-hidden className="context-tint" />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <TechMarquee />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </MobileMotion>
  );
}
