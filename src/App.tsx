import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AnimatedHeader from "./components/AnimatedHeader";
import AnimatedHero from "./components/AnimatedHero";
import InfiniteCarousel from "./components/InfiniteCarousel";
import AboutSection from "./components/AboutSection";
import CarouselClientes from "./components/CarouselClientes";
import PortfolioSection from "./components/PortfolioSection";
import ContactSection from "./components/ContactSection";
import "./index.css";
import "./components/CarouselClientes.css";
import Footer from "./components/Footer";
import MarqueeText from "./components/MarqueeText";
import ServicesSection from "./components/ServicesSection";

const queryClient = new QueryClient();

const RouterWithLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    setLoading(true);
    setPrevPath(location.pathname);
    const timeout = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <>
      <AnimatedHeader />
      <AnimatedHero />
      <InfiniteCarousel />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <CarouselClientes />
      <ContactSection />
      <MarqueeText items={[
        { 
          text: 'Creadores de soluciones', 
          icon: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/681f7ca07cf04691a4f403b1_Marquee%20Icon.svg' 
        },
        { 
          text: 'Innovadores', 
          icon: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/681f7ca07cf04691a4f403b1_Marquee%20Icon.svg' 
        },
        { 
          text: 'Pioneros', 
          icon: 'https://cdn.prod.website-files.com/681a3543e37b9a222a8ce9b8/681f7ca07cf04691a4f403b1_Marquee%20Icon.svg' 
        }
        
      ]} />
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouterWithLoader />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
