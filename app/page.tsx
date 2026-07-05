import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Writing from "@/components/Writing";
import Philosophy from "@/components/Philosophy";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WelcomeToast from "@/components/WelcomeToast";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        {/* <Writing /> */}
        <Philosophy />
        <Contact />
      </main>
      <Footer />
      <WelcomeToast />
      <BackToTop />
    </>
  );
}
