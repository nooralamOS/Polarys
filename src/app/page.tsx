import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FullSystem from "@/components/FullSystem";
import Clients from "@/components/Clients";
import First7Days from "@/components/First7Days";
import ServiceModel from "@/components/ServiceModel";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FullSystem />
        <Clients />
        <First7Days />
        <ServiceModel />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
