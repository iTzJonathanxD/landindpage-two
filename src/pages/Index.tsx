import AnimatedHero from "@/components/AnimatedHero";
import { useEffect, useState } from "react";


const Index = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen">
     
      <AnimatedHero />
    </div>
  );
};

export default Index;
